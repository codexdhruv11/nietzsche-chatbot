import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ThemeToggle from './components/ThemeToggle';
import DynamicBackground from './components/DynamicBackground';
import AvatarMorph from './components/AvatarMorph';
import StarsIcon from '@mui/icons-material/Stars'; // Add StarsIcon import
import './styles/theme.css';
import './styles/animations.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [conversationDepth, setConversationDepth] = useState(0);
  const [mood, setMood] = useState(0);
  const [pulseAvatar, setPulseAvatar] = useState(false);

  useEffect(() => {
    if (mood !== 0) {
      setPulseAvatar(true);
      const timer = setTimeout(() => setPulseAvatar(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [mood]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Add this useEffect to handle animation cleanup
  useEffect(() => {
    return () => {
      // Clean up animation classes
      setPulseAvatar(false);
    };
  }, []);

  // Updated toggleTheme function
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'cosmic' : 'dark');
  };

  return (
    <div className={`app ${theme}`}>
      <DynamicBackground 
        conversationDepth={conversationDepth} 
        mood={mood} 
        theme={theme}
      />
      <div className="app-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        background: 'rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(201, 162, 39, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className={`avatar-container ${pulseAvatar ? 'pulse' : ''}`}>
            <AvatarMorph mood={mood} theme={theme} />
          </div>
          <div className="app-title" style={{
            fontSize: '2.2rem',
            color: 'var(--accent)',
            letterSpacing: '1px'
          }}>
            Nietzschean Discourse
          </div>
        </div>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      
      <ChatWindow 
        theme={theme} 
        onMessageSent={() => setConversationDepth(d => d + 1)}
        onMoodChange={setMood}
      />
    </div>
  );
}

export default App;
