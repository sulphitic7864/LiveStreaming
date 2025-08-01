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
    {
    id: 4,
    image: "/flam1.png",
    title: "2025 world champs gaming Visutta",
    img: "/user1.png",
    username: "Guy Hawkins",
    game: "Call of duty",
    viewers: "4.2K watching",
  },
];

function LiveCards() {
  return (
    <>
   <div className="flex items-center justify-between mt-5 mb-6 gap-4">
  <h2 className="text-white font-normal md:text-2xl text-xl font-cinzel capitalize">
    🔥 Other Flames to Follow
  </h2>
  <hr className="flex-grow border-t-2 border-[#FF444480]" />
</div>


      <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 ">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className=" overflow-hidden  relative pb-4"
           
          >
            {/* Image */}
            <div className="w-full h-[280px] relative ">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover  "
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
                  <h2 className="text-xs text-[#FF4444]">{card.game}</h2>
                </div>
                <FaCheckCircle className="text-[#FF4444] text-base -mt-3" />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center  bg-[#3D3D3D] gap-2 px-4 rounded-2xl py-1 text-center justify-center">
                  <IoWifiSharp className="text-red-400" />
                  Live
                </button>
                <p className="text-sm text-white bg-[#3D3D3D] py-1 rounded-2xl px-4">{card.viewers}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default LiveCards;
