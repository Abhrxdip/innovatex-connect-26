'use client';

import React, { useState } from 'react';

// Beautiful inline SVG Icons
const Icons = {
  Home: () => (
    <svg className="w-4 h-4 mr-1.5 opacity-80 transition-colors group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Speakers: () => (
    <svg className="w-4 h-4 mr-1.5 opacity-80 transition-colors group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Agenda: () => (
    <svg className="w-4 h-4 mr-1.5 opacity-80 transition-colors group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  About: () => (
    <svg className="w-4 h-4 mr-1.5 opacity-80 transition-colors group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Ticket: ({ className = "w-4 h-4" }) => (
    <svg className={`${className} mr-1.5 opacity-90 transition-colors group-hover:text-indigo-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Sparkle: () => (
    <svg className="w-6 h-6 text-purple-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  ),
};

export default function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative min-h-screen bg-white bg-grid-pattern flex flex-col justify-between overflow-hidden">
      
      {/* Soft Radial Blue/Purple Glows - Adjusted for Light Theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/20 blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-200/15 blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full bg-cyan-100/20 blur-[120px] pointer-events-none" />

      {/* Header / Navigation */}
      <header className="w-full flex justify-center pt-8 px-4 z-50">
        <nav className="glass-nav flex items-center px-4 py-2 rounded-full text-sm font-semibold text-slate-600">
          <a href="#home" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 transition-colors">
            <Icons.Home />
            <span>Home</span>
          </a>
          <a href="#speakers" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 transition-colors">
            <Icons.Speakers />
            <span>Speakers</span>
          </a>
          <a href="#agenda" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 transition-colors">
            <Icons.Agenda />
            <span>Agenda</span>
          </a>
          <a href="#about" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 transition-colors">
            <Icons.About />
            <span>About</span>
          </a>
          <a href="#ticket" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 transition-colors">
            <Icons.Ticket />
            <span>Ticket</span>
          </a>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-16 z-20">
        
        {/* Left Side Content */}
        <div className="flex-1 flex flex-col items-start gap-8 max-w-xl text-left">
          
          {/* Slogan with sparkle */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Step in, become an <br />
              <span className="text-gradient-neon relative">
                AI-native founder
                <span className="absolute -right-8 top-1">
                  <Icons.Sparkle />
                </span>
              </span>
            </h1>
          </div>

          {/* Date and Location Panel - Light Card styling */}
          <div className="flex flex-wrap items-center gap-6 mt-2">
            
            {/* Date Block */}
            <div className="flex items-center">
              <div className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.03)] flex items-center justify-center">
                <Icons.Calendar />
              </div>
              <div className="ml-3">
                <p className="text-slate-800 font-bold text-lg leading-tight">May 30,31</p>
                <p className="text-slate-500 text-sm leading-tight mt-0.5">36 Hours</p>
              </div>
            </div>

            {/* Separator Line */}
            <div className="hidden sm:block h-10 w-px bg-slate-200" />

            {/* Venue Block */}
            <div className="flex items-center">
              
              {/* Host Logo: Sleek overlapping geometric SVG */}
              <div className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.03)] flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="8" height="8" rx="1.5" className="animate-pulse" />
                  <rect x="13" y="13" width="8" height="8" rx="1.5" />
                  <path d="M13 3l8 8M3 13l8 8" strokeLinecap="round" />
                </svg>
              </div>
              
              <div className="ml-3">
                <p className="text-slate-800 font-bold text-lg leading-tight">Lead College</p>
                <p className="text-slate-500 text-sm leading-tight mt-0.5">Palakkad, KL</p>
              </div>
            </div>

          </div>

          {/* Slogan highlight row - matches reference screenshot light purple/blue style */}
          <div className="flex items-start gap-3 mt-4 bg-indigo-50/80 border border-indigo-100/60 rounded-2xl p-4 w-full">
            <div className="text-indigo-600 mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-indigo-900 font-extrabold text-xs uppercase tracking-wider leading-relaxed">
              KERALA&apos;S FIRST TWO DAYS RESIDENTIAL STARTUP CARNIVAL.
            </p>
          </div>

        </div>

        {/* Right Side Ticket Stack and CTA */}
        <div className="flex-1 flex flex-col items-center justify-center gap-12 w-full max-w-lg">
          
          {/* Ticket Stack Container */}
          <div 
            className="relative w-full max-w-[420px] h-[240px] flex items-center justify-center cursor-pointer select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            
            {/* Ticket 3 (Back) */}
            <div 
              className={`absolute w-[360px] h-[200px] rounded-3xl border border-white/5 bg-slate-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out origin-center
                ${hovered ? '-translate-x-12 -translate-y-6 rotate-[-10deg] scale-95 opacity-50' : 'rotate-[-6deg] scale-[0.92] opacity-40'}
                animate-float-ticket-1`}
              style={{ zIndex: 10 }}
            >
              {/* Dark ticket grid pattern */}
              <div className="absolute inset-0 bg-ticket-grid opacity-10 rounded-3xl" />
            </div>

            {/* Ticket 2 (Middle) */}
            <div 
              className={`absolute w-[360px] h-[200px] rounded-3xl border border-indigo-500/10 bg-slate-950/80 shadow-[0_25px_60px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out origin-center
                ${hovered ? '-translate-x-4 -translate-y-3 rotate-[-4deg] scale-[0.98] opacity-75' : 'rotate-[-3deg] scale-[0.96] opacity-70'}
                animate-float-ticket-2`}
              style={{ zIndex: 20 }}
            >
              {/* Dark ticket grid pattern */}
              <div className="absolute inset-0 bg-ticket-grid opacity-20 rounded-3xl" />
            </div>

            {/* Ticket 1 (Top / Front Active Ticket) */}
            <div 
              className={`absolute w-[370px] h-[210px] rounded-[28px] border border-indigo-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-[0_30px_70px_rgba(79,70,229,0.15)] transition-all duration-500 ease-out origin-center overflow-visible
                ${hovered ? 'translate-x-8 translate-y-3 rotate-[5deg] scale-[1.04]' : 'rotate-[1deg] scale-100'}
                animate-float-ticket-3`}
              style={{ zIndex: 30 }}
            >
              
              {/* Dark ticket grid pattern */}
              <div className="absolute inset-0 bg-ticket-grid opacity-50 rounded-[28px]" />

              {/* Glowing card overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 rounded-[28px] pointer-events-none" />

              {/* Card notches (cutouts) - White in light theme to blend with background */}
              {/* Top notch */}
              <div className="absolute -top-3.5 left-[72%] w-7 h-7 rounded-full bg-white border-b border-indigo-500/20 z-40" />
              {/* Bottom notch */}
              <div className="absolute -bottom-3.5 left-[72%] w-7 h-7 rounded-full bg-white border-t border-indigo-500/20 z-40" />

              {/* Ticket content split */}
              <div className="flex h-full w-full relative z-10 p-5 items-stretch">
                
                {/* Left Section (72%) */}
                <div className="w-[72%] pr-4 flex flex-col justify-between">
                  
                  {/* Top logo header */}
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-2.5 h-2.5 bg-indigo-400 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-white rounded-sm" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Carnival</span>
                  </div>

                  {/* Main Ticket Heading */}
                  <div className="my-auto">
                    <h2 className="text-xl font-black text-white tracking-tight leading-none mt-1">
                      Kerala Startup <br />
                      <span className="text-indigo-400 text-lg">Carnival 2026</span>
                    </h2>
                  </div>

                  {/* Footer details */}
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>MAY 30-31</span>
                    <span className="text-indigo-400 font-extrabold">NO. 1024-26</span>
                  </div>

                </div>

                {/* Vertical Divider (Dashed) */}
                <div className="w-px border-l-2 border-dashed border-white/10 h-full relative" />

                {/* Right Section (28%) */}
                <div className="w-[28%] pl-4 flex flex-col justify-between items-center text-center">
                  
                  {/* Vertically rotated badge */}
                  <div className="text-[10px] font-black text-purple-400 tracking-[0.25em] uppercase rotate-90 my-auto whitespace-nowrap">
                    VIP PASS
                  </div>
                  
                  <div className="text-[11px] font-extrabold text-white/80 tracking-wider">
                    Edex
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Action buttons (Sold Out & community join) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6">
            
            {/* SOLD OUT Button - Dark theme button to match screenshot exactly */}
            <button className="relative group overflow-hidden bg-[#1E1B4B] hover:bg-[#312E81] text-white border border-[#4338CA] px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_10px_25px_rgba(30,27,75,0.2)] flex items-center justify-center gap-2 w-full sm:w-auto">
              <span className="relative z-10 uppercase tracking-widest">SOLD OUT</span>
              <Icons.Ticket className="w-4 h-4 text-white" />
              {/* Inner glowing pulse */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {/* Community Join Box - Light card styling with green text */}
            <a 
              href="https://whatsapp.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-emerald-500/40 px-5 py-2.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2 mr-3.5">
                <div className="w-7 h-7 rounded-full border border-white bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">A</div>
                <div className="w-7 h-7 rounded-full border border-white bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">B</div>
                <div className="w-7 h-7 rounded-full border border-white bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[10px] font-bold text-white">C</div>
                <div className="w-7 h-7 rounded-full border border-white bg-slate-200 flex items-center justify-center text-[8px] font-black text-slate-600">+600</div>
              </div>
              
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold leading-none">JOIN OUR</span>
                <span className="text-xs text-emerald-600 font-bold leading-none mt-1 group-hover:text-emerald-500 transition-colors flex items-center">
                  WhatsApp community
                  <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>

          </div>

        </div>

      </main>

      {/* Scalloped edge footer division */}
      <footer className="w-full relative z-30 flex flex-col">
        {/* Scallop shape divider */}
        <div className="w-full h-3 scalloped-edge pointer-events-none" />
        {/* Ribbon bar below scallop (deep dark blue/purple gradient matching reference) */}
        <div className="w-full h-8 bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#1E1B4B]" />
      </footer>

    </div>
  );
}
