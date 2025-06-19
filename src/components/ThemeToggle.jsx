import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import DescriptionIcon from '@mui/icons-material/Description';
import StarsIcon from '@mui/icons-material/Stars'; // Add this import

const ThemeToggle = ({ theme, toggleTheme }) => {
  const getIcon = () => {
    switch(theme) {
      case 'dark': return <StarsIcon />; // Switch to cosmic
      case 'cosmic': return <WbSunnyIcon />; // Switch to dark
      default: return <WbSunnyIcon />;
    }
  };

  const getLabel = () => {
    switch(theme) {
      case 'dark': return "Switch to cosmic mode";
      case 'cosmic': return "Switch to dark mode";
      default: return "Toggle theme";
    }
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={getLabel()}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;