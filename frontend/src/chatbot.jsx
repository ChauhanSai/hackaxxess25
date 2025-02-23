import React, { useState } from "react";
import "./styles/chatbot.css";

let context = ["Hi!", "hello"]

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      
      // Call API here
      context = JSON.stringify(context)
      try {
      const response = await fetch("http://127.0.0.1:5001//api/chatbot?username=admin&context=" + context + "&prompt="+input, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Chat successful:", data);
        let message = data.substring(14, data.indexOf("'context'") - 2)
        // let context2 = data.substring(data.indexOf("'context'") + 11, data.length - 1)
        // context2 = context2.replace(/', '/g, '", "').replace(/\['/g, '\["').replace(/'\]/g, '"\]')
        // console.log("context2:", context2)
        // context = JSON.parse(context2)
        // console.log("message:", context)
        setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: message },
        ]);
      }, 1000);
        
        // Handle successful registration (e.g., redirect to login page)
      } else {
        console.error("Chat failed:", response.statusText);
        // Handle registration failure (e.g., show error message)
        context = ["Hi!", "hello"]
      }
    } catch (error) {
      console.error("Error during chat:", error);
      // Handle network or other errors
      context = ["Hi!", "hello"]
    }
}

      
    }

  return (

      <div className="chatbot-container">

        <div className="chatbot-title">Meet NomBot</div>
        <div className="chatbot-box">

          <div className="chat-history">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              className="chat-input-bar"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="chat-input-button" onClick={handleSendMessage}>Send</button>
          </div>

        </div>

      </div>

  );
};

export default ChatBot;