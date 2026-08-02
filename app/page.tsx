'use client';

import React, { useState } from 'react';

// Beautiful inline SVG Icons
const Icons = {
  Home: () => (
    <svg className="w-4 h-4 mr-1.5 opacity-85 transition-colors group-hover:text-indigo-650" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Speakers: () => (
    <svg className="w-4 h-4 mr-1.5 opacity-85 transition-colors group-hover:text-indigo-650" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Agenda: () => (
    <svg className="w-4 h-4 mr-1.5 opacity-85 transition-colors group-hover:text-indigo-650" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  About: () => (
    <svg className="w-4 h-4 mr-1.5 opacity-85 transition-colors group-hover:text-indigo-650" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Ticket: ({ className = "w-4 h-4" }) => (
    <svg className={`${className} mr-1.5 opacity-90 transition-colors group-hover:text-indigo-650`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-6 h-6 text-indigo-655 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Sparkle: () => (
    <svg className="w-6 h-6 text-purple-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  ),
};

const speakersList = [
  {
    name: 'Shan Abdul Salam',
    role: 'FOUNDER, THE ECOM SHOW',
    desc: 'FOUNDER, THE ECOM SHOW',
  },
  {
    name: 'Mohammed Ajmal C',
    role: 'FOUNDER & CEO, XANDYLEARNING',
    desc: 'IIT MADRAS | EX-INTEL - FOUNDER AND CEO',
  },
  {
    name: 'Dr. Thomas George K.',
    role: 'PRESIDENT, LEAD GROUP OF INSTITUTIONS',
    desc: 'LEAD GROUP OF INSTITUTIONS',
  },
  {
    name: 'Rizwan Ramzan Ahamed',
    role: 'COFOUNDER & CEO, HACA',
    desc: 'COFOUNDER & CEO, HACA',
  },
  {
    name: 'Souma Deep',
    role: 'AI-NATIVE BUILDER',
    desc: 'INNOVATEX CONNECT 2026 MENTOR',
  },
];

export default function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative min-h-screen bg-white bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">
      
      {/* Soft Radial Blue/Purple Glows - Adjusted for Light Theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full bg-cyan-155/25 blur-[125px] pointer-events-none" />

      {/* Header / Navigation */}
      <header className="w-full flex justify-center pt-8 px-4 z-50">
        <nav className="glass-nav flex items-center px-4 py-2 rounded-full text-sm font-semibold text-slate-600">
          <a href="#home" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
            <Icons.Home />
            <span>Home</span>
          </a>
          <a href="#speakers" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
            <Icons.Speakers />
            <span>Speakers</span>
          </a>
          <a href="#agenda" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
            <Icons.Agenda />
            <span>Agenda</span>
          </a>
          <a href="#about" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
            <Icons.About />
            <span>About</span>
          </a>
          <a href="#ticket" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
            <Icons.Ticket />
            <span>Ticket</span>
          </a>
        </nav>
      </header>

      {/* Main Section */}
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-16 z-20">
        
        {/* Left Side Content */}
        <div className="flex-1 flex flex-col items-start gap-8 max-w-xl text-left">
          
          {/* Slogan with sparkle */}
          <div className="flex flex-col gap-3 font-display">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 leading-[1.12]">
              Step in, become an <br />
              <span className="text-gradient-neon relative font-extrabold">
                AI-native founder
                <span className="absolute -right-8 top-1.5">
                  <Icons.Sparkle />
                </span>
              </span>
            </h1>
          </div>

          {/* Date and Location Panel - Light Card styling */}
          <div className="flex flex-wrap items-center gap-6 mt-2 font-display">
            
            {/* Date Block */}
            <div className="flex items-center">
              <div className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.02)] flex items-center justify-center">
                <Icons.Calendar />
              </div>
              <div className="ml-3">
                <p className="text-slate-800 font-bold text-lg leading-none">May 30,31</p>
                <p className="text-slate-400 text-xs mt-1 leading-none font-semibold">36 Hours</p>
              </div>
            </div>

            {/* Separator Line */}
            <div className="hidden sm:block h-10 w-px bg-slate-200" />

            {/* Venue Block */}
            <div className="flex items-center">
              
              {/* Host Logo */}
              <div className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.02)] flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-655" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="8" height="8" rx="1.5" className="animate-pulse" />
                  <rect x="13" y="13" width="8" height="8" rx="1.5" />
                  <path d="M13 3l8 8M3 13l8 8" strokeLinecap="round" />
                </svg>
              </div>
              
              <div className="ml-3">
                <p className="text-slate-800 font-bold text-lg leading-none">Lead College</p>
                <p className="text-slate-400 text-xs mt-1 leading-none font-semibold">Palakkad, KL</p>
              </div>
            </div>

          </div>

          {/* Slogan highlight row */}
          <div className="flex items-start gap-3 mt-4 bg-indigo-50/70 border border-indigo-100/50 rounded-2xl p-4 w-full">
            <div className="text-indigo-900 mt-1">
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
        <div className="flex-1 flex flex-col items-center justify-center gap-12 w-full max-w-2xl">
          
          {/* Ticket Stack Container */}
          <div 
            className="relative w-full max-w-[540px] h-[250px] flex items-center justify-center cursor-pointer select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            
            {/* Ambient Blue Backglow Effect */}
            <div className="ticket-glow transform translate-y-3" />

            {/* Ticket 3 (Back) */}
            <div 
              className={`absolute w-[460px] h-[210px] rounded-3xl border border-white/5 bg-slate-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out origin-center
                ${hovered ? '-translate-x-12 -translate-y-6 rotate-[-9deg] scale-[0.98] opacity-50' : 'rotate-[-6deg] scale-[0.94] opacity-40'}
                animate-float-ticket-1`}
              style={{ zIndex: 10 }}
            >
              <div className="absolute inset-0 bg-ticket-grid opacity-10 rounded-3xl" />
            </div>

            {/* Ticket 2 (Middle) */}
            <div 
              className={`absolute w-[470px] h-[215px] rounded-3xl border border-indigo-500/10 bg-slate-950/80 shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out origin-center
                ${hovered ? '-translate-x-4 -translate-y-3 rotate-[-4deg] scale-[0.99] opacity-75' : 'rotate-[-3deg] scale-[0.97] opacity-70'}
                animate-float-ticket-2`}
              style={{ zIndex: 20 }}
            >
              <div className="absolute inset-0 bg-ticket-grid opacity-20 rounded-3xl" />
            </div>

            {/* Ticket 1 (Top / Front Active Ticket) */}
            <div 
              className={`absolute w-[490px] h-[220px] rounded-[28px] border border-indigo-500/25 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-[0_30px_80px_rgba(46,108,255,0.3)] transition-all duration-500 ease-out origin-center overflow-visible
                ${hovered ? 'translate-x-8 translate-y-3 rotate-[4deg] scale-[1.03]' : 'rotate-[1deg] scale-100'}
                animate-float-ticket-3`}
              style={{ zIndex: 30 }}
            >
              
              <div className="absolute inset-0 bg-ticket-grid opacity-45 rounded-[28px]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-500/10 rounded-[28px] pointer-events-none" />

              {/* Card notches (cutouts) */}
              <div className="absolute -top-3.5 left-[74%] w-7 h-7 rounded-full bg-white border-b border-indigo-500/20 z-40" />
              <div className="absolute -bottom-3.5 left-[74%] w-7 h-7 rounded-full bg-white border-t border-indigo-500/20 z-40" />

              {/* Ticket content split */}
              <div className="flex h-full w-full relative z-10 p-6 items-stretch font-display">
                
                {/* Left Section */}
                <div className="w-[74%] pr-6 flex flex-col justify-between">
                  
                  <div className="flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-2.5 h-2.5 bg-indigo-400 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-white rounded-sm" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Carnival</span>
                  </div>

                  <div className="my-auto flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                        Kerala <br />
                        Startup <br />
                        Carnival
                      </h2>
                      <p className="text-[9px] text-indigo-400 uppercase tracking-[0.5em] mt-2 font-bold font-tech">
                        2 0 2 6
                      </p>
                    </div>

                    {/* Diamond Logo */}
                    <div className="transform rotate-45 grid grid-cols-2 gap-0.5 w-8 h-8 mr-2">
                      <div className="bg-indigo-400 w-3.5 h-3.5 rounded-sm" />
                      <div className="bg-indigo-300 w-3.5 h-3.5 rounded-sm" />
                      <div className="bg-purple-500 w-3.5 h-3.5 rounded-sm" />
                      <div className="bg-indigo-500 w-3.5 h-3.5 rounded-sm" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>MAY 30-31</span>
                    <span className="text-indigo-400 font-extrabold font-tech">NO. 1024-26</span>
                  </div>

                </div>

                {/* Vertical Divider */}
                <div className="w-px border-l-2 border-dashed border-white/10 h-full relative" />

                {/* Right Section */}
                <div className="w-[26%] pl-6 flex flex-col justify-between items-center text-center">
                  
                  <div className="text-[10px] font-black text-indigo-350 tracking-[0.25em] uppercase rotate-90 my-auto whitespace-nowrap">
                    VIP PASS
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] text-slate-400 font-bold tracking-widest uppercase leading-none">Life School</span>
                    <span className="text-lg font-black text-white leading-none mt-1 select-none">Edex</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6">
            
            <button className="relative group overflow-hidden bg-[#1E1B4B] hover:bg-[#312E81] text-white border border-[#4338CA] px-10 py-3.5 rounded-full font-bold text-sm tracking-widest transition-all shadow-[0_10px_25px_rgba(30,27,75,0.25)] flex items-center justify-center gap-2.5 w-full sm:w-auto">
              <span className="relative z-10 uppercase tracking-widest">SOLD OUT</span>
              <Icons.Ticket className="w-4 h-4 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <a 
              href="https://whatsapp.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-emerald-500/40 px-5 py-2.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              <div className="flex -space-x-2 mr-3.5">
                <div className="w-7 h-7 rounded-full border border-white bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">A</div>
                <div className="w-7 h-7 rounded-full border border-white bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">B</div>
                <div className="w-7 h-7 rounded-full border border-white bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[10px] font-bold text-white">C</div>
                <div className="w-7 h-7 rounded-full border border-white bg-slate-200 flex items-center justify-center text-[8px] font-black text-slate-600">+500</div>
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

      {/* Ticket Perforation Transition and Next Section */}
      <div className="w-full relative z-30 flex flex-col mt-12">
        
        {/* The thick horizontal royal-blue strip (#3B34A8) with Perforated Edge */}
        <div className="w-full ticket-perforation-top h-14" />
        
        {/* 
          Overlapping large white content container with rounded top corners.
          Using repeating graph paper background instead of geometric grid.
        */}
        <section className="relative z-40 -translate-y-5 bg-white bg-graph-pattern rounded-t-[42px] shadow-[0_-15px_40px_rgba(0,0,0,0.12)] pt-20 pb-28 px-6 md:px-12 border-t border-slate-100">
          
          {/* Asymmetric grid container */}
          <div className="max-w-6xl mx-auto w-full relative">
            
            {/* 2-column Asymmetric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative">
              
              {/* Top Left: Large rounded image card (Blank Placeholder) */}
              <div className="group w-full h-[220px] md:h-[280px] rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700/50 shadow-[0_12px_32px_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl">
                <div className="absolute inset-0 bg-ticket-grid opacity-15 pointer-events-none" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <svg className="w-10 h-10 text-slate-500/80 mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
                  </svg>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">Image Placeholder</span>
                </div>
              </div>

              {/* Top Right: Large statistics card (ATTENDEES 500+) */}
              <div className="group w-full h-[220px] md:h-[280px] rounded-[28px] bg-gradient-to-br from-[#2D2C85] to-[#4A43C8] shadow-[0_12px_32px_rgba(45,44,133,0.15)] p-8 flex flex-col justify-between text-white relative transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none" />
                
                <div>
                  <span className="text-[10px] font-bold text-indigo-200/90 uppercase tracking-[0.25em] leading-none">ATTENDEES</span>
                </div>

                <div className="my-auto text-center">
                  <h4 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-tech text-white leading-none">
                    500<span className="text-indigo-300">+</span>
                  </h4>
                </div>

                <div className="text-center">
                  <p className="text-xs font-black tracking-[0.3em] uppercase text-indigo-150/95 leading-none">
                    MINDS <span className="text-indigo-300">&bull;</span> ONE PLACE.
                  </p>
                </div>
              </div>

              {/* Bottom Left: Large gradient statistics card (RESIDENTIAL 36h) */}
              <div className="group w-full h-[220px] md:h-[280px] rounded-[28px] bg-gradient-to-br from-[#2D2C85] to-[#4A43C8] shadow-[0_12px_32px_rgba(45,44,133,0.15)] p-8 flex flex-col justify-between text-white relative transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none" />
                
                <div>
                  <span className="text-[10px] font-bold text-indigo-200/90 uppercase tracking-[0.25em] leading-none">RESIDENTIAL</span>
                </div>

                <div className="my-auto text-center">
                  <h4 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-tech text-white leading-none">
                    36h
                  </h4>
                </div>

                <div className="text-center">
                  <p className="text-xs font-black tracking-[0.3em] uppercase text-indigo-150/95 leading-none">
                    OF PURE EXECUTION
                  </p>
                </div>
              </div>

              {/* Bottom Right: Large rounded image card (Blank Placeholder) */}
              <div className="group w-full h-[220px] md:h-[280px] rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700/50 shadow-[0_12px_32px_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl">
                <div className="absolute inset-0 bg-ticket-grid opacity-15 pointer-events-none" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <svg className="w-10 h-10 text-slate-500/80 mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
                  </svg>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">Image Placeholder</span>
                </div>
              </div>

              {/* Center Badge: Overlaps all 4 cards exactly */}
              <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-50 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#3B34A8] border-[6px] border-white shadow-[0_8px_25px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center text-white select-none">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-indigo-200/90 leading-none">Est</span>
                <span className="text-base md:text-lg font-black leading-none mt-1 font-tech">2026</span>
              </div>

            </div>

            {/* Floating SOLD OUT Button overlapping bottom center */}
            <div className="absolute bottom-[-52px] left-1/2 transform -translate-x-1/2 z-50">
              <button className="relative group overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-white px-10 py-3.5 rounded-full font-bold text-sm tracking-widest transition-all shadow-[0_15px_35px_rgba(15,23,42,0.4)] flex items-center justify-center gap-2.5">
                <span className="relative z-10 uppercase tracking-widest">SOLD OUT</span>
                <Icons.Ticket className="w-4 h-4 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>

          </div>

          {/* Speakers Section */}
          <div className="max-w-6xl mx-auto w-full mt-32 text-center flex flex-col items-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[10px] font-bold text-indigo-700 tracking-wider uppercase mb-6 shadow-sm">
              <svg className="w-3.5 h-3.5 text-indigo-650 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
              </svg>
              <span>Event Speakers</span>
            </div>
            
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15]">
              Learn from those who <br />
              <span className="text-gradient-neon font-black">actually build.</span>
            </h2>
            
            {/* Subtext */}
            <p className="text-slate-400 text-sm mt-4 max-w-xl font-medium leading-relaxed">
              Our mentors and facilitators are here to guide you through your <strong className="text-slate-700">2-day journey</strong> of <span className="text-indigo-650 font-bold">exploration and execution</span>.
            </p>

            {/* 3+2 Speakers Layout (Top row: 3, Bottom row: 2 centered) */}
            <div className="flex flex-col items-center gap-16 md:gap-24 w-full mt-24">
              
              {/* First Row: 3 Speaker Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 justify-items-center w-full">
                {speakersList.slice(0, 3).map((speaker, index) => (
                  <div key={index} className="relative w-[340px] h-[470px]">
                    
                    {/* Back Card Layer 2 */}
                    <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white to-[#5D49E8] border border-slate-200/20 translate-x-[-20px] translate-y-[24px] rotate-[-6deg] shadow-sm z-0" />
                    
                    {/* Back Card Layer 1 */}
                    <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white to-[#7054F6] border border-slate-200/40 translate-x-[-10px] translate-y-[12px] rotate-[-3deg] shadow-md z-10" />
                    
                    {/* Main Card (Front) */}
                    <div className="relative w-full h-full rounded-[30px] bg-white border border-slate-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col z-20 group/card transition-all duration-[350ms] ease-out hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_25px_50px_rgba(112,84,246,0.18)]">
                      
                      {/* Top White Area */}
                      <div className="relative w-full h-[275px] bg-white bg-graph-pattern overflow-hidden p-5 flex flex-col justify-between select-none">
                        
                        {/* Sparkle decorative icons */}
                        <div className="absolute top-12 left-5 w-4 h-4 text-[#8E73FF] opacity-60">
                          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
                        </div>
                        <div className="absolute top-20 left-10 w-3 h-3 text-[#8E73FF] opacity-45">
                          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
                        </div>

                        {/* Speaker Watermark */}
                        <span className="absolute top-10 left-3 text-[72px] font-black text-slate-100/90 tracking-tighter uppercase pointer-events-none select-none font-display">
                          Speaker
                        </span>

                        {/* Sponsor logos on top right */}
                        <div className="absolute top-5 right-5 flex flex-col items-end text-[7px] text-slate-400 font-bold leading-none z-30">
                          <span>hosted by <strong className="text-[#1E1B5D] text-[8px] font-black">Edex</strong></span>
                          <span className="mt-0.5">in association with <strong className="text-indigo-600 text-[8px] font-black">LEAD-BI</strong></span>
                        </div>

                        {/* Grayscale Portrait (slightly overlaps bottom section) */}
                        <img 
                          src="/souma.png" 
                          alt={speaker.name} 
                          className="absolute bottom-[-10px] left-4 w-[185px] h-[210px] object-cover object-top rounded-t-2xl z-30 grayscale group-hover/card:grayscale-0 transition-all duration-[350ms] ease-out" 
                        />

                        {/* Speaker Name & Title on the right */}
                        <div className="absolute bottom-6 right-5 text-right flex flex-col items-end z-30 max-w-[130px]">
                          <h4 className="text-base font-black text-[#1E1B5D] leading-tight tracking-tight">
                            {speaker.name}
                          </h4>
                          <span className="text-[8.5px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">
                            {speaker.role}
                          </span>
                        </div>

                      </div>

                      {/* Bottom Purple Area */}
                      <div className="relative flex-1 bg-gradient-to-b from-[#846DFF] via-[#7054F6] to-[#5D49E8] overflow-visible">
                        
                        {/* CSS-based Perforation Edge */}
                        <div 
                          className="absolute -top-[6px] left-0 w-full h-[12px] z-40 pointer-events-none"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 10px 0px, #FFF 5.5px, transparent 6px)',
                            backgroundSize: '20px 12px',
                            backgroundRepeat: 'repeat-x'
                          }}
                        />

                        {/* Center Badge overlapping dividing edge */}
                        <div className="absolute top-[-50px] left-4 w-[100px] h-[100px] rounded-full bg-gradient-to-b from-[#1E1B5D] to-[#2B2A8E] border-[5px] border-white shadow-[0_8px_20px_rgba(30,27,93,0.35)] flex flex-col items-center justify-center text-white z-50 group-hover/card:scale-108 group-hover/card:rotate-[4deg] transition-all duration-500 ease-out">
                          <div className="flex flex-col items-center justify-center text-center p-1 font-display select-none">
                            <span className="text-[6.5px] text-indigo-300 font-extrabold uppercase tracking-widest leading-none">Edex</span>
                            <span className="text-xs font-black tracking-tight leading-none mt-1">Kerala</span>
                            <span className="text-xs font-black tracking-tight leading-none mt-0.5">Startup</span>
                            <span className="text-[8px] font-extrabold text-indigo-200 mt-0.5 uppercase tracking-widest font-tech">2026</span>
                          </div>
                        </div>

                        {/* Bottom Content Area */}
                        <div className="pt-16 pb-5 px-5 h-full flex flex-col justify-between text-white relative z-30">
                          
                          {/* Row 1 */}
                          <div className="flex justify-between items-center w-full">
                            
                            {/* Left Description */}
                            <div className="flex items-center gap-1.5 text-left">
                              <svg className="w-3.5 h-3.5 text-indigo-200 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-[7.2px] font-black text-indigo-150 uppercase tracking-wide leading-tight max-w-[130px]">
                                KERALA&apos;S FIRST TWO DAYS RESIDENTIAL STARTUP CARNIVAL.
                              </span>
                            </div>

                            {/* Right Date Box */}
                            <div className="flex items-center gap-1 text-white shrink-0">
                              <span className="text-[8.5px] font-black uppercase tracking-wider">May</span>
                              <div className="bg-black/35 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-black tracking-widest font-tech leading-none">
                                30 31
                              </div>
                              <span className="text-[6.5px] font-bold text-indigo-200 rotate-90 origin-center leading-none">2026</span>
                            </div>

                          </div>

                          {/* Row 2 */}
                          <div className="flex flex-col gap-1.5 items-end w-full">
                            <div className="bg-black/20 border border-white/5 px-2.5 py-0.5 rounded-full text-[7px] font-bold tracking-wider uppercase text-indigo-100">
                              LEAD COLLEGE (Autonomous), Palakkad, Kerala
                            </div>
                            <div className="bg-black/45 border border-indigo-400/20 px-2.5 py-0.5 rounded-full text-[7.5px] font-black tracking-widest uppercase text-emerald-400">
                              keralastartupcarnival.com
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                ))}
              </div>

              {/* Second Row: 2 Centered Speaker Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 justify-items-center w-full max-w-4xl">
                {speakersList.slice(3, 5).map((speaker, index) => (
                  <div key={index} className="relative w-[340px] h-[470px]">
                    
                    {/* Back Card Layer 2 */}
                    <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white to-[#5D49E8] border border-slate-200/20 translate-x-[-20px] translate-y-[24px] rotate-[-6deg] shadow-sm z-0" />
                    
                    {/* Back Card Layer 1 */}
                    <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white to-[#7054F6] border border-slate-200/40 translate-x-[-10px] translate-y-[12px] rotate-[-3deg] shadow-md z-10" />
                    
                    {/* Main Card (Front) */}
                    <div className="relative w-full h-full rounded-[30px] bg-white border border-slate-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col z-20 group/card transition-all duration-[350ms] ease-out hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_25px_50px_rgba(112,84,246,0.18)]">
                      
                      {/* Top White Area */}
                      <div className="relative w-full h-[275px] bg-white bg-graph-pattern overflow-hidden p-5 flex flex-col justify-between select-none">
                        
                        {/* Sparkle decorative icons */}
                        <div className="absolute top-12 left-5 w-4 h-4 text-[#8E73FF] opacity-60">
                          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
                        </div>
                        <div className="absolute top-20 left-10 w-3 h-3 text-[#8E73FF] opacity-45">
                          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
                        </div>

                        {/* Speaker Watermark */}
                        <span className="absolute top-10 left-3 text-[72px] font-black text-slate-100/90 tracking-tighter uppercase pointer-events-none select-none font-display">
                          Speaker
                        </span>

                        {/* Sponsor logos on top right */}
                        <div className="absolute top-5 right-5 flex flex-col items-end text-[7px] text-slate-400 font-bold leading-none z-30">
                          <span>hosted by <strong className="text-[#1E1B5D] text-[8px] font-black">Edex</strong></span>
                          <span className="mt-0.5">in association with <strong className="text-indigo-600 text-[8px] font-black">LEAD-BI</strong></span>
                        </div>

                        {/* Grayscale Portrait (slightly overlaps bottom section) */}
                        <img 
                          src="/souma.png" 
                          alt={speaker.name} 
                          className="absolute bottom-[-10px] left-4 w-[185px] h-[210px] object-cover object-top rounded-t-2xl z-30 grayscale group-hover/card:grayscale-0 transition-all duration-[350ms] ease-out" 
                        />

                        {/* Speaker Name & Title on the right */}
                        <div className="absolute bottom-6 right-5 text-right flex flex-col items-end z-30 max-w-[130px]">
                          <h4 className="text-base font-black text-[#1E1B5D] leading-tight tracking-tight">
                            {speaker.name}
                          </h4>
                          <span className="text-[8.5px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">
                            {speaker.role}
                          </span>
                        </div>

                      </div>

                      {/* Bottom Purple Area */}
                      <div className="relative flex-1 bg-gradient-to-b from-[#846DFF] via-[#7054F6] to-[#5D49E8] overflow-visible">
                        
                        {/* CSS-based Perforation Edge */}
                        <div 
                          className="absolute -top-[6px] left-0 w-full h-[12px] z-40 pointer-events-none"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 10px 0px, #FFF 5.5px, transparent 6px)',
                            backgroundSize: '20px 12px',
                            backgroundRepeat: 'repeat-x'
                          }}
                        />

                        {/* Center Badge overlapping dividing edge */}
                        <div className="absolute top-[-50px] left-4 w-[100px] h-[100px] rounded-full bg-gradient-to-b from-[#1E1B5D] to-[#2B2A8E] border-[5px] border-white shadow-[0_8px_20px_rgba(30,27,93,0.35)] flex flex-col items-center justify-center text-white z-50 group-hover/card:scale-108 group-hover/card:rotate-[4deg] transition-all duration-500 ease-out">
                          <div className="flex flex-col items-center justify-center text-center p-1 font-display select-none">
                            <span className="text-[6.5px] text-indigo-300 font-extrabold uppercase tracking-widest leading-none">Edex</span>
                            <span className="text-xs font-black tracking-tight leading-none mt-1">Kerala</span>
                            <span className="text-xs font-black tracking-tight leading-none mt-0.5">Startup</span>
                            <span className="text-[8px] font-extrabold text-indigo-200 mt-0.5 uppercase tracking-widest font-tech">2026</span>
                          </div>
                        </div>

                        {/* Bottom Content Area */}
                        <div className="pt-16 pb-5 px-5 h-full flex flex-col justify-between text-white relative z-30">
                          
                          {/* Row 1 */}
                          <div className="flex justify-between items-center w-full">
                            
                            {/* Left Description */}
                            <div className="flex items-center gap-1.5 text-left">
                              <svg className="w-3.5 h-3.5 text-indigo-200 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-[7.2px] font-black text-indigo-150 uppercase tracking-wide leading-tight max-w-[130px]">
                                KERALA&apos;S FIRST TWO DAYS RESIDENTIAL STARTUP CARNIVAL.
                              </span>
                            </div>

                            {/* Right Date Box */}
                            <div className="flex items-center gap-1 text-white shrink-0">
                              <span className="text-[8.5px] font-black uppercase tracking-wider">May</span>
                              <div className="bg-black/35 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-black tracking-widest font-tech leading-none">
                                30 31
                              </div>
                              <span className="text-[6.5px] font-bold text-indigo-200 rotate-90 origin-center leading-none">2026</span>
                            </div>

                          </div>

                          {/* Row 2 */}
                          <div className="flex flex-col gap-1.5 items-end w-full">
                            <div className="bg-black/20 border border-white/5 px-2.5 py-0.5 rounded-full text-[7px] font-bold tracking-wider uppercase text-indigo-100">
                              LEAD COLLEGE (Autonomous), Palakkad, Kerala
                            </div>
                            <div className="bg-black/45 border border-indigo-400/20 px-2.5 py-0.5 rounded-full text-[7.5px] font-black tracking-widest uppercase text-emerald-400">
                              keralastartupcarnival.com
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}
