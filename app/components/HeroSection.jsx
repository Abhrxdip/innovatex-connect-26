'use client';

import React from 'react';
import { useStore } from 'zustand';
import GetTicketStore from '../state_management/ticket_store';

export default function HeroSection() {
  const store = GetTicketStore();
  const isAvailable = useStore(store, (state) => state.isAvailable);
  const redirectUrl = useStore(store, (state) => state.redirectUrl);

  const handleTicketClick = () => {
    if (!isAvailable || typeof window === 'undefined') {
      return;
    }

    if (redirectUrl.startsWith('http')) {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = redirectUrl;
    }
  };

  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#090D2B] bg-grid-pattern text-[#F1FDFD]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(238,75,21,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(46,108,255,0.15),transparent_35%),linear-gradient(180deg,rgba(6,10,36,0)_0%,rgba(6,10,36,0.32)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-hero-sparkle opacity-70 pointer-events-none animate-pulse-glow" />

      {/* Animated Glowing Light Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none animate-spin-slow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#EE4B15]/10 blur-[100px] pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-8 lg:px-12 pb-4 sm:pb-8 lg:pb-12 pt-20 sm:pt-28">
        <div className="flex-1 lg:grid lg:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)] lg:gap-8 items-center">
          <div className="flex h-full flex-col justify-between gap-8 lg:gap-12">
            <div className="max-w-xl w-full">
              <div className="flex flex-col leading-none">
                <div className="flex items-end gap-1 sm:gap-2 uppercase text-[#F1FDFD] font-bbh tracking-[-0.06em] drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)] flex-wrap sm:flex-nowrap">
                  <span className="text-[clamp(2.5rem,7vw,5.5rem)] mt-0 lg:mt-6 mr-2 sm:mr-5 leading-none hover:scale-105 transition-transform duration-300">INNOVATE</span>
                  <span className="text-[clamp(3.8rem,10vw,14rem)] -mb-1 sm:-mb-3 leading-none text-[#EE4B15] animate-bounce-gentle">X</span>
                </div>
                <div className="-ml-1 sm:-ml-2 mt-4 sm:mt-6 max-w-fit font-bricolage text-[#EE4B15] uppercase tracking-[-0.04em] leading-none text-[clamp(2.8rem,9vw,13rem)] animate-glow-orange hover:scale-[1.02] transition-transform duration-300">
                  CONNECT
                </div>
              </div>

              <div className="mt-8 flex w-full flex-col sm:flex-row gap-3 sm:gap-0 sm:items-stretch">
                <button
                  type="button"
                  onClick={handleTicketClick}
                  disabled={!isAvailable}
                  className={`group relative overflow-hidden flex flex-1 items-center justify-between sm:justify-start gap-4 sm:gap-6 rounded-2xl sm:rounded-l-3xl sm:rounded-r-none bg-[#F1FDFD] px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(46,108,255,0.3)] ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-85'}`}
                  aria-label={isAvailable ? 'Get ticket' : 'Sold out'}
                >
                  <div className="font-blackhan uppercase leading-[0.85] tracking-[-0.05em] text-[#0C1235] text-[clamp(1.75rem,3.5vw,3rem)]">
                    <div>GET</div>
                    <div>YOUR</div>
                  </div>
                  <img src="/tickets.svg" alt="" aria-hidden="true" className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-200/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex flex-1 items-center justify-between sm:justify-start gap-4 rounded-2xl sm:rounded-r-3xl sm:rounded-l-none bg-[#0C1235] px-5 py-4 text-[#F1FDFD] border border-white/10 sm:border-l-0 shadow-[0_24px_70px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1 hover:border-indigo-400/30"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-bricolage text-[clamp(1.75rem,3.5vw,3rem)] leading-none tracking-[-0.06em] text-[#F1FDFD] group-hover:text-[#EE4B15] transition-colors">JOIN</span>
                    <div className="font-bricolage text-[clamp(0.7rem,1vw,0.95rem)] uppercase leading-[0.95] tracking-[-0.02em]">
                      <div>OUR</div>
                      <div>WHATSAPP</div>
                      <div className="text-[#EE4B15]">COMMUNITY</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 flex flex-col items-center lg:items-end justify-between gap-6 lg:gap-10">
            <div className="w-full self-center lg:self-end lg:mt-auto">
              <div className="flex flex-col items-center lg:items-end leading-none uppercase font-blackhan tracking-[-0.08em] select-none hover:scale-105 transition-transform duration-500">
                <span className="text-[clamp(4.5rem,14vw,22rem)] mb-[-10%] lg:mb-[-18%] drop-shadow-[0_10px_35px_rgba(238,75,21,0.3)]">
                  <span className="text-[#EE4B15]">2</span>
                  <span className="text-[#F1FDFD]">0</span>
                </span>
                <span className="text-[clamp(4.5rem,14vw,22rem)] drop-shadow-[0_10px_35px_rgba(46,108,255,0.3)]">
                  <span className="text-[#F1FDFD]">2</span>
                  <span className="text-[#EE4B15]">6</span>
                </span>
              </div>
            </div>

            <div className="flex w-full flex-wrap justify-center lg:justify-end gap-3 sm:gap-4 pt-2 lg:pt-0">
              <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-white/10 bg-[#0C1235]/80 px-4 py-3 sm:px-6 sm:py-4 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-[0_15px_35px_rgba(46,108,255,0.2)] transition-all duration-300">
                <span className="font-blackhan uppercase text-[clamp(1.8rem,3vw,3rem)] leading-none tracking-tighter text-[#F1FDFD]">SEPT</span>
                <span className="font-bricolage text-[clamp(1.5rem,2.5vw,2.4rem)] leading-none font-light text-[#EE4B15]">05</span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-white/10 bg-[#0C1235]/80 px-4 py-3 sm:px-6 sm:py-4 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-[0_15px_35px_rgba(46,108,255,0.2)] transition-all duration-300">
                <span className="font-blackhan uppercase text-[clamp(1.8rem,3vw,3rem)] leading-none tracking-tighter text-[#F1FDFD]">JIS</span>
                <div className="font-bricolage text-[clamp(0.75rem,1.2vw,1.1rem)] leading-[0.95] text-[#F1FDFD]/85">
                  <div>University</div>
                  <div className="text-[#EE4B15] font-bold">Kolkata</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}