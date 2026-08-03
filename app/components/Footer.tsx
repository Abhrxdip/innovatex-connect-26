import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#111436] via-[#0A0C27] to-[#050614] border-t border-white/10 rounded-t-[40px] sm:rounded-t-[48px] px-6 pt-16 pb-12 text-center z-10 relative mt-[-20px] mb-0 overflow-hidden">
      {/* Ambient subtle grid inside footer */}
      <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none rounded-[32px]" />
      
      {/* Top Logo and Organization Row (Rebranded styled logos with separator) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 relative z-10 max-w-xl mx-auto">
        
        {/* Left Logo (Rebranded Kerala Startup Carnival style) */}
        <div className="flex items-center gap-2.5">
          <div className="text-left font-display">
            <span className="font-extrabold text-white text-xs sm:text-sm tracking-tight block uppercase leading-none">InnovateX</span>
            <span className="font-black text-[#5D49E8] text-sm sm:text-base md:text-lg tracking-tight block leading-none mt-0.5">Connect</span>
            <span className="font-black text-[#5D49E8] text-sm sm:text-base md:text-lg tracking-tight block leading-none mt-0.5">&apos;26</span>
            <span className="text-[7px] font-mono tracking-widest text-slate-400 mt-1 block select-none">2026</span>
          </div>
          {/* Purple Sparkle/Diamond */}
          <div className="w-4 h-4 text-[#8E73FF] opacity-80 shrink-0 self-start mt-0.5">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden sm:block h-10 w-px bg-slate-700/60" />

        {/* Right Logo (Rebranded Life School Edex style) */}
        <div className="text-center sm:text-left font-display">
          <span className="text-[7.5px] sm:text-[8px] font-black text-indigo-350 tracking-widest block uppercase leading-none mb-1 select-none">INNOVATEX</span>
          <span className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight block leading-none uppercase">Community</span>
        </div>

      </div>

      {/* Middle Quote & Details */}
      <div className="flex flex-col items-center gap-5 my-6 relative z-10">
        {/* Sparkle Icon */}
        <div className="text-[#8E73FF]">
          <svg className="w-7 h-7 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
          </svg>
        </div>

        {/* Quote */}
        <blockquote className="text-white font-display font-extrabold text-sm min-[390px]:text-base md:text-lg italic max-w-lg mx-auto leading-relaxed tracking-tight px-4">
          &ldquo;AI-native founders don&apos;t wait. They build. Start now.&rdquo;
        </blockquote>

        {/* Location Pin & Venue */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="w-7 h-7 rounded-full bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-[#8E73FF]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <span className="text-[10px] min-[390px]:text-xs font-extrabold text-indigo-200 tracking-wider font-display max-w-xs leading-normal">
            JIS University, Agarpara, Kolkata
          </span>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-slate-800/40 my-6 max-w-md mx-auto relative z-10" />

      {/* Bottom copyright */}
      <div className="text-[9px] font-black tracking-widest uppercase text-slate-500 relative z-10 select-none pb-4">
        &copy; 2026 INNOVATEX COMMUNITY
      </div>

      {/* Scalloped Bottom Edge matching body background color */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[12px] z-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 10px 12px, #F8FAFC 5.5px, transparent 6px)',
          backgroundSize: '20px 12px',
          backgroundRepeat: 'repeat-x'
        }}
      />
    </footer>
  );
}
