'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamSection from '../components/TeamSection';

export default function TeamsPage() {
  return (
    <div className="relative min-h-screen bg-[#090D2B] flex flex-col justify-between overflow-x-hidden font-display noise-overlay">
      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Cyberpunk Top & Side Ambient Radial Glows */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(238,75,21,0.15),transparent_55%)] pointer-events-none z-0" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 bg-[#EE4B15]/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-1/4 -left-40 w-96 h-96 bg-[#D83A14]/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Futuristic Side HUD Line - Left */}
      <div className="fixed top-36 left-4 bottom-24 w-[1px] bg-gradient-to-b from-transparent via-[#EE4B15]/30 to-transparent pointer-events-none hidden lg:block z-0">
        <div className="absolute top-1/4 -left-1 w-2 h-2 bg-[#EE4B15] rotate-45 shadow-[0_0_8px_#EE4B15]" />
        <div className="absolute top-2/4 -left-1 w-2 h-2 border border-[#EE4B15]/60 rotate-45" />
      </div>

      {/* Futuristic Side HUD Line - Right */}
      <div className="fixed top-36 right-4 bottom-24 w-[1px] bg-gradient-to-b from-transparent via-[#EE4B15]/30 to-transparent pointer-events-none hidden lg:block z-0">
        <div className="absolute top-1/3 -right-1 w-2 h-2 bg-[#EE4B15] rotate-45 shadow-[0_0_8px_#EE4B15]" />
        <div className="absolute top-3/4 -right-1 w-2 h-2 border border-[#EE4B15]/60 rotate-45" />
      </div>

      {/* Navbar */}
  
      {/* Main Core Team Section */}
      <main className="relative z-10 flex-1 pt-24 sm:pt-28 pb-16">
        <TeamSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}