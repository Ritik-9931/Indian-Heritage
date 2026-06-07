import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleFestival } from "../redux/slices/festivalSlice";
import { useNavigate, useParams } from "react-router-dom";

const FestivalDetails = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    festival,
    loading,
    error,
  } = useSelector((state) => state.festival);

  useEffect(() => {
    dispatch(fetchSingleFestival(id));
  }, [dispatch, id]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-500 animate-pulse">
          Loading Festival...
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* TOP CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* HEADER */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-10">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl transition"
            >
              ← Back
            </button>

            <h1 className="text-5xl font-extrabold">
              {festival?.festivalName}
            </h1>

            <p className="mt-4 text-orange-100 text-lg">
              Sacred Hindu Festival Celebration
            </p>
          </div>

          {/* BODY */}
          <div className="p-8 space-y-10">
            {/* DATES */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                <h3 className="text-gray-500 font-semibold mb-2">
                  Start Date
                </h3>

                <p className="text-2xl font-bold text-gray-800">
                  {festival?.startDate
                    ? new Date(
                        festival.startDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                <h3 className="text-gray-500 font-semibold mb-2">
                  End Date
                </h3>

                <p className="text-2xl font-bold text-gray-800">
                  {festival?.endDate
                    ? new Date(
                        festival.endDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white border border-orange-100 rounded-3xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-800 mb-5">
                Festival Description
              </h2>

              <p className="text-gray-600 leading-8 text-lg">
                {festival?.description}
              </p>
            </div>

            {/* SIGNIFICANCE */}
            <div className="bg-white border border-orange-100 rounded-3xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-800 mb-5">
                Spiritual Significance
              </h2>

              <p className="text-gray-600 leading-8 text-lg">
                {festival?.significance}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-semibold transition duration-300"
              >
                Back to Festivals
              </button>

              <button
                onClick={() => navigate("/Temples")}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition duration-300"
              >
                Explore Temples
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalDetails;