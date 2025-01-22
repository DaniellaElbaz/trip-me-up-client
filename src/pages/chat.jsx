import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Chatbox from "../comp/chatbox";

function Chat(){
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          navigate("/login", { state: { from: { pathname: window.location.pathname } } });
        }
      }, [navigate]);
      
    return(
        <Chatbox />
    );
}

export default Chat