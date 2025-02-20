import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://soulmegle-backend.onrender.com/");

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit("sendMessage", message);
        setMessage("");
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
