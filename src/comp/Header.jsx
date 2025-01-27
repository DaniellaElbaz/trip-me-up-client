import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@mui/icons-material";

const Header = ({ toggleMenu }) => {
  return (
    <header className="w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="text-gray-700 bg-gray-100 p-2 rounded-full shadow-lg focus:outline-none hover:bg-gray-200"
        >
          <Menu />
        </button>
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
};

export default Header;

