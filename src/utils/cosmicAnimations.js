export const createCosmicScene = (ctx, width, height, depth, mood) => {
  // Cosmic gradient background
  const gradient = ctx.createRadialGradient(
    width/2, height/2, 0,
    width/2, height/2, Math.max(width, height)/2
  );
  
  gradient.addColorStop(0, '#0c1445');
  gradient.addColorStop(0.5, '#2c1a4a');
  gradient.addColorStop(1, '#000000');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Stars
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 1.5;
    const opacity = 0.5 + Math.random() * 0.5;
    
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  
  // Galaxy spirals
  ctx.beginPath();
  ctx.moveTo(width/2, height/2);
  for (let i = 0; i < 500; i++) {
    const angle = 0.1 * i;
    const distance = 5 * i + 10 * Math.sin(0.1 * i + depth/10);
    const x = width/2 + distance * Math.cos(angle);
    const y = height/2 + distance * Math.sin(angle);
    
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `hsla(${280 + mood * 20}, 70%, 50%, 0.3)`;
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Übermensch silhouette path
  const pathPoints = [];
  for (let i = 0; i < 50; i++) {
    const x = (width/50) * i;
    const y = height/2 + 100 * Math.sin(i/5 + depth/20);
    pathPoints.push({x, y});
  }
  
  // Draw silhouette
  ctx.beginPath();
  ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
  for (let i = 1; i < pathPoints.length; i++) {
    ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
  }
  
  ctx.lineWidth = 3;
  ctx.strokeStyle = `rgba(201, 162, 39, ${0.5 + Math.abs(mood)/2})`;
  ctx.stroke();
  
  // Draw walking figure (simplified)
  const walkerIndex = Math.floor((depth % 100) / 2);
  if (pathPoints[walkerIndex]) {
    const {x, y} = pathPoints[walkerIndex];
    ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y - 20, 8, 0, Math.PI * 2); // Head
    ctx.moveTo(x, y - 12);
    ctx.lineTo(x, y + 10); // Body
    ctx.moveTo(x - 10, y);
    ctx.lineTo(x + 10, y); // Arms
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x - 8, y + 25); // Legs
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x + 8, y + 25);
    ctx.stroke();
  }
};