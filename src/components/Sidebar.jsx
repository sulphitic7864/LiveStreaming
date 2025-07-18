import React, { useState } from "react";
import logo from "../../public/logo.png";
import game from "../../public/game.png";
import trending from "../../public/trending.png";
import user from "../../public/user.png";
import playboard from "../../public/playboard.png";
import video from "../../public/video.png";
import user1 from "../../public/user1.png";
import user2 from "../../public/user2.png";
import user3 from "../../public/user3.png";
import user4 from "../../public/user4.png";
import profile1 from "../../public/profile1.png";
import profile2 from "../../public/profile2.png";
import profile3 from "../../public/profile3.png";
import profile4 from "../../public/profile4.png";
import { IoWifiSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("New feed");

  const navItems = [
    { icon: game, label: "New feed", href: "/" },
    { icon: trending, label: "Trending", href: "" },
    { icon: user, label: "Following", href: "" },
    { icon: video, label: "Your videos", href: "" },
    { icon: playboard, label: "Profile", href: "" },
  ];

  const followingList = [
    {
      img: user1,
      name: "Darlene Robertson",
      icon: <IoWifiSharp className="text-white" />,
    },
    {
      img: user2,
      name: "Floyd Miles",
      icon: <FaCircle size={8} className="text-white text-base" />,
    },
    {
      img: user3,
      name: "Guy Hawkins",
      icon: <IoWifiSharp className="text-white" />,
    },
    {
      img: user4,
      name: "Robert Fox",
      icon: <FaCircle size={8} className="text-white text-base" />,
    },
  ];

  const settingsList = [
    {
      icon: <IoChatboxEllipsesOutline className="text-white text-2xl" />,
      label: "chat",
      href: "/chat",
    },
    {
      icon: <IoSettingsOutline className="text-white text-2xl" />,
      label: "Setting",
      href: "/setting",
    },
    {
      icon: <MdOutlineAnalytics className="text-white text-2xl" />,
      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: <img src={playboard} alt="" />,
      label: "Playlist",
      href: "/playlist",
    },
  ];

  const recommendedList = [
    {
      img: profile1,
      username: "@Username",
      server: "Server Name",
      color: "#EDC808",
      count: "72.7K+",
    },
    {
      img: profile2,
      username: "@Username",
      server: "Server Name",
      color: "#ED1608",
      count: "72.7K+",
    },
    {
      img: profile3,
      username: "@Username",
      server: "Server Name",
      color: "#1BED08",
      count: "72.7K+",
    },
    {
      img: profile4,
      username: "@Username",
      server: "Server Name",
      color: "#838383",
      count: "72.7K+",
    },
  ];

  return (
    <div className=" bg-[#89898938] text-white flex flex-col  h-screen  justify-between p-4  overflow-y-auto transition-transform hide-scrollbar custom-scrollbar ">
      <div>
        <div className="text-xl font-bold mb-6">
          <img src={logo} alt="logo " className="" />
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-3 text-sm text-white">
          <div className="text-sm font-normal mb-2 text-white/40">
            New feeds
          </div>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setActiveLink(item.label)}
              className={`flex items-center gap-3 cursor-pointer text-sm font-normal px-2 py-1 rounded-md
                ${
                  activeLink === item.label
                    ? "bg-[#6C5CD3]"
                    : "hover:bg-[#6C5CD3]"
                }`}
            >
              <img src={item.icon} alt="" /> {item.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <hr className="my-4 border-gray-700" />

        {/* Following Section */}
        <div>
          <div className="text-sm font-normal mb-2 text-white/40">
            Following
          </div>
          <div className="space-y-3">
            {followingList.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center gap-2">
                  <img src={user.img} alt="" />
                  <div className="text-sm font-normal text-white/40">
                    {user.name}
                  </div>
                </div>
                {user.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-700" />

        {/* Chat & Setting */}
        <nav className="flex flex-col gap-3 text-sm text-white">
          <div className="text-sm font-normal mb-2 text-white/40">
            Chat & Setting
          </div>
          {settingsList.map((setting, index) => (
            <a
              key={index}
              href={setting.href}
              onClick={() => setActiveLink(setting.label)}
              className={`flex items-center gap-3 cursor-pointer text-sm font-normal px-2 py-1 rounded-md
                ${
                  activeLink === setting.label
                    ? "bg-[#6C5CD3]"
                    : "hover:bg-[#6C5CD3]"
                }`}
            >
              {setting.icon} {setting.label}
            </a>
          ))}
        </nav>
      </div>

      <hr className="my-4 border-gray-700" />

      <div className="mb-10">
        <div className="text-sm font-normal mb-2 text-white">Recommended</div>
        <div>
          <div className="space-y-3">
            {recommendedList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center gap-2">
                  <img src={item.img} alt="" />
                  <div className="text-sm font-normal text-white">
                    {item.username}
                    <p className="text-xs">{item.server}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs">
                  {/* <FaCircle className={`text-[${item.color}]`} size={8} /> */}
                    <FaCircle style={{ color: item.color }} size={8} />
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
