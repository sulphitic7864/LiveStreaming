import React from "react";

const Profile = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#89898938]">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-[#6C5CD3]">My Profile</h2>
      <div className="flex flex-col items-center">
        <img
          src="/navbarimg.png"
          alt="Profile"
          className="w-20 h-20 rounded-full mb-4"
        />
        <p className="text-lg font-semibold text-[#6C5CD3] mb-2">Username</p>
        <p className="text-gray-600 mb-4">user@email.com</p>
        <button className="bg-[#6C5CD3] text-white px-4 py-2 rounded hover:bg-[#5543b7] transition">
          Edit Profile
        </button>
      </div>
    </div>
  </div>
);

export default Profile;