'use client';

import React from 'react';
import { speakersList } from '../data/constants';

function SpeakerCard({ speaker, isSecond }) {
  return (
    <div className="flex flex-col items-center w-[270px] sm:w-[300px] md:w-[325px] shrink-0">

      {/* Slanted Card Frame Container */}
      <div className="relative w-full h-[310px] sm:h-[340px] md:h-[365px] mb-4">

        {/* Orange Accent Frame (Top & Right Outline) */}
        <div
          className="absolute -top-2.5 -right-2.5 w-full h-full -skew-x-[11deg] rounded-[3px] border-[2px] border-[#EE4B15] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Foreground Photo Card (Slanted Parallelogram with subtle corner radius) */}
        <div className="relative w-full h-full -skew-x-[11deg] rounded-[3px] overflow-hidden z-10 bg-[#0C1235] shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
          <img
            src={speaker.image}
            alt={speaker.name}
            className={`w-full h-full object-cover skew-x-[11deg] ${isSecond
              ? 'scale-[1.4] object-[65%_18%]'
              : 'scale-[1.3] object-[center_15%]'
              }`}
          />
        </div>
      </div>

      {/* Upright Text Information Below the Card */}
      <div className="text-center flex flex-col items-center w-full px-2">
        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wider uppercase font-sans">
          {speaker.name}
        </h3>
        <p className="mt-1 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#EE4B15]">
          {speaker.role}
        </p>
        <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
          {speaker.company}
        </p>
      </div>

    </div>
  );
}

export default function SpeakersSection() {
  return (
    <section id="speakers" className="relative z-10 w-full py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Main Flex Row: Solid Orange Vertical SPEAKERS + 2 Speaker Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-12 lg:gap-14">

          {/* Vertical "SPEAKERS" Solid Orange Typography */}
          <div className="flex items-center justify-center shrink-0 select-none px-2 md:px-0">
            <h2
              className="font-blackhan text-5xl sm:text-6xl md:text-7xl lg:text-[86px] leading-none md:[writing-mode:vertical-lr] lg:[writing-mode:vertical-lr] select-none tracking-[0.08em]"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px #EE4B15',
              }}
            >
              SPEAKERS
            </h2>
          </div>

          {/* Speaker Cards Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-8 md:gap-10 lg:gap-12 w-full max-w-2xl md:max-w-3xl">
            {speakersList.map((speaker, index) => (
              <SpeakerCard
                key={`${speaker.name}-${index}`}
                speaker={speaker}
                isSecond={index === 1}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
