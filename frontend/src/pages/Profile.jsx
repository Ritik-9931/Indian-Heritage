import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getProfile,
  removeFavoriteTemple,
  removeVisitedTemple,
} from "../redux/slices/userSlice";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const { user: userInfo, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(
      getProfile(token),
    );
  }, [dispatch, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Loading Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
          <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>

          <div className="mt-6 space-y-3 text-lg">
            <p>
              <span className="font-bold">Name:</span> {user?.name}
            </p>

            <p>
              <span className="font-bold">Email:</span> {user?.email}
            </p>
          </div>
        </div>

        {/* FAVORITE TEMPLES */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Favorite Temples
          </h2>

          {userInfo?.favoriteTemples?.length === 0 ? (
            <p className="text-gray-500">No favorite temples added</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userInfo?.favoriteTemples?.map((temple) => (
                <div
                  key={temple._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                >
                  <img
                    src={temple?.images?.[0]?.url}
                    alt={temple?.templeName}
                    className="w-full h-60 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {temple?.templeName}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {temple?.city?.cityName}, {temple?.state?.stateName}
                    </p>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => navigate(`/temple/${temple._id}`)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          dispatch(removeFavoriteTemple(temple._id))
                        }
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* VISITED TEMPLES */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Visited Temples
          </h2>

          {userInfo?.visitedTemples?.length === 0 ? (
            <p className="text-gray-500">No visited temples added</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userInfo?.visitedTemples?.map((temple) => (
                <div
                  key={temple._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                >
                  <img
                    src={temple?.images?.[0]?.url}
                    alt={temple?.templeName}
                    className="w-full h-60 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {temple?.templeName}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {temple?.city?.cityName}, {temple?.state?.stateName}
                    </p>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => navigate(`/temple/${temple._id}`)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          dispatch(removeVisitedTemple(temple._id))
                        }
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
