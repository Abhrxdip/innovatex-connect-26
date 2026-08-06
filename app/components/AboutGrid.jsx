'use client';

import React from 'react';
import { Icons } from './Icons';
import GetTicketStore from '../state_management/ticket_store';
import { useStore } from 'zustand';

export default function AboutGrid() {
  const store = GetTicketStore()
  const isAvailable = useStore(store, (s) => s.isAvailable)
  const redirectUrl = useStore(store, (s) => s.redirectUrl)
  return (
    <div id="about" className="max-w-6xl mx-auto w-full relative">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-10 relative">

        <div className="group w-full h-[150px] min-[390px]:h-[190px] sm:h-[230px] md:h-[280px] rounded-[18px] sm:rounded-[24px] md:rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700/50 shadow-[0_12px_32px_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl">
          <div className="absolute inset-0 bg-ticket-grid opacity-15 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            <svg className="w-6 h-6 min-[390px]:w-8 min-[390px]:h-8 md:w-10 md:h-10 text-slate-500/80 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
            </svg>
            <span className="text-[7.5px] min-[390px]:text-[9px] md:text-[10px] text-slate-500 font-extrabold uppercase tracking-widest text-center px-1">InnovateX Community</span>
          </div>
        </div>

        <div className="group w-full h-[150px] min-[390px]:h-[190px] sm:h-[230px] md:h-[280px] rounded-[18px] sm:rounded-[24px] md:rounded-[28px] bg-gradient-to-br from-[#2D2C85] to-[#4A43C8] shadow-[0_12px_32px_rgba(45,44,133,0.15)] p-3 min-[390px]:p-5 md:p-8 flex flex-col justify-between text-white relative transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none" />
          <div><span className="text-[7.5px] min-[390px]:text-[9px] md:text-[10px] font-bold text-indigo-200/90 uppercase tracking-[0.12em] md:tracking-[0.25em] leading-none">ATTENDEES</span></div>
          <div className="my-auto text-center">
            <h4 className="text-3xl min-[390px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-tech text-white leading-none">500<span className="text-indigo-300">+</span></h4>
          </div>
          <div className="text-center">
            <p className="text-[6.5px] min-[390px]:text-[8.5px] md:text-xs font-black tracking-[0.12em] md:tracking-[0.3em] uppercase text-indigo-150/95 leading-none">MINDS <span className="text-indigo-300">&bull;</span> ONE PLACE.</p>
          </div>
        </div>

        <div className="group w-full h-[150px] min-[390px]:h-[190px] sm:h-[230px] md:h-[280px] rounded-[18px] sm:rounded-[24px] md:rounded-[28px] bg-gradient-to-br from-[#2D2C85] to-[#4A43C8] shadow-[0_12px_32px_rgba(45,44,133,0.15)] p-3 min-[390px]:p-5 md:p-8 flex flex-col justify-between text-white relative transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none" />
          <div><span className="text-[7.5px] min-[390px]:text-[9px] md:text-[10px] font-bold text-indigo-200/90 uppercase tracking-[0.12em] md:tracking-[0.25em] leading-none">DURATION</span></div>
          <div className="my-auto text-center">
            <h4 className="text-3xl min-[390px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-tech text-white leading-none">8h</h4>
          </div>
          <div className="text-center">
            <p className="text-[6.5px] min-[390px]:text-[8.5px] md:text-xs font-black tracking-[0.12em] md:tracking-[0.3em] uppercase text-indigo-150/95 leading-none">OF PURE EXECUTION</p>
          </div>
        </div>

        <div className="group w-full h-[150px] min-[390px]:h-[190px] sm:h-[230px] md:h-[280px] rounded-[18px] sm:rounded-[24px] md:rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700/50 shadow-[0_12px_32px_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl">
          <div className="absolute inset-0 bg-ticket-grid opacity-15 pointer-events-none" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            <svg className="w-6 h-6 min-[390px]:w-8 min-[390px]:h-8 md:w-10 md:h-10 text-slate-500/80 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
            </svg>
            <span className="text-[7.5px] min-[390px]:text-[9px] md:text-[10px] text-slate-500 font-extrabold uppercase tracking-widest text-center px-1">Meetup 2026</span>
          </div>
        </div>

        <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-40 w-14 h-14 min-[390px]:w-18 min-[390px]:h-18 md:w-24 md:h-24 rounded-full bg-[#3B34A8] border-4 md:border-[6px] border-white shadow-[0_8px_25px_rgba(59,52,168,0.35)] flex flex-col items-center justify-center text-white select-none shrink-0 animate-float-slow">
          <span className="text-[7.5px] min-[390px]:text-[9px] md:text-[10px] uppercase font-extrabold tracking-widest text-indigo-200/90 leading-none">Est</span>
          <span className="text-xs min-[390px]:text-sm md:text-lg font-black leading-none mt-0.5 md:mt-1 font-tech">2026</span>
        </div>

      </div>

      <div className="flex justify-center mt-8 sm:mt-12 relative z-40">
        <button
          type="button"
          onClick={() => {
            if (isAvailable && typeof window !== 'undefined') {
              window.open(redirectUrl, '_blank', 'noopener,noreferrer')
            }
          }}
          disabled={!isAvailable}
          className={`relative group overflow-hidden text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-widest transition-all shadow-[0_15px_35px_rgba(15,23,42,0.35)] flex items-center justify-center gap-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 whitespace-nowrap hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,52,168,0.3)] duration-300`}
        >
          <span className="relative z-10 uppercase tracking-widest">{isAvailable ? 'GET TICKET' : 'SOLD OUT'}</span>
          <Icons.Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>

    </div>
  );
}
