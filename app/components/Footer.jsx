import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#090D2B] border-t border-white/5 px-4 sm:px-6 pt-12 sm:pt-16 pb-12 text-center z-10 relative mt-8 sm:mt-12 mb-0 overflow-hidden">
      <div className="absolute inset-0 bg-ticket-grid opacity-10 pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mb-8 sm:mb-10 relative z-10 max-w-xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="text-left font-display">
            <span className="font-extrabold text-white text-xs sm:text-sm tracking-tight block uppercase leading-none select-none">InnovateX</span>
            <span className="font-blackhan text-[#EE4B15] text-sm sm:text-base md:text-lg tracking-tight block leading-none mt-0.5 select-none">Connect &apos;26</span>
            <span className="text-[7px] font-mono tracking-widest text-slate-400 mt-1 block select-none">2026</span>
          </div>
          <div className="w-4 h-4 text-[#EE4B15] opacity-80 shrink-0 self-start mt-0.5">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
          </div>
        </div>
        <div className="hidden sm:block h-10 w-px bg-slate-700/60" />
        <div className="text-center sm:text-left font-display">
          <span className="text-[7.5px] sm:text-[8px] font-black text-[#EE4B15] tracking-widest block uppercase leading-none mb-1 select-none">INNOVATEX</span>
          <span className="text-lg sm:text-xl md:text-2xl font-blackhan text-white tracking-tight block leading-none uppercase select-none">Community</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 my-6 relative z-10">
        <div className="text-[#EE4B15] hover:scale-115 transition-transform duration-300">
          <svg className="w-7 h-7 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" /></svg>
        </div>
        <blockquote className="text-white font-display font-extrabold text-sm min-[390px]:text-base md:text-lg italic max-w-lg mx-auto leading-relaxed tracking-tight px-4 select-none">
          &ldquo;AI-native founders don&apos;t wait. They build. Start now.&rdquo;
        </blockquote>
        <div className="flex flex-col items-center gap-2 mt-4 group cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-[#EE4B15]/10 border border-[#EE4B15]/20 flex items-center justify-center text-[#EE4B15] group-hover:bg-[#EE4B15] group-hover:text-white transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <span className="text-[10px] min-[390px]:text-xs font-extrabold text-slate-300 tracking-wider font-display max-w-xs leading-normal group-hover:text-[#EE4B15] transition-colors duration-200">JIS University, Agarpara, Kolkata</span>
        </div>
      </div>

      <div className="w-full h-px bg-white/5 my-6 max-w-md mx-auto relative z-10" />
      <div className="text-[9px] font-black tracking-widest uppercase text-slate-500 relative z-10 select-none pb-4">&copy; 2026 INNOVATEX COMMUNITY</div>
    </footer>
  );
}
