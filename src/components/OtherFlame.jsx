import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoWifiSharp } from "react-icons/io5";

function OtherFlame() {
  const cardsData = [
  {
    id: 1,
    image: "/flam1.png",
    img: "/user1.png",
    title: "2025 world champs gaming Visutta",
    username: "Guy Hawkins",
    game: "Call of duty",
    viewers: "4.2K watching",
  },
  {
    id: 2,
    image: "/flam2.png",
    img: "/user1.png",
    title: "2025 world champs gaming Visutta",
    username: "Guy Hawkins",
    game: "Call of duty",
    viewers: "4.2K watching",
  },
 
];

  return (
    <>
    <div className=' mt-5 clip-polygon bg-[#89898938] md:p-10 p-6 '  style={{
              boxShadow: "inset 0 0 10px #6C5CD380",
            }}>
        <div className="grid  grid-cols-1 gap-6 space-y-3 ">
              {cardsData.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-3 md:flex-row flex-col overflow-hidden  relative "
                 
                >
                  {/* Image */}
                  <div className="md:w-[30%] w-full lg:h-[200px] h-[150px] relative clip-polygon ">
                    <img
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover  "
                    />
                  </div>
      
                  <div className=" md:w-[70%] w-full  text-white space-y-3">
                     <div className="flex items-center gap-6">
                      <button className="flex items-center  bg-[#E85B5B] gap-2 px-4 rounded-2xl py-1 text-center justify-center">
                        <IoWifiSharp />
                        Live
                      </button>
                      <p className="text-sm text-gray-400">{card.viewers}</p>
                    </div>
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
                   
                  </div>
                </div>
              ))}
            </div>
    
    </div>
    <style>
        {`
          .clip-polygon {
          clip-path: polygon(11% 0, 100% 0, 100% 87%, 89% 100%, 0 100%, 0 10%);

          }
        `}
      </style>
    </>
  )
}

export default OtherFlame
