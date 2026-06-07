import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCircuits } from "../redux/slices/circuitSlice";

const Circuits = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    circuits = [],
    loading,
    error,
  } = useSelector((state) => state.circuit);

  useEffect(() => {
    dispatch(fetchCircuits());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h1 className="text-3xl font-bold text-orange-500 mt-6">
            Loading Circuits...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Something Went Wrong
          </h1>

          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Sacred Pilgrimage Circuits
          </h1>

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
            Experience spiritual journeys connecting India's
            most divine temples and holy destinations.
          </p>
        </div>

        {/* EMPTY */}
        {circuits.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-14 text-center">
            <h2 className="text-3xl font-bold text-gray-700">
              No Circuits Found
            </h2>

            <p className="text-gray-500 mt-3">
              Please add pilgrimage circuits first.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {circuits.map((circuit) => (
              <div
                key={circuit._id}
                className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100 hover:-translate-y-2"
              >
                {/* HEADER */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-7 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>

                  <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold leading-snug">
                      {circuit?.circuitName}
                    </h2>

                    <div className="mt-4 inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">
                      {circuit?.difficultyLevel}
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-7">
                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-orange-50 rounded-2xl p-4 text-center border border-orange-100">
                      <h3 className="text-sm text-gray-500 font-medium">
                        Duration
                      </h3>

                      <p className="text-xl font-bold text-orange-600 mt-2">
                        {circuit?.duration}
                      </p>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-4 text-center border border-orange-100">
                      <h3 className="text-sm text-gray-500 font-medium">
                        Distance
                      </h3>

                      <p className="text-xl font-bold text-orange-600 mt-2">
                        {circuit?.totalDistance}
                      </p>
                    </div>
                  </div>

                  {/* TEMPLES */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        Included Temples
                      </h3>

                      <span className="bg-orange-100 text-orange-600 text-sm font-bold px-3 py-1 rounded-full">
                        {circuit?.temples?.length || 0}
                      </span>
                    </div>

                    <div className="space-y-3 max-h-52 overflow-y-auto pr-2">
                      {circuit?.temples?.slice(0,2).map((temple) => (
                        <div
                          key={temple._id}
                          className="flex items-center justify-between bg-gray-50 hover:bg-orange-50 transition p-4 rounded-2xl border border-gray-100"
                        >
                          <div>
                            <h4 className="font-semibold text-gray-700">
                              {temple?.templeName}
                            </h4>
                          </div>

                          <button
                            onClick={() =>
                              navigate(`/Temple/${temple._id}`)
                            }
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                          >
                            Visit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      navigate(
                        `/circuitDetails/${circuit._id}`
                      )
                    }
                    className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold tracking-wide transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    View Full Circuit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Circuits;