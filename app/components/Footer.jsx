/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
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
              <a href="https://www.instagram.com/innovatex_com" target='_blank' className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#EE4B15]/20 hover:text-[#EE4B15] hover:border-[#EE4B15]/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(238,75,21,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/innovatex-coders" target='_blank' className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#EE4B15]/20 hover:text-[#EE4B15] hover:border-[#EE4B15]/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(238,75,21,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61574101536875" target='_blank' className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#EE4B15]/20 hover:text-[#EE4B15] hover:border-[#EE4B15]/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(238,75,21,0.4)]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/#" className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300">Home</Link></li>
              {/* TODO: Implement Agenda */}
              <li><Link href="/#comingsoon" className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300 transition-all">Agenda</Link></li>
              <li><Link href="/#speakers" className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300 transition-all">Speakers</Link></li>
              <li><Link href="/#ticket" className="text-slate-400 hover:text-[#EE4B15] text-sm font-medium transition-colors hover:translate-x-1 inline-block duration-300 transition-all">Get Tickets</Link></li>
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
