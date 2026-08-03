'use client';

import React from 'react';
import { ticketBenefits } from '../data/constants';
import GetTicketStore from '../state_management/ticket_store';
import { useStore } from 'zustand';

export default function TicketSection() {
  const store = GetTicketStore()
  const isAvailable = useStore(store, (s) => s.isAvailable)
  const redirectUrl = useStore(store, (s) => s.redirectUrl)
  return (
    <div id="ticket" className="max-w-6xl mx-auto w-full mt-40 mb-20 text-center flex flex-col items-center px-4 relative z-10">
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[10px] font-bold text-indigo-700 tracking-wider uppercase mb-6 shadow-sm">
        <svg className="w-3.5 h-3.5 text-indigo-650" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        <span>Ticket</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15] text-center">
        The <span className="text-gradient-neon font-black">Event Pass</span>
      </h2>
      <p className="text-slate-400 text-xs md:text-sm mt-4 max-w-2xl font-medium leading-relaxed text-center">
        Your basic needs are taken care of so you can focus fully on the <strong className="text-slate-700">8-hour meetup experience</strong>.
      </p>
      <div className="w-full max-w-5xl bg-gradient-to-r from-[#BD9FFF] via-[#A888FF] to-[#9169FF] rounded-[32px] p-4 md:p-5 lg:p-6 mt-12 shadow-[0_20px_50px_rgba(112,84,246,0.15)] relative overflow-hidden flex flex-col md:flex-row items-stretch justify-between gap-6 min-h-[300px]">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none select-none z-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0c0 16.569 13.431 30 30 30-16.569 0-30 13.431-30 30C30 43.431 16.569 30 0 30 16.569 30 30 16.569 30 0z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
        <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 z-10 p-3">
          <div className="flex flex-col gap-3.5 text-left">
            {ticketBenefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1E1B4B]/12 flex items-center justify-center text-[#1E1B4B] flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#1E1B4B]" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-[#1E1B4B] font-display font-extrabold text-[13px] md:text-[15px] tracking-tight leading-none">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="hidden md:flex flex-col gap-[2px] w-[35px] h-[145px] justify-between select-none opacity-85 mr-2">
            {[2, 4, 1, 3, 1, 2, 4, 1, 1, 3, 2, 4, 1, 2, 1, 3, 4, 2, 1, 3, 1, 2, 4, 1, 3, 1, 2, 1, 4, 2, 1, 3, 1, 4].map((h, i) => (
              <div key={i} className="bg-[#1E1B4B] w-full" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
        <div className="w-full md:w-[320px] flex-shrink-0 z-10 flex flex-col justify-stretch">
          <div className="w-full h-full bg-[#F8FAFC]/95 border border-white/50 rounded-[24px] p-5 md:p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-center relative overflow-hidden">
            {!isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none">
                <style>{`
                  @keyframes swing {
                    0%, 100% { transform: rotate(-15deg); }
                    50% { transform: rotate(-5deg); }
                  }
                `}</style>
                <img 
                  src="/sold_out.png" 
                  alt="Sold Out" 
                  className="w-[180px] md:w-[220px] opacity-90 mix-blend-multiply drop-shadow-xl origin-top" 
                  style={{ animation: 'swing 2.5s ease-in-out infinite' }}
                />
              </div>
            )}
            <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-slate-400 font-mono select-none relative z-10">
              <span>IXC 2026</span>
              <span>ADMIT ONE</span>
            </div>
            <div className="flex flex-col items-center my-4 gap-1.5 relative z-10">
              <span className={`inline-flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase ${isAvailable ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isAvailable && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />}
                {isAvailable ? 'Passes Available' : 'Sold Out'}
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-slate-800 leading-none">FULL PASS</h3>
              <p className="text-center text-slate-400 text-[10px] font-semibold leading-relaxed max-w-[210px] mt-1 select-none">Secure your access to the full 8-hour meetup experience.</p>
            </div>
            <div className="w-full relative z-10">
              <button 
                disabled={!isAvailable}
                onClick={() => {
                  if (isAvailable && typeof window !== 'undefined') {
                    window.open(redirectUrl, '_blank', 'noopener,noreferrer')
                  }
                }} 
                className={`flex items-center justify-between w-full px-5 py-3.5 font-black text-xs uppercase tracking-widest rounded-xl transition-all select-none border ${isAvailable ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_8px_20px_rgba(16,185,129,0.15)] cursor-pointer border-emerald-400/20' : 'bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300'}`}
              >
                <span className="mx-auto pl-4">{isAvailable ? "Register Now" : "Sold Out"}</span>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <p className="text-center text-[9px] text-slate-400 font-bold tracking-tight mt-3">Need help? Submit an inquiry below</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
