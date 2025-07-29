import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

const LiveChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "DragonMaster_Kai",
      time: "14:23",
      text: "Welcome to the dragon's lair, brave adventurers! 🐉",
      color: "bg-[#3B1C1C]",
      tagColor: "bg-[#7F1D1D]",
      borderColor: "border-l-[#B91C1C]",
    },
    {
      id: 2,
      sender: "MythicModerator",
      time: "14:24",
      text: "Remember to follow the realm rules!",
      color: "bg-[#3F3A1A]",
      tagColor: "bg-[#A16207]",
      borderColor: "border-l-[#EAB308]",
    },
    {
      id: 3,
      sender: "FireBreather99",
      time: "14:25",
      text: "This quest looks epic!🔥",
      color: "bg-[#1F2937]",
      tagColor: "bg-[#111827]",
      borderColor: "border-l-[#0EA5E9]",
    },
    {
      id: 4,
      sender: "AzureWings",
      time: "14:26",
      text: "Those dragon animations are incredible!",
      color: "bg-[#1E3A44]",
      tagColor: "bg-[#0F172A]",
      borderColor: "border-l-[#38BDF8]",
    },
    {
      id: 5,
      sender: "GoldenScales",
      time: "14:27",
      text: "First time here, loving the mythical vibes ✨",
      color: "bg-[#1F2937]",
      tagColor: "bg-[#111827]",
      borderColor: "border-l-[#FACC15]",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "You",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: newMessage,
        color: "bg-[#2E2E2E]",
        tagColor: "bg-[#6C5CD3]",
        borderColor: "border-l-[#6C5CD3]",
      },
    ]);
    setNewMessage("");
    setShowEmojis(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className=" h-[540px] bg-[#0f0f0f] border border-[#FF444433] rounded-xl flex flex-col justify-between"
      style={{ fontFamily: "sans-serif" }}
    >
      <div className="border-b border-[#2a2a2a] px-4 py-3">
        <h2 className="text-white text-lg font-bold font-cinzel">
          🐉 Dragon’s Chamber
        </h2>
        <p className="text-gray-400 text-sm">2,847 dragons online</p>
      </div>

      <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg p-3 border-l-4 ${msg.color} ${msg.borderColor}`}
          >
            <div className="flex items-center gap-2 text-sm mb-1">
              <span
                className={`text-white px-2 py-0.5 rounded ${msg.tagColor} text-xs font-semibold`}
              >
                {msg.sender}
              </span>
              <span className="text-gray-400 text-xs">{msg.time}</span>
            </div>
            <p className="text-white text-sm leading-relaxed">{msg.text}</p>
          </div>
        ))}
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
          placeholder="Share your thoughts with 🐉"
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
        >
          <FaPaperPlane size={14} />
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
