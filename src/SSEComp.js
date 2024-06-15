import React, { useState, useEffect } from 'react';

const SSEComponent = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/events');

        eventSource.onmessage = function(event) {
            const newMessage = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        eventSource.onerror = function(err) {
            console.error('EventSource failed:', err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h2>Server-Sent Events Demo</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p>{msg.message}</p>
                        <small>{msg.timestamp}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SSEComponent;
