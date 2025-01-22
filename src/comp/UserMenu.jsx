import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Close, Logout, Chat, Map } from "@mui/icons-material";
import Header from "./Header";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      {/* Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white shadow-lg transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 z-50`}
          >
            {/* Close Icon */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-white bg-gray-600 p-2 rounded-full focus:outline-none"
            >
              <Close />
            </button>

            {/* User Section */}
            <div className="flex flex-col items-center p-6 border-b border-gray-700">
              <img
                src="/path-to-placeholder-image.jpg"
                alt="User"
                className="w-16 h-16 rounded-full mb-2"
              />
              <p className="text-lg font-bold">User Name</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow p-4">
              <NavLink
                to="/"
                className="flex items-center px-4 py-2 mb-2 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                <Chat className="mr-2" /> Home
              </NavLink>
              <NavLink
                to="/chat"
                className="flex items-center px-4 py-2 mb-2 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                <Chat className="mr-2" /> Chat
              </NavLink>
              <NavLink
                to="/routeview"
                className="flex items-center px-4 py-2 mb-2 rounded hover:bg-gray-700"
                activeClassName="bg-gray-700"
              >
                <Map className="mr-2" /> Route View
              </NavLink>
            </nav>

            {/* Logout Button */}
            <button
              className="flex items-center justify-center w-full px-4 py-2 mt-auto bg-red-600 hover:bg-red-700"
              onClick={() => console.log("Logout")}
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
