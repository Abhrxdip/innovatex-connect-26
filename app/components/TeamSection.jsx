'use client';

import React from 'react';
import teamData from '../data/teamMembers.json';

function SocialIcon({ type, url }) {
  if (!url) return null;

  const icons = {
    linkedin: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    github: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
    x: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/70 hover:text-[#EE4B15] transition-colors p-1.5 bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-sm"
      title={type}
    >
      {icons[type]}
    </a>
  );
}

function TeamCard({ member }) {
  return (
    <div className="flex flex-col gap-2.5 group select-none">
      {/* 1. Slanted Photo Frame */}
      <div className="relative w-full h-[320px] sm:h-[350px] transition-transform duration-300 group-hover:-translate-y-1.5">
        <div
          className="w-full h-full bg-[#141926] border border-white/15 overflow-hidden relative shadow-xl group-hover:border-[#EE4B15]/50 transition-colors duration-300"
          style={{ transform: 'skewX(-14deg)' }}
        >
          {/* Fading Orange Strip Line along TOP BREADTH */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-transparent z-30 shadow-[0_0_10px_rgba(238,75,21,0.7)]" />

          {/* Orange Accent Stripe on Left Edge (runs ~42% down left side) */}
          <div className="absolute top-0 left-0 w-2.5 h-[42%] bg-[#D83A14] z-20 shadow-[0_0_12px_rgba(216,58,20,0.6)]" />

          {/* Un-skewed Inner Photo Container */}
          <div
            className="w-full h-full scale-125 flex items-center justify-center overflow-hidden"
            style={{ transform: 'skewX(14deg)' }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            />
          </div>

          {/* Top-Right Social Links Overlay */}
          {member.socials && (
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              {member.socials.linkedin && <SocialIcon type="linkedin" url={member.socials.linkedin} />}
              {member.socials.github && <SocialIcon type="github" url={member.socials.github} />}
              {member.socials.x && <SocialIcon type="x" url={member.socials.x} />}
            </div>
          )}

          {/* Subtle Bottom Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1A]/60 via-transparent to-transparent opacity-50 pointer-events-none" />
        </div>
      </div>

      {/* 2. Slanted Bottom Name Card (Exact Previous Design) */}
      <div
        className="relative w-full py-2.5 px-4 overflow-hidden border-t border-r border-white/70 border-b border-b-white/15 border-l border-l-white/20 shadow-xl group-hover:border-t-white group-hover:border-r-white transition-colors duration-300"
        style={{
          transform: 'skewX(-14deg)',
          background:
            'linear-gradient(90deg, rgba(210,50,18,0.92) 0%, rgba(180,40,15,0.65) 24%, rgba(120,25,10,0.25) 50%, rgba(15,18,28,0.95) 80%, rgba(15,18,28,1) 100%)',
        }}
      >
        {/* Solid Left Red-Orange Wedge Tab */}
        <div
          className="w-10 h-full bg-[#D83A14] absolute -left-2 top-0 bottom-0 z-10 shadow-[0_0_15px_rgba(216,58,20,0.5)]"
          style={{ transform: 'skewX(-4deg)' }}
        />

        {/* Crisp Top White Accent Line along Top Breadth */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-white via-white/80 to-white/20 z-30" />

        {/* Horizontal Fading Orange Strip Line along Bottom Breadth */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/70 to-transparent z-30 shadow-[0_0_8px_rgba(238,75,21,0.6)]" />

        {/* Un-skewed Name & Role Text (Exact Previous Design) */}
        <div className="pl-4 flex flex-col justify-center relative z-30" style={{ transform: 'skewX(14deg)' }}>
          <h4 className="font-extrabold italic uppercase text-[#FFF5EB] text-sm sm:text-base tracking-wider leading-none font-tech truncate drop-shadow-md">
            {member.name}
          </h4>
          <p className="text-[#F5A58A] italic text-xs font-medium tracking-wide mt-1.5 font-display capitalize">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative w-full py-12 sm:py-20 z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Section Header */}
      <div className="mb-14 sm:mb-18 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-blackhan italic uppercase tracking-tight text-[#EE4B15] select-none drop-shadow-[0_4px_20px_rgba(238,75,21,0.25)]">
          OUR TEAM
        </h2>

        <p className="text-slate-300 italic text-xs sm:text-sm md:text-base font-medium font-display mt-3 leading-relaxed opacity-85 px-4">
          Our core team members who are behind the community.
        </p>
      </div>

      {/* Team Cards Grid - 4 Columns Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-stretch w-full px-2">
        {teamData.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}