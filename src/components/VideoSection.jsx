import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative rounded-x mb-5 overflow-hidden">
      {!isPlaying && (
        <>
          <img
            src="https://i.ytimg.com/vi/xfIhnNPDvHs/maxresdefault.jpg"
            alt="Dragon Game Preview"
            className="w-full h-64 object-cover"
          />
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white p-5 rounded-full shadow-lg hover:scale-110 transition"
          >
            <FaPlay size={20} />
          </button>
        </>
      )}

      {isPlaying && (
        <iframe
          className="w-full h-72"
          src="https://www.youtube.com/embed/xfIhnNPDvHs?autoplay=1&rel=0"
          title="Dragon Game"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}

      <div className="p-4 bg-black">
        <h2 className="text-xl font-semibold uppercase text-white font-cinzel">
         Epic Dragon Quest: The Mythical Realms
        </h2>
        <p className="text-[#9CA3AF] pt-2 font-normal ">
         Join the legendary adventure through ancient dragon territories and mystical lands
        </p>
      </div>
    </div>
  );
}
