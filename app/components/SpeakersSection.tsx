import React from 'react';
import { speakersList } from '../data/constants';

function SpeakerCard({ speaker }: { speaker: typeof speakersList[number] }) {
  return (
    <div className="relative w-[340px] h-[470px]">
      
      {/* Back Card Layer 2 */}
      <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white to-[#5D49E8] border border-slate-200/20 translate-x-[-20px] translate-y-[24px] rotate-[-6deg] shadow-sm z-0" />
      
      {/* Back Card Layer 1 */}
      <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white to-[#7054F6] border border-slate-200/40 translate-x-[-10px] translate-y-[12px] rotate-[-3deg] shadow-md z-10" />
      
      {/* Main Card (Front) */}
      <div className="relative w-full h-full rounded-[30px] bg-white border border-slate-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col z-20 group/card transition-all duration-[350ms] ease-out hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_25px_50px_rgba(112,84,246,0.18)]">
        
        {/* Top White Area */}
        <div className="relative w-full h-[275px] bg-white bg-graph-pattern overflow-hidden p-5 flex flex-col justify-between select-none">
          
          {/* Sparkle decorative icons */}
          <div className="absolute top-12 left-5 w-4 h-4 text-[#8E73FF] opacity-60">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
          </div>
          <div className="absolute top-20 left-10 w-3 h-3 text-[#8E73FF] opacity-45">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
          </div>

          {/* Speaker Watermark */}
          <span className="absolute top-10 left-3 text-[72px] font-black text-slate-100/90 tracking-tighter uppercase pointer-events-none select-none font-display">
            Speaker
          </span>

          {/* Sponsor logos on top right */}
          <div className="absolute top-5 right-5 flex flex-col items-end text-[7px] text-slate-400 font-bold leading-none z-30">
            <span>hosted by <strong className="text-[#1E1B5D] text-[8px] font-black">InnovateX</strong></span>
            <span className="mt-0.5">in association with <strong className="text-indigo-600 text-[8px] font-black">JIS-U</strong></span>
          </div>

          {/* Grayscale Portrait (slightly overlaps bottom section) */}
          <img 
            src="/souma.png" 
            alt={speaker.name} 
            className="absolute bottom-[-10px] left-4 w-[185px] h-[210px] object-cover object-top rounded-t-2xl z-30 grayscale group-hover/card:grayscale-0 transition-all duration-[350ms] ease-out" 
          />

          {/* Speaker Name & Title on the right */}
          <div className="absolute bottom-6 right-5 text-right flex flex-col items-end z-30 max-w-[130px]">
            <h4 className="text-base font-black text-[#1E1B5D] leading-tight tracking-tight">
              {speaker.name}
            </h4>
            <span className="text-[8.5px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">
              {speaker.role}
            </span>
          </div>

        </div>

        {/* Bottom Purple Area */}
        <div className="relative flex-1 bg-gradient-to-b from-[#846DFF] via-[#7054F6] to-[#5D49E8] overflow-visible">
          
          {/* CSS-based Perforation Edge */}
          <div 
            className="absolute -top-[6px] left-0 w-full h-[12px] z-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 10px 0px, #FFF 5.5px, transparent 6px)',
              backgroundSize: '20px 12px',
              backgroundRepeat: 'repeat-x'
            }}
          />

          {/* Center Badge overlapping dividing edge */}
          <div className="absolute top-[-50px] left-4 w-[100px] h-[100px] rounded-full bg-gradient-to-b from-[#1E1B5D] to-[#2B2A8E] border-[5px] border-white shadow-[0_8px_20px_rgba(30,27,93,0.35)] flex flex-col items-center justify-center text-white z-50 group-hover/card:scale-108 group-hover/card:rotate-[4deg] transition-all duration-500 ease-out">
            <div className="flex flex-col items-center justify-center text-center p-1 font-display select-none">
              <span className="text-[6.5px] text-indigo-300 font-extrabold uppercase tracking-widest leading-none">InnovateX</span>
              <span className="text-xs font-black tracking-tight leading-none mt-1">Connect</span>
              <span className="text-xs font-black tracking-tight leading-none mt-0.5">Meetup</span>
              <span className="text-[8px] font-extrabold text-indigo-200 mt-0.5 uppercase tracking-widest font-tech">2026</span>
            </div>
          </div>

          {/* Bottom Content Area */}
          <div className="pt-16 pb-5 px-5 h-full flex flex-col justify-between text-white relative z-30">
            
            {/* Row 1 */}
            <div className="flex justify-between items-center w-full">
              
              {/* Left Description */}
              <div className="flex items-center gap-1.5 text-left">
                <svg className="w-3.5 h-3.5 text-indigo-200 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[7.2px] font-black text-indigo-150 uppercase tracking-wide leading-tight max-w-[130px]">
                  INNOVATEX COMMUNITY&apos;S 8-HOUR MEETUP IN KOLKATA.
                </span>
              </div>

              {/* Right Date Box */}
              <div className="flex items-center gap-1 text-white shrink-0">
                <span className="text-[8.5px] font-black uppercase tracking-wider">Sept</span>
                <div className="bg-black/35 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-black tracking-widest font-tech leading-none">
                  05
                </div>
                <span className="text-[6.5px] font-bold text-indigo-200 rotate-90 origin-center leading-none">2026</span>
              </div>

            </div>

            {/* Row 2 */}
            <div className="flex flex-col gap-1.5 items-end w-full">
              <div className="bg-black/20 border border-white/5 px-2.5 py-0.5 rounded-full text-[7px] font-bold tracking-wider uppercase text-indigo-100">
                JIS University, Agarpara, Kolkata
              </div>
              <div className="bg-black/45 border border-indigo-400/20 px-2.5 py-0.5 rounded-full text-[7.5px] font-black tracking-widest uppercase text-emerald-400">
                innovatex.community
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function SpeakersSection() {
  return (
    <div id="speakers" className="max-w-6xl mx-auto w-full mt-32 text-center flex flex-col items-center">
      
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/50 text-[10px] font-bold text-indigo-700 tracking-wider uppercase mb-6 shadow-sm">
        <svg className="w-3.5 h-3.5 text-indigo-650 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
        </svg>
        <span>Event Speakers</span>
      </div>
      
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15]">
        Learn from those who <br />
        <span className="text-gradient-neon font-black">actually build.</span>
      </h2>
      
      {/* Subtext */}
      <p className="text-slate-400 text-sm mt-4 max-w-xl font-medium leading-relaxed">
        Our mentors and facilitators are here to guide you through your <strong className="text-slate-700">8-hour journey</strong> of <span className="text-indigo-650 font-bold">exploration and execution</span>.
      </p>

      {/* 3+2 Speakers Layout (Top row: 3, Bottom row: 2 centered) */}
      <div className="flex flex-col items-center gap-16 md:gap-24 w-full mt-24">
        
        {/* First Row: 3 Speaker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 justify-items-center w-full">
          {speakersList.slice(0, 3).map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </div>

        {/* Second Row: 2 Centered Speaker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 justify-items-center w-full max-w-4xl">
          {speakersList.slice(3, 5).map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </div>

      </div>

    </div>
  );
}
