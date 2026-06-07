import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFestivals } from "../redux/slices/festivalSlice";

const Festivals = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    festivals = [],
    loading,
    error,
  } = useSelector((state) => state.festival);

  useEffect(() => {
    dispatch(fetchFestivals());
  }, [dispatch]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-500 animate-pulse">
          Loading Festivals...
        </h1>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <h1 className="text-2xl font-bold text-red-500">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
            Temple Festivals
          </h1>

          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Explore sacred Hindu festivals celebrated across
            temples in India.
          </p>
        </div>

        {/* EMPTY */}
        {festivals.length === 0 ? (
          <div className="text-center text-2xl text-gray-500 font-semibold">
            No Festivals Found
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {festivals.map((festival) => (
              <div
                key={festival._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-orange-100"
              >
                {/* TOP */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                  <h2 className="text-3xl font-bold">
                    {festival?.festivalName}
                  </h2>

                  <p className="mt-3 text-orange-100 text-sm">
                    Sacred Celebration
                  </p>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-5">
                  {/* DATES */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-semibold text-gray-700">
                        Start Date
                      </span>

                      <span className="text-gray-600 text-sm">
                        {festival?.startDate
                          ? new Date(
                              festival.startDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-semibold text-gray-700">
                        End Date
                      </span>

                      <span className="text-gray-600 text-sm">
                        {festival?.endDate
                          ? new Date(
                              festival.endDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      navigate(
                        `/festivalDetails/${festival._id}`
                      )
                    }
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition duration-300"
                  >
                    View Festival Details
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

export default Festivals;