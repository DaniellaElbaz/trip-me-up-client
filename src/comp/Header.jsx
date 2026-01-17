import React from "react";
import PropTypes from "prop-types";
import { Menu, Favorite } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ toggleMenu, isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const favoritesCount = useSelector((state) => state.favorites.items.length);
  return (
    <header className={`w-full z-50 ${isHomePage ? "bg-transparent absolute top-0 left-0" : "bg-white shadow-md"}`}>
    <div className="flex items-center justify-between p-2">
    {/* Hamburger Icon */}
              {isLoggedIn && (
                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-full shadow-lg focus:outline-none transition-all duration-300
                  ${isHomePage
                      ? "border-2 border-white bg-transparent text-white hover:bg-gray-200 hover:bg-opacity-30"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"}`
                  }
                  style={isHomePage ? { width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: "center" } : {}}
                >
                  <Menu fontSize="large" />
                </button>
              )}

              {/* Login Button */}
              {!isLoggedIn &&
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 p-2 text-white font-semibold shadow-lg transition-all duration-500 bg-gradient-to-r from-[#ee7724] via-[#d8363a] to-[#b44593] bg-[length:200%_200%] hover:animate-gradient"
                  style={{
                    background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    backgroundSize: "200% 200%",
                    animation: "gradientMove 3s ease infinite",
                  }}
                >
                  Login
                </button>
              }
            <div className="flex items-center gap-3">
              {isLoggedIn && (
                <div className={`rounded-full p-1 ${isHomePage ? "" : "bg-gray-50"}`}>
                    <IconButton 
                      onClick={() => console.log("Favorites clicked")} 
                      sx={{ color: isHomePage ? "white" : "gray" }}
                    >
                      <Badge badgeContent={favoritesCount} color="error">
                        <Favorite />
                      </Badge>
                    </IconButton>
                </div>
              )}

              
            </div>
            <style>
              {`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}
            </style>
          <a href="/">
            <img
              src={isHomePage ? "/images/logo-2.png" : "/images/logo.png"}
              alt="App Logo"
              className="h-16 w-auto cursor-pointer"
            />
          </a>
          </div>
    </header>
  );
};


Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default Header;

