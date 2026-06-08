import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCity,
  fetchCities,
} from "../redux/slices/citySlice";

const MangCity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cities=[], loading } = useSelector(
    (state) => state.city
  );

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Manage Cities
          </h1>
          <p className="text-gray-500">
            Add, edit and delete cities
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/admin/add-city")
          }
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + Add City
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-600">
          Loading...
        </p>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cities.map((city) => (
          <div
            key={city._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">
              {city.cityName}
            </h2>

            <p className="text-gray-600 mt-1">
              State:{" "}
              {city.state?.stateName}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() =>
                  navigate(
                    `/admin/edit-city/${city._id}`
                  )
                }
                className="flex-1 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  dispatch(deleteCity(city._id))
                }
                className="flex-1 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangCity;