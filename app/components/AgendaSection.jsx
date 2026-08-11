'use client';

import React, { useState, useEffect, useRef } from 'react';
import { agendaData } from '../data/constants';

export default function AgendaSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start calculating when container starts entering near middle of screen
      const viewportCenter = windowHeight * 0.65;
      const distanceScrolled = viewportCenter - rect.top;
      const totalHeight = rect.height;

      let progress = (distanceScrolled / totalHeight) * 100;
      progress = Math.max(0, Math.min(100, progress));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = entry.target.getAttribute('data-index');
        if (entry.isIntersecting && index !== null) {
          setVisibleItems((prev) => ({ ...prev, [index]: true }));
        }
      });
    }, observerOptions);

    const itemElements = containerRef.current?.querySelectorAll('.timeline-item');
    if (itemElements) {
      itemElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="agenda" className="mx-auto mt-12 w-full max-w-6xl px-3 text-center sm:mt-16 sm:px-4">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <span className="inline-block text-[10px] sm:text-xs font-black text-[#EE4B15] uppercase tracking-[0.3em] mb-3 select-none">
          ✦ SCHEDULE & AGENDA
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-blackhan text-white tracking-tight leading-[1.1] select-none">
          Event <span className="text-gradient-neon">Timeline</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-medium leading-relaxed">
          From problem discovery to rapid building and a final project showcase.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#0C1235]/80 border border-[#EE4B15]/30 px-5 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase text-slate-200 tracking-widest mt-6 shadow-[0_0_20px_rgba(238,75,21,0.15)] select-none backdrop-blur-md">
          <svg className="w-3.5 h-3.5 text-[#EE4B15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Saturday, 5 September 2026
        </div>
      </div>

      {/* Centered Timeline Container */}
      <div ref={containerRef} className="relative mx-auto w-full max-w-5xl py-4">
        {/* Background Vertical Line Track */}
        <div className="absolute left-6 sm:left-8 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Scroll Progress Filled Line */}
        <div
          className="absolute left-6 sm:left-8 md:left-1/2 top-4 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#EE4B15] via-[#FF7A45] to-[#EE4B15] shadow-[0_0_14px_rgba(238,75,21,0.85)] transition-all duration-150 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />

        {/* Laser Bullet Tip at the leading edge of progress line */}
        {scrollProgress > 0 && scrollProgress < 99 && (
          <div
            className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#EE4B15] shadow-[0_0_15px_#EE4B15,0_0_30px_#EE4B15] border-2 border-white transition-all duration-150 ease-out pointer-events-none z-30"
            style={{ top: `calc(1rem + ${scrollProgress}%)` }}
          />
        )}

        {/* Timeline Items */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {agendaData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isRevealed = !!visibleItems[index];

            return (
              <div
                key={index}
                data-index={index}
                className="timeline-item relative flex flex-col md:flex-row items-center w-full"
              >
                {/* Center / Left Node Indicator */}
                <div
                  className={`absolute left-6 sm:left-8 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-500`}
                >
                  {/* Ping Ring on Reveal */}
                  {isRevealed && (
                    <span className="absolute h-12 w-12 rounded-full bg-[#EE4B15]/40 animate-ping opacity-75" />
                  )}

                  {/* Node Circle */}
                  <div
                    className={`relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border-2 font-black text-xs sm:text-sm transition-all duration-500 select-none ${
                      isRevealed
                        ? 'border-[#EE4B15] bg-[#EE4B15] text-white shadow-[0_0_25px_rgba(238,75,21,0.8)] scale-110'
                        : 'border-white/20 bg-[#0C1235] text-slate-400 scale-95'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Card Container Wrapper (Alternating Desktop Sides) */}
                <div
                  className={`w-full pl-14 sm:pl-20 md:pl-0 md:w-1/2 ${
                    isEven
                      ? 'md:pr-12 md:mr-auto md:text-right'
                      : 'md:pl-12 md:ml-auto md:text-left'
                  }`}
                >
                  {/* Card Content Box */}
                  <div
                    className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,53,0.9),rgba(8,12,30,0.96))] p-5 sm:p-6 md:p-7 shadow-[0_18px_50px_rgba(3,6,18,0.45)] backdrop-blur-xl transition-all duration-700 ease-out group hover:-translate-y-1 hover:border-[#EE4B15]/40 hover:shadow-[0_20px_60px_rgba(238,75,21,0.2)] ${
                      isRevealed
                        ? 'opacity-100 translate-y-0 scale-100 md:translate-x-0'
                        : `opacity-0 translate-y-8 scale-95 ${
                            isEven ? 'md:-translate-x-12' : 'md:translate-x-12'
                          }`
                    }`}
                  >
                    {/* Glowing Hover Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EE4B15]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                    {/* Subtle Side Accent Beam */}
                    <div
                      className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#EE4B15] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isEven ? 'right-0' : 'left-0'
                      }`}
                    />

                    {/* Header Badges */}
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-4 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#EE4B15]/30 bg-[#EE4B15]/15 px-3 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-[#EE4B15]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#EE4B15] animate-pulse" />
                        {item.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-white transition-colors duration-200">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-slate-300 font-normal">
                      {item.description}
                    </p>

                    {/* Footer Info: Time & Speakers */}
                    <div
                      className={`mt-6 pt-5 border-t border-white/8 flex flex-wrap items-center justify-between gap-4 ${
                        isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                      }`}
                    >
                      {/* Time Pill */}
                      <div className="inline-flex items-center gap-2 rounded-xl border border-[#EE4B15]/25 bg-[#EE4B15]/10 px-3.5 py-1.5 text-xs sm:text-sm font-tech font-bold text-[#EE4B15] shadow-inner">
                        <svg className="w-4 h-4 text-[#EE4B15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.time}
                      </div>

                      {/* Speakers */}
                      {item.speakers && item.speakers.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Mentors:
                          </span>
                          <div className="flex items-center -space-x-2">
                            {item.speakers.map((sp, idx) => (
                              <div key={idx} className="group/sp relative">
                                <img
                                  src={sp.img}
                                  alt={sp.name}
                                  className="h-8 w-8 rounded-full border-2 border-[#0C1235] object-cover shadow-md transition-all duration-200 hover:z-30 hover:scale-125 hover:border-[#EE4B15]"
                                />
                                {/* Speaker Name Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/sp:block whitespace-nowrap rounded-md bg-[#0C1235] border border-white/20 px-2 py-1 text-[10px] font-bold text-white shadow-xl z-40">
                                  {sp.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

