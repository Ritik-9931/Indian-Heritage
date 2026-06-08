// src/pages/AddCity.jsx

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchStates } from "../redux/slices/stateSlice";

import Api from "../services/Api";

const AddCity = () => {
  const dispatch = useDispatch();

  const { states = [] } = useSelector((state) => state.state);

  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    cityName: "",
    state: "",
  });

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.post("/cities", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("City Added");
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Add City</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="cityName"
          placeholder="City Name"
          value={formData.cityName}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl"
        >
          <option value="">Select State</option>

          {states.map((state) => (
            <option key={state._id} value={state._id}>
              {state.stateName}
            </option>
          ))}
        </select>

        <button className="bg-orange-500 text-white px-6 py-3 rounded-xl">
          Add City
        </button>
      </form>
    </div>
  );
};

export default AddCity;
