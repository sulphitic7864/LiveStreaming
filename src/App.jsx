import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Sidebar from "./components/Sidebar";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import Navbar from "./components/Navbar";
import { IoMdClose } from "react-icons/io";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const hideOnRoutes = ["/login", "/register"];
  const shouldHide = hideOnRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {!shouldHide && (
        <div className="xl:w-[20%] lg:w-[25%] hidden lg:block h-screen fixed left-0 top-0 z-30">
          <Sidebar />
        </div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 md:w-[40%] w-[90%] h-full bg-[#1a1a1acc] backdrop-blur-md transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="bg-[#6C5CD3] text-white m-2 rounded-lg text-2xl flex justify-end p-2 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <IoMdClose className="w-5 h-5" />
        </button>

        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-[25%] xl:ml-[20%] overflow-y-auto h-screen">
        {!shouldHide && <Navbar setIsSidebarOpen={setIsSidebarOpen} />}
        <div className="p-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/detail" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfileWithUser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const ProfileWithUser = () => {
  const { state } = useLocation();
  // console.log("App - Location State:", state);
  return <Profile user={state?.user || null} />;
};

// Wrap your App with BrowserRouter in your main.jsx or index.jsx
export default App;
