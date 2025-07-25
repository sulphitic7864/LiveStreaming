import React, { useState, useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import navbarimg from "../../public/navbarimg.png";

const Navbar = ({ setIsSidebarOpen }) => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (token && storedUser?.id) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${storedUser.id}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.data);
            // Optionally update localStorage with new user data
            localStorage.setItem("user", JSON.stringify(data.data));
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }
        })
        .catch((err) => {
          console.error("Fetch profile failed:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#89898938] text-white shadow-md backdrop-blur-md">
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
            <a href="#" className="hover:text-[#6C5CD3] px-3 py-2 rounded transition">Live</a>
            <a href="#" className="hover:text-[#6C5CD3] px-3 py-2 rounded transition">Trending</a>
            <a href="#" className="hover:text-[#6C5CD3] px-3 py-2 rounded transition">Explore</a>
            <a href="#" className="hover:text-[#6C5CD3] px-3 py-2 rounded transition">Settings</a>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="focus:outline-none"
              >
                <img
                  src={user?.profileImage || navbarimg}
                  alt="User"
                  className="cursor-pointer w-8 h-8 rounded-full"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-[#6C5CD3] rounded shadow-lg py-2 z-50">
                  {user ? (
                    <>
                      <button
                        onClick={() => {
                          console.log("Navigating to profile with user:", user);
                          setIsDropdownOpen(false);
                          navigate("/profile", { state: { user } }); // Pass user data
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-[#6C5CD3] hover:text-white transition"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-[#6C5CD3] hover:text-white transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate("/login");
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-[#6C5CD3] hover:text-white transition"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          navigate("/register");
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-[#6C5CD3] hover:text-white transition"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block hover:bg-white hover:text-[#6C5CD3] px-3 py-2 rounded transition">Live</a>
          <a href="#" className="block hover:bg-white hover:text-[#6C5CD3] px-3 py-2 rounded transition">Trending</a>
          <a href="#" className="block hover:bg-white hover:text-[#6C5CD3] px-3 py-2 rounded transition">Explore</a>
          <a href="#" className="block hover:bg-white hover:text-[#6C5CD3] px-3 py-2 rounded transition">Settings</a>
          {user ? (
            <>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/profile", { state: { user } });
                }}
                className="block w-full text-left px-3 py-2 hover:bg-white hover:text-[#6C5CD3] transition"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 hover:bg-white hover:text-[#6C5CD3] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
                className="block w-full text-left px-3 py-2 hover:bg-white hover:text-[#6C5CD3] transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/register");
                }}
                className="block w-full text-left px-3 py-2 hover:bg-white hover:text-[#6C5CD3] transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default Navbar;