import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const messageStyles = {
  red: {
    bg: "bg-red-800/50",
    border: "border-l-red-500",
    tag: "bg-red-900"
  },
  yellow: {
    bg: "bg-yellow-800/50",
    border: "border-l-yellow-500",
    tag: "bg-yellow-900"
  },
  blue: {
    bg: "bg-blue-800/50",
    border: "border-l-blue-500",
    tag: "bg-blue-900"
  },
  default: {
    bg: "bg-gray-800/50",
    border: "border-l-gray-500",
    tag: "bg-gray-900"
  }
};

const LiveChat = ({ videoId, initialMessages = [] }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const getMessageStyle = (message) => {
    const color = message.color || message.user?.color;
    return messageStyles[color] || messageStyles.default;
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to be logged in to perform this action");
      return null;
    }
    return token;
  };

  const deleteMessage = async (messageId) => {
    if (!videoId || !messageId) return;

    try {
      const token = getToken();
      if (!token) {
        toast.error("You need to be logged in to delete messages");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/${videoId}/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        // Remove the deleted message from state
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        toast.success("Message deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      if (err.message === "You are not authorized to delete this message") {
        toast.error("You are not authorized to delete this message");
      } else {
        toast.error(err.message || "Failed to delete message. Please try again.");
      }
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !videoId) return;

    try {
      setError(null);
      const token = getToken();
      if (!token) return;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/${videoId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            video_id: videoId,
            type: "comment",
            content: newMessage,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      const newMsg = {
        id: data.data.id,
        user_id: data.data.user_id,
        video_id: data.data.video_id,
        type: data.data.type,
        content: data.data.content,
        created_at: data.data.created_at,
        user: {
          id: data.data.user_id,
          name: data.data.name,
        },
      };
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");
      setShowEmojis(false);
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.message || "Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        className="h-[540px] bg-[#0f0f0f] border border-[#FF444433] rounded-xl flex flex-col justify-between"
        style={{ fontFamily: "sans-serif" }}
      >
        <div className="border-b border-[#2a2a2a] px-4 py-3">
          <h2 className="text-white text-lg font-bold font-cinzel">
            🐉 Live Chat
          </h2>
          <p className="text-gray-400 text-sm">Live comments</p>
        </div>

        <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto custom-scrollbar">
          {error ? (
            <div className="text-red-500 text-center p-2">{error}</div>
          ) : messages.length === 0 ? (
            <div className="text-white text-center">No comments yet</div>
          ) : (
            messages.map((msg) => {
              const style = getMessageStyle(msg);
              return (
                <div
                  key={msg.id}
                  className={`rounded-lg p-3 border-l-4 ${style.bg} ${style.border} relative`}
                >
                  {getToken() && (
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="absolute top-1 right-1 text-gray-300 hover:text-white hover:bg-red-500/20 p-1 rounded"
                      title="Delete message"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}

                  <div className="flex items-center gap-2 text-sm mb-1">
                    <span
                      className={`text-white px-2 py-0.5 rounded ${style.tag} text-xs font-semibold`}
                    >
                      {msg.user?.name || msg.name || "Anonymous"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="relative border-t border-[#2a2a2a] px-3 py-2 bg-[#1a1a1a] flex items-center gap-2">
          {showEmojis && (
            <div className="absolute bottom-12 left-2 bg-[#2a2a2a] border border-gray-600 rounded-lg p-2 flex flex-wrap gap-1 z-10 w-52">
              {["😀", "😄", "😂", "🥳", "😎", "🔥", "🐉", "✨", "❤️", "👍"].map(
                (emoji, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setNewMessage((prev) => prev + emoji);
                      setShowEmojis(false);
                    }}
                    className="text-xl hover:scale-110 transition-transform"
                  >
                    {emoji}
                  </button>
                )
              )}
            </div>
          )}

          <input
            type="text"
            placeholder="Share your thoughts..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-[#2a2a2a] text-white placeholder-gray-400 text-sm px-3 py-2 rounded-md outline-none"
          />
          <button
            onClick={() => setShowEmojis((prev) => !prev)}
            className="text-white text-xl hover:opacity-80"
            title="Insert Emoji"
          >
            😊
          </button>
          <button
            onClick={sendMessage}
            className="bg-[#FF4444] hover:bg-red-600 text-white p-2 rounded-md"
            disabled={!newMessage.trim()}
          >
            <FaPaperPlane size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default LiveChat;