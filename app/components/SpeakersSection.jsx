'use client';

import React from 'react';
import { speakersList } from '../data/constants';

function SpeakerCard({ speaker, index }) {
  return (
    <div className="group relative w-full max-w-[300px] mx-auto">
      <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-[#EE4B15]/15 via-transparent to-[#2E6CFF]/12 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,53,0.96),rgba(7,11,30,0.96))] shadow-[0_24px_70px_rgba(3,6,18,0.5)] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#EE4B15]/35">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#EE4B15] to-transparent" />

        <div className="flex h-full flex-col p-4 sm:p-5">
          <div className="mb-4 flex flex-col items-start gap-2 text-[9px] uppercase tracking-[0.22em] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-[10px] sm:tracking-[0.3em]">
            <span className="rounded-full border border-[#EE4B15]/20 bg-[#EE4B15]/10 px-2.5 py-1 font-black text-[#EE4B15]">
              SPEAKER {String(index + 1).padStart(2, '0')}
            </span>
            <span className="pl-1 sm:pl-0">MENTOR</span>
          </div>

          <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-b from-[#12193f] to-[#070b1e] p-2">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(238,75,21,0.25),transparent_45%)]" />
            <img
              src="/souma.png"
              alt={speaker.name}
              className="h-[220px] w-full rounded-[18px] object-cover object-top grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-[14px] border border-white/10 bg-[#090d2b]/85 px-3 py-2 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#EE4B15]">
                InnovateX Connect &apos;26
              </p>
            </div>
          </div>

          <div className="mt-4 flex-1 text-left">
            <h3 className="text-lg font-blackhan leading-tight text-white transition-colors duration-200 group-hover:text-[#EE4B15] sm:text-xl">
              {speaker.name}
            </h3>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.24em] text-[#EE4B15] sm:text-xs">
              {speaker.role}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {speaker.desc || 'INNOVATEX CONNECT MENTOR'}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.3em] text-slate-400">
            <span className="whitespace-nowrap">KOLKATA</span>
            <span className="whitespace-nowrap text-[#EE4B15]">BUILD • GUIDE • INSPIRE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpeakersSection() {
  return (
    <section id="speakers" className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-4 sm:mt-28 sm:px-6">
      <div className="mb-10 max-w-3xl sm:mb-14">
        <p className="mb-3 inline-block select-none text-[10px] font-black uppercase tracking-[0.3em] text-[#EE4B15]">
          ✦ SPEAKERS &amp; MENTORS
        </p>
        <h2 className="text-left text-3xl font-blackhan leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-white">THE</span>{' '}
          <span className="text-gradient-neon">BUILDERS</span>
        </h2>
        <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-transparent shadow-[0_0_12px_rgba(238,75,21,0.6)]" />
        <p className="mt-4 max-w-2xl text-left text-sm leading-relaxed text-slate-400 sm:text-base">
          A curated circle of founders, operators, and mentors shaping the next wave of builders through sharp conversations and real guidance.
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {speakersList.map((speaker, index) => (
          <SpeakerCard key={`${speaker.name}-${index}`} speaker={speaker} index={index} />
        ))}
      </div>
    </section>
  );
}
