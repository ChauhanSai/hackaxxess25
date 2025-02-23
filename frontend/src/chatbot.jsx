import React from "react";
import "./styles/chatbot.css";

const ChatBot = () => {
    return (
        <div className="chatbot-wrapper">
            <div className="chatbot-container">
                <h1 className="chatbot-title">Meet NomBot</h1>
                <div className="chatbot-box"></div>
                <div className="chatbot-decoration"></div>
            </div>
        </div>
    );
};

export default ChatBot;
