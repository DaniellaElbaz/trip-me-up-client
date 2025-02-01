import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Header = ({ toggleMenu, isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between p-2">
        {/* Hamburger Icon */}
        {isLoggedIn &&
          <button
          onClick={toggleMenu}
          className="text-gray-700 bg-gray-100 p-2 rounded-full shadow-lg focus:outline-none hover:bg-gray-200"
          >
            <Menu />
          </button>
        }
        {/* Login */}
        {!isLoggedIn &&
        <button
          onClick={() => navigate("/login")}
          className="px-6 p-2 text-white font-semibold  shadow-lg transition-all duration-500 bg-gradient-to-r from-[#ee7724] via-[#d8363a] to-[#b44593] bg-[length:200%_200%] hover:animate-gradient"
          style={{
            background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            backgroundSize: "200% 200%",
            animation: "gradientMove 3s ease infinite",
          }}
        >
          Login
        </button>
        }
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="App Logo"
          className="h-16 w-auto"
        />
      </div>
    </header>
  );
};


Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default Header;

