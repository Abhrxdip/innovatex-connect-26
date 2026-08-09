'use client';

import React from 'react';
import { Icons } from './Icons';
import GetTicketStore from '../state_management/ticket_store';
import { useStore } from 'zustand';
import Link from "next/link";

export default function AboutGrid() {
  const store = GetTicketStore();
  const isAvailable = useStore(store, (s) => s.isAvailable);
  const redirectUrl = useStore(store, (s) => s.redirectUrl);

  return (
    <div id="about" className="max-w-6xl mx-auto w-full py-20 sm:py-28 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="inline-block text-[10px] font-black text-[#EE4B15] uppercase tracking-[0.3em] mb-3 select-none">
          ✦ ABOUT THE EVENT
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-blackhan text-white tracking-tight leading-[1.1] select-none">
          What is InnovateX<br />
          <span className="text-gradient-neon">Connect?</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">

        {/* Main Feature Card — animated gradient border */}
        <div className="md:col-span-8 gradient-border min-h-[280px] sm:min-h-[320px]">
          <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between bg-[#0C1235] rounded-[24px]">
            <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none rounded-[24px]" />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                A High-Performance Dev Conference<br className="hidden sm:block" /> for Developers & Founders
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-medium max-w-2xl">
                InnovateX Connect'26 is a flagship developer conference in Kolkata, bringing together students, developers, tech enthusiasts, founders, and industry professionals for a day of learning, networking, collaboration, and innovation. Through inspiring speaker sessions, interactive experiences, community networking, and hands-on opportunities, we aim to build a stronger and more connected tech ecosystem where ideas turn into action.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6 relative z-10">
              {['INNOVATEX COMMUNITY', 'GDG JISU', 'DEV CONFERENCE', 'WORKSHOP'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider select-none hover:bg-white/20 hover:border-white/30 transition-all duration-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Attendees Stat — tall card */}
        <div className="md:col-span-4 group bg-[#0C1235]/70 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[280px] relative overflow-hidden transition-all duration-300 hover:border-[#EE4B15]/30 hover:shadow-[0_20px_60px_rgba(238,75,21,0.12)]">
          <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] select-none relative z-10">ATTENDEES</span>
          <div className="relative text-center my-auto py-6">
            <div className="absolute inset-0 bg-[#EE4B15]/8 rounded-full blur-2xl scale-50 group-hover:scale-75 group-hover:bg-[#EE4B15]/15 transition-all duration-500" />
            <h4 className="text-7xl sm:text-8xl md:text-9xl font-black font-tech text-white leading-none relative z-10 select-none">
              2<span className="text-[#EE4B15]">00</span><span className="text-[#EE4B15] text-5xl sm:text-6xl align-top">+</span>
            </h4>
          </div>
          <p className="text-slate-400 text-xs font-semibold leading-relaxed relative z-10">Developers, founders, and tech enthusiasts in one room.</p>
        </div>

        {/* Duration Stat */}
        <div className="md:col-span-4 group bg-[#EE4B15] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(238,75,21,0.3)] hover:scale-[1.02]">
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.25em] select-none relative z-10">DURATION</span>
          <div className="relative text-center my-auto py-4">
            <div className="flex items-baseline justify-center relative z-10">
              <h4 className="text-7xl sm:text-8xl font-black font-tech text-white leading-none select-none">
                8
              </h4>
              <span className="text-white/80 text-4xl sm:text-5xl font-extrabold ml-1.5 uppercase font-tech tracking-tight select-none">
                HRS
              </span>
            </div>
            <div className="mt-3 relative z-10">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-white font-black text-xs sm:text-sm tracking-wider uppercase backdrop-blur-sm select-none">
                9 AM – 5 PM
              </span>
            </div>
          </div>
          <p className="text-white/80 text-xs font-bold leading-relaxed relative z-10">Of pure execution — coding, talks, mini-games, and demos.</p>
        </div>

        {/* Date & Venue Card */}
        <div className="md:col-span-4 bg-[#0C1235]/70 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden transition-all duration-300 hover:border-[#EE4B15]/30">
          <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] select-none relative z-10">DATE & VENUE</span>
          <div className="relative z-10 mt-4">
            <p className="text-2xl sm:text-3xl font-blackhan text-white leading-tight select-none">Sept 05</p>
            <p className="text-sm font-bold text-[#EE4B15] mt-1 select-none">Saturday, 2026</p>
          </div>
          <p className="text-slate-400 text-xs font-semibold mt-3 relative z-10">JIS University, Agarpara, Kolkata</p>
        </div>

        {/* Organized By Card */}
        <div className="md:col-span-4 bg-[#0C1235]/70 border border-white/5 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden transition-all duration-300 hover:border-[#EE4B15]/30">
          <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] select-none relative z-10">ORGANIZED &amp; CO-HOSTED BY</span>

          <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:gap-5 my-auto py-4">
            {/* Host Logo: InnovateX Community (TOP - BIGGER) */}
            <img
              src="/innovatex1.png"
              alt="InnovateX Community Logo"
              className="h-14 sm:h-18 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />

            {/* Horizontal Divider Line */}
            <div className="w-20 h-px bg-white/10" />

            {/* Co-Host Logo: GDG JISU (UNDERNEATH - BIGGER) */}
            <img
              src="/gdgjisu.png"
              alt="Co-Host Logo"
              className="h-12 sm:h-15 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105 opacity-95"
            />
          </div>
        </div>

      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-12 sm:mt-16 relative z-40">
        <Link href={redirectUrl}>
          <button
            type="button"
            disabled={!isAvailable}
            className="relative group overflow-hidden text-white px-10 sm:px-12 py-4 sm:py-4.5 rounded-2xl font-bold text-sm sm:text-base tracking-widest transition-all shadow-[0_15px_40px_rgba(238,75,21,0.25)] flex items-center justify-center gap-3 bg-[#EE4B15] hover:bg-[#EE4B15]/90 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(238,75,21,0.4)] duration-300 disabled:opacity-50"
          >
            <span className="relative z-10 uppercase tracking-[0.2em] font-blackhan">{isAvailable ? 'GET YOUR TICKET' : 'SOLD OUT'}</span>
            <Icons.Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </Link>
      </div>
    </div>
  );
}
