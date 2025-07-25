import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { IoWifiSharp } from "react-icons/io5";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
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
          `${import.meta.env.VITE_BACKEND_URL}/api/videos/${id}`,
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

        if (data.success && data.data) {
          setVideo(data.data);
        } else {
          setError(data.message || "Failed to load video");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center py-8">
        Loading video details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center py-8">
        Error: {error}
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-white text-center py-8">
        Video not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-white mb-6 hover:text-gray-300 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Back to videos
      </button>

      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
        {/* Video Player */}
        <div className="w-full h-0 pb-[56.25%] relative">
          {isValidUrl(video.url) ? (
            <iframe
              src={video.url}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            ></iframe>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center">
              <img 
                src={video.thumbnail || "/default-thumbnail.jpg"} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <p className="text-white text-lg">Video URL is invalid or not available</p>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  {video.user?.profile_picture ? (
                    <img
                      src={video.user.profile_picture}
                      alt={video.user.name}
                      className="rounded-full w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{video.user?.name || "Unknown User"}</p>
                  <p className="text-gray-400 text-sm">
                    {video.view_count?.toLocaleString() || "0"} views
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="bg-[#E85B5B] text-white px-4 py-2 rounded-full flex items-center">
                <IoWifiSharp className="mr-2" /> Live
              </button>
            </div>
          </div>

          <div className="bg-[#2a2a2a] p-4 rounded-lg mt-4">
            <h3 className="text-white font-semibold mb-2">Details</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <div>
                <p className="text-sm">Type</p>
                <p className="font-medium capitalize">{video.type || "Unknown"}</p>
              </div>
              <div>
                <p className="text-sm">Uploaded</p>
                <p className="font-medium">
                  {new Date(video.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;