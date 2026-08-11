/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const handleScrollTo = (e, targetId) => {
    if (typeof window !== 'undefined') {
      const isHome = window.location.pathname === '/';
      const el = document.getElementById(targetId);
      if (isHome && el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${targetId}`);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#090D2B] border-t border-white/10 pt-16 sm:pt-24 pb-8 z-10 overflow-hidden mt-12 sm:mt-24">

      {/* Background Gradients & Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#EE4B15]/80 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#EE4B15]/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-8 mb-16">

          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="group flex flex-col items-center md:items-start mb-6">
              <span className="font-extrabold text-white text-sm sm:text-base tracking-widest uppercase mb-1 flex items-center gap-2 select-none">
                InnovateX
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE4B15] animate-ping" />
              </span>
              <h2 className="font-blackhan text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(238,75,21,0.5)] select-none">
                Connect <span className="text-[#EE4B15]">26</span>
              </h2>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed font-light">
              Join the ultimate developer-focused community conference. Build, ship, and connect with the best minds in tech.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#EE4B15]/20 hover:text-[#EE4B15] hover:border-[#EE4B15]/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(238,75,21,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#EE4B15]/20 hover:text-[#EE4B15] hover:border-[#EE4B15]/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(238,75,21,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#EE4B15]/20 hover:text-[#EE4B15] hover:border-[#EE4B15]/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(238,75,21,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300">Home</Link></li>
              <li><a href="/#comingsoon" onClick={(e) => handleScrollTo(e, 'comingsoon')} className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300 transition-all">Agenda</a></li>
              <li><a href="/#comingsoon" onClick={(e) => handleScrollTo(e, 'comingsoon')} className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300 transition-all">Speakers</a></li>
              <li><a href="/#ticket" onClick={(e) => handleScrollTo(e, 'ticket')} className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300 transition-all">Get Tickets</a></li>
              <li><Link href="/login" className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300 transition-all">Dashboard Login</Link></li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">Event Details</h4>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EE4B15] group-hover:bg-[#EE4B15] group-hover:text-white transition-all duration-300 shrink-0 shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h5 className="text-white font-bold text-sm mb-1 group-hover:text-[#EE4B15] transition-colors">Venue</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    JIS University, Agarpara<br />Kolkata, West Bengal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EE4B15] group-hover:bg-[#EE4B15] group-hover:text-white transition-all duration-300 shrink-0 shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h5 className="text-white font-bold text-sm mb-1 group-hover:text-[#EE4B15] transition-colors">Date</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Saturday, September 5th<br />2026
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest text-center sm:text-left select-none">
            &copy; 2026 InnovateX Community. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors group"
          >
            Back to top
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#EE4B15] group-hover:border-[#EE4B15] transition-all duration-300 shadow-md">
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
