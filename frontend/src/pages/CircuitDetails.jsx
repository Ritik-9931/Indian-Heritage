import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleCircuit } from "../redux/slices/circuitSlice";
import TempleCard from "../components/TempleCard";

const CircuitDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { circuit, loading, error } = useSelector((state) => state.circuit);

  useEffect(() => {
    dispatch(fetchSingleCircuit(id));
  }, [dispatch, id]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-500 animate-pulse">
          Loading Circuit...
        </h1>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* TOP SECTION */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-10 text-white">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl transition"
            >
              ← Back
            </button>

            <h1 className="text-5xl font-extrabold mb-4">
              {circuit?.circuitName}
            </h1>

            <p className="text-orange-100 text-lg">
              Explore sacred spiritual journeys across India
            </p>
          </div>

          {/* DETAILS */}
          <div className="grid md:grid-cols-3 gap-6 p-8">
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <h3 className="text-gray-500 font-semibold mb-2">
                Difficulty Level
              </h3>

              <p className="text-2xl font-bold text-gray-800">
                {circuit?.difficultyLevel}
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <h3 className="text-gray-500 font-semibold mb-2">Duration</h3>

              <p className="text-2xl font-bold text-gray-800">
                {circuit?.duration}
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
              <h3 className="text-gray-500 font-semibold mb-2">
                Total Distance
              </h3>

              <p className="text-2xl font-bold text-gray-800">
                {circuit?.totalDistance}
              </p>
            </div>
          </div>
        </div>

        {/* TEMPLES SECTION */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Temples Included
            </h2>

            <span className="bg-orange-500 text-white px-5 py-2 rounded-full font-semibold">
              {circuit?.temples?.length || 0} Temples
            </span>
          </div>

          {/* EMPTY */}
          {circuit?.temples?.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center text-gray-500 text-xl">
              No Temples Added
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {circuit?.temples?.map((temple) => (
                <div
                  key={temple._id}
                  className="transform hover:-translate-y-2 transition duration-300"
                >
                  <TempleCard temple={temple} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircuitDetails;
