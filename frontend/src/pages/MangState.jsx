import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStates, deleteState } from "../redux/slices/stateSlice";
import { Search } from "lucide-react";

const MangState = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { states = [], loading } = useSelector((state) => state.state);

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  let filterState = [];

  filterState = states.filter((state) =>
    state.stateName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage States</h1>
        </div>

        <button
          onClick={() => navigate("/admin/add-state")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add State
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
      {loading && <p className="text-center">Loading...</p>}
      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filterState.map((state) => (
          <div key={state._id} className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-bold">{state.stateName}</h2>

            <p className="text-gray-600 mt-2">{state.description}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => navigate(`/admin/edit-state/${state._id}`)}
                className="flex-1 bg-blue-500 text-white py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deleteState(state._id))}
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

export default MangState;
