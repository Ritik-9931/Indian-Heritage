// src/pages/TempleDetails.jsx

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import TempleMap from "../components/TempleMap";

import {
  MapPin,
  Clock,
  Camera,
  Landmark,
  Star,
  ArrowLeft,
  Heart,
  CheckCircle,
} from "lucide-react";

import {
  fetchTempleById,
  addTempleReview,
  deleteTempleReview,
} from "../redux/slices/templeSlice";

import {
  addFavoriteTemple,
  removeFavoriteTemple,
  addVisitedTemple,
  removeVisitedTemple,
  getProfile,
} from "../redux/slices/userSlice";

const TempleDetails = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { temple, loading, error } = useSelector((state) => state.temple);

  const { token } = useSelector((state) => state.auth);

  const { user: userInfo } = useSelector((state) => state.user);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTempleById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  const isFavorite = userInfo?.favoriteTemples?.some(
    (fav) => fav._id === temple?._id,
  );

  const isVisited = userInfo?.visitedTemples?.some(
    (visit) => visit._id === temple?._id,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold bg-orange-50">
        Loading Temple...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl font-bold">
        {error}
      </div>
    );
  }

  const handleReviewSubmit = async () => {
    try {
      await dispatch(addTempleReview({ id, rating, comment })).unwrap();

      toast.success("Review added successFully");
      setComment("");
      setRating(5);
    } catch (error) {
      toast.error("Failed to add review");
    }
  };

  console.log(temple);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 bg-white px-5 py-3 rounded-2xl shadow hover:bg-orange-50 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* HERO SECTION */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* IMAGE */}
            <div className="h-full">
              <img
                src={
                  temple?.images?.[0]?.url ||
                  "https://via.placeholder.com/800x500"
                }
                alt={temple?.templeName}
                className="w-full h-full object-cover lg:min-h-[550px]"
              />
            </div>

            {/* DETAILS */}
            <div className="p-8">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    {temple?.templeName}
                  </h1>

                  {temple?.featured && (
                    <span className="inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured Temple
                    </span>
                  )}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 flex-wrap">
                  {/* FAVORITE */}
                  <button
                    onClick={() => {
                      if (isFavorite) {
                        dispatch(removeFavoriteTemple(temple._id));
                      } else {
                        dispatch(addFavoriteTemple(temple._id));
                      }
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition ${
                      isFavorite
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  >
                    <Heart size={18} />

                    {isFavorite ? "Remove Favorite" : "Add Favorite"}
                  </button>

                  {/* VISITED */}
                  <button
                    onClick={() => {
                      if (isVisited) {
                        dispatch(removeVisitedTemple(temple._id));
                      } else {
                        dispatch(addVisitedTemple(temple._id));
                      }
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition ${
                      isVisited
                        ? "bg-gray-900 hover:bg-black text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    <CheckCircle size={18} />

                    {isVisited ? "Remove Visited" : "Mark Visited"}
                  </button>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="text-orange-500" />

                  <span>{temple?.address}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Landmark className="text-orange-500" />

                  <span>
                    {temple?.city?.cityName}, {temple?.state?.stateName}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Star className="text-orange-500" />

                  <span>
                    Deity:
                    <strong className="ml-2">{temple?.deity?.deityName}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="text-orange-500" />

                  <span>Morning: {temple?.darshanTimings?.morning}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="text-orange-500" />

                  <span>Evening: {temple?.darshanTimings?.evening}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Camera className="text-orange-500" />

                  <span>
                    Photography:{" "}
                    {temple?.visitorInfo?.photographyAllowed
                      ? "Allowed"
                      : "Not Allowed"}
                  </span>
                </div>
              </div>

              {/* LOCATION */}
              <div className="mt-8 bg-orange-50 rounded-2xl p-5">
                <h2 className="text-xl font-bold mb-4">Location Coordinates</h2>

                <p>Latitude: {temple?.location?.latitude}</p>

                <p>Longitude: {temple?.location?.longitude}</p>
              </div>

              {temple?.location?.latitude && temple?.location?.longitude ? (
                <TempleMap
                  latitude={Number(temple.location.latitude)}
                  longitude={Number(temple.location.longitude)}
                />
              ) : (
                <div className="p-6 bg-orange-50 rounded-xl">
                  Location coordinates not available
                </div>
              )}

              {/* RATINGS */}
              <div className="mt-6 flex items-center gap-4">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold">
                  ⭐ {temple?.ratings?.average || 0}
                </div>

                <div className="text-gray-600">
                  {temple?.ratings?.totalReviews || 0} Reviews
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* HISTORY */}
            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-3xl font-bold mb-5 text-gray-800">History</h2>

              <p className="text-gray-700 leading-8">{temple?.history}</p>
            </div>

            {/* SIGNIFICANCE */}
            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-3xl font-bold mb-5 text-gray-800">
                Significance
              </h2>

              <p className="text-gray-700 leading-8">{temple?.significance}</p>
            </div>

            {/* ARCHITECTURE */}
            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-3xl font-bold mb-5 text-gray-800">
                Architecture
              </h2>

              <p className="text-gray-700 leading-8">{temple?.architecture}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* FESTIVALS */}
            <div className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-2xl font-bold mb-5">Festivals</h2>

              <div className="flex flex-wrap gap-3">
                {temple?.festivals?.map((festival) => (
                  <span
                    key={festival._id}
                    className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {festival?.festivalName}
                  </span>
                ))}
              </div>
            </div>

            {/* RITUALS */}
            <div className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-2xl font-bold mb-5">Rituals</h2>

              <div className="flex flex-wrap gap-3">
                {temple?.rituals?.map((ritual) => (
                  <span
                    key={ritual._id}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {ritual?.ritualName}
                  </span>
                ))}
              </div>
            </div>

            {/* CIRCUITS */}
            <div className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-2xl font-bold mb-5">Pilgrimage Circuits</h2>

              <div className="flex flex-wrap gap-3">
                {temple?.pilgrimageCircuits?.map((circuit) => (
                  <span
                    key={circuit._id}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {circuit?.circuitName}
                  </span>
                ))}
              </div>
            </div>

            {/* VISITOR INFO */}
            <div className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-2xl font-bold mb-5">Visitor Info</h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <strong>Dress Code:</strong>{" "}
                  {temple?.visitorInfo?.dressCode || "N/A"}
                </div>

                <div>
                  <strong>Entry Fee:</strong>{" "}
                  {temple?.visitorInfo?.entryFee || "Free"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY */}
        <div className="bg-white rounded-3xl shadow p-8 mt-10">
          <h2 className="text-3xl font-bold mb-8">Temple Gallery</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {temple?.images?.map((image, index) => (
              <img
                key={index}
                src={image?.url}
                alt={`Temple ${index}`}
                className="w-full h-60 object-cover rounded-2xl hover:scale-105 transition duration-300"
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 mt-10">
          <h2 className="text-3xl font-bold mb-6">Add Review</h2>

          <div className="space-y-5">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border p-3 rounded-xl"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border p-4 rounded-xl h-32"
            />

            <button
              onClick={handleReviewSubmit}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Submit Review
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 mt-10">
          <h2 className="text-3xl font-bold mb-6">Reviews</h2>

          <div className="space-y-6">
            {temple?.reviews?.length > 0 ? (
              temple.reviews.map((review) => (
                <div key={review._id} className="border-b pb-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">
                        {review.user?.name || "Anonymous"}
                      </h3>

                      <p className="text-yellow-500">⭐ {review.rating}</p>
                    </div>

                    <p className="text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="mt-3 text-gray-700">{review.comment}</p>

                  {(review.user?._id === user?._id ||
                    user?.role === "admin") && (
                    <button
                      onClick={() =>
                        dispatch(
                          deleteTempleReview({
                            id,
                            reviewId: review._id,
                          }),
                        )
                      }
                      className="mt-3 text-red-500 hover:text-red-700 font-semibold"
                    >
                      Delete Review
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetails;
