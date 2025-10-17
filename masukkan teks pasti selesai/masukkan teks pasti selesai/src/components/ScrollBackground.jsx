import React, { useEffect, useState, useCallback } from 'react';

const ScrollBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ 
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100 
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  useEffect(() => {
    // Update CSS custom properties for orb positions based on scroll and mouse
    const scrollPercent = Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
    const mouseInfluence = 0.1; // How much mouse affects orb movement
    
    // Calculate orb positions that move with scroll and respond to mouse
    const orb1X = 25 + (scrollPercent * 30) + ((mousePosition.x - 50) * mouseInfluence);
    const orb1Y = 25 + (Math.sin(scrollPercent * Math.PI * 2) * 15) + ((mousePosition.y - 50) * mouseInfluence);
    
    const orb2X = 75 - (scrollPercent * 25) + ((mousePosition.x - 50) * mouseInfluence * -0.5);
    const orb2Y = 75 + (Math.cos(scrollPercent * Math.PI * 3) * 20) + ((mousePosition.y - 50) * mouseInfluence * 0.8);
    
    const orb3X = 50 + (Math.sin(scrollPercent * Math.PI * 4) * 25) + ((mousePosition.x - 50) * mouseInfluence * 0.3);
    const orb3Y = 10 + (scrollPercent * 40) + ((mousePosition.y - 50) * mouseInfluence * -0.2);
    
    // Set CSS custom properties with bounds checking
    document.documentElement.style.setProperty('--orb1-x', `${Math.max(5, Math.min(95, orb1X))}%`);
    document.documentElement.style.setProperty('--orb1-y', `${Math.max(5, Math.min(95, orb1Y))}%`);
    document.documentElement.style.setProperty('--orb2-x', `${Math.max(5, Math.min(95, orb2X))}%`);
    document.documentElement.style.setProperty('--orb2-y', `${Math.max(5, Math.min(95, orb2Y))}%`);
    document.documentElement.style.setProperty('--orb3-x', `${Math.max(5, Math.min(95, orb3X))}%`);
    document.documentElement.style.setProperty('--orb3-y', `${Math.max(5, Math.min(95, orb3Y))}%`);
  }, [scrollY, mousePosition]);

  return (
    <>
      {/* Floating particles that move with scroll */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Main floating geometric shapes with mouse interaction */}
        <div 
          className="absolute w-4 h-4 border border-purple-400/30 rotate-45 floating-orb transition-all duration-300"
          style={{
            top: `${20 + (scrollY * 0.1) % 60 + (mousePosition.y - 50) * 0.05}%`,
            left: `${10 + (scrollY * 0.05) % 80 + (mousePosition.x - 50) * 0.03}%`,
            transform: `translateY(${scrollY * -0.3}px) rotate(${45 + scrollY * 0.1}deg)`,
            opacity: 0.6 + Math.sin(scrollY * 0.01) * 0.4,
          }}
        />
        
        <div 
          className="absolute w-6 h-6 rounded-full bg-purple-500/15 floating-orb transition-all duration-300"
          style={{
            top: `${40 + (scrollY * 0.08) % 50 + (mousePosition.y - 50) * 0.02}%`,
            right: `${15 + (scrollY * 0.07) % 70 - (mousePosition.x - 50) * 0.04}%`,
            transform: `translateY(${scrollY * -0.2}px) scale(${0.8 + Math.cos(scrollY * 0.008) * 0.3})`,
          }}
        />
        
        <div 
          className="absolute w-3 h-3 bg-pink-500/20 rotate-45 floating-orb transition-all duration-200"
          style={{
            top: `${60 + (scrollY * 0.06) % 30 - (mousePosition.y - 50) * 0.03}%`,
            left: `${30 + (scrollY * 0.04) % 60 + (mousePosition.x - 50) * 0.06}%`,
            transform: `translateY(${scrollY * -0.4}px) rotate(${45 + scrollY * 0.2}deg)`,
          }}
        />
        
        <div 
          className="absolute w-8 h-1 bg-gradient-to-r from-blue-500/15 to-transparent floating-orb transition-all duration-500"
          style={{
            top: `${80 + (scrollY * 0.03) % 15}%`,
            right: `${25 + (scrollY * 0.09) % 50}%`,
            transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * 0.5}deg)`,
          }}
        />
        
        <div 
          className="absolute w-5 h-5 border-2 border-pink-300/15 rounded-full floating-orb transition-all duration-300"
          style={{
            top: `${15 + (scrollY * 0.12) % 70}%`,
            left: `${70 + (scrollY * 0.06) % 25}%`,
            transform: `translateY(${scrollY * -0.25}px) scale(${0.5 + Math.sin(scrollY * 0.01) * 0.5})`,
          }}
        />

        {/* Grid lines that move subtly */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-1000"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${scrollY * -0.1}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/8 to-transparent" 
               style={{ transform: `translateX(${scrollY * 0.05}px)` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/6 to-transparent" 
               style={{ transform: `translateY(${scrollY * 0.03}px)` }} />
        </div>

        {/* Enhanced smaller particles with varied movements */}
        {Array.from({ length: 20 }, (_, i) => {
          const delay = i * 0.3;
          const speed = 0.05 + (i % 3) * 0.02;
          const size = 1 + (i % 4);
          const opacity = 0.1 + (i % 3) * 0.1;
          
          return (
            <div
              key={i}
              className={`absolute bg-purple-400/${Math.floor(opacity * 100)} rounded-full transition-all duration-500`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${(i * 8 + scrollY * speed) % 100}%`,
                left: `${(i * 7 + scrollY * (speed * 0.8)) % 100}%`,
                transform: `translateY(${scrollY * (-0.1 - i * 0.01)}px) rotate(${scrollY * (0.1 + i * 0.05)}deg)`,
                animationDelay: `${delay}s`,
                opacity: opacity + Math.sin(scrollY * 0.01 + i) * 0.2,
              }}
            />
          );
        })}
        
        {/* Floating lines that create depth */}
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-purple-400/12 to-transparent"
            style={{
              width: `${20 + i * 10}px`,
              height: '1px',
              top: `${20 + i * 15}%`,
              left: `${10 + (scrollY * (0.02 + i * 0.01)) % 80}%`,
              transform: `translateY(${scrollY * (-0.05 - i * 0.02)}px) rotate(${i * 15 + scrollY * 0.02}deg)`,
              opacity: 0.3 + Math.cos(scrollY * 0.005 + i) * 0.3,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ScrollBackground;