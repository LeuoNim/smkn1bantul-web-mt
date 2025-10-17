import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    // We can use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 bg-gray-900 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(25,33,52,0.8),rgba(13,17,23,1))]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(59 130 246 / 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(59 130 246 / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* --- ANIMATED GLOWS WITH ENHANCED MOVEMENT --- */}
        <div
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse transition-transform duration-500 ease-out"
          style={{
            // The 'will-change' property hints to the browser for optimization
            willChange: 'transform',
            // Combines vertical, horizontal, and rotation movement
            transform: `
              translateY(${scrollY * 0.2}px)
              translateX(${scrollY * 0.15}px)
              rotate(${scrollY * 0.02}deg)
            `
          }}
        />
        <div
          className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000 transition-transform duration-500 ease-out"
          style={{
            willChange: 'transform',
            // Moves in opposite directions for a more dynamic effect
            transform: `
              translateY(-${scrollY * 0.1}px)
              translateX(-${scrollY * 0.12}px)
              rotate(-${scrollY * 0.03}deg)
            `
          }}
        />
      </div>
      
      <Navbar />
      <main className="flex-grow pt-6 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}