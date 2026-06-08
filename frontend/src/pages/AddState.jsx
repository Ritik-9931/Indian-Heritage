import { useState } from "react";

import { useSelector } from "react-redux";

import Api from "../services/Api";



const AddState = () => {

  const { token } = useSelector(
    (state) => state.auth
  );



  const [formData, setFormData] = useState({
    stateName: "",
    slug: "",
  });



  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [success, setSuccess] =
    useState(null);



  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };



  // CREATE SLUG
  const generateSlug = (text) => {

    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
  };



  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError(null);

    setSuccess(null);



    try {

      const payload = {
        stateName: formData.stateName,

        slug: generateSlug(
          formData.stateName
        ),
      };



      const response = await Api.post(
        "/states",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        stateName: "",
        slug: "",
      });

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* TITLE */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Add State
          </h1>

          <p className="text-gray-500 mt-2">
            Add Indian states for temple
            location management
          </p>

        </div>



        {/* ERROR */}
        {
          error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5">
              {error}
            </div>
          )
        }



        {/* SUCCESS */}
        {
          success && (
            <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-5">
              {success}
            </div>
          )
        }



        {/* FORM */}
        <form
          onSubmit={handleSubmit}

          className="space-y-6"
        >

          {/* STATE NAME */}
          <div>

            <label className="block mb-2 font-medium text-gray-700">
              State Name
            </label>

            <input
              type="text"

              name="stateName"

              value={formData.stateName}

              onChange={handleChange}

              placeholder="Enter state name"

              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>



          {/* BUTTON */}
          <button
            type="submit"

            disabled={loading}

            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            {
              loading
                ? "Adding State..."
                : "Add State"
            }
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddState;