import React, { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  deleteFestival,
  fetchFestivals,
} from "../redux/slices/festivalSlice";

import {
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const MangFestival = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { festivals = [] } =
    useSelector(
      (state) => state.festival
    );

  useEffect(() => {
    dispatch(fetchFestivals());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this festival?"
      )
    ) {
      dispatch(deleteFestival(id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Festival Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage religious and cultural festivals
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              "/admin/add-festival"
            )
          }
          className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Add Festival
        </button>
      </div>

      {/* Empty State */}
      {festivals.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Sparkles
            size={60}
            className="mx-auto text-gray-400"
          />

          <h2 className="text-2xl font-semibold mt-4">
            No Festivals Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first festival.
          </p>
        </div>
      )}

      {/* Festival Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map((festival) => (
          <div
            key={festival._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5">
              <h2 className="text-white text-xl font-bold">
                {festival.festivalName}
              </h2>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-gray-600 text-sm line-clamp-3">
                {festival.description}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <CalendarDays size={16} />

                  <span>
                    Start:{" "}
                    {new Date(
                      festival.startDate
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <CalendarDays size={16} />

                  <span>
                    End:{" "}
                    {new Date(
                      festival.endDate
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-block bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                  {festival.significance}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    navigate(
                      `/admin/festivals/edit/${festival._id}`
                    )
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      festival._id
                    )
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
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

export default MangFestival;