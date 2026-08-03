'use client';

import React, { useState } from 'react';
import { Icons } from './Icons';

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);

  return (
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
              <p className="text-slate-800 font-bold text-lg leading-none">Sept 05</p>
              <p className="text-slate-400 text-xs mt-1 leading-none font-semibold">8 Hours</p>
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
              <p className="text-slate-800 font-bold text-lg leading-none">JIS University</p>
              <p className="text-slate-400 text-xs mt-1 leading-none font-semibold">Kolkata, WB</p>
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
            INNOVATEX COMMUNITY&apos;S 8-HOUR MEETUP IN KOLKATA.
          </p>
        </div>

      </div>

      {/* Right Side Ticket Stack and CTA */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12 w-full max-w-2xl">
        
        {/* Ticket Stack Container */}
        <div 
          className="relative w-full max-w-[540px] h-[130px] min-[360px]:h-[160px] min-[390px]:h-[200px] min-[480px]:h-[230px] sm:h-[250px] flex items-center justify-center cursor-pointer select-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          
          {/* Ambient Blue Backglow Effect */}
          <div className="ticket-glow transform translate-y-3" />

          {/* Scaled stack wrapper */}
          <div className="relative w-[490px] h-[220px] scale-[0.52] min-[360px]:scale-[0.62] min-[390px]:scale-[0.78] min-[480px]:scale-[0.9] sm:scale-100 flex items-center justify-center origin-center transition-transform duration-300">
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
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Meetup</span>
                  </div>

                  <div className="my-auto flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                        InnovateX <br />
                        Connect <br />
                        &apos;26
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
                    <span>SEPT 05</span>
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
                    <span className="text-[7px] text-slate-400 font-bold tracking-widest uppercase leading-none">InnovateX</span>
                    <span className="text-lg font-black text-white leading-none mt-1 select-none">Kolkata</span>
                  </div>

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
  );
}
