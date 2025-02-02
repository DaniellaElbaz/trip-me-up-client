import React from "react";

function Avatar() {
  return (
    <div className="flex justify-center">
      <a href="/">
        <img
          src="/images/logo.png"
          alt="Trip Me Up Logo"
          className="w-32 h-32 object-contain cursor-pointer"
        />
      </a>
    </div>
  );
}

export default Avatar;

