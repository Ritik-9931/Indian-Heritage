import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Eye,
  Landmark,
} from "lucide-react";

const TempleCard = ({ temple }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/temple/${temple._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 cursor-pointer group"
    >
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={
            temple?.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop"
          }
          alt={temple.templeName}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* FEATURED */}
        {temple.featured && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Featured
          </div>
        )}

        {/* RATING */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow">
          <Star
            size={16}
            className="text-yellow-500 fill-yellow-500"
          />

          <span className="text-sm font-semibold">
            {temple?.ratings?.average || 0}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        {/* TITLE */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 line-clamp-1">
            {temple.templeName}
          </h2>

          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin size={18} />

            <p className="text-sm">
              {temple?.city?.cityName},{" "}
              {temple?.state?.stateName}
            </p>
          </div>
        </div>

        {/* DEITY */}
        <div className="flex items-center gap-2 text-orange-600">
          <Landmark size={18} />

          <p className="font-medium">
            {temple?.deity?.deityName}
          </p>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {temple.significance ||
            temple.history ||
            "Explore the spiritual beauty and cultural heritage of this sacred temple."}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-3">
          <div className="text-sm text-gray-500">
            {temple?.festivals?.length || 0} Festivals
          </div>

          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition">
            <Eye size={18} />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TempleCard;