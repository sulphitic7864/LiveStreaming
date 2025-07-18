import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { IoWifiSharp } from "react-icons/io5";

import swiperimg from "../../public/swiper1.png";
import swiperimg2 from "../../public/swiper2.png";
import swiperimg3 from "../../public/swiper3.png";
import swiperimg4 from "../../public/swiper4.png";
import bgImage from "../../public/herobg.png";
import userhero from "../../public/userhero.png";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const slides = [
    { id: 1, img: swiperimg },
    { id: 2, img: swiperimg2 },
    { id: 3, img: swiperimg3 },
    { id: 4, img: swiperimg4 },
    { id: 5, img: swiperimg },
    { id: 6, img: swiperimg2 },
    { id: 7, img: swiperimg3 },
    { id: 8, img: swiperimg4 },
  ];
   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detail');
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-[80vh] rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute bottom-0 z-20 w-full px-6 lg:px-10 py-10 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="text-white space-y-2 md:w-1/2 w-full">
            <button className="flex items-center  bg-red-500 gap-2 px-4 rounded-md py-2.5 text-center justify-center">
              <IoWifiSharp />
              Live
            </button>
            <h1 className="capitalize  font-normal text-lg">Dragons</h1>
            <p className=" font-bold text-white md:text-7xl text-3xl">
              Visutta
            </p>
            <div className="flex items-center gap-2">
              <img src={userhero} alt="" />
              <p className="text-white font-normal text-base capitalize">
                {" "}
                Warzone . Us English
              </p>
            </div>
            <button  onClick={handleClick} className="mt-2 px-10 py-2 bg-[#6C5CD3] hover:bg-[#5b4cc0] transition rounded text-white">
              Watch
            </button>
          </div>

          <div className="md:w-1/2 w-full">
            <Swiper
              modules={[Navigation, Thumbs]}
              spaceBetween={10}
              navigation
              className="rounded-lg"
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <img
                    src={slide.img}
                    alt={`Slide ${slide.id}`}
                    className="rounded-md w-[200px] md:h-[60px] h-[80px] object-cover border-2 border-transparent hover:border-[#6C5CD3] transition"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
