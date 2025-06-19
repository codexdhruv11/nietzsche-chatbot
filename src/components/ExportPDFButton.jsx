import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ExportPDFButton = ({ messages, theme }) => {
  // Parchment background with ink texture
  const parchmentBackground = `
    radial-gradient(circle, transparent 20%, #f5e9c9 20%, #f5e9c9 80%, transparent 80%, transparent),
    radial-gradient(circle, transparent 20%, #f5e9c9 20%, #f5e9c9 80%, transparent 80%, transparent) 50px 50px,
    linear-gradient(#d8c9a3 8px, transparent 8px),
    linear-gradient(90deg, #d8c9a3 8px, transparent 8px)
  `;
  
  // Wax seal base64 image
  const waxSeal = `
    data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iI2EzMjAyMCIvPjxwYXRoIGQ9Ik0zMCA0NSBDMzAgNjUgNTAgODAgODAgNjUgQzg1IDU1IDgwIDMwIDUwIDMwIEMzMCAzNSAyNSA1MCAzMCA0NSBaIiBmaWxsPSIjY2MxMDAwIi8+PHBhdGggZD0iTTQwIDUwIEM0NSA0NSA1NSA0NSA2MCA1MCBDNTUgNTUgNDUgNTUgNDAgNTAgWiIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5aPC90ZXh0Pjwvc3ZnPg==
  `;

  const generatePDF = async () => {
    // Add wax seal animation element
    const sealAnimation = document.createElement('div');
    sealAnimation.className = 'wax-seal';
    sealAnimation.style.position = 'fixed';
    sealAnimation.style.top = '50%';
    sealAnimation.style.left = '50%';
    sealAnimation.style.transform = 'translate(-50%, -50%)';
    sealAnimation.style.width = '200px';
    sealAnimation.style.height = '200px';
    sealAnimation.style.backgroundImage = `url(${waxSeal})`;
    sealAnimation.style.backgroundSize = 'contain';
    sealAnimation.style.backgroundRepeat = 'no-repeat';
    sealAnimation.style.zIndex = '9999';
    sealAnimation.style.pointerEvents = 'none';
    document.body.appendChild(sealAnimation);
    
    // Remove after animation completes
    setTimeout(() => {
      if (sealAnimation.parentNode) {
        document.body.removeChild(sealAnimation);
      }
    }, 1000);

    // Create a temporary container for PDF content
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.width = '800px';
    pdfContainer.style.padding = '40px';
    pdfContainer.style.background = '#121212'; // Always use dark background
    pdfContainer.style.color = '#e0e0e0'; // Always light text
    pdfContainer.style.fontFamily = "'monaco', 'monospace'";
    pdfContainer.style.border = '2px solid #c9a227'; // Cosmic gold border

    // Preload font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display&family=UnifrakturCook&display=swap';
    link.rel = 'stylesheet';
    pdfContainer.appendChild(link);

    // Add font style
    const fontStyle = document.createElement('style');
    fontStyle.textContent = `
      @font-face {
        font-family: 'Playfair Display';
        src: url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
      }
    `;
    pdfContainer.appendChild(fontStyle);
    
    // Add title
    const title = document.createElement('h1');
    title.textContent = 'Nietzschean Discourse';
    title.style.textAlign = 'center';
    title.style.fontSize = '2.5rem';
    title.style.marginBottom = '30px';
    title.style.borderBottom = '2px solid #7d5e34';
    title.style.paddingBottom = '10px';
    pdfContainer.appendChild(title);

    // Add date
    const date = document.createElement('div');
    date.textContent = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    date.style.textAlign = 'right';
    date.style.marginBottom = '20px';
    date.style.fontStyle = 'italic';
    pdfContainer.appendChild(date);

    // Add messages
    messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.style.marginBottom = '25px';
      messageDiv.style.padding = '15px';
      messageDiv.style.borderLeft = '3px solid #7d5e34';
      messageDiv.style.backgroundColor = msg.isUser 
        ? (theme === 'manuscript' ? '#e6d8b580' : '#e6e6e680') 
        : (theme === 'manuscript' ? '#d4c19a80' : '#f0f0f080');
      
      const author = document.createElement('div');
      author.textContent = msg.isUser ? 'You:' : 'Nietzsche:';
      author.style.fontWeight = 'bold';
      author.style.marginBottom = '8px';
      author.style.color = '#7d5e34';
      messageDiv.appendChild(author);
      
      const content = document.createElement('div');
      // Add message formatting for quotes
      content.innerHTML = msg.text.replace(/(&quot;.*?&quot;)/g, 
        '<span style="font-style:italic; font-family:Playfair Display, serif">$1</span>'
      );
      // Add overflow protection
      content.style.overflowWrap = 'break-word';
      content.style.maxWidth = '100%';
      content.style.fontSize = '1.2rem';
      content.style.lineHeight = '1.6';
      messageDiv.appendChild(content);
      
      pdfContainer.appendChild(messageDiv);
    });

    // Add wax seal
    const sealContainer = document.createElement('div');
    sealContainer.style.textAlign = 'center';
    sealContainer.style.marginTop = '30px';
    
    const seal = document.createElement('img');
    seal.src = waxSeal;
    seal.style.width = '80px';
    seal.style.height = '80px';
    seal.alt = 'Wax Seal';
    seal.onerror = () => {
      seal.src = ''; // Fallback to nothing if SVG fails
    };
    
    sealContainer.appendChild(seal);
    pdfContainer.appendChild(sealContainer);

    document.body.appendChild(pdfContainer);

    try {
      // Generate PDF
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Nietzschean_Discourse_${Date.now()}.pdf`);
      
    } catch (error) {
      console.error('PDF Error:', error);
      alert('Failed to generate PDF. The abyss gazes back...');
    } finally {
      // Ensure cleanup even on error
      if (pdfContainer.parentNode) {
        document.body.removeChild(pdfContainer);
      }
    }
  };

  return (
    <button 
      className="export-pdf-button"
      onClick={generatePDF}
      disabled={messages.length === 0}
      aria-label="Export conversation as PDF"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Save as Manuscript
    </button>
  );
};

export default ExportPDFButton;