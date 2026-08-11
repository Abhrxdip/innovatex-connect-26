'use client';

import React from 'react';

export default function ComingSoon() {
  return (
    <section id="comingsoon" className="relative w-full pt-16 sm:pt-24 pb-8 sm:pb-12 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="relative rounded-[32px] border border-[#EE4B15]/30 bg-[#0C1235]/60 p-8 sm:p-16 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 hover:border-[#EE4B15]/60 hover:shadow-[0_0_50px_rgba(238,75,21,0.15)] group">

          {/* Animated Background Spinner */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <div
              className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-spin bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(238,75,21,0.3)_360deg)]"
              style={{ animationDuration: '15s' }}
            />
          </div>

          {/* Dot Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Glowing Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#EE4B15]/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#EE4B15]/30 transition-all duration-500" />

          <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#EE4B15]/10 border border-[#EE4B15]/30 mb-2">
              <span className="text-[#EE4B15] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                Stay Tuned
              </span>
            </div>

            <h2 className="font-blackhan text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight select-none animate-[pulse_3s_ease-in-out_infinite] hover:scale-105 transition-transform duration-500">
              COMING <span className="text-[#EE4B15] bg-none bg-clip-border text-[#EE4B15]" style={{ WebkitTextFillColor: '#EE4B15' }}>SOON</span>
            </h2>

            <p className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl font-light mt-2 sm:mt-4">
              We are brewing something extraordinary. Prepare yourself for game-changing announcements, epic speakers, and next-level tech showcases.
            </p>

            {/* Animated Loading Dots */}
            <div className="mt-6 sm:mt-8 flex gap-3 sm:gap-4 items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EE4B15] animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-[#EE4B15] animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-[#EE4B15] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
