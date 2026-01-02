import React, { useState, useEffect } from 'react';
import aiassist from '../assets/aiassist.png';

const VoiceRecognition = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
  }, []);

  const handleVoiceCommand = (command) => {
    if (onCommand) {
      onCommand(command);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  return (
    <div className="floating-ai-assist">
      <img
        src={aiassist}
        alt="AI Assist"
        onClick={isListening ? stopListening : startListening}
        className={`ai-assist-button ${isListening ? 'listening' : ''}`}
        title={isListening ? 'Listening...' : 'Click for voice recognition'}
      />
    </div>
  );
};

export default VoiceRecognition;
