import { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  createRitual,
} from "../redux/slices/ritualSlice";

const AddRitual = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.ritual
  );

  const [formData, setFormData] =
    useState({
      ritualName: "",
      description: "",
      timing: "",
      significance: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    // VALIDATION
    if (
      !formData.ritualName ||
      !formData.description ||
      !formData.timing ||
      !formData.significance
    ) {
      return alert(
        "Please fill all fields"
      );
    }

    try {
      await dispatch(
        createRitual(formData)
      ).unwrap();

      alert(
        "Ritual Added Successfully"
      );

      setFormData({
        ritualName: "",
        description: "",
        timing: "",
        significance: "",
      });
    } catch (error) {
      alert(
        error ||
          "Failed to add ritual"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold mb-10">
          Add Ritual
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* NAME */}
          <div>
            <label className="block mb-2 font-medium">
              Ritual Name
            </label>

            <input
              type="text"
              name="ritualName"
              value={
                formData.ritualName
              }
              onChange={
                handleChange
              }
              placeholder="Enter ritual name"
              className="w-full border p-4 rounded-xl"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              placeholder="Ritual description"
              className="w-full border p-4 rounded-xl h-36"
            />
          </div>

          {/* TIMING */}
          <div>
            <label className="block mb-2 font-medium">
              Ritual Timing
            </label>

            <input
              type="text"
              name="timing"
              value={
                formData.timing
              }
              onChange={
                handleChange
              }
              placeholder="Morning / Evening"
              className="w-full border p-4 rounded-xl"
            />
          </div>

          {/* SIGNIFICANCE */}
          <div>
            <label className="block mb-2 font-medium">
              Spiritual Significance
            </label>

            <textarea
              name="significance"
              value={
                formData.significance
              }
              onChange={
                handleChange
              }
              placeholder="Importance of ritual"
              className="w-full border p-4 rounded-xl h-32"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold disabled:opacity-50"
          >
            {loading
              ? "Adding..."
              : "Add Ritual"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRitual;