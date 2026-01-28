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
  const [persistentUser, setPersistentUser] = useLocalStorage("userData", null);
  const { userData, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);
  const { data: randomFact, request: fetchFact } = useApi();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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
    sessionStorage.clear();
    try {
      await fetch(`${CONFIG.SERVER_URL}/logout`, { method: "GET" });
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (error) { console.error(error); }
  }
return (
    <div className="relative" style={{ zIndex: 100 }}>
      <Header toggleMenu={toggleMenu} isLoggedIn={isLoggedIn}/>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50" style={{ zIndex: 99 }} onClick={closeMenu}></div>
          
          <div 
            className="fixed top-0 left-0 h-screen w-64 shadow-2xl transform transition-transform duration-300 ease-in-out" 
            style={{ 
                zIndex: 100,
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000"
            }}
          >
            
            <button 
              onClick={closeMenu} 
              className={`absolute top-4 right-4 p-2 rounded-full border transition-all
                ${isDarkMode 
                  ? "bg-gray-600 border-gray-500 text-white hover:bg-gray-500" 
                  : "bg-gray-200 border-gray-300 text-black hover:bg-gray-300"}`}
            >
              <Close />
            </button>

            <div className={`flex flex-col items-center p-6 border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
              <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt="User" className="w-16 h-16 rounded-full mb-2 border-2 border-blue-500 shadow-md" />
              <p className="text-lg font-bold">{userData ? userData.name : "Guest"}</p>
            </div>

            <div className={`px-6 py-4 border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"} flex justify-between items-center`}>
                <span className="font-semibold">🌙 Dark Mode</span>
                <input 
                    type="checkbox" 
                    checked={isDarkMode} 
                    onChange={(e) => setIsDarkMode(e.target.checked)}
                    className="w-5 h-5 cursor-pointer"
                />
            </div>

            <nav className="flex-grow p-4 space-y-3">
              <NavLink to="/" onClick={closeMenu} className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <Home className="mr-3" /> Home
              </NavLink>
              <NavLink to="/chat" onClick={closeMenu} className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <Chat className="mr-3" /> Chat
              </NavLink>
              <NavLink to="/history" onClick={closeMenu} className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                <Map className="mr-3" /> History
              </NavLink>
              
              <hr className={isDarkMode ? "border-gray-700" : "border-gray-200"} />

              <button 
                onClick={handleClearFavorites} 
                className={`flex items-center w-full px-4 py-3 rounded-lg font-bold border transition-all
                  ${isDarkMode 
                    ? "text-red-400 border-red-900 bg-red-950 bg-opacity-20 hover:bg-red-900 hover:text-white" 
                    : "text-red-600 border-red-100 bg-red-50 hover:bg-red-600 hover:text-white"}`}
              >
                <Delete className="mr-3" /> Clear Favorites
              </button>
            </nav>

            <div className={`p-4 text-xs text-center border-t opacity-70 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                <Lightbulb fontSize="small" className="text-yellow-500 mb-1" /> 
                <p className="italic">{randomFact ? randomFact.text : "Loading fact..."}</p>
            </div>

            <div className="p-4">
                <button 
                    className="flex items-center justify-center w-full px-4 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-transform active:scale-95" 
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