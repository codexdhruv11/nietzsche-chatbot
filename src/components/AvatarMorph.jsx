import React, { useEffect, useRef } from 'react';

const AvatarMorph = ({ mood, theme }) => {
  const imagePath = "/NT.jpeg";

  return (
    <div className="avatar-container" style={{ position: 'relative' }}>
      <img 
        src={imagePath} 
        alt="Nietzsche avatar" 
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: `2px solid ${theme === 'cosmic' ? '#c9a227' : '#c9a227'}`,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
        }}
      />
    </div>
  );
};

export default AvatarMorph;