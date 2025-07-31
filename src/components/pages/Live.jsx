// Live.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VideoSection from "../VideoSection";
import InfoSection from "../InfoSection";
import LiveChat from "../LiveChat";
import LiveCards from '../LiveCards';
import Card from '../Card';

function Live() {
  const location = useLocation();
  const videoId = location.state?.video;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/videos/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video details");
        }

        const data = await response.json();
        console.log("Fetched video data:", data);
        setVideo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]);

  if (loading) return <div className="text-white p-4">Loading video...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!video) return <div className="text-white p-4">Video not found</div>;

  return (
    <div>
      <div className="flex items-start gap-5 md:p-5 p-0 xl:flex-row flex-col">
        <div className="xl:w-[70%] w-full">
          <VideoSection video={video} />
          <InfoSection video={video} />
        </div>
        <div className="xl:w-[30%] w-full">
          <LiveChat 
            videoId={videoId} 
            initialMessages={video.data?.messages_with_user || []} 
          />
        </div>
      </div>
      {/* <LiveCards /> */}
      <Card />
    </div>
  );
}

export default Live;