import { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function Chatbox() {

  const [messages, setMessages] = useState([
    { id: 1, type: 'incoming', text: 'Hello! How can I help you?' },
    { id: 2, type: 'outgoing', text: 'hii' },
  ]);

  const sendMessage = (text) => {

    const newMessage = { id: Date.now(), type: 'outgoing', text };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'incoming',
        text: `You said: "${text}". Let me help!`,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-md h-[600px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mx-auto my-10">
      {}
      <MessageList messages={messages} />
      {}
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

