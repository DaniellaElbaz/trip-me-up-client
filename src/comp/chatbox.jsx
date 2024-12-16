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
    <div className="flex flex-col w-full h-screen bg-white shadow-lg overflow-hidden">
      <div className="bg-gray-800 text-white text-center p-4 font-bold">
        Chat Assistant
      </div>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

