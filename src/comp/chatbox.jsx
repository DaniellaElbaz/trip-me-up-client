import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import CONFIG from "../config";

export default function Chatbox() {
  let navigate = useNavigate();

  const [messageHistory, setMessageHistory] = useState([]);
  const [userId, setUserId] = useState(sessionStorage.getItem("userID"));
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
        (async () => {
          try {
            console.log(msg.places);
            const jsonBody = {
              user_id: userId,
              locations: msg.places,
            }
            const response = await fetch(CONFIG.SERVER_URL + "/route/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(jsonBody),
            });
  
            if (!response.ok) {
              console.error("Response was not ok");
              console.log(response);
            } else {
              const data = await response.json();
              const routeId = data[0]?.id;
              navigate(`/routeview_poc/${routeId}`);
            }
          } catch (error) {
            console.error("Error posting data:", error);
          }
        })();
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
