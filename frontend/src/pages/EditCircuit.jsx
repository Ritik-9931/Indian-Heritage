import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchSingleCircuit,
  updateCircuit,
} from "../redux/slices/circuitSlice";

import { fetchTemples } from "../redux/slices/templeSlice";

const EditCircuit = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { circuit, loading, error } = useSelector((state) => state.circuit);

  const { temples = [] } = useSelector((state) => state.temple);

  const [selectedTemples, setSelectedTemples] = useState([]);

  const [formData, setFormData] = useState({
    circuitName: "",
    duration: "",
    difficultyLevel: "",
    totalDistance: "",
  });

  useEffect(() => {
    dispatch(fetchSingleCircuit(id));
    dispatch(fetchTemples({}));
  }, [dispatch, id]);

  useEffect(() => {
    if (circuit) {
      setFormData({
        circuitName: circuit.circuitName || "",
        duration: circuit.duration || "",
        difficultyLevel: circuit.difficultyLevel || "",
        totalDistance: circuit.totalDistance || "",
      });

      setSelectedTemples(
        circuit.temples?.map((temple) => temple._id || temple) || [],
      );
    }
  }, [circuit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTempleSelect = (e) => {
    const value = e.target.value;

    if (value && !selectedTemples.includes(value)) {
      setSelectedTemples([...selectedTemples, value]);
    }
  };

  const removeTemple = (id) => {
    setSelectedTemples(selectedTemples.filter((item) => item !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateCircuit({
          id,
          circuitData: {
            ...formData,
            temples: selectedTemples,
          },
        }),
      ).unwrap();

      alert("Circuit updated successfully");

      navigate("/circuits");
    } catch (err) {
      alert(err || "Failed to update circuit");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      {" "}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {" "}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Edit Circuit{" "}
        </h1>
        {loading && (
          <div className="text-center py-4 text-orange-600 font-medium">
            Loading...
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Circuit Name
            </label>

            <input
              type="text"
              name="circuitName"
              value={formData.circuitName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Duration
            </label>

            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Difficulty Level
            </label>

            <input
              type="text"
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Total Distance
            </label>

            <input
              type="text"
              name="totalDistance"
              value={formData.totalDistance}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Add Temples
            </label>

            <select
              onChange={handleTempleSelect}
              className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Temple</option>

              {temples?.data?.map((temple) => (
                <option key={temple._id} value={temple._id}>
                  {temple.templeName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            {selectedTemples.map((id) => {
              const temple = temples?.data?.find((t) => t._id === id);

              return (
                <div
                  key={id}
                  className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <span>{temple?.templeName}</span>

                  <button
                    type="button"
                    onClick={() => removeTemple(id)}
                    className="text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
          >
            {loading ? "Updating..." : "Update Circuit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCircuit;
