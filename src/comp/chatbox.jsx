import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Chatbox() {
  const [messageHistory, setMessageHistory] = useState([]);
  const [webSocketUrl, setWebSocketUrl] = useState(
    "wss://trip-me-up-server.onrender.com/api/chat/conversation",
  );
  const { sendMessage, lastMessage, readyState } = useWebSocket(webSocketUrl);

  // Recieve message and store it in messageHistory
  useEffect(() => {
    if (lastMessage !== null) {
      const msg = JSON.parse(lastMessage.data);

      const m = {
        id: Date.now(),
        type: "incoming",
        text: msg.message,
        locations: null,
      };
      if (msg.route !== null) {
        m.text = "Redirecting you to route...";
        m.locations = JSON.parse(msg.route).places;
        console.log(m.locations);
      }
      setMessageHistory((prev) => prev.concat(m));
    }
  }, [lastMessage]);

  const handleSendMessage = (msg) => {
    sendMessage(msg);
    const m = {
      id: Date.now(),
      type: "outgoing",
      text: msg,
    };
    setMessageHistory((prev) => prev.concat(m));
  };

  return (
    <div className="flex flex-col w-full h-screen bg-white shadow-lg overflow-hidden">
      <div className="bg-gray-800 text-white text-center p-4 font-bold">
        Chat Assistant
      </div>
      <MessageList messages={messageHistory} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}
