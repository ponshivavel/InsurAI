import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import aiassist from '../assets/aiassist.png';

const VoiceRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
    const [supportError, setSupportError] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRec) {
            setSupportError('Web Speech API is not supported in this browser. Please use keyboard navigation.');
            return;
        }

        const instance = new SpeechRec();
        instance.continuous = false;
        instance.interimResults = false;
        instance.lang = 'en-US';

        instance.onstart = () => {
            setIsListening(true);
            setFeedback('Listening for voice commands...');
        };

        instance.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            setRecognizedText(transcript);
            processCommand(transcript);
        };

        instance.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                setFeedback('Microphone permission was denied. Please allow microphone in browser.');
            } else {
                setFeedback('Voice recognition error: ' + event.error);
            }
        };

        instance.onend = () => {
            setIsListening(false);
        };

        setRecognition(instance);
    }, [navigate]);

    const processCommand = (cmd) => {
        setFeedback(`Heard: "${cmd}"`);

        if (cmd.includes('dashboard') || cmd.includes('home')) {
            setFeedback('Navigating to Dashboard...');
            navigate('/dashboard');
        } else if (cmd.includes('appointment') || cmd.includes('book') || cmd.includes('consultation')) {
            setFeedback('Navigating to Appointments...');
            navigate('/appointments');
        } else if (cmd.includes('policy') || cmd.includes('policies') || cmd.includes('renew')) {
            setFeedback('Navigating to Policy Management...');
            navigate('/renew-policies');
        } else if (cmd.includes('transaction') || cmd.includes('payment') || cmd.includes('history')) {
            setFeedback('Showing Transaction History on Dashboard...');
            navigate('/dashboard');
        } else if (cmd.includes('notification') || cmd.includes('alert') || cmd.includes('message')) {
            setFeedback('Navigating to Notifications...');
            navigate('/notifications');
        } else if (cmd.includes('plan') || cmd.includes('guideline') || cmd.includes('rule')) {
            setFeedback('Navigating to Plans & Guidelines...');
            navigate('/plan-information');
        } else if (cmd.includes('agent') || cmd.includes('support') || cmd.includes('help')) {
            setFeedback('Navigating to Agent Management & Support...');
            navigate('/agent-management');
        } else if (cmd.includes('document') || cmd.includes('download')) {
            setFeedback('Navigating to Document Downloads...');
            navigate('/download-documents');
        } else {
            setFeedback(`Command "${cmd}" not recognized. Try "Open dashboard", "Show policies", "Open appointments", etc.`);
        }

        setTimeout(() => {
            setFeedback('');
        }, 4000);
    };

    const toggleListening = () => {
        if (!recognition) return;
        if (isListening) {
            recognition.stop();
        } else {
            setRecognizedText('');
            setFeedback('Requesting microphone access...');
            recognition.start();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px'
        }}>
            {(feedback || recognizedText || supportError) && (
                <div style={{
                    backgroundColor: '#0f2a4a',
                    color: '#ffffff',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    maxWidth: '300px',
                    lineHeight: '1.4'
                }}>
                    {supportError ? (
                        <div style={{ color: '#fca5a5' }}>{supportError}</div>
                    ) : (
                        <>
                            <div style={{ fontWeight: '600', color: '#38bdf8' }}>AI Voice Assistant</div>
                            <div>{feedback}</div>
                            {recognizedText && (
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                                    Understood: "{recognizedText}"
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            <button
                onClick={toggleListening}
                style={{
                    backgroundColor: isListening ? '#ef4444' : '#0f2a4a',
                    border: '2px solid #ffffff',
                    borderRadius: '50px',
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 16px rgba(15, 42, 74, 0.3)',
                    transition: 'all 0.2s ease',
                    transform: isListening ? 'scale(1.05)' : 'scale(1)'
                }}
                title={isListening ? 'Listening... click to stop' : 'Click to speak navigation command'}
            >
                <img
                    src={aiassist}
                    alt="AI Assist"
                    style={{ width: '22px', height: '22px', borderRadius: '50%' }}
                />
                <span>{isListening ? 'Listening...' : 'Voice AI'}</span>
            </button>
        </div>
    );
};

export default VoiceRecognition;
