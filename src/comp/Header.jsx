import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@mui/icons-material";

const Header = ({ toggleMenu }) => {
  return (
    <header className="w-full bg-gray-800 text-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="text-white bg-gray-700 p-2 rounded-full shadow-lg focus:outline-none"
        >
          <Menu />
        </button>
        {/* Title */}
        <h1 className="text-lg font-bold">App Name</h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default Header;
