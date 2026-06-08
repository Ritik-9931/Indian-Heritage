import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRitualById,
  updateRitual,
} from "../redux/slices/ritualSlice";
import { toast } from "react-toastify";

const EditRitual = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ritual, loading } = useSelector(
    (state) => state.ritual
  );

  const [formData, setFormData] = useState({
    ritualName: "",
    description: "",
    timing: "",
    importance: "",
  });

  // FETCH BY ID
  useEffect(() => {
    dispatch(fetchRitualById(id))
      .unwrap()
      .catch(() =>
        toast.error("Failed to load ritual")
      );
  }, [dispatch, id]);

  // SET FORM DATA
  useEffect(() => {
    if (ritual) {
      setFormData({
        ritualName: ritual.ritualName || "",
        description: ritual.description || "",
        timing: ritual.timing || "",
        importance: ritual.importance || "",
      });
    }
  }, [ritual]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateRitual({ id, formData })
      ).unwrap();

      toast.success("Ritual updated successfully");
      navigate(-1);
    } catch (err) {
      toast.error(err || "Update failed");
    }
  };

  // LOADING SKELETON
  if (loading && !ritual) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow animate-pulse">
          <div className="h-6 bg-gray-300 mb-4 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 mb-3 rounded"></div>
          <div className="h-24 bg-gray-200 mb-3 rounded"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          Edit Ritual
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="ritualName"
            value={formData.ritualName}
            onChange={handleChange}
            placeholder="Ritual Name"
            className="w-full p-2 border rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded-lg"
            rows="4"
          />

          <input
            type="text"
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            placeholder="Timing"
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="importance"
            value={formData.importance}
            onChange={handleChange}
            placeholder="Importance"
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Updating..." : "Update Ritual"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRitual;