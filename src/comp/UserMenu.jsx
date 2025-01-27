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
    <div
  className="relative"
  style={{ zIndex: 100, position: 'relative' }}
>
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      {/* Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
        className="fixed inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 99 }}
        onClick={closeMenu}
      ></div>

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
                src="/path-to-placeholder-image.jpg"
                alt="User"
                className="w-16 h-16 rounded-full mb-2 shadow-md"
              />
              <p className="text-lg font-bold">User Name</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow p-4">
              <NavLink
                to="/"
                className="flex items-center px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 shadow-sm"
                activeClassName="bg-gray-200"
              >
                <Chat className="mr-2" /> Home
              </NavLink>
              <NavLink
                to="/chat"
                className="flex items-center px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 shadow-sm"
                activeClassName="bg-gray-200"
              >
                <Chat className="mr-2" /> Chat
              </NavLink>
              <NavLink
                to="/routeview"
                className="flex items-center px-4 py-2 mb-2 rounded-lg hover:bg-gray-100 shadow-sm"
                activeClassName="bg-gray-200"
              >
                <Map className="mr-2" /> Route View
              </NavLink>
            </nav>

            {/* Logout Button */}
            <button
              className="flex items-center justify-center w-full px-4 py-2 mt-auto bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg"
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