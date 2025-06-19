import React from 'react';

const MarkdownRenderer = ({ content }) => {
  if (!content) return null;

  // Convert Markdown to HTML-like elements
  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h3 key={i}>{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i}>{line.substring(3)}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={i}>{line.substring(2)}</h1>;
      }
      
      // Lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={i}>{line.substring(2)}</li>;
      }
      
      // Bold text
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (boldRegex.test(line)) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i}>
            {parts.map((part, j) => 
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
          </p>
        );
      }
      
      // Default paragraph
      return <p key={i}>{line}</p>;
    });
  };

  return <div className="markdown-content">{renderMarkdown(content)}</div>;
};

export default MarkdownRenderer;