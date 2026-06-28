import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRituals, deleteRitual } from "../redux/slices/ritualSlice";
import { Search } from "lucide-react";

const MangRitual = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { rituals, loading } = useSelector((state) => state.ritual);

  useEffect(() => {
    dispatch(fetchRituals());
  }, [dispatch]);

  const filterRitual = rituals.filter((ritual) =>
    ritual.ritualName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Rituals</h1>
          <p className="text-gray-500">Create, update, delete rituals</p>
        </div>

        <button
          onClick={() => navigate("/admin/add-ritual")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          + Add Ritual
        </button>
      </div>

      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search states..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filterRitual.map((ritual) => (
          <div
            key={ritual._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{ritual.ritualName}</h2>

            <p className="text-gray-600 mt-2 line-clamp-3">
              {ritual.description}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigate(`/admin/edit-ritual/${ritual._id}`)}
                className="flex-1 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deleteRitual(ritual._id))}
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

export default MangRitual;
