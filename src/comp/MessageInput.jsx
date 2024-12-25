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
    <div className="flex items-center p-4 bg-white border-t border-gray-300">
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 mr-8"
        onKeyDown={handleEnter}
      />

      <IconButton className="ml-8" onClick={handleSend}>
        <ArrowForwardOutlined />
      </IconButton>
    </div>
  );
}

MessageInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};
