// src/pages/AddTemple.jsx

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "../redux/slices/stateSlice";

import { fetchCitiesByState } from "../redux/slices/citySlice";

import { fetchDeities } from "../redux/slices/deitySlice";

import { fetchFestivals } from "../redux/slices/festivalSlice";

import { fetchCircuits } from "../redux/slices/circuitSlice";

import { fetchRituals } from "../redux/slices/ritualSlice";

import api from "../services/Api";

const AddTemple = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const { states } = useSelector((state) => state.state);

  const { cities } = useSelector((state) => state.city);

  const { deities } = useSelector((state) => state.deity);

  const { festivals } = useSelector((state) => state.festival);

  const { circuits } = useSelector((state) => state.circuit);

  const { rituals } = useSelector((state) => state.ritual);

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    templeName: "",

    state: "",

    city: "",

    deity: "",

    address: "",

    location: {
      latitude: "",
      longitude: "",
    },

    festivals: [],

    rituals: [],

    pilgrimageCircuits: [],

    history: "",

    significance: "",

    architecture: "",

    darshanTimings: {
      morning: "",
      evening: "",
    },

    visitorInfo: {
      dressCode: "",

      photographyAllowed: false,

      entryFee: "",
    },

    featured: false,
  });

  useEffect(() => {
    dispatch(fetchStates());

    dispatch(fetchDeities());

    dispatch(fetchFestivals());

    dispatch(fetchCircuits());

    dispatch(fetchRituals());
  }, [dispatch]);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  // HANDLE STATE
  const handleStateChange = (e) => {
    const stateId = e.target.value;

    setFormData({
      ...formData,

      state: stateId,

      city: "",
    });

    dispatch(fetchCitiesByState(stateId));
  };

  // HANDLE NESTED
  const handleNestedChange = (parent, field, value) => {
    setFormData({
      ...formData,

      [parent]: {
        ...formData[parent],

        [field]: value,
      },
    });
  };

  // HANDLE MULTI CHECKBOX
  const handleCheckboxChange = (field, value) => {
    if (formData[field].includes(value)) {
      setFormData({
        ...formData,

        [field]: formData[field].filter((item) => item !== value),
      });
    } else {
      setFormData({
        ...formData,

        [field]: [...formData[field], value],
      });
    }
  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages(previews);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));

    setPreviewImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  // GENERATE SLUG
  const generateSlug = (text) => {
    return text.toLowerCase().trim().replace(/\s+/g, "-");
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // BASIC
      data.append("templeName", formData.templeName);

      data.append("slug", generateSlug(formData.templeName));

      data.append("state", formData.state);

      data.append("city", formData.city);

      data.append("deity", formData.deity);

      data.append("address", formData.address);

      data.append("latitude", formData.location.latitude);

      data.append("longitude", formData.location.longitude);

      // DETAILS
      data.append("history", formData.history);

      data.append("significance", formData.significance);

      data.append("architecture", formData.architecture);

      // DARSHAN
      data.append("morning", formData.darshanTimings.morning);

      data.append("evening", formData.darshanTimings.evening);

      // VISITOR INFO
      data.append("dressCode", formData.visitorInfo.dressCode);

      data.append("entryFee", formData.visitorInfo.entryFee);

      data.append(
        "photographyAllowed",

        formData.visitorInfo.photographyAllowed,
      );

      // FEATURED
      data.append("featured", formData.featured);

      // FESTIVALS
      formData.festivals.forEach((festival) => {
        data.append("festivals", festival);
      });

      // RITUALS
      formData.rituals.forEach((ritual) => {
        data.append("rituals", ritual);
      });

      // CIRCUITS
      formData.pilgrimageCircuits.forEach((circuit) => {
        data.append("pilgrimageCircuits", circuit);
      });

      // IMAGES
      images.forEach((image) => {
        data.append("images", image);
      });

      await api.post("/temples", data, {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "multipart/form-data",
        },
      });

      alert("Temple Added Successfully");

      setFormData({
        templeName: "",

        state: "",

        city: "",

        deity: "",

        address: "",

        location: {
          latitude: "",
          longitude: "",
        },

        festivals: [],

        rituals: [],

        pilgrimageCircuits: [],

        history: "",

        significance: "",

        architecture: "",

        darshanTimings: {
          morning: "",
          evening: "",
        },

        visitorInfo: {
          dressCode: "",

          photographyAllowed: false,

          entryFee: "",
        },

        featured: false,
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to add temple");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Add Temple</h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* BASIC INFO */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="templeName"
                value={formData.templeName}
                placeholder="Temple Name"
                onChange={handleChange}
                className="border p-4 rounded-xl"
              />

              <select
                value={formData.state}
                onChange={handleStateChange}
                className="border p-4 rounded-xl"
              >
                <option value="">Select State</option>

                {states.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.stateName}
                  </option>
                ))}
              </select>

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border p-4 rounded-xl"
              >
                <option value="">Select City</option>

                {cities.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.cityName}
                  </option>
                ))}
              </select>

              <select
                name="deity"
                value={formData.deity}
                onChange={handleChange}
                className="border p-4 rounded-xl"
              >
                <option value="">Select Deity</option>

                {deities.map((deity) => (
                  <option key={deity._id} value={deity._id}>
                    {deity.deityName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <input
            type="text"
            placeholder="Temple Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,

                address: e.target.value,
              })
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Latitude"
            value={formData.location.latitude}
            onChange={(e) =>
              setFormData({
                ...formData,

                location: {
                  ...formData.location,

                  latitude: e.target.value,
                },
              })
            }
            className="border p-4 rounded-xl"
          />

          <input
            type="text"
            placeholder="Longitude"
            value={formData.location.longitude}
            onChange={(e) =>
              setFormData({
                ...formData,

                location: {
                  ...formData.location,

                  longitude: e.target.value,
                },
              })
            }
            className="border p-4 rounded-xl"
          />

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Temple Details</h2>

            <div className="space-y-5">
              <textarea
                placeholder="Temple History"
                value={formData.history}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    history: e.target.value,
                  })
                }
                className="w-full border p-4 rounded-xl h-40"
              />

              <textarea
                placeholder="Temple Significance"
                value={formData.significance}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    significance: e.target.value,
                  })
                }
                className="w-full border p-4 rounded-xl h-40"
              />

              <textarea
                placeholder="Architecture"
                value={formData.architecture}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    architecture: e.target.value,
                  })
                }
                className="w-full border p-4 rounded-xl h-40"
              />
            </div>
          </div>

          {/* DARSHAN */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Darshan Timings</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Morning Timing"
                value={formData.darshanTimings.morning}
                onChange={(e) =>
                  handleNestedChange(
                    "darshanTimings",

                    "morning",

                    e.target.value,
                  )
                }
                className="border p-4 rounded-xl"
              />

              <input
                type="text"
                placeholder="Evening Timing"
                value={formData.darshanTimings.evening}
                onChange={(e) =>
                  handleNestedChange(
                    "darshanTimings",

                    "evening",

                    e.target.value,
                  )
                }
                className="border p-4 rounded-xl"
              />
            </div>
          </div>

          {/* VISITOR INFO */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Visitor Information</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Dress Code"
                value={formData.visitorInfo.dressCode}
                onChange={(e) =>
                  handleNestedChange(
                    "visitorInfo",

                    "dressCode",

                    e.target.value,
                  )
                }
                className="border p-4 rounded-xl"
              />

              <input
                type="text"
                placeholder="Entry Fee"
                value={formData.visitorInfo.entryFee}
                onChange={(e) =>
                  handleNestedChange(
                    "visitorInfo",

                    "entryFee",

                    e.target.value,
                  )
                }
                className="border p-4 rounded-xl"
              />
            </div>

            <label className="flex items-center gap-3 mt-5">
              <input
                type="checkbox"
                checked={formData.visitorInfo.photographyAllowed}
                onChange={(e) =>
                  handleNestedChange(
                    "visitorInfo",

                    "photographyAllowed",

                    e.target.checked,
                  )
                }
              />
              Photography Allowed
            </label>
          </div>

          {/* FESTIVALS */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Festivals</h2>

            <select
              multiple
              value={formData.festivals}
              onChange={(e) => {
                const selectedFestivals = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );

                setFormData({
                  ...formData,

                  festivals: selectedFestivals,
                });
              }}
              className="border p-4 rounded-xl w-full h-52"
            >
              {festivals.map((festival) => (
                <option key={festival._id} value={festival._id}>
                  {festival.festivalName}
                </option>
              ))}
            </select>

            <p className="text-sm text-gray-500 mt-2">
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple festivals
            </p>
          </div>

          {/* RITUALS */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Rituals</h2>

            <select
              multiple
              value={formData.rituals}
              onChange={(e) => {
                const selectedRituals = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );

                setFormData({
                  ...formData,

                  rituals: selectedRituals,
                });
              }}
              className="border p-4 rounded-xl w-full h-52"
            >
              {rituals.map((ritual) => (
                <option key={ritual._id} value={ritual._id}>
                  {ritual.ritualName}
                </option>
              ))}
            </select>

            <p className="text-sm text-gray-500 mt-2">
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple rituals
            </p>
          </div>

          {/* CIRCUITS */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Pilgrimage Circuits</h2>

            <select
              multiple
              value={formData.pilgrimageCircuits}
              onChange={(e) => {
                const selectedCircuits = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );

                setFormData({
                  ...formData,

                  pilgrimageCircuits: selectedCircuits,
                });
              }}
              className="border p-4 rounded-xl w-full h-52"
            >
              {circuits.map((circuit) => (
                <option key={circuit._id} value={circuit._id}>
                  {circuit.circuitName}
                </option>
              ))}
            </select>

            <p className="text-sm text-gray-500 mt-2">
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple circuits
            </p>
          </div>

          {/* IMAGES */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Temple Images</h2>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="border p-4 rounded-xl w-full bg-gray-50"
            />
          </div>

          {/* FEATURED */}
          <div>
            <label className="flex items-center gap-3 text-lg font-medium">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    featured: e.target.checked,
                  })
                }
              />
              Featured Temple
            </label>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-semibold transition"
          >
            {loading ? "Adding Temple..." : "Add Temple"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTemple;
