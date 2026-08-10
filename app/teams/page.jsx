'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamSection from '../components/TeamSection';

export default function TeamsPage() {
  return (
    <div className="relative min-h-screen bg-[#090D2B] flex flex-col justify-between overflow-x-hidden font-display noise-overlay">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-80" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(238,75,21,0.06),transparent_50%)] pointer-events-none z-0" />
      
      {/* Navbar */}
      <Navbar />

      {/* Main Core Team Section only */}
      <main className="relative z-10 flex-1 pt-24 sm:pt-28 pb-16">
        <TeamSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}