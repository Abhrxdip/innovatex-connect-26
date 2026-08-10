'use client';

import React from 'react';
import teamData from '../data/test.members.json';

function getSocialType(url) {
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes('linkedin')) return 'linkedin';
  if (lower.includes('github')) return 'github';
  if (lower.includes('x.com') || lower.includes('twitter')) return 'x';
  if (lower.includes('instagram')) return 'instagram';
  if (lower.includes('facebook')) return 'facebook';
  return 'globe';
}

function SocialIcon({ type, url }) {
  if (!url) return null;

  const icons = {
    linkedin: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    github: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
    x: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    facebook: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    globe: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/80 hover:text-white transition-all p-1 sm:p-1.5 bg-[#0C111D]/90 border border-white/20 hover:border-[#EE4B15] hover:bg-[#EE4B15] rounded-sm shadow-md flex items-center justify-center"
      title={type}
    >
      {icons[type] || icons.globe}
    </a>
  );
}

function TeamCard({ member }) {
  const socialList = Array.isArray(member.social)
    ? member.social.map((s) => ({ type: getSocialType(s.url), url: s.url }))
    : member.socials
    ? Object.entries(member.socials).map(([type, url]) => ({ type, url }))
    : [];

  return (
    <div className="flex flex-col gap-2 sm:gap-2.5 group select-none w-full max-w-[280px] sm:max-w-none mx-auto">
      {/* 1. Slanted Photo Frame */}
      <div className="relative w-full h-[220px] xs:h-[250px] sm:h-[300px] md:h-[320px] lg:h-[350px]">
        <div
          className="w-full h-full border border-white/15 overflow-hidden relative shadow-xl bg-gradient-to-b from-[#181E30] via-[#101423] to-[#0A0D18]"
          style={{ transform: 'skewX(-14deg)' }}
        >
          {/* Fading Orange Strip Line along TOP BREADTH */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-transparent z-30 shadow-[0_0_10px_rgba(238,75,21,0.7)]" />

          {/* Orange Accent Stripe on Left Edge (runs ~42% down left side) */}
          <div className="absolute top-0 left-0 w-2 sm:w-2.5 h-[42%] bg-[#D83A14] z-20 shadow-[0_0_12px_rgba(216,58,20,0.6)]" />

          {/* Un-skewed Inner Photo Container (Centered studio portrait alignment) */}
          <div
            className="w-full h-full scale-110 flex items-end justify-center overflow-hidden pt-4"
            style={{ transform: 'skewX(14deg)' }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Subtle Bottom vignette fade to anchor subject cutout */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18]/80 via-transparent to-transparent pointer-events-none z-20" />

          {/* Top-Right Social Links Overlay */}
          {socialList.length > 0 && (
            <div
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 flex items-center gap-1 sm:gap-1.5"
              style={{ transform: 'skewX(14deg)' }}
            >
              {socialList.map((item, idx) => (
                <SocialIcon key={idx} type={item.type} url={item.url} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. Slanted Bottom Name Card */}
      <div
        className="relative w-full py-2.5 px-3 sm:px-4 overflow-hidden border-t border-r border-white/70 border-b border-b-white/15 border-l border-l-white/20 shadow-xl min-h-[58px] flex items-center"
        style={{
          transform: 'skewX(-14deg)',
          background:
            'linear-gradient(90deg, rgba(210,50,18,0.92) 0%, rgba(180,40,15,0.65) 24%, rgba(120,25,10,0.25) 50%, rgba(15,18,28,0.95) 80%, rgba(15,18,28,1) 100%)',
        }}
      >
        {/* Solid Left Red-Orange Wedge Tab */}
        <div
          className="w-8 sm:w-10 h-full bg-[#D83A14] absolute -left-2 top-0 bottom-0 z-10 shadow-[0_0_15px_rgba(216,58,20,0.5)]"
          style={{ transform: 'skewX(-4deg)' }}
        />

        {/* Crisp Top White Accent Line along Top Breadth */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-white via-white/80 to-white/20 z-30" />

        {/* Horizontal Fading Orange Strip Line along Bottom Breadth */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/70 to-transparent z-30 shadow-[0_0_8px_rgba(238,75,21,0.6)]" />

        {/* Un-skewed Name & Role Text */}
        <div className="pl-3 sm:pl-4 flex flex-col justify-center relative z-30 w-full" style={{ transform: 'skewX(14deg)' }}>
          <h4 className="font-extrabold italic uppercase text-[#FFF5EB] text-[11px] xs:text-xs sm:text-sm md:text-sm tracking-wide leading-tight font-tech drop-shadow-md break-words">
            {member.name}
          </h4>
          <p className="text-[#F5A58A] italic text-[10px] sm:text-xs font-medium tracking-wide mt-1 font-display capitalize truncate">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative w-full py-8 sm:py-16 md:py-20 z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12">
      {/* Section Header - Left Aligned matching reference image */}
      <div className="mb-8 sm:mb-12 md:mb-16 text-left max-w-full relative">
        {/* Main Title: THE TEAM */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-blackhan italic uppercase tracking-tight select-none flex items-center gap-2 sm:gap-3">
          <span className="text-white">THE</span>
          <span className="text-[#EE4B15]">TEAM</span>
        </h2>

        {/* Left-aligned Fading Orange Accent Line */}
        <div className="w-20 sm:w-32 h-[3px] sm:h-[3.5px] mt-2 sm:mt-3 bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-transparent rounded-full shadow-[0_0_12px_rgba(238,75,21,0.6)]" />

        {/* Subtitle */}
        <p className="text-slate-300 text-xs sm:text-sm md:text-base font-medium font-display mt-3 sm:mt-4 leading-relaxed opacity-90">
          Our core team members who are behind the community.
        </p>
      </div>

      {/* Team Cards Grid - 2 Columns on Mobile, 4 Columns Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8 justify-items-stretch w-full px-1 sm:px-2 relative">
        {teamData.map((member, index) => (
          <TeamCard key={member._id?.$oid || member.id || index} member={member} />
        ))}
      </div>
    </section>
  );
}