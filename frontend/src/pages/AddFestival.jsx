// src/pages/AddFestival.jsx

import { useState } from "react";

import { useSelector } from "react-redux";

import Api from "../services/Api";



const AddFestival = () => {

  const { token } = useSelector(
    (state) => state.auth
  );



  const [formData, setFormData] =
    useState({
      festivalName: "",
      description: "",
      startDate: "",
      endDate: "",
      significance: "",
    });



  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.post(
      "/festivals",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Festival Added");
  };



  return (
    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Add Festival
      </h1>



      <form
        onSubmit={handleSubmit}

        className="space-y-5"
      >

        <input
          type="text"

          name="festivalName"

          placeholder="Festival Name"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <textarea
          name="description"

          placeholder="Description"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <input
          type="date"

          name="startDate"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <input
          type="date"

          name="endDate"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <textarea
          name="significance"

          placeholder="Significance"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <button className="bg-orange-500 text-white px-6 py-3 rounded-xl">

          Add Festival

        </button>

      </form>

    </div>
  );
};

export default AddFestival;