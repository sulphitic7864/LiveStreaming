import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  console.log("User Profile:", user); // Debug log

  // Redirect to login if no user is provided
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Show loading state while redirecting
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#89898938]">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#89898938]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#6C5CD3]">My Profile</h2>
        <div className="flex flex-col items-center">
          <img
            src={user?.profile_picture ? user.profile_picture : "/navbarimg.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full mb-4 object-cover"
            onError={(e) => {
              e.target.src = "/navbarimg.png";
            }}
          />
          <p className="text-lg font-semibold text-[#6C5CD3] mb-2">
            {user.name || "User"}
          </p>
          <p className="text-gray-600 mb-4">{user.email || "No email provided"}</p>
          <button
            className="bg-[#6C5CD3] text-white px-4 py-2 rounded hover:bg-[#5543b7] transition"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    profileImage: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
};

export default Profile;