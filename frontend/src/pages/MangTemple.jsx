import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { fetchTemples, deleteTemple } from "../redux/slices/templeSlice";

import { MapPin, Pencil, Trash2, Plus, Landmark } from "lucide-react";

import { Search } from "lucide-react";

const MangTemple = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { temples = [], loading } = useSelector((state) => state.temple);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTemples({}));
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this temple?");

    if (confirmDelete) {
      dispatch(deleteTemple(id));
    }
  };

  let filterTemple = [];

  filterTemple = temples?.data?.filter((temple) =>
    temple.templeName.toLowerCase().includes(search.toLowerCase()),
  );
  
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Temple Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all temples from one place
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-temple")}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Add Temple
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

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* EMPTY */}
      {!loading && temples?.data?.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <Landmark size={60} className="mx-auto text-gray-400" />

          <h2 className="mt-4 text-xl font-semibold">No Temples Found</h2>

          <p className="text-gray-500">Add your first temple.</p>
        </div>
      )}

      {/* TEMPLE GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterTemple?.map((temple) => (
          <div
            key={temple._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            {/* IMAGE */}
            <img
              src={temple.images?.[0]?.url || "https://placehold.co/600x400"}
              alt={temple.templeName}
              className="h-52 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">
              <h2 className="font-bold text-xl text-slate-800 mb-2">
                {temple.templeName}
              </h2>

              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin size={16} className="mr-1" />
                {temple.city?.cityName}, {temple.state?.stateName}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs">
                  {temple.deity?.deityName}
                </span>

                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  {temple?.visitorInfo?.entryFee > 0
                    ? temple?.visitorInfo?.entryFee
                    : "Free Entry"}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/admin/edit-temple/${temple._id}`)}
                  className="flex-1 flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(temple._id)}
                  className="flex-1 flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangTemple;
