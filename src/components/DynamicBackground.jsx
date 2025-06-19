import React, { useEffect, useRef } from 'react';
import { createCosmicScene } from '../utils/cosmicAnimations'; // Add to existing imports

// Add parallax movement and texture
const generateMountainRange = (points, width, height, heightFactor) => {
  const range = [];
  const segmentWidth = width / (points - 1);
  range.push({ x: 0, y: height });
  
  // Create more natural peaks
  for (let i = 0; i < points; i++) {
    const peakHeight = (Math.random() * 0.6 + 0.4) * height * heightFactor;
    const peakVariation = Math.sin(i / points * Math.PI) * 0.3 + 0.7;
    range.push({
      x: i * segmentWidth,
      y: height - peakHeight * peakVariation
    });
  }
  
  range.push({ x: width, y: height });
  return range;
};

const DynamicBackground = ({ conversationDepth, mood, theme }) => {
  const canvasRef = useRef(null);

  // Memoize mountain layers based on theme
  const mountainLayers = React.useMemo(() => [
    { // Distant mountains
      points: 5,
      heightFactor: 0.4,
      movementFactor: 0.1,
      color: theme === 'dark' ? '#1a1a1a' : 
             theme === 'light' ? '#d0d0d0' : '#c9b288'
    },
    { // Mid-distance mountains
      points: 7,
      heightFactor: 0.6,
      movementFactor: 0.3,
      color: theme === 'dark' ? '#2c2c2c' : 
             theme === 'light' ? '#e0e0e0' : '#d4c19a'
    },
    { // Foreground mountains
      points: 9,
      heightFactor: 0.8,
      movementFactor: 0.5,
      color: theme === 'dark' ? '#3d3d3d' : 
             theme === 'light' ? '#f0f0f0' : '#e6d8b5'
    }
  ], [theme]);

  // Memoize mountain ranges based on conversationDepth and theme
  const mountainRanges = React.useMemo(() => {
    const width = canvasRef.current?.width || window.innerWidth;
    const height = canvasRef.current?.height || window.innerHeight;
    return mountainLayers.map(layer => {
      const movementX = conversationDepth * layer.movementFactor * 0.5;
      const movementY = mood * conversationDepth * layer.movementFactor * 2;
      return {
        ...layer,
        range: generateMountainRange(
          layer.points,
          width,
          height,
          layer.heightFactor
        ),
        movementX,
        movementY
      };
    });
  }, [conversationDepth, theme, mood, mountainLayers]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // KEEP ONLY DARK AND COSMIC BACKGROUNDS:
    if (theme === 'dark') {
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, width, height);

      // Draw stars for dark theme
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * (height * 0.4);
        const size = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw mood glow BEFORE mountains
    if (mood !== 0) {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height,
        0,
        width / 2,
        height,
        Math.min(width, height) * 0.8
      );

      if (mood > 0) {
        gradient.addColorStop(0, `rgba(201, 162, 39, ${Math.abs(mood) * 0.1})`);
        gradient.addColorStop(1, 'transparent');
      } else {
        gradient.addColorStop(0, `rgba(55, 90, 127, ${Math.abs(mood) * 0.1})`);
        gradient.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Draw mountain layers using memoized ranges
    mountainRanges.forEach(({ range, color, movementX, movementY }) => {
      ctx.beginPath();
      ctx.moveTo(range[0].x + movementX, range[0].y + movementY);
      for (let i = 1; i < range.length; i++) {
        ctx.lineTo(
          range[i].x + movementX,
          range[i].y + movementY
        );
      }
      ctx.closePath();

      // Add texture with subtle noise
      ctx.fillStyle = color;
      ctx.fill();

      // Add ridge lines
      ctx.strokeStyle = theme === 'dark' ? '#00000030' : '#ffffff30';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Add cosmic scene if theme is 'cosmic'
    if (theme === 'cosmic') {
      createCosmicScene(ctx, width, height, conversationDepth, mood);
    }
  }, [conversationDepth, mood, theme, mountainRanges]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up texture canvas
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dynamic-background"
      aria-hidden="true"
    />
  );
};

export default DynamicBackground;