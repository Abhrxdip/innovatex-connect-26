'use client';

import React from 'react';

export default function WhyAttendSection() {
  return (
    <section className="relative w-full text-[#F1FDFD] py-16 sm:py-24 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
          
          {/* 1. Networking Card (Top Left - Orange Border & Orange Text) */}
          <div className="group relative md:col-span-5 h-[220px] sm:h-[260px] md:h-[280px] rounded-[26px] border-2 border-[#EE4B15] bg-[#0C1235]/80 flex items-center justify-center text-center p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(238,75,21,0.25)]">
            {/* Dot Grid Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(238,75,21,0.35) 1.2px, transparent 1.2px)',
                backgroundSize: '16px 16px',
              }}
            />
            <h3 className="relative z-10 font-blackhan text-3xl sm:text-4xl md:text-5xl text-[#EE4B15] tracking-tight leading-tight select-none">
              Networking
            </h3>
          </div>

          {/* 2. Inspiring Talks Card (Top Right - White/Slate Border & White Text) */}
          <div className="group relative md:col-span-7 h-[220px] sm:h-[260px] md:h-[280px] rounded-[26px] border-2 border-white/20 bg-[#0C1235]/60 flex items-center justify-center text-center p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:border-white/40 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,255,255,0.08)]">
            {/* Dot Grid Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15 group-hover:opacity-25 transition-opacity duration-300"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1.2px, transparent 1.2px)',
                backgroundSize: '16px 16px',
              }}
            />
            <h3 className="relative z-10 font-blackhan text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight select-none">
              Inspiring Talks
            </h3>
          </div>

          {/* Center Heading: Why Attend ? */}
          <div className="md:col-span-12 py-3 sm:py-4 text-center select-none">
            <h2 className="inline-flex items-center justify-center gap-3">
              <span className="font-blackhan text-3xl sm:text-4xl md:text-5xl text-white">Why</span>
              <span className="font-bricolage text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#EE4B15]">Attend ?</span>
            </h2>
          </div>

          {/* 3. Community Meetup Card (Bottom Left - White/Slate Border & White Text) */}
          <div className="group relative md:col-span-7 h-[220px] sm:h-[260px] md:h-[280px] rounded-[26px] border-2 border-white/20 bg-[#0C1235]/60 flex items-center justify-center text-center p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:border-white/40 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,255,255,0.08)]">
            {/* Dot Grid Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15 group-hover:opacity-25 transition-opacity duration-300"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1.2px, transparent 1.2px)',
                backgroundSize: '16px 16px',
              }}
            />
            <h3 className="relative z-10 font-blackhan text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight select-none">
              Community Meetup
            </h3>
          </div>

          {/* 4. Swags & Giveaways Card (Bottom Right - Orange Border & Orange Text) */}
          <div className="group relative md:col-span-5 h-[220px] sm:h-[260px] md:h-[280px] rounded-[26px] border-2 border-[#EE4B15] bg-[#0C1235]/80 flex items-center justify-center text-center p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(238,75,21,0.25)]">
            {/* Dot Grid Background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(238,75,21,0.35) 1.2px, transparent 1.2px)',
                backgroundSize: '16px 16px',
              }}
            />
            <h3 className="relative z-10 font-blackhan text-3xl sm:text-4xl md:text-5xl text-[#EE4B15] tracking-tight leading-[1.1] text-center select-none">
              Swags<br />&amp;<br />Giveaways
            </h3>
          </div>

        </div>

      </div>
    </section>
  );
}
