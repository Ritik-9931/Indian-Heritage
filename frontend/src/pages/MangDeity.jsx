import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteDeity, fetchDeities } from "../redux/slices/deitySlice";

const MangDeity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deities, loading } = useSelector((state) => state.deity);

  useEffect(() => {
    dispatch(fetchDeities());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Deities</h1>
          <p className="mt-1 text-gray-500">
            View, manage and delete deity records
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-deity")}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
        >
          + Add Deity
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-lg font-medium text-gray-600">
          Loading...
        </div>
      )}

      {/* Empty State */}
      {!loading && deities.length === 0 && (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-xl font-semibold text-gray-700">
            No Deities Found
          </h2>
          <p className="mt-2 text-gray-500">
            Start by adding your first deity.
          </p>
        </div>
      )}

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deities.map((deity) => (
          <div
            key={deity._id}
            className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-xl"
          >
            <h2 className="mb-2 text-xl font-bold text-gray-800">
              {deity.deityName}
            </h2>

            <p className="mb-4 line-clamp-3 text-gray-600">{deity.mythology}</p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/edit-deity/${deity._id}`)}
                className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deleteDeity(deity._id))}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
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

export default MangDeity;
