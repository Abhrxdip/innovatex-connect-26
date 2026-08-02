import React from 'react';
import { Icons } from './Icons';

export default function AboutGrid() {
  return (
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
  );
}
