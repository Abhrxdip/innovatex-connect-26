'use client';

import React from 'react';
import { speakersList } from '../data/constants';

function SpeakerCard({ speaker }) {
  return (
    <div className="group relative w-full max-w-[260px] sm:max-w-[270px] bg-[#0C1235]/80 hover:bg-[#0C1235] border border-white/10 hover:border-[#EE4B15]/50 rounded-[24px] p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(238,75,21,0.18)] cursor-pointer select-none">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none rounded-[24px]" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#EE4B15]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#EE4B15]/15 transition-all duration-500" />

      {/* Top Header Tag */}
      <div className="flex items-center justify-between relative z-10 mb-3.5">
        <span className="px-2.5 py-1 rounded-md bg-[#EE4B15]/10 border border-[#EE4B15]/20 text-[9px] font-black text-[#EE4B15] tracking-widest uppercase">
          SPEAKER
        </span>
        <span className="text-[10px] font-bold text-slate-400 font-mono">SEPT 05</span>
      </div>

      {/* Speaker Image Frame */}
      <div className="relative w-full h-[200px] sm:h-[210px] rounded-[18px] bg-gradient-to-b from-[#090D2B] to-[#0C1235] border border-white/10 overflow-hidden flex items-center justify-center mb-4 group-hover:border-[#EE4B15]/30 transition-colors">
        <img
          src="/souma.png"
          alt={speaker.name}
          className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1235] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-2.5 left-3 right-3 text-left z-10">
          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest block">InnovateX Connect &apos;26</span>
        </div>
      </div>

      {/* Speaker Text Content */}
      <div className="relative z-10 text-left flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-blackhan text-white tracking-tight leading-tight group-hover:text-[#EE4B15] transition-colors duration-200">
            {speaker.name}
          </h3>
          <p className="text-[10.5px] sm:text-xs font-bold font-tech text-[#EE4B15] mt-1 uppercase tracking-wider line-clamp-1">
            {speaker.role}
          </p>
          <p className="text-slate-400 text-[11px] font-medium mt-1.5 line-clamp-1">
            {speaker.desc || 'INNOVATEX CONNECT MENTOR'}
          </p>
        </div>

        {/* Card Footer Line */}
        <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between text-slate-400">
          <span className="text-[9px] font-bold uppercase tracking-widest">KOLKATA</span>
          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-[#EE4B15] group-hover:text-white transition-all duration-300">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function SpeakersSection() {
  return (
    <div id="speakers" className="max-w-6xl mx-auto w-full mt-20 sm:mt-28 text-center flex flex-col items-center px-4 sm:px-6 relative z-10">
      
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <span className="inline-block text-[10px] font-black text-[#EE4B15] uppercase tracking-[0.3em] mb-3 select-none">
          ✦ SPEAKERS &amp; MENTORS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-blackhan text-white tracking-tight leading-[1.1] select-none">
          Learn from those who <br className="hidden sm:inline" />
          <span className="text-gradient-neon sm:ml-2">actually build.</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-medium leading-relaxed px-2">
          Our mentors and facilitators are here to guide you through your <strong className="text-white">8-hour journey</strong> of exploration and execution.
        </p>
      </div>

      {/* Speaker Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center w-full max-w-6xl">
        {speakersList.map((speaker, index) => (
          <SpeakerCard key={index} speaker={speaker} />
        ))}
      </div>

    </div>
  );
}
