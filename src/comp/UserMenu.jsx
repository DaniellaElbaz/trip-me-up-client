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
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#e0e0e0";
    } else {
      document.body.style.backgroundColor = "#f5f5f5";
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

 const menuBg = isDarkMode ? "bg-gray-900" : "bg-white";
  const textColor = isDarkMode ? "text-gray-100" : "text-gray-800";
  const hoverColor = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";

  return (
    <div className="relative" style={{ zIndex: 100 }}>
      <Header toggleMenu={toggleMenu} isLoggedIn={isLoggedIn}/>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" style={{ zIndex: 99 }} onClick={closeMenu}></div>
          <div className={`fixed top-0 left-0 h-screen w-64 shadow-2xl transform transition-transform duration-300 ${menuBg} ${textColor}`} style={{ zIndex: 100 }}>
            
            <button onClick={closeMenu} className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-600"}`}>
              <Close />
            </button>

            <div className={`flex flex-col items-center p-6 border-b ${borderColor}`}>
              <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt="User" className="w-16 h-16 rounded-full mb-2 shadow-lg border-2 border-blue-500" />
              <p className="text-lg font-bold">{userData ? userData.name : "Guest"}</p>
            </div>

            <div className={`px-6 py-4 border-b ${borderColor} flex justify-between items-center`}>
                <span className="font-semibold flex items-center gap-2">
                    {isDarkMode ? "🌙 Dark" : "☀️ Light"} Mode
                </span>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isDarkMode} onChange={(e) => setIsDarkMode(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <nav className="flex-grow p-4 space-y-2">
              <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-blue-500 text-white" : hoverColor}`}>
                <Home className="mr-3" /> Home
              </NavLink>
              <NavLink to="/chat" onClick={closeMenu} className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-blue-500 text-white" : hoverColor}`}>
                <Chat className="mr-3" /> Chat
              </NavLink>
              <NavLink to="/history" onClick={closeMenu} className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-blue-500 text-white" : hoverColor}`}>
                <Map className="mr-3" /> History
              </NavLink>
              
              <button 
                onClick={handleClearFavorites} 
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${hoverColor} ${isDarkMode ? "text-red-400" : "text-red-600"}`}
              >
                <Delete className="mr-3" /> Clear Favorites
              </button>
            </nav>

            <div className={`p-4 text-xs text-center border-t ${borderColor} opacity-70`}>
                <Lightbulb fontSize="small" className="text-yellow-500 mb-1" /> 
                <p className="italic">{randomFact ? randomFact.text : "Loading..."}</p>
            </div>

            <div className="p-4">
                <button className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all" onClick={handleLogout}>
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