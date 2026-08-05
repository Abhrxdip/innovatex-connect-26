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
    <section className="relative w-full min-h-screen h-250 overflow-hidden bg-[#090D2B] bg-grid-pattern text-[#F1FDFD]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(238,75,21,0.08),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(241,253,253,0.05),transparent_28%),linear-gradient(180deg,rgba(6,10,36,0)_0%,rgba(6,10,36,0.32)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-hero-sparkle opacity-70 pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-350 flex-col px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pt-28">
        <div className="flex-1 lg:grid lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:gap-8">
          <div className="flex h-full flex-col gap-10 lg:gap-12">
            <div className="max-w-190">
              <div className="flex flex-col leading-none">
                <div className="flex items-end gap-0 sm:gap-1 uppercase text-[#F1FDFD] font-bbh tracking-[-0.06em] drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                  <span className="text-[clamp(3.6rem,8vw,7.1rem)]">INNOVATE</span>
                  <span className="text-[clamp(5.1rem,10vw,9rem)] -mb-1 sm:-mb-2">X</span>
                </div>
                <span className="-mt-2 max-w-fit font-bricolage text-[#EE4B15] uppercase tracking-[-0.08em] leading-none text-[clamp(4rem,8.5vw,8rem)] drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] sm:-mt-4">
                  CONNECT
                </span>
              </div>

              <div className="mt-8 flex w-full flex-col gap-0 sm:flex-row sm:gap-0 sm:items-stretch">
                <button
                  type="button"
                  onClick={handleTicketClick}
                  disabled={!isAvailable}
                  className={`group flex flex-1 items-center justify-between gap-4 rounded-[28px_0_0_28px] bg-[#F1FDFD] px-6 py-6 text-left shadow-[0_24px_70px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-38.5 sm:px-8 sm:py-7 lg:px-10 ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-85'}`}
                  aria-label={isAvailable ? 'Get ticket' : 'Sold out'}
                >
                  <div className="font-blackhan uppercase leading-[0.82] tracking-[-0.06em] text-[#0C1235] text-[clamp(2.8rem,6vw,4.8rem)]">
                    <div>GET</div>
                    <div>YOUR</div>
                  </div>
                  <img src="/tickets.svg" alt="" aria-hidden="true" className="h-14 w-14 shrink-0 sm:h-16 sm:w-16 lg:h-18 lg:w-18" />
                </button>

                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center rounded-[0_28px_28px_0] bg-[#0C1235] px-6 py-6 text-[#F1FDFD] shadow-[0_24px_70px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-38.5 sm:px-8 sm:py-7 lg:px-9"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bricolage text-[clamp(2.8rem,5.5vw,4.6rem)] leading-none tracking-[-0.08em] text-[#F1FDFD]">JOIN</span>
                    <div className="font-bricolage text-[clamp(0.95rem,1.7vw,1.35rem)] uppercase leading-[0.9] tracking-[-0.03em]">
                      <div>OUR</div>
                      <div>WHATSAPP</div>
                      <div className="text-[#EE4B15]">COMMUNITY</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-end justify-between gap-10 lg:mt-0 lg:pt-0">
            {/* <div className="hidden lg:block" /> */}

            <div className="w-full self-end lg:mt-auto">
              <div className="flex flex-col items-end leading-none uppercase font-blackhan tracking-[-0.08em] text-[#EE4B15] select-none  ">
                <span className="text-[clamp(8rem,24vw,50rem)] mb-[-20%]">
                    <span className="text-[#EE4B15]">2</span>
                    <span className="text-[#F1FDFD]">0</span>
                </span>
                <span className="text-[clamp(8rem,24vw,50rem)]">
                  <span className="text-[#F1FDFD]">2</span>
                  <span className="text-[#EE4B15]">6</span>
                </span>
              </div>
            </div>

            <div className="flex w-full flex-wrap justify-end gap-4 pt-2 sm:gap-5 lg:pt-0">
              <div className="flex items-center gap-3 rounded-[10px] border border-white/10 bg-[#0C1235]/80 px-5 py-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-6 sm:py-4">
                <span className="font-blackhan uppercase text-[clamp(2.2rem,4vw,3.1rem)] leading-none tracking-tighter text-[#F1FDFD]">SEPT</span>
                <span className="font-bricolage text-[clamp(1.9rem,3vw,2.5rem)] leading-none font-light text-[#F1FDFD]">05</span>
              </div>

              <div className="flex items-center gap-3 rounded-[10px] border border-white/10 bg-[#0C1235]/80 px-5 py-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-6 sm:py-4">
                <span className="font-blackhan uppercase text-[clamp(2.3rem,4vw,3.2rem)] leading-none tracking-tighter text-[#F1FDFD]">JIS</span>
                <div className="font-bricolage text-[clamp(0.9rem,1.4vw,1.15rem)] leading-[0.95] text-[#F1FDFD]/82">
                  <div>University</div>
                  <div>Kolkata</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}