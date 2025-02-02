import { useEffect } from "react";
import Chatbox from "../comp/chatbox";

function Chat(){   
    useEffect(() => {
        document.title = "Trip me up! - Chat Assitant";
      }, []);   
    return(
        <Chatbox />
    );
}

export default Chat