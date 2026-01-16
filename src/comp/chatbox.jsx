import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from "react";
import useWebSocket from "react-use-websocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import CONFIG from "../config";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";


export default function Chatbox() {
  let navigate = useNavigate();
  const [messageHistory, setMessageHistory] = useState([]);
  const [webSocketUrl, setWebSocketUrl] = useState(
    "wss://trip-me-up-server-e7ip.onrender.com/api/chat/conversation",
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
            const jsonBody = {
              locations: msg.places.places,
              start_date: msg.start_date
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
              alert("Something went wrong. Please try reloading the page.")
            } else {
              const data = await response.json();
              const routeId = data[0]?.id;
              navigate(`/routeview/${routeId}`);
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
      <div
        className="flex flex-col w-full"
        style={{ height: `calc(100vh - 160px)` }}
      >
        <div className="bg-blue-600 text-black sticky p-4 font-bold text-center flex items-center justify-center gap-2">
        <BeachAccessIcon fontSize="large" />
          Let's Plan Your Dream Vacation!
          <FlightTakeoffIcon fontSize="large" />
        </div>
        <div className="flex-grow overflow-y-auto">
          <MessageList messages={messageHistory} />
        </div>
          <div className=" border-gray-300 bg-white sticky bottom-0">
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    );
  }
