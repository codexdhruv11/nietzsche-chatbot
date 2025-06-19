import React from 'react';
import TooltipGlossary from './TooltipGlossary';
import { glossary } from '../utils/glossary';
import MarkdownRenderer from './MarkdownRenderer'; // Add this import

const MessageBubble = ({ message, isUser, theme }) => {
  // Highlight known philosophical terms
  const renderWithGlossary = (text) => {
    const terms = Object.keys(glossary);
    const parts = [];
    let lastIndex = 0;
    
    // Sort terms by length to avoid partial matches (e.g., "will" in "will to power")
    const sortedTerms = [...terms].sort((a, b) => b.length - a.length);
    let regex = new RegExp(`\\b(${sortedTerms.join('|')})\\b`, 'gi');
    let match;
    let textToProcess = text;
    let offset = 0;

    while ((match = regex.exec(textToProcess)) !== null) {
      if (match.index > lastIndex) {
        parts.push(textToProcess.substring(lastIndex, match.index));
      }
      parts.push(
        <TooltipGlossary key={offset + match.index} term={match[0]}>
          {match[0]}
        </TooltipGlossary>
      );
      lastIndex = regex.lastIndex;
      offset = lastIndex;
    }
    if (lastIndex < textToProcess.length) {
      parts.push(textToProcess.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  // Detect profound quotes (simple heuristic)
  const isProfound = message.length > 60 && (message.includes('"') || message.includes('—'));
  
  const renderContent = () => (
    <div className="bubble-content">
      {/* Replace direct rendering with MarkdownRenderer */}
      <MarkdownRenderer content={message} />
    </div>
  );

  // Add a container for better width management
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className={`message-bubble ${isUser ? 'user' : 'bot'} fade-in`} style={{
        maxWidth: isUser ? '80%' : '90%', // Allow bot messages to be wider
        alignSelf: isUser ? 'flex-end' : 'flex-start'
      }}>
        {isProfound ? (
          <div className="profound-quote">
            {renderContent()}
          </div>
        ) : renderContent()}
        
        {!isUser && theme === 'cosmic' && (
          <div className="star-dust" style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, #c9a227 0%, transparent 70%)',
            opacity: 0.7,
            zIndex: -1
          }} />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
