import React, { useState, useRef, useEffect } from 'react';
import { glossary } from '../utils/glossary';

const TooltipGlossary = ({ children, term }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setShowTooltip(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowTooltip(false);
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showTooltip]);

  if (!glossary[term]) return children;

  return (
    <span className="glossary-term" style={{ position: 'relative', display: 'inline-block' }}>
      <span
        onClick={() => setShowTooltip(!showTooltip)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setShowTooltip(!showTooltip);
          if (e.key === 'Escape') setShowTooltip(false);
        }}
        role="button"
        tabIndex={0}
        aria-expanded={showTooltip}
        aria-controls={`tooltip-${term}`}
        style={{ 
          textDecoration: 'underline dotted',
          cursor: 'pointer'
        }}
      >
        {children}
      </span>
      {showTooltip && (
        <div
          id={`tooltip-${term}`}
          ref={tooltipRef}
          className="glossary-tooltip"
          role="tooltip"
          style={{
            position: 'absolute',
            background: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            zIndex: 1000,
            maxWidth: '300px',
            fontSize: '0.9rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            left: 0,
            top: '110%'
          }}
        >
          <strong>{term}:</strong> {glossary[term]}
        </div>
      )}
    </span>
  );
};

export default TooltipGlossary;