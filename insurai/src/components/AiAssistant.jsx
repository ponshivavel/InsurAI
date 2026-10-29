import React, { useState } from 'react';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAssistant = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="ai-assistant" onClick={toggleAssistant} title="AI Assistant">
                <span className="ai-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                        <circle cx="12" cy="5" r="2"></circle>
                        <path d="M12 7v4"></path>
                        <line x1="8" y1="16" x2="8" y2="16"></line>
                        <line x1="16" y1="16" x2="16" y2="16"></line>
                    </svg>
                </span>
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
