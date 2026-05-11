import React from 'react';
import './BackgroundSystem.css';

const BackgroundSystem = () => {
  return (
    <div className="app-bg">
      <div className="gradient-sphere sphere-1"></div>
      <div className="gradient-sphere sphere-2"></div>
      <div className="gradient-sphere sphere-3"></div>
      <div className="gradient-sphere sphere-4"></div>
      <div className="gradient-sphere sphere-5"></div>
      <div className="stars-overlay"></div>
    </div>
  );
};

export default BackgroundSystem;
