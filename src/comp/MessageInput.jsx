import { useState } from "react";
import PropTypes from "prop-types";
import { ArrowForwardOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };
  return (
    <div className="absolute bottom-6 w-full flex items-center bg-white dark:bg-gray-700 border border-gray-300 rounded-full shadow-lg p-2 z-10">
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-3 border-none outline-none rounded-full focus:ring-2 focus:ring-blue-500"
        onKeyDown={handleEnter}
      />
      <IconButton className=" bg-blue-500 text-white rounded-full hover:bg-blue-600 transition" onClick={handleSend}>
        <ArrowForwardOutlined />
      </IconButton>
    </div>
  );
}

MessageInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};
