import React from 'react';
import { FaPlus } from 'react-icons/fa';

const users = [
  {
    id: 1,
    name: 'Guy Hawkins',
    time: '14m ago',
    image: 'https://i.pravatar.cc/100?img=1',
    isActive: true,
    statusColor: 'bg-green-400',
  },
  {
    id: 2,
    name: 'Guy Hawkins',
    time: '14m ago',
    image: 'https://i.pravatar.cc/100?img=2',
    isActive: false,
    statusColor: 'bg-blue-400',
  },
  {
    id: 3,
    name: 'Guy Hawkins',
    time: '14m ago',
    image: 'https://i.pravatar.cc/100?img=3',
    isActive: true,
    statusColor: 'bg-yellow-400',
  },
  {
    id: 4,
    name: 'Guy Hawkins',
    time: '14m ago',
    image: 'https://i.pravatar.cc/100?img=4',
    isActive: true,
    statusColor: 'bg-red-400',
  },
  {
    id: 5,
    name: 'Guy Hawkins',
    time: '14m ago',
    image: 'https://i.pravatar.cc/100?img=5',
    isActive: false,
    statusColor: 'bg-purple-400',
  },
  {
    id: 6,
    name: 'Guy Hawkins',
    time: '14m ago',
    image: 'https://i.pravatar.cc/100?img=6',
    isActive: false,
    statusColor: 'bg-green-400',
  },
];

function Channels() {
  return (
    <div className="bg-[#89898938] mt-5 p-5 rounded-lg border border-[#9c9c9c23] shadow-inner"  style={{
    boxShadow: 'inset 0 0 10px #6C5CD380',
  }}>
      <h2 className="text-white font-normal md:text-2xl text-xl capitalize mb-4">
        From channels you follow
      </h2>

      <div className=" items-center grid md:grid-cols-7 md:gap-0 gap-10 grid-cols-3  justify-between   overflow-x-auto">
        {/* Add Button */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#6C5CD3] text-white text-xl">
            <FaPlus />
          </div>
        </div>

        {/* User Avatars */}
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center relative">
            <div
              className={`w-14 h-14 rounded-full p-[2px] relative ${
                user.isActive
                  ? 'bg-gradient-to-tr from-blue-500 via-pink-500 to-yellow-500'
                  : 'bg-gray-400'
              }`}
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover rounded-full border-2 border-black"
              />
              {/* Status Dot */}
              <span
                className={`absolute top-0 right-0 w-[10px] h-[10px] rounded-full border-2 border-black ${user.statusColor}`}
              />
            </div>
            <p className="text-white md:text-sm text-xs md:mt-1 mt-0 text-center">{user.name}</p>
            <span className="text-gray-400 text-xs">{user.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Channels;
