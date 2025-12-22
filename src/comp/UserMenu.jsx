import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Close, Logout, Chat, Map, Home} from "@mui/icons-material";
import Header from "./Header";
import CONFIG from "../config";
import { AuthContext } from "../AuthContext";

const UserMenu = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false)
  const storedData = sessionStorage.getItem("userData");
  let sessionUser = null;
  if(storedData){
    sessionUser = JSON.parse(storedData);
  }
  let userData = user || sessionUser;
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
    }, 1);
  };
  const handleLogout = async () => {
    sessionStorage.setItem("userData", null);
    sessionStorage.setItem("userID", null);
    try {
      const response = await fetch(`${CONFIG.SERVER_URL}/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        navigate("/login");
      } else {
        alert(`Logout failed...`);
      }
    } catch (error) {
      alert(`Logout failed...`);
    }
  }

  return (
    <div className="relative" style={{ zIndex: 100, position: 'relative' }}>
      {/* Header */}
      <Header toggleMenu={toggleMenu} isLoggedIn={userData ? true : false}/>

      {/* Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out" style={{ zIndex: 99 }} onClick={closeMenu}></div>

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-screen w-64 bg-white text-gray-800 shadow-lg transform ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300`}
            style={{ zIndex: 100 }}
          >
            {/* Close Icon */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-gray-700 bg-gray-100 p-2 rounded-full shadow-lg focus:outline-none hover:bg-gray-200"
            >
              <Close />
            </button>

            {/* User Section */}
            <div className="flex flex-col items-center p-6 border-b border-gray-200">
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1738228136~exp=1738231736~hmac=d3a6c9419ba248eb49cefe19ab3e179d2545a5419124be159feb98aeaef6aad0&w=1800"
                alt="User"
                className="w-16 h-16 rounded-full mb-2 shadow-md"
              />
              <p className="text-lg font-bold">{userData ? userData.name : "User Name"}</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow p-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 shadow-sm ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
                onClick={closeMenu}
              >
                <Home className="mr-2" /> Home
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 shadow-sm ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
                onClick={closeMenu}
              >
                <Chat className="mr-2" /> Chat
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 shadow-sm ${
                    isActive ? "bg-gray-200" : ""
                  }`
                }
                onClick={closeMenu}
              >
                <Map className="mr-2" /> Trip History
              </NavLink>
            </nav>

            {/* Logout Button */}
            <button
              className="flex items-center justify-center w-full px-4 py-7 mt-auto bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg"
              onClick={handleLogout}
            >
              <Logout className="mr-2" /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;