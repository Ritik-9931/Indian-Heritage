import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  fetchSingleCity,
  updateCity,
} from "../redux/slices/citySlice";

import { fetchStates } from "../redux/slices/stateSlice";

const EditCity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleCity, loading } = useSelector(
    (state) => state.city
  );

  const { states = [] } = useSelector(
    (state) => state.state
  );

  const [formData, setFormData] = useState({
    cityName: "",
    state: "",
  });

  // FETCH CITY + STATES
  useEffect(() => {
    dispatch(fetchSingleCity(id))
      .unwrap()
      .catch(() =>
        toast.error("Failed to load city")
      );

    dispatch(fetchStates());
  }, [dispatch, id]);

  // SET FORM DATA
  useEffect(() => {
    if (singleCity) {
      setFormData({
        cityName: singleCity.cityName || "",
        state: singleCity.state?._id || "",
      });
    }
  }, [singleCity]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cityName || !formData.state) {
      return toast.error("All fields are required");
    }

    try {
      await dispatch(
        updateCity({ id, formData })
      ).unwrap();

      toast.success("City updated successfully");

      navigate(-1);
    } catch (err) {
      toast.error(
        err || "Failed to update city"
      );
    }
  };

  // LOADING UI
  if (loading && !singleCity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow animate-pulse">
          <div className="h-6 bg-gray-300 mb-4 rounded"></div>
          <div className="h-10 bg-gray-200 mb-3 rounded"></div>
          <div className="h-10 bg-gray-200 mb-3 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">
          Edit City
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* CITY NAME */}
          <div>
            <label className="block mb-1 font-medium">
              City Name
            </label>
            <input
              type="text"
              name="cityName"
              value={formData.cityName}
              onChange={handleChange}
              placeholder="Enter city name"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* STATE DROPDOWN */}
          <div>
            <label className="block mb-1 font-medium">
              Select State
            </label>

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">
                Select State
              </option>

              {states.map((state) => (
                <option
                  key={state._id}
                  value={state._id}
                >
                  {state.stateName}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update City"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCity;