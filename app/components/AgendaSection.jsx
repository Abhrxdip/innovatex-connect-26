import React from 'react';
import { agendaData } from '../data/constants';

export default function AgendaSection() {
  return (
    <div id="agenda" className="max-w-6xl mx-auto w-full mt-8 sm:mt-12 mb-16 sm:mb-28 text-center flex flex-col items-center px-3 sm:px-4">
      
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

      {/* Timeline Cards */}
      <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-4xl">
        {agendaData.map((item, index) => (
          <div key={index} className="group relative flex gap-4 sm:gap-6 items-stretch text-left">
            
            {/* Timeline Indicator */}
            <div className="hidden sm:flex flex-col items-center pt-6">
              <div className="w-10 h-10 rounded-full bg-[#EE4B15]/10 border-2 border-[#EE4B15]/30 flex items-center justify-center text-[#EE4B15] font-blackhan text-sm select-none group-hover:bg-[#EE4B15] group-hover:text-white group-hover:border-[#EE4B15] transition-all duration-300">
                {String(index + 1).padStart(2, '0')}
              </div>
              {index < agendaData.length - 1 && (
                <div className="w-px flex-1 bg-white/5 mt-2 group-hover:bg-[#EE4B15]/20 transition-colors duration-300" />
              )}
            </div>

            {/* Card */}
            <div className="flex-1 rounded-[20px] sm:rounded-[24px] bg-[#0C1235]/60 hover:bg-[#0C1235]/80 border border-white/5 hover:border-[#EE4B15]/20 shadow-sm hover:shadow-[0_15px_40px_rgba(238,75,21,0.08)] transition-all duration-300 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EE4B15]/3 to-transparent opacity-0 group-hover:opacity-100 rounded-[20px] sm:rounded-[24px] transition-opacity duration-300 pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 relative z-10">
                <div className="flex-1 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="sm:hidden w-7 h-7 rounded-full bg-[#EE4B15]/10 border border-[#EE4B15]/30 flex items-center justify-center text-[#EE4B15] font-bold text-[10px] select-none">{String(index + 1).padStart(2, '0')}</span>
                    <span className="px-2.5 py-1 rounded-md bg-[#EE4B15]/10 border border-[#EE4B15]/20 text-[9px] font-black text-[#EE4B15] tracking-widest uppercase">{item.category}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight leading-[1.25]">{item.title}</h3>
                </div>
                <div className="w-full md:max-w-md">
                  <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="border-t border-white/5 my-4 sm:my-5 relative z-10" />
              <div className="flex flex-wrap justify-between items-center gap-3 w-full relative z-10">
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</span>
                  <span className="text-sm md:text-base font-black text-[#EE4B15] font-tech">{item.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Speakers:</span>
                  <div className="flex items-center">
                    {item.speakers.map((sp, idx) => (
                      <img key={idx} src={sp.img} alt={sp.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0C1235] -ml-2 first:ml-0 shadow-sm object-cover hover:scale-110 hover:z-50 transition-transform duration-200" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
