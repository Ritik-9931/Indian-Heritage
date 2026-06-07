// src/pages/AddCircuit.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../services/api";
import { fetchTemples } from "../redux/slices/templeSlice";

const AddCircuit = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const {
    temples = [],
    loading,
    error,
  } = useSelector((state) => state.temple);

  const [selectedTemples, setSelectedTemples] =
    useState([]);

  const [formData, setFormData] = useState({
    circuitName: "",
    duration: "",
    difficultyLevel: "",
    totalDistance: "",
  });

  useEffect(() => {
    dispatch(fetchTemples({}));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleTempleSelect = (e) => {
    const value = e.target.value;

    if (
      value &&
      !selectedTemples.includes(value)
    ) {
      setSelectedTemples([
        ...selectedTemples,
        value,
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(
        "/circuits",
        {
          ...formData,

          temples: selectedTemples,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);

      alert("Circuit Added Successfully");

      setFormData({
        circuitName: "",
        duration: "",
        difficultyLevel: "",
        totalDistance: "",
      });

      setSelectedTemples([]);
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to add circuit"
      );
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Add Circuit
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="circuitName"
            placeholder="Circuit Name"
            value={formData.circuitName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            name="difficultyLevel"
            placeholder="Difficulty Level"
            value={formData.difficultyLevel}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            name="totalDistance"
            placeholder="Total Distance"
            value={formData.totalDistance}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
          />

          <select
            onChange={handleTempleSelect}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">
              Select Temple
            </option>

            {temples?.data?.map((temple) => (
              <option
                key={temple._id}
                value={temple._id}
              >
                {temple.templeName}
              </option>
            ))}
          </select>

          {/* SELECTED TEMPLES */}
          <div className="flex flex-wrap gap-3">
            {selectedTemples.map((id) => {
              const temple = temples?.data?.find(
                (t) => t._id === id
              );

              return (
                <div
                  key={id}
                  className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {temple?.templeName}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold transition"
          >
            Add Circuit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCircuit;