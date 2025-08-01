// InfoSection.jsx
import React from "react";
import { FiShare2 } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import user5 from '../../public/user5.png';

export default function InfoSection({ video }) {
  // Calculate time since video was created (for "Live for Xh Xm")
  const getLiveDuration = (createdAt) => {
    if (!createdAt) return "Live for 2h 26m"; // Fallback if no date
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `Live for ${diffHours}h ${diffMinutes}m`;
  };

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl flex items-start gap-4 border border-[#FF444433] md:flex-row flex-col">
      {video?.data?.user?.profile_picture ? (
        <img
          src={video.data.user.profile_picture}
          alt={video.data.user.name}
          className="w-12 h-12 rounded-full border border-red-600 object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full border border-red-600 bg-gray-700 flex items-center justify-center text-white font-medium text-xl">
          {video?.data?.user?.name?.charAt(0) || "U"}
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white font-cinzel">
            {video?.data?.user?.name || "Streamer"}
          </h3>
          <span className="bg-[#FFB70033] text-[#FFB700] border border-[#FFB70033] px-2 py-0.5 text-xs rounded-full font-semibold">
            LEGENDARY
          </span>
        </div>
        <p className="text-sm text-gray-400">
          87.4K followers <span className="text-red-500">• </span>
          {getLiveDuration(video?.data?.created_at)}
        </p>
        <p className="text-sm mt-1 text-gray-300">
          {video?.data?.user?.description || 
           "Master of mythical realms and dragon lore. Streaming epic adventures through ancient lands and legendary quests."}
        </p>
        <div className="mt-2 flex gap-2">
          <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <FaRegHeart className="text-white" /> Follow
          </button>
          <button className="bg-yellow-500 text-black px-4 py-2 font-bold rounded-md text-sm flex items-center">
            <FaDollarSign className="text-black" /> Tip
          </button>
          <button className="bg-gray-700 px-4 py-2 font-bold rounded-md text-sm text-white flex items-center gap-1">
            <FiShare2 /> Share
          </button>
        </div>
      </div>
    </div>
  );
}