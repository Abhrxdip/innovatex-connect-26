'use client';

import React from 'react';

export default function WhyAttendSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#090D2B] text-[#F1FDFD]">
      {/* Subtle dot grid pattern over the whole section */}
      <div className="absolute inset-0 pointer-events-none opacity-90">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.18) 1.15px, transparent 1.15px)',
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Soft radial glow behind the centre */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(238,75,21,0.06),transparent_62%)] pointer-events-none" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-[1180px]">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-12 md:grid-rows-[clamp(250px,24vw,320px)_auto_clamp(270px,24vw,340px)] md:gap-4 lg:gap-5">
          {/* Central Heading - reference-style label */}
          <h2 className="flex items-center justify-center gap-2 whitespace-nowrap py-0 text-center leading-none md:col-span-12 md:row-start-2 md:justify-self-center md:py-0 md:-mt-1">
            <span className="font-blackhan text-[clamp(1.55rem,2.6vw,2.35rem)] text-[#F1FDFD]">
              Why
            </span>
            <span className="font-bricolage text-[clamp(1.35rem,2.2vw,2rem)] font-light tracking-[-0.04em] text-[#EE4B15]">
              Attend?
            </span>
          </h2>

          {/* Networking - top left, orange border + orange text */}
          <div className="group relative overflow-hidden rounded-[26px] border-[4px] border-[#EE4B15] bg-[#0C1235]/80 shadow-[0_0_0_1px_rgba(238,75,21,0.08)] md:col-span-4 md:row-start-1 md:h-full md:self-stretch">
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(238,75,21,0.32) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />
            <div className="relative z-10 grid h-full min-h-0 place-items-center p-6 sm:p-8 md:p-10">
              <h3 className="max-w-full px-2 text-center font-blackhan text-[clamp(1.95rem,3.7vw,3.5rem)] leading-none tracking-tight text-[#EE4B15]">
                Networking
              </h3>
            </div>
          </div>

          {/* Inspiring Talks - top right, white border + white text */}
          <div className="group relative overflow-hidden rounded-[26px] border-[3px] border-white/90 bg-[#0C1235]/55 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] md:col-span-8 md:row-start-1 md:h-full md:self-stretch">
            <div
              className="absolute inset-0 pointer-events-none opacity-16"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />
            <div className="relative z-10 grid h-full min-h-0 place-items-center px-6 py-8 sm:px-8 md:px-10">
              <h3 className="translate-y-1 font-blackhan text-[clamp(2rem,4.1vw,3.8rem)] text-center leading-none tracking-tight text-[#E0E3EA]">
                Inspiring Talks
              </h3>
            </div>
          </div>

          {/* Community Meetup - bottom left, wide, white border + white text */}
          <div className="group relative overflow-hidden rounded-[26px] border-[3px] border-white/90 bg-[#0C1235]/55 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] md:col-span-8 md:row-start-3 md:h-full md:self-stretch">
            <div
              className="absolute inset-0 pointer-events-none opacity-16"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />
            <div className="relative z-10 grid h-full min-h-0 place-items-center px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14">
              <h3 className="translate-y-1 font-blackhan text-[clamp(2.05rem,4.2vw,3.85rem)] text-center leading-none tracking-tight text-[#F1FDFD]">
                Community Meetup
              </h3>
            </div>
          </div>

          {/* Swags & Giveaways - bottom right, tall, orange border + orange text */}
          <div className="group relative overflow-hidden rounded-[26px] border-[4px] border-[#EE4B15] bg-[#0C1235]/80 shadow-[0_0_0_1px_rgba(238,75,21,0.08)] md:col-span-4 md:row-start-3 md:h-full md:self-stretch md:ml-1">
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(238,75,21,0.32) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />
            <div className="relative z-10 grid h-full min-h-0 place-items-center px-5 py-8 sm:px-6 md:px-8">
              <h3 className="translate-y-1 font-blackhan text-[clamp(1.85rem,3.6vw,3.3rem)] text-center leading-[0.92] tracking-tight text-[#EE4B15]">
                Swags<br />&amp;<br />Giveaways
              </h3>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
