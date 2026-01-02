import React, { useState } from 'react';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAssistant = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="ai-assistant" onClick={toggleAssistant}>
                <span className="ai-icon">🤖</span>
            </div>

            {isOpen && (
                <div className="ai-chat-panel">
                    <div className="ai-chat-header">
                        <h4>AI Assistant</h4>
                        <button onClick={toggleAssistant}>×</button>
                    </div>
                    <div className="ai-chat-messages">
                        <div className="ai-message ai-message-bot">
                            Hello! I'm your AI insurance assistant. How can I help you today?
                        </div>
                    </div>
                    <div className="ai-chat-input">
                        <input type="text" placeholder="Ask me anything about insurance..." />
                        <button>Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AiAssistant;
