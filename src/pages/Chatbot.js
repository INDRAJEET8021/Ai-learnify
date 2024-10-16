// src/Chatbot.js
import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    // Here you would typically call your AI chatbot API
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <h2 className="text-2xl mt-10">Chat with AI</h2>
      <div className="border border-gray-300 rounded w-full max-w-md h-80 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`px-2 py-1 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-md mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 rounded flex-grow px-2"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded ml-2">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
