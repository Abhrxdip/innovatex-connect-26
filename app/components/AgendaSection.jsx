import React from 'react';
import { agendaData } from '../data/constants';

export default function AgendaSection() {
  return (
    <div id="agenda" className="max-w-6xl mx-auto w-full mt-40 mb-28 text-center flex flex-col items-center px-4">
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[10px] font-bold text-indigo-700 tracking-wider uppercase mb-6 shadow-sm">
        <svg className="w-3.5 h-3.5 text-indigo-650 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
        <span>Event Schedule</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15] flex items-center justify-center gap-2">
        Event Schedule <span className="text-[#3B34A8] animate-pulse">✦</span>
      </h2>
      <p className="text-slate-400 text-sm mt-4 max-w-2xl font-medium leading-relaxed">
        The flow of the experience is designed to take you from <strong className="text-slate-700">problem discovery</strong> to <span className="text-[#3B34A8] font-bold">rapid building</span> and a final project showcase.
      </p>
      <div className="bg-slate-100 border border-slate-200/50 px-6 py-2 rounded-full text-xs font-black uppercase text-slate-600 tracking-widest mt-8 mb-16 shadow-sm select-none">
        Saturday, 5 September 2026
      </div>
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {agendaData.map((item, index) => (
          <div key={index} className="group relative rounded-[28px] bg-[#F8FAFC]/90 hover:bg-white border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_35px_rgba(59,52,168,0.05)] transition-all duration-300 ease-out p-6 md:p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/10 to-transparent opacity-0 group-hover:opacity-100 rounded-[28px] transition-opacity duration-300 pointer-events-none" />
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 relative z-10">
              <div className="flex-1 flex flex-col items-start text-left">
                <span className="px-3 py-1 rounded-md bg-indigo-50 border border-indigo-100/60 text-[9px] font-black text-[#3B34A8] tracking-widest uppercase mb-4">{item.category}</span>
                <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-[1.25]">{item.title}</h3>
              </div>
              <div className="w-full md:max-w-md text-left md:text-left">
                <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">{item.description}</p>
              </div>
            </div>
            <div className="border-t border-slate-200/50 my-6 relative z-10" />
            <div className="flex justify-between items-center w-full relative z-10">
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</span>
                <span className="text-xs md:text-sm font-black text-slate-700 font-tech">{item.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Speakers:</span>
                <div className="flex items-center">
                  {item.speakers.map((sp, idx) => (
                    <img key={idx} src={sp.img} alt={sp.name} className="w-7 h-7 rounded-full border-2 border-white -ml-2 first:ml-0 shadow-sm object-cover" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
