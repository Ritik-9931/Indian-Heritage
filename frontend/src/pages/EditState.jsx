import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleState,
  updateState,
} from "../redux/slices/stateSlice";
import { toast } from "react-toastify";

const EditState = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleState, loading } = useSelector(
    (state) => state.state
  );

  const [formData, setFormData] = useState({
    stateName: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchSingleState(id))
      .unwrap()
      .catch(() =>
        toast.error("Failed to load state")
      );
  }, [dispatch, id]);

  useEffect(() => {
    if (singleState) {
      setFormData({
        stateName: singleState.stateName || "",
        description: singleState.description || "",
      });
    }
  }, [singleState]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateState({ id, formData })
      ).unwrap();

      toast.success("State updated successfully");
      navigate("/admin/states");
    } catch (err) {
      toast.error(err || "Update failed");
    }
  };

  if (loading && !singleState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          Edit State
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="stateName"
            value={formData.stateName}
            onChange={handleChange}
            className="w-full p-2 border mb-3"
            placeholder="State Name"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border mb-3"
            placeholder="Description"
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded">
            {loading
              ? "Updating..."
              : "Update State"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditState;