import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCircuits,
  deleteCircuit,
} from "../redux/slices/circuitSlice";

import { useNavigate } from "react-router-dom";

import {
  Route,
  Plus,
  Pencil,
  Trash2,
  Map,
  Mountain,
  Clock,
  Landmark,
} from "lucide-react";

const MangCircuit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    circuits,
    loading,
  } = useSelector(
    (state) => state.circuit
  );

  useEffect(() => {
    dispatch(fetchCircuits());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (
      window.confirm(
        "Delete this circuit?"
      )
    ) {
      dispatch(deleteCircuit(id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Pilgrimage Circuits
          </h1>

          <p className="text-slate-500 mt-1">
            Manage pilgrimage routes and
            temple circuits
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              "/admin/add-circuit"
            )
          }
          className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Add Circuit
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        circuits?.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <Route
              size={60}
              className="mx-auto text-gray-400"
            />

            <h2 className="text-2xl font-semibold mt-4">
              No Circuits Found
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first
              pilgrimage circuit.
            </p>
          </div>
        )}

      {/* Circuit Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circuits?.map(
          (circuit) => (
            <div
              key={circuit._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5">
                <h2 className="text-white text-xl font-bold">
                  {
                    circuit.circuitName
                  }
                </h2>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock
                      size={18}
                    />
                    <span>
                      {
                        circuit.duration
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Mountain
                      size={18}
                    />
                    <span>
                      {
                        circuit.difficultyLevel
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Map size={18} />
                    <span>
                      {
                        circuit.totalDistance
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Landmark
                      size={18}
                    />

                    <span>
                      {
                        circuit
                          .temples
                          ?.length
                      }{" "}
                      Temples
                    </span>
                  </div>
                </div>

                {/* Temple Names */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {circuit.temples?.map(
                    (temple) => (
                      <span
                        key={
                          temple._id
                        }
                        className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
                      >
                        {
                          temple.templeName
                        }
                      </span>
                    )
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/circuits/edit/${circuit._id}`
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                  >
                    <Pencil
                      size={16}
                    />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteHandler(
                        circuit._id
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                  >
                    <Trash2
                      size={16}
                    />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MangCircuit;