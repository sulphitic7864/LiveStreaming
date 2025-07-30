// VideoSection.jsx
import React from "react";

export default function VideoSection({ video }) {
  if (!video) {
    return <div className="text-white p-4">No video data available</div>;
  }

  return (
    <div className="relative rounded-xl mb-5 overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-64 md:h-72 lg:h-80 xl:h-96"
          src={video.data.url}
          title={video.data.title || "Video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div className="p-4 bg-black">
        <h2 className="text-xl font-semibold uppercase text-white font-cinzel">
          {video.data.title || "Untitled Video"}
        </h2>
        
        <div className="flex items-center gap-3 mt-3">
          <div className="flex-shrink-0">
            {video.user?.profile_picture ? (
              <img
                src={video.data.user.profile_picture}
                alt={video.data.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
                {video.data.user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div>
            <p className="text-white font-medium">
              {video.data.user?.name || "Unknown User"}
            </p>
            <p className="text-[#9CA3AF] text-sm">
              {video.data.view_count?.toLocaleString() || "0"} views • {video.data.type || "video"}
            </p>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-[#9CA3AF] text-sm">
            {new Date(video.data.created_at).toLocaleDateString()}
          </p>
          <p className="text-[#9CA3AF] pt-2">
            {video.data.description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}