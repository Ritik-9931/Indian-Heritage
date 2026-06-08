import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchTemples } from "../redux/slices/templeSlice";
import { fetchSingleCircuit } from "../redux/slices/circuitSlice";
import Api from "../services/Api";

const EditCircuit = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const { temples = [] } = useSelector((state) => state.temple);

  const { circuit, loading } = useSelector((state) => state.circuit);

  const [selectedTemples, setSelectedTemples] = useState([]);

  const [formData, setFormData] = useState({
    circuitName: "",
    duration: "",
    difficultyLevel: "",
    totalDistance: "",
  });

  useEffect(() => {
    dispatch(fetchTemples({}));
    dispatch(fetchSingleCircuit(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (circuit) {
      setFormData({
        circuitName: circuit.circuitName || "",
        duration: circuit.duration || "",
        difficultyLevel: circuit.difficultyLevel || "",
        totalDistance: circuit.totalDistance || "",
      });

      setSelectedTemples(circuit.temples?.map((temple) => temple._id) || []);
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
      await Api.put(
        `/circuits/${id}`,
        {
          ...formData,
          temples: selectedTemples,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Circuit Updated Successfully");

      navigate("/admin/circuits");
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Failed to update circuit");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading... </div>;
  }

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      {" "}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        {" "}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Edit Circuit{" "}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="circuitName"
            placeholder="Circuit Name"
            value={formData.circuitName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl"
          />

          <input
            type="text"
            name="difficultyLevel"
            placeholder="Difficulty Level"
            value={formData.difficultyLevel}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl"
          />

          <input
            type="text"
            name="totalDistance"
            placeholder="Total Distance"
            value={formData.totalDistance}
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-2xl"
          />

          <select
            onChange={handleTempleSelect}
            className="w-full border border-gray-300 p-4 rounded-2xl"
          >
            <option value="">Select Temple</option>

            {temples?.data?.map((temple) => (
              <option key={temple._id} value={temple._id}>
                {temple.templeName}
              </option>
            ))}
          </select>

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
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Update Circuit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCircuit;
