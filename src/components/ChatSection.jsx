import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

const ChatSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi!",
      sender: "me",
      time: "10:10",
    },
    {
      id: 2,
      text: "Great, thanks for letting me know! I really look forward to experiencing it soon.",
      sender: "me",
      time: "10:11",
    },
    {
      id: 3,
      text: "Does this update fix error 352 for the Engineer character?",
      sender: "David Wayne",
      avatar: "https://i.pravatar.cc/40?img=3",
      time: "10:11",
    },
    {
      id: 4,
      text: "Oh! They fixed it and upgraded the security further.",
      sender: "Edward Davidson",
      avatar: "https://i.pravatar.cc/40?img=4",
      time: "10:14",
    },
    {
      id: 5,
      text: "Great!",
      sender: "me",
      time: "10:20",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="hide-scrollbar custom-scrollbar    h-[600px] bg-[#1e1e1e] rounded-lg shadow-lg flex flex-col border border-[#6C5CD380]"  style={{
              boxShadow: "inset 0 0 10px #6C5CD380",
            }}>
      <div className="flex items-center justify-between border-b border-gray-600 text-white p-2">
        <button className="text-lg bg-white p-2 text-black rounded-full">
          <FaArrowLeftLong />
        </button>
        <h2 className="text-lg font-medium">Message</h2>
        <button className="text-lg bg-white p-2 text-black rounded-full">
          <BsThreeDots />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5 text-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "items-start space-x-2"
            }`}
          >
            {msg.sender !== "me" && (
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-6 h-6 rounded-full border border-white"
              />
            )}
            <div>
              {msg.sender !== "me" && (
                <p className="text-sm text-gray-400 font-medium mb-1">
                  {msg.sender}
                </p>
              )}
              <div
                className={` px-4 py-2 text-sm rounded-xl relative ${
                  msg.sender === "me"
                    ? "bg-[#1565C0] text-white rounded-br-none"
                    : "bg-[#FFFFFF12] text-white rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-white mt-1 block text-right">
                  {msg.time}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center border-t gap-2 border-gray-700 md:px-3 px-1 py-2 bg-[#1e1e1e] justify-between">
        <button
          className="text-white hover:text-[#6C5CD3]  p-2 bg-white/10 rounded-full"
          title="Attach media"
        >
          <FaPlus size={16} />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-white/10 rounded-md py-2 px-2 text-white placeholder-gray-400 outline-none"
        />

        <button
          onClick={sendMessage}
          className="text-white   bg-[#1565C0] rounded-full  p-2 transition"
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
