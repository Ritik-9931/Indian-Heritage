import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchTemples } from "../redux/slices/templeSlice";
import Api from "../services/Api";

const AddCircuit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { temples = [] } = useSelector((state) => state.temple);

  const [selectedTemples, setSelectedTemples] = useState([]);

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

    if (value && !selectedTemples.includes(value)) {
      setSelectedTemples([...selectedTemples, value]);
    }

    e.target.value = "";
  };

  const removeTemple = (id) => {
    setSelectedTemples(
      selectedTemples.filter((item) => item !== id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.circuitName.trim()) {
      return alert("Circuit name is required");
    }

    if (selectedTemples.length === 0) {
      return alert("Please select at least one temple");
    }

    try {
      await Api.post(
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

      alert("Circuit Created Successfully");

      navigate(-1);
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to create circuit"
      );
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
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
            className="w-full border border-gray-300 rounded-2xl p-4"
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl p-4"
          />

          <input
            type="text"
            name="difficultyLevel"
            placeholder="Difficulty Level"
            value={formData.difficultyLevel}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl p-4"
          />

          <input
            type="text"
            name="totalDistance"
            placeholder="Total Distance"
            value={formData.totalDistance}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-2xl p-4"
          />

          <select
            onChange={handleTempleSelect}
            className="w-full border border-gray-300 rounded-2xl p-4"
            defaultValue=""
          >
            <option value="">Select Temple</option>

            {temples?.data?.map((temple) => (
              <option
                key={temple._id}
                value={temple._id}
              >
                {temple.templeName}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-3">
            {selectedTemples.map((id) => {
              const temple = temples?.data?.find(
                (t) => t._id === id
              );

              return (
                <div
                  key={id}
                  className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full"
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
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Create Circuit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCircuit;