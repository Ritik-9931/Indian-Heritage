import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchDeityById,
  updateDeity,
} from "../redux/slices/deitySlice";
import { toast } from "react-toastify";

const EditDeity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deity, loading } = useSelector((state) => state.deity);

  const [formData, setFormData] = useState({
    deityName: "",
    mythology: "",
  });

  // FETCH BY ID (always fresh data)
  useEffect(() => {
    dispatch(fetchDeityById(id))
      .unwrap()
      .catch(() => toast.error("Failed to load deity"));
  }, [dispatch, id]);

  // populate form when data arrives
  useEffect(() => {
    if (deity) {
      setFormData({
        deityName: deity.deityName || "",
        mythology: deity.mythology || "",
      });
    }
  }, [deity]);

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
        updateDeity({ id, formData })
      ).unwrap();

      toast.success("Deity updated successfully!");
      navigate(-1);
    } catch (err) {
      toast.error(err || "Update failed");
    }
  };

  // 🔥 LOADING SKELETON
  if (loading && !deity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse w-full max-w-lg bg-white p-6 rounded-xl shadow">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          Edit Deity
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="deityName"
            value={formData.deityName}
            onChange={handleChange}
            placeholder="Deity Name"
            className="w-full p-2 border rounded-lg"
          />

          <textarea
            name="mythology"
            value={formData.mythology}
            onChange={handleChange}
            placeholder="Mythology"
            rows="5"
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Deity"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDeity;