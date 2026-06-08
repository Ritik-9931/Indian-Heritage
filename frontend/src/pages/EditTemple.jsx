import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchTempleById, updateTemple } from "../redux/slices/templeSlice";
import { fetchStates } from "../redux/slices/stateSlice";
import { fetchCitiesByState } from "../redux/slices/citySlice";
import { fetchDeities } from "../redux/slices/deitySlice";
import { fetchFestivals } from "../redux/slices/festivalSlice";
import { fetchCircuits } from "../redux/slices/circuitSlice";
import { fetchRituals } from "../redux/slices/ritualSlice";

const EditTemple = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { temple } = useSelector((state) => state.temple);
  const { states } = useSelector((state) => state.state);
  const { cities } = useSelector((state) => state.city);
  const { deities } = useSelector((state) => state.deity);
  const { festivals } = useSelector((state) => state.festival);
  const { circuits } = useSelector((state) => state.circuit);
  const { rituals } = useSelector((state) => state.ritual);

  const [formData, setFormData] = useState(null);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // FETCH DATA
  useEffect(() => {
    dispatch(fetchTempleById(id));
    dispatch(fetchStates());
    dispatch(fetchDeities());
    dispatch(fetchFestivals());
    dispatch(fetchCircuits());
    dispatch(fetchRituals());
  }, [id, dispatch]);

  useEffect(() => {
    if (temple?.state?._id) {
      dispatch(fetchCitiesByState(temple.state._id));
    }
  }, [temple, dispatch]);

  // SET DATA
  useEffect(() => {
    if (temple) {
      setFormData({
        templeName: temple.templeName || "",
        state: temple.state?._id || "",
        city: temple.city?._id || "",
        deity: temple.deity?._id || "",
        address: temple.address || "",

        location: temple.location || { latitude: "", longitude: "" },

        history: temple.history || "",
        significance: temple.significance || "",
        architecture: temple.architecture || "",

        darshanTimings: temple.darshanTimings || {
          morning: "",
          evening: "",
        },

        visitorInfo: temple.visitorInfo || {
          dressCode: "",
          entryFee: "",
          photographyAllowed: false,
        },

        festivals: temple.festivals?.map((f) => f._id) || [],
        rituals: temple.rituals?.map((r) => r._id) || [],
        pilgrimageCircuits: temple.pilgrimageCircuits?.map((c) => c._id) || [],

        existingImages: temple.images || [],
        featured: temple.featured || false,
      });
    }
  }, [temple]);

  if (!formData) return <div>Loading...</div>;

  // BASIC
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // NESTED
  const handleNested = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value,
      },
    });
  };

  // STATE CHANGE
  const handleState = (e) => {
    const stateId = e.target.value;

    setFormData({
      ...formData,
      state: stateId,
      city: "",
    });

    dispatch(fetchCitiesByState(stateId));
  };

  // MULTI SELECT
  const handleMulti = (field, e) => {
    const values = Array.from(e.target.selectedOptions, (o) => o.value);
    setFormData({ ...formData, [field]: values });
  };

  // IMAGES
  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((f) => ({
      url: URL.createObjectURL(f),
    }));

    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeNewImage = (i) => {
    setImages((p) => p.filter((_, index) => index !== i));
    setPreviewImages((p) => p.filter((_, index) => index !== i));
  };

  const removeOldImage = (i) => {
    setFormData({
      ...formData,
      existingImages: formData.existingImages.filter((_, index) => index !== i),
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("templeName", formData.templeName);
    data.append("state", formData.state);
    if (formData.city) {
      data.append("city", formData.city);
    }
    data.append("deity", formData.deity);
    data.append("address", formData.address);

    data.append("latitude", formData.location.latitude);
    data.append("longitude", formData.location.longitude);

    data.append("history", formData.history);
    data.append("significance", formData.significance);
    data.append("architecture", formData.architecture);

    data.append("morning", formData.darshanTimings.morning);
    data.append("evening", formData.darshanTimings.evening);

    data.append("dressCode", formData.visitorInfo.dressCode);
    data.append("entryFee", formData.visitorInfo.entryFee);
    data.append("photographyAllowed", formData.visitorInfo.photographyAllowed);

    formData.festivals.forEach((f) => data.append("festivals", f));
    formData.rituals.forEach((r) => data.append("rituals", r));
    formData.pilgrimageCircuits.forEach((c) =>
      data.append("pilgrimageCircuits", c),
    );

    data.append("existingImages", JSON.stringify(formData.existingImages));

    images.forEach((img) => data.append("images", img));

    try {
      await dispatch(updateTemple({ id, formData: data })).unwrap();

      navigate(-1); // runs only if update succeeds
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          ✏️ Edit Temple
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TEMPLE NAME */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <input
              name="templeName"
              value={formData.templeName}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Temple Name"
            />
          </div>

          {/* STATE / CITY / DEITY */}
          <div className="bg-gray-50 p-5 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={formData.state}
              onChange={handleState}
              className="border p-3 rounded-lg"
            >
              {states.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.stateName}
                </option>
              ))}
            </select>

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              {cities.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.cityName}
                </option>
              ))}
            </select>

            <select
              name="deity"
              value={formData.deity}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              {deities.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.deityName}
                </option>
              ))}
            </select>
          </div>

          {/* ADDRESS */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Temple Address"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* LOCATION */}
          <div className="bg-gray-50 p-5 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              value={formData.location.latitude}
              onChange={(e) =>
                handleNested("location", "latitude", e.target.value)
              }
              placeholder="Latitude"
              className="border p-3 rounded-lg"
            />

            <input
              value={formData.location.longitude}
              onChange={(e) =>
                handleNested("location", "longitude", e.target.value)
              }
              placeholder="Longitude"
              className="border p-3 rounded-lg"
            />
          </div>

          {/* HISTORY */}
          <div className="bg-gray-50 p-5 rounded-xl space-y-3">
            <textarea
              value={formData.history}
              onChange={handleChange}
              name="history"
              placeholder="Temple History"
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              value={formData.significance}
              onChange={handleChange}
              name="significance"
              placeholder="Temple Significance"
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              value={formData.architecture}
              onChange={handleChange}
              name="architecture"
              placeholder="Architecture"
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* TIMINGS */}
          <div className="bg-gray-50 p-5 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              value={formData.darshanTimings.morning}
              onChange={(e) =>
                handleNested("darshanTimings", "morning", e.target.value)
              }
              placeholder="Morning Timing"
              className="border p-3 rounded-lg"
            />

            <input
              value={formData.darshanTimings.evening}
              onChange={(e) =>
                handleNested("darshanTimings", "evening", e.target.value)
              }
              placeholder="Evening Timing"
              className="border p-3 rounded-lg"
            />
          </div>

          {/* VISITOR INFO */}
          <div className="bg-gray-50 p-5 rounded-xl space-y-3">
            <input
              value={formData.visitorInfo.dressCode}
              onChange={(e) =>
                handleNested("visitorInfo", "dressCode", e.target.value)
              }
              placeholder="Dress Code"
              className="w-full border p-3 rounded-lg"
            />

            <input
              value={formData.visitorInfo.entryFee}
              onChange={(e) =>
                handleNested("visitorInfo", "entryFee", e.target.value)
              }
              placeholder="Entry Fee"
              className="w-full border p-3 rounded-lg"
            />

            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={formData.visitorInfo.photographyAllowed}
                onChange={(e) =>
                  handleNested(
                    "visitorInfo",
                    "photographyAllowed",
                    e.target.checked,
                  )
                }
              />
              Photography Allowed
            </label>
          </div>

          {/* MULTI SELECT */}
          <div className="bg-gray-50 p-5 rounded-xl space-y-3">
            <select
              multiple
              value={formData.festivals}
              onChange={(e) => handleMulti("festivals", e)}
              className="w-full border p-3 rounded-lg"
            >
              {festivals.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.festivalName}
                </option>
              ))}
            </select>

            <select
              multiple
              value={formData.rituals}
              onChange={(e) => handleMulti("rituals", e)}
              className="w-full border p-3 rounded-lg"
            >
              {rituals.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.ritualName}
                </option>
              ))}
            </select>

            <select
              multiple
              value={formData.pilgrimageCircuits}
              onChange={(e) => handleMulti("pilgrimageCircuits", e)}
              className="w-full border p-3 rounded-lg"
            >
              {circuits.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.circuitName}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGES */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <input
              type="file"
              multiple
              onChange={handleImages}
              className="mb-4"
            />
            <div className="flex flex-wrap gap-3">
              {formData.existingImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img.url}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeOldImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
              {previewImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img.url}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeNewImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold">
            Update Temple
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTemple;
