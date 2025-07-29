import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoWifiSharp } from "react-icons/io5";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef();

  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Fetch video details and initial comments
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

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            throw new Error("Unauthorized");
          }
          throw new Error(data.message || "Failed to load video");
        }

        if (data.success && data.data) {
          setVideo(data.data);
          // Set initial comments from video response
          setComments(data.data.messages_with_user || []);
          // Check if we have all comments already
          if (data.data.messages_with_user?.length < 10) { // Assuming 10 is your page size
            setHasMore(false);
          }
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

  // Infinite scroll for comments
  const lastCommentRef = useCallback(
    (node) => {
      if (isFetching || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  // Fetch more comments when page changes
  useEffect(() => {
    if (page === 1 || !hasMore) return; // Skip initial load and if no more comments

    const fetchMoreComments = async () => {
      setIsFetching(true);
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
          `${import.meta.env.VITE_BACKEND_URL}/api/videos/${id}/messages?page=${page}`,
          {
            method: "GET", // Changed from POST to GET
            headers: headers,
            credentials: "include",
            mode: "cors",
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          const newComments = data.data || [];
          if (newComments.length === 0) {
            setHasMore(false);
          } else {
            setComments((prev) => [...prev, ...newComments]);
            // If we get fewer comments than expected page size, assume no more
            if (newComments.length < 10) { // Assuming 10 is your page size
              setHasMore(false);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch more comments:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMoreComments();
  }, [page, id, hasMore]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError(null);
    setCommentSuccess(null);

    if (!newComment.trim()) {
      setCommentError("Comment cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCommentError("You need to be logged in to comment");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/${id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            video_id: id,
            type: "comment",
            content: newComment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to post comment");
      }

      if (data.success) {
        setNewComment("");
        setCommentSuccess("Comment posted successfully");
        // Add the new comment to the top of the list
        setComments((prev) => [data.data, ...prev]);
      }
    } catch (err) {
      setCommentError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-8">
        Loading video details...
      </div>
    );
  }

  if (error) {
    const error_message =
      typeof error === "object" ? error.message || JSON.stringify(error) : error;
    return (
      <div className="text-white text-center py-8">Error: {error_message}</div>
    );
  }

  if (!video) {
    return <div className="text-white text-center py-8">Video not found</div>;
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
                <p className="text-white text-lg">
                  Video URL is invalid or not available
                </p>
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
                  <p className="text-white font-medium">
                    {video.user?.name || "Unknown User"}
                  </p>
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
                <p className="font-medium capitalize">
                  {video.type || "Unknown"}
                </p>
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

      {/* Comments Section */}
      <div className="mt-8 bg-[#1a1a1a] rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Comments</h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
            </div>
            <div className="flex-grow">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-[#2a2a2a] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E85B5B] resize-none"
                rows="3"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-[#E85B5B] text-white px-4 py-2 rounded-full hover:bg-[#d14b4b] transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
          {commentError && (
            <p className="text-red-500 mt-2 text-sm">{commentError}</p>
          )}
          {commentSuccess && (
            <p className="text-green-500 mt-2 text-sm">{commentSuccess}</p>
          )}
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment, index) => (
              <div
                key={comment.id}
                ref={index === comments.length - 1 ? lastCommentRef : null}
                className="flex space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    {comment.user?.profile_picture ? (
                      <img
                        src={comment.user.profile_picture}
                        alt={comment.user.name}
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="bg-[#2a2a2a] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white">
                        {comment.user?.name || comment.name || "Anonymous"}
                      </h4>
                      <span className="text-gray-400 text-sm">
                        {new Date(comment.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                    <div className="flex items-center mt-3 space-x-4">
                      <button className="flex items-center text-gray-400 hover:text-white">
                        <FaRegHeart className="mr-1" />
                        <span className="text-sm">Like</span>
                      </button>
                      <button className="text-gray-400 hover:text-white text-sm">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {isFetching && (
            <p className="text-gray-400 text-center py-4">Loading more comments...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;