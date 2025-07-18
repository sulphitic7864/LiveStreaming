import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoWifiSharp } from "react-icons/io5";

const cardsData = [
  {
    id: 1,
    image: "/card1.png",
    img: "/user1.png",
    title: "2025 world champs gaming Visutta",
    username: "Guy Hawkins",
    game: "Call of duty",
    viewers: "4.2K watching",
  },
  {
    id: 2,
    image: "/card2.png",
    img: "/user1.png",
    title: "2025 world champs gaming Visutta",
    username: "Guy Hawkins",
    game: "Call of duty",
    viewers: "4.2K watching",
  },
  {
    id: 3,
    image: "/card3.png",
    title: "2025 world champs gaming Visutta",
    img: "/user1.png",
    username: "Guy Hawkins",
    game: "Call of duty",
    viewers: "4.2K watching",
  },
];

function Card() {
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

      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 ">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-[#89898938] clip-polygon   overflow-hidden shadow-md relative pb-4"
            style={{
              boxShadow: "inset 0 0 10px #6C5CD380",
            }}
          >
            {/* Image */}
            <div className="w-full h-[280px] relative clip-polygon">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-t-[20px] "
              />
            </div>

            <div className="p-4  text-white space-y-3">
              <h3 className="md:text-2xl text-xl font-semibold mb-2">
                {card.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <img src={card.img} className="text-red-500 text-sm" />
                <div
                  className="
                "
                >
                  <p className="text-sm">{card.username}</p>
                  <h2 className="text-xs text-white/50">{card.game}</h2>
                </div>
                <FaCheckCircle className="text-green-500 text-base -mt-3" />
              </div>
              <div className="flex items-center gap-6">
                <button className="flex items-center  bg-[#E85B5B] gap-2 px-4 rounded-2xl py-1 text-center justify-center">
                  <IoWifiSharp />
                  Live
                </button>
                <p className="text-sm text-gray-400">{card.viewers}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom clip-path for polygon */}
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
