import React from 'react';
import { agendaData } from '../data/constants';

export default function AgendaSection() {
  return (
    <section id="agenda" className="mx-auto mt-8 w-full max-w-6xl px-3 text-center sm:mt-12 sm:px-4">
      
      {/* Section Header */}
      <div className="mb-10 sm:mb-14">
        <span className="inline-block text-[10px] font-black text-[#EE4B15] uppercase tracking-[0.3em] mb-3 select-none">
          ✦ SCHEDULE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-blackhan text-white tracking-tight leading-[1.1] select-none">
          Event <span className="text-gradient-neon">Schedule</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-medium leading-relaxed">
          From problem discovery to rapid building and a final project showcase.
        </p>
        <div className="inline-block bg-[#0C1235]/70 border border-white/10 px-5 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase text-slate-300 tracking-widest mt-6 shadow-sm select-none">
          Saturday, 5 September 2026
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative mx-auto w-full max-w-5xl text-left">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#EE4B15]/50 to-transparent sm:left-[6.1rem] lg:left-[7.2rem]" />

        {agendaData.map((item, index) => (
          <article key={index} className="group relative flex gap-5 pb-8 sm:gap-8 sm:pb-10 lg:gap-10">
            <div className="relative z-10 flex w-10 shrink-0 flex-col items-center sm:w-24 lg:w-28">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-[#EE4B15]/35 bg-[#EE4B15]/10 text-[10px] font-black text-[#EE4B15] shadow-[0_0_0_8px_rgba(238,75,21,0.06)] transition-all duration-300 group-hover:bg-[#EE4B15] group-hover:text-white">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="mt-3 flex-1 w-px bg-white/5 group-hover:bg-[#EE4B15]/20 transition-colors duration-300" />
            </div>

            <div className="flex-1 pb-2 sm:pb-4">
              <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(135deg,rgba(12,18,53,0.9),rgba(8,12,30,0.94))] p-5 shadow-[0_18px_50px_rgba(3,6,18,0.38)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#EE4B15]/25 sm:p-6 md:p-7">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EE4B15]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                  <div className="flex min-w-0 flex-1 flex-col items-start">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="rounded-full border border-[#EE4B15]/20 bg-[#EE4B15]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.28em] text-[#EE4B15]">
                        {item.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.24em] text-slate-300">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="max-w-3xl text-lg font-black tracking-tight text-white sm:text-xl md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 rounded-[20px] border border-white/8 bg-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:min-w-[260px] lg:flex-col lg:items-start lg:justify-start">
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-slate-400">Time</span>
                      <span className="mt-1 block font-tech text-sm text-[#EE4B15] sm:text-base">
                        {item.time}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-slate-400">Speakers</span>
                      <div className="mt-2 flex items-center">
                        {item.speakers.map((sp, idx) => (
                          <img
                            key={idx}
                            src={sp.img}
                            alt={sp.name}
                            className="-ml-2 h-8 w-8 rounded-full border-2 border-[#0C1235] object-cover shadow-sm transition-transform duration-200 first:ml-0 hover:z-50 hover:scale-110"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
