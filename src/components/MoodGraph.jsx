import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MoodGraph = ({ moodData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (!chartRef.current || moodData.length === 0) return;
    
    const ctx = chartRef.current.getContext('2d');
    
    // Destroy previous instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: moodData.map((_, i) => `Msg ${i+1}`),
        datasets: [{
          label: 'Philosophical Sentiment',
          data: moodData,
          borderColor: '#c9a227',
          backgroundColor: 'rgba(201, 162, 39, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow custom sizing
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { min: -1, max: 1 }
        }
      }
    });
    
    // Handle resize
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [moodData]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    });
    
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);

  // Return a container that uses full width
  return moodData.length > 0 ? (
    <div style={{ position: 'relative', height: '150px', width: '100%' }}>
      <canvas ref={chartRef} aria-label="Conversation mood graph" />
    </div>
  ) : null;
};

export default MoodGraph;