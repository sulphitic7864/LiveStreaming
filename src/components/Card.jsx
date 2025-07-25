import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { IoWifiSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Card() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const navigate = useNavigate();

  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  const fetchVideos = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos?page=${page}&per_page=6`,
        {
          method: "GET",
          headers: headers,
          credentials: "include",
          mode: "cors",
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          throw new Error("Unauthorized");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && data.data.data && data.data.data.length > 0) {
        const cleanVideos = data.data.data.map((video, index) => ({
          ...video,
          id: video.id || `fallback-${index}`,
          thumbnail: video.thumbnail && isValidUrl(video.thumbnail) ? video.thumbnail : null,
        }));
        setVideos((prev) => [...prev, ...cleanVideos]);
        setPage((prev) => prev + 1);
        setHasMore(data.data.current_page < data.data.last_page);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  const lastVideoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchVideos();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mt-5 mb-6">
        <h2 className="text-white font-normal md:text-2xl text-xl capitalize">
          Live Channels
        </h2>
        <div className="flex items-center gap-2">
          <h2 className="text-white font-normal text-base capitalize">
            Popular
          </h2>
          <RiArrowDropDownLine className="text-white text-2xl" />
        </div>
      </div>

      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {videos.map((video, index) => (
          <div
            ref={videos.length === index + 1 ? lastVideoRef : null}
            key={`${video.id}-${index}`}
            className="bg-[#89898938] clip-polygon overflow-hidden shadow-md relative pb-4"
            style={{ boxShadow: "inset 0 0 10px #6C5CD380" }}
            onClick={() => handleVideoClick(video.id)}
          >
            <div className="w-full h-[280px] relative clip-polygon">
              <img
                src={isValidUrl(video.thumbnail) ? video.thumbnail : "/card1.png"}
                alt={video.title}
                className="w-full h-full object-cover rounded-t-[20px]"
                onError={(e) => {
                  e.target.src = "/card1.png";
                }}
              />
            </div>
            <div className="p-4 text-white space-y-3">
              <h3 className="md:text-2xl text-xl font-semibold mb-2">
                {video.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  {video.user?.avatar ? (
                    <img
                      src={video.user.avatar}
                      alt={video.user.name}
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-white text-sm" />
                  )}
                </div>
                <div>
                  <p className="text-sm">{video.user?.name || "Unknown"}</p>
                  <h2 className="text-xs text-white/50">
                    {video.game || "Live Stream"}
                  </h2>
                </div>
                <FaCheckCircle className="text-green-500 text-base -mt-3" />
              </div>
              <div className="flex items-center gap-6">
                <button className="flex items-center bg-[#E85B5B] gap-2 px-4 rounded-2xl py-1 text-center justify-center">
                  <IoWifiSharp />
                  Live
                </button>
                <p className="text-sm text-gray-400">
                  {video.view_count?.toLocaleString() || "0"} watching
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-white text-center py-4">Loading more videos...</div>
      )}

      {!hasMore && (
        <div className="text-white/50 text-center py-4">
          No more videos to load
        </div>
      )}

      <style>
        {`
          .clip-polygon {
            clip-path: polygon(18% 0, 100% 0, 100% 81%, 83% 100%, 0 99%, 0 23%);
          }
        `}
      </style>
    </>
  );
}

export default Card;