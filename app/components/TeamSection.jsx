'use client';

import React from 'react';

const TEAM_MEMBERS = [
  {
    role: 'CONVENOR',
    image: '/souma.png',
    socials: [
      { type: 'instagram', url: 'https://instagram.com' },
      { type: 'linkedin', url: 'https://linkedin.com' },
      { type: 'github', url: 'https://github.com' },
    ],
  },
  {
    role: 'CO-CONVENOR',
    image: '/souma.png',
    socials: [
      { type: 'instagram', url: 'https://instagram.com' },
      { type: 'linkedin', url: 'https://linkedin.com' },
      { type: 'facebook', url: 'https://facebook.com' },
    ],
  },
  {
    role: 'TECH LEAD',
    image: '/souma.png',
    socials: [
      { type: 'x', url: 'https://x.com' },
      { type: 'linkedin', url: 'https://linkedin.com' },
      { type: 'github', url: 'https://github.com' },
    ],
  },
  {
    role: 'DESIGN LEAD',
    image: '/souma.png',
    socials: [
      { type: 'instagram', url: 'https://instagram.com' },
      { type: 'linkedin', url: 'https://linkedin.com' },
      { type: 'github', url: 'https://github.com' },
    ],
  },
  {
    role: 'COMMUNITY LEAD',
    image: '/souma.png',
    socials: [
      { type: 'instagram', url: 'https://instagram.com' },
      { type: 'linkedin', url: 'https://linkedin.com' },
      { type: 'x', url: 'https://x.com' },
    ],
  },
  {
    role: 'OPERATIONS LEAD',
    image: '/souma.png',
    socials: [
      { type: 'linkedin', url: 'https://linkedin.com' },
      { type: 'github', url: 'https://github.com' },
      { type: 'facebook', url: 'https://facebook.com' },
    ],
  },
];

function SocialIcon({ type }) {
  if (type === 'instagram') {
    return (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (type === 'linkedin') {
    return (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z" />
      </svg>
    );
  }
  if (type === 'github') {
    return (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (type === 'facebook') {
    return (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    );
  }
  if (type === 'x') {
    return (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return null;
}

function TeamMemberCard({ member }) {
  const clipStyle = {
    clipPath: 'polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 44px 100%, 0 calc(100% - 44px))',
  };

  return (
    <div
      className="relative p-[1.5px] transition-all duration-500 group hover:-translate-y-2"
      style={{
        ...clipStyle,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 50%, rgba(238,75,21,0.4) 100%)',
      }}
    >
      {/* Outer border neon glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          ...clipStyle,
          background: 'linear-gradient(135deg, #EE4B15 0%, rgba(238,75,21,0.4) 50%, #EE4B15 100%)',
        }}
      />

      <div
        className="w-full h-[420px] sm:h-[450px] bg-[#070A24] flex flex-col justify-between relative overflow-hidden select-none"
        style={clipStyle}
      >
        {/* Subtle grid texture & radial ambient glow behind headshot */}
        <div className="absolute inset-0 bg-ticket-grid opacity-[0.08] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#EE4B15]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#EE4B15]/25 transition-colors duration-500" />

        {/* Headshot Photo Frame */}
        <div className="relative w-full flex-1 flex items-end justify-center overflow-hidden pt-6 px-4">
          <img
            src={member.image}
            alt={member.role}
            className="w-auto h-[92%] object-contain object-bottom filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
          />
          {/* Gradient fade overlay at bottom of photo */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070A24] via-[#070A24]/80 to-transparent pointer-events-none z-10" />
        </div>

        {/* Card Footer Info Bar */}
        <div className="relative z-20 px-6 pb-6 pt-1 flex items-end justify-between gap-4">
          {/* Left Info: Role Title only */}
          <div className="flex-1 min-w-0 pr-1">
            <span className="inline-block text-[#EE4B15] text-sm sm:text-base font-blackhan tracking-widest uppercase font-tech">
              {member.role}
            </span>
          </div>

          {/* Right Info: Vertical Social Icon Stack */}
          <div className="flex flex-col gap-1.5 shrink-0 z-30">
            {member.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.role} ${social.type}`}
                className="w-7 h-7 rounded-[4px] bg-[#0C1235]/90 border border-white/15 flex items-center justify-center text-slate-300 hover:border-[#EE4B15] hover:text-[#EE4B15] hover:bg-[#EE4B15]/15 transition-all duration-200 shadow-sm"
              >
                <SocialIcon type={social.type} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative w-full py-12 sm:py-20 z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16 text-left">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-blackhan tracking-tight leading-none uppercase select-none flex items-center gap-3 flex-wrap">
          <span className="text-white tracking-wider">THE</span>
          <span className="text-[#EE4B15] tracking-wider">TEAM</span>
        </h2>
        
        {/* Accent underline */}
        <div className="w-20 h-1 bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/50 to-transparent my-3.5 rounded-full" />

        <p className="text-slate-300 text-sm sm:text-base font-medium font-display max-w-xl leading-relaxed opacity-90">
          Our core team members who are behind the community.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-stretch w-full">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}