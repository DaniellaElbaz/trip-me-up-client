import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Close, Logout, Chat, Map, Home, Delete, Lightbulb } from "@mui/icons-material";
import Header from "./Header";
import CONFIG from "../config";
import useLocalStorage from '../hooks/useLocalStorage';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../store/userSlice';
import { clearFavorites } from '../store/favoritesSlice';
import { useApi } from '../hooks/useApi';

const UserMenu = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false)
  const [persistentUser, setPersistentUser] = useLocalStorage("userData", null);
  const { userData, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);
  
  // שימוש ב-API Hook
  const { data: randomFact, request: fetchFact } = useApi();

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

  useEffect(() => {
    if (isOpen) {
        fetchFact("https://uselessfacts.jsph.pl/api/v2/facts/random");
    }
  }, [isOpen, fetchFact]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#333";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }, [isDarkMode]);

  const handleClearFavorites = () => {
    if(window.confirm("Are you sure you want to delete all favorites?")) {
        dispatch(clearFavorites());
        alert("Favorites cleared!");
        closeMenu();
    }
  };

  const handleLogout = async () => {
    setPersistentUser(null);
    sessionStorage.setItem("userData", null);
    sessionStorage.setItem("userID", null);
    sessionStorage.removeItem("userID");
    try {
      const response = await fetch(`${CONFIG.SERVER_URL}/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        dispatch(logoutSuccess());
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
      <Header toggleMenu={toggleMenu} isLoggedIn={isLoggedIn}/>

      {/* Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out" style={{ zIndex: 99 }} onClick={closeMenu}></div>

          {/* Sidebar Content */}
          <div
            className={`fixed top-0 left-0 h-screen w-64 text-gray-800 shadow-lg transform ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`} 
            style={{ zIndex: 100 }}
          >
            {/* Close Icon */}
            <button
              onClick={closeMenu}
              className={`absolute top-4 right-4 p-2 rounded-full shadow-lg focus:outline-none 
                ${isDarkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <Close />
            </button>

            {/* User Section */}
            <div className={`flex flex-col items-center p-6 border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                alt="User"
                className="w-16 h-16 rounded-full mb-2 shadow-md"
              />
              <p className="text-lg font-bold">{userData ? userData.name : "User Name"}</p>
            </div>

            {/* Dark Mode Toggle */}
            <div className={`px-6 py-4 border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"} flex justify-between items-center`}>
                <span>🌙 Dark Mode</span>
                <input type="checkbox" checked={isDarkMode} onChange={(e) => setIsDarkMode(e.target.checked)} />
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow p-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mb-2 rounded-lg shadow-sm ${
                    isActive 
                      ? (isDarkMode ? "bg-gray-700" : "bg-gray-200") 
                      : (isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100")
                  }`
                }
                onClick={closeMenu}
              >
                <Home className="mr-2" /> Home
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mb-2 rounded-lg shadow-sm ${
                    isActive 
                      ? (isDarkMode ? "bg-gray-700" : "bg-gray-200") 
                      : (isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100")
                  }`
                }
                onClick={closeMenu}
              >
                <Chat className="mr-2" /> Chat
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 mb-2 rounded-lg shadow-sm ${
                    isActive 
                      ? (isDarkMode ? "bg-gray-700" : "bg-gray-200") 
                      : (isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100")
                  }`
                }
                onClick={closeMenu}
              >
                <Map className="mr-2" /> Trip History
              </NavLink>
              
              {/* Clear Favorites Button */}
              <button
                className="flex items-center w-full px-4 py-2 mb-2 text-left text-red-500 rounded-lg hover:bg-gray-100 shadow-sm"
                onClick={handleClearFavorites}
              >
                <Delete className="mr-2" /> Clear Favorites
              </button>
            </nav>

            {/* Random Fact Section */}
            <div className={`p-4 text-xs text-center border-t opacity-70 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                <Lightbulb fontSize="small" /> 
                <p className="mt-1 italic">{randomFact ? randomFact.text : "Loading fact..."}</p>
            </div>

            {/* Logout Button */}
            <div className="p-4">
                <button
                className="flex items-center justify-center w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg"
                onClick={handleLogout}
                >
                <Logout className="mr-2" /> Logout
                </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;