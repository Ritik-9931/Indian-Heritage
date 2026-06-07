// src/pages/AddDeity.jsx

import { useState } from "react";

import { useSelector } from "react-redux";

import api from "../services/api";



const AddDeity = () => {

  const { token } = useSelector(
    (state) => state.auth
  );



  const [formData, setFormData] =
    useState({
      deityName: "",
      description: "",
      mythology: "",
      image: "",
    });



  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post(
      "/deities",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Deity Added");
  };



  return (
    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Add Deity
      </h1>



      <form
        onSubmit={handleSubmit}

        className="space-y-5"
      >

        <input
          type="text"

          name="deityName"

          placeholder="Deity Name"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <textarea
          name="description"

          placeholder="Description"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <textarea
          name="mythology"

          placeholder="Mythology"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <input
          type="text"

          name="image"

          placeholder="Image URL"

          onChange={handleChange}

          className="w-full border p-3 rounded-xl"
        />



        <button className="bg-orange-500 text-white px-6 py-3 rounded-xl">

          Add Deity

        </button>

      </form>

    </div>
  );
};

export default AddDeity;