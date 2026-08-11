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
    <div id="ticket" className="max-w-6xl mx-auto w-full mt-8 sm:mt-10 mb-16 sm:mb-20 text-center flex flex-col items-center px-3 sm:px-4 relative z-10">
      <span className="inline-block text-[10px] font-black text-[#EE4B15] uppercase tracking-[0.3em] mb-3 select-none">
        ✦ TICKET
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-blackhan text-white tracking-tight leading-[1.1] text-center select-none">
        The <span className="text-gradient-neon">Event Pass</span>
      </h2>
      <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl font-medium leading-relaxed text-center px-2">
        Your basic needs are taken care of so you can focus fully on the <strong className="text-white">8-hour meetup experience</strong>.
      </p>
      <div className="w-full max-w-5xl bg-gradient-to-r from-[#EE4B15] via-[#C83B0E] to-[#0C1235] rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 mt-8 sm:mt-12 shadow-[0_20px_50px_rgba(238,75,21,0.2)] relative overflow-hidden flex flex-col md:flex-row items-stretch justify-between gap-6 min-h-[300px]">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none select-none z-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0c0 16.569 13.431 30 30 30-16.569 0-30 13.431-30 30C30 43.431 16.569 30 0 30 16.569 30 30 16.569 30 0z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
        <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 z-10 p-2 sm:p-3">
          <div className="flex flex-col gap-3 sm:gap-3.5 text-left w-full">
            {ticketBenefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2.5 sm:gap-3 group">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:bg-[#EE4B15] transition-all duration-300">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-white font-display font-extrabold text-[12px] sm:text-[13px] md:text-[15px] tracking-tight leading-snug group-hover:translate-x-1.5 transition-transform duration-300">{benefit}</span>
              </div>
            ))}
          </div>
          <div className="hidden md:flex flex-col gap-[2px] w-[35px] h-[145px] justify-between select-none opacity-85 mr-2">
            {[2, 4, 1, 3, 1, 2, 4, 1, 1, 3, 2, 4, 1, 2, 1, 3, 4, 2, 1, 3, 1, 2, 4, 1, 3, 1, 2, 1, 4, 2, 1, 3, 1, 4].map((h, i) => (
              <div key={i} className="bg-white/40 w-full" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
        <div className="w-full md:w-[320px] flex-shrink-0 z-10 flex flex-col justify-stretch">
          <div className="w-full h-full bg-[#090D2B]/95 border border-white/10 rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4)] text-center relative overflow-hidden text-white">
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
                  className="w-[160px] sm:w-[180px] md:w-[220px] opacity-95 drop-shadow-xl origin-top filter brightness-90 grayscale-[20%]"
                  style={{ animation: 'swing 2.5s ease-in-out infinite' }}
                />
              </div>
            )}
            <div className="flex justify-between items-center text-[8.5px] sm:text-[9px] font-black tracking-widest text-slate-400 font-mono select-none relative z-10">
              <span>IXC 2026</span>
              <span>ADMIT ONE</span>
            </div>
            <div className="flex flex-col items-center my-3 sm:my-4 gap-1 sm:gap-1.5 relative z-10">
              <span className={`inline-flex items-center gap-1.5 text-[8.5px] sm:text-[9px] font-black tracking-widest uppercase ${isAvailable ? 'text-[#EE4B15]' : 'text-rose-500'}`}>
                {isAvailable && <span className="w-1.5 h-1.5 bg-[#EE4B15] rounded-full animate-ping" />}
                {isAvailable ? 'Passes Available' : 'Sold Out'}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-blackhan tracking-tighter text-white leading-none">FULL PASS</h3>
              <p className="text-center text-slate-300 text-[9.5px] sm:text-[10px] font-semibold leading-relaxed max-w-[210px] mt-1 select-none">Secure your access to the full 8-hour meetup experience.</p>
            </div>
            <div className="w-full relative z-10">
              <button
                disabled={!isAvailable}
                onClick={() => {
                  if (isAvailable && typeof window !== 'undefined') {
                    window.location.href = redirectUrl;
                  }
                }}
                className={`relative group overflow-hidden flex items-center justify-between w-full px-4 sm:px-5 py-3 sm:py-3.5 font-black text-xs uppercase tracking-widest rounded-xl transition-all select-none border ${isAvailable ? 'bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white shadow-[0_8px_20px_rgba(238,75,21,0.3)] hover:-translate-y-0.5 cursor-pointer border-orange-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed border-slate-700'}`}
              >
                <span className="mx-auto pl-4 relative z-10">{isAvailable ? "Register Now" : "Sold Out"}</span>
                <svg className="w-4 h-4 flex-shrink-0 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              <p className="text-center text-[8.5px] sm:text-[9px] text-slate-400 font-bold tracking-tight mt-2.5 sm:mt-3">Need help? Submit an inquiry below</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
