// LiveChat.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

const LiveChat = ({ videoId, initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !videoId) return;

    try {
      setError(null);
      const token = getToken();
      
      if (!token) {
        throw new Error("You need to be logged in to comment");
      }

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
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Transform the new message response to match the initial messages structure
      const newMsg = {
        id: data.data.id,
        user_id: data.data.user_id,
        video_id: data.data.video_id,
        type: data.data.type,
        content: data.data.content,
        created_at: data.data.created_at,
        user: {
          id: data.data.user_id,
          name: data.data.name
        }
      };
      setMessages(prev => [...prev, newMsg]);
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
          messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-lg p-3 border-l-4 bg-[#1F2937] border-l-[#0EA5E9]"
            >
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="text-white px-2 py-0.5 rounded bg-[#111827] text-xs font-semibold">
                  {msg.user?.name || msg.name || "Anonymous"}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-white text-sm leading-relaxed">{msg.content}</p>
            </div>
          ))
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
  );
};

export default LiveChat;