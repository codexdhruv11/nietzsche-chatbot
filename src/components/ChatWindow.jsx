import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import SendIcon from '@mui/icons-material/Send';
import MoodGraph from './MoodGraph';
import ExportPDFButton from './ExportPDFButton';
import { analyzeSentiment } from '../utils/sentiment';
import { glossary } from '../utils/glossary';

const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = "user-" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const ChatWindow = ({ theme, onMessageSent, onMoodChange }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [moodData, setMoodData] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const messageToSend = inputValue;
    setMessages(prev => [...prev, { text: messageToSend, isUser: true }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: getSessionId(),
          message: messageToSend
        })
      });

      const data = await response.json();
      const botMessage = data.reply;

      // Analyze mood from bot response
      const sentiment = analyzeSentiment(botMessage);
      setMoodData(prev => [...prev, sentiment]);
      onMoodChange?.(sentiment);
      onMessageSent?.();

      setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Error: The abyss gazes back... Please try again later.",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Mood graph */}
      {moodData.length > 0 && <MoodGraph moodData={moodData} />}

      <div className="messages-window">
        {/* Messages remain here */}
        {messages.map((msg, index) => (
          <MessageBubble 
            key={index}
            message={msg.text}
            isUser={msg.isUser}
            theme={theme}
          />
        ))}
        {isLoading && (
          <div className="message-bubble bot">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* PDF export button */}
      <ExportPDFButton messages={messages} theme={theme} />

      {/* Input area */}
      <form onSubmit={handleSubmit} className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What would you ask Nietzsche?"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()}>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
