import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-perforation w-full rounded-t-[48px] px-6 pt-16 pb-10 text-center z-10 relative">
      {/* Ambient subtle grid inside footer */}
      <div className="absolute inset-0 bg-ticket-grid opacity-5 pointer-events-none rounded-t-[48px]" />
      
      {/* Top Logo and Organization Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto mb-10 relative z-10">
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-650 flex items-center justify-center text-white font-black text-xl select-none">
            I
          </div>
          <div className="text-left font-display">
            <span className="font-black text-white tracking-wider text-sm block">INNOVATEX</span>
            <span className="text-[9px] font-black tracking-widest uppercase text-indigo-400 block">CONNECT &apos;26</span>
          </div>
        </div>

        {/* Divider Line in between for larger screens */}
        <div className="hidden sm:block h-6 w-px bg-slate-800" />

        {/* Right Organized By */}
        <div className="flex items-center gap-2.5">
          <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">ORGANIZED BY</span>
          <span className="text-sm font-black tracking-wider text-white font-display">INNOVATEX COMMUNITY</span>
        </div>
      </div>

      {/* Middle Quote & Details */}
      <div className="flex flex-col items-center gap-5 my-8 relative z-10">
        {/* Star icon */}
        <div className="text-indigo-455">
          <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
          </svg>
        </div>

        {/* Quote */}
        <blockquote className="text-white font-display font-extrabold text-base md:text-lg italic max-w-lg leading-relaxed tracking-tight">
          &ldquo;AI-native founders don&apos;t wait. They build. Start now.&rdquo;
        </blockquote>

        {/* Location Pin */}
        <div className="inline-flex items-center gap-2 text-indigo-455 font-extrabold text-[10px] md:text-xs tracking-widest uppercase bg-indigo-950/45 px-5 py-2.5 rounded-full border border-indigo-900/30">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span>JIS University, Agarpara, Kolkata</span>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-slate-800/40 my-8 max-w-4xl mx-auto relative z-10" />

      {/* Bottom copyright */}
      <div className="text-[9px] font-black tracking-widest uppercase text-slate-500 relative z-10 select-none">
        &copy; 2026 INNOVATEX COMMUNITY
      </div>

    </footer>
  );
}
