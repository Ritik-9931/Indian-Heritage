import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchTemples,
  deleteTemple,
} from "../redux/slices/templeSlice";

const MangTemple = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { temples = [], loading } = useSelector(
    (state) => state.temple
  );

  useEffect(() => {
    dispatch(fetchTemples({}));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Manage Temples
        </h1>

        <button
          onClick={() =>
            navigate("/admin/add-temple")
          }
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Temple
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {temples?.data?.map((t) => (
          <div
            key={t._id}
            className="bg-white p-4 rounded shadow"
          >
            <h2 className="font-bold text-lg">
              {t.templeName}
            </h2>

            <p className="text-gray-600">
              {t.city?.cityName}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() =>
                  navigate(
                    `/admin/edit-temple/${t._id}`
                  )
                }
                className="flex-1 bg-blue-500 text-white py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  dispatch(deleteTemple(t._id))
                }
                className="flex-1 bg-red-500 text-white py-1 rounded"
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

export default MangTemple;