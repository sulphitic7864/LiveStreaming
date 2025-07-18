
import React, { useState } from "react";
import navbarimg from "../../public/navbarimg.png";
import { MdMenuOpen } from "react-icons/md";



const Navbar = ({ setIsSidebarOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className=" sticky top-0 z-40 bg-[#89898938] text-white shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="lg:hidden">
            
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="text-white mr-4 focus:outline-none"
            >
             <MdMenuOpen />
            </button>
          </div>

          <div className="flex-shrink-0 text-xl font-bold">
            Welcome to Visutta
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <a
              href="#"
              className="hover:text-[#6C5CD3] px-3 py-2 rounded transition"
            >
              Live
            </a>
            <a
              href="#"
              className="hover:text-[#6C5CD3] px-3 py-2 rounded transition"
            >
              Trending
            </a>
            <a
              href="#"
              className="hover:text-[#6C5CD3] px-3 py-2 rounded transition"
            >
              Explore
            </a>
            <a
              href="#"
              className="hover:text-[#6C5CD3] px-3 py-2 rounded transition"
            >
              Settings
            </a>
            <img
              src={navbarimg}
              alt="User"
              className="cursor-pointer w-8 h-8 rounded-full"
            />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a
            href="#"
            className="block hover:bg-white hover:text-[#6C5CD3] px-3 py-2 rounded transition"
          >
            Live
          </a>
          <a
            href="#"
            className="block hover:bg-white hover:text-[#6C5CD3] px-3 py-2 rounded transition"
          >
            Trending
          </a>
          <a
            href="#"
            className="block hover:bg-white hover:text-[#6C5CD3] px-3 py-2 rounded transition"
          >
            Explore
          </a>
          <a
            href="#"
            className="block hover:bg-white hover:text-[#6C5CD3] px-3 py-2 rounded transition"
          >
            Settings
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
