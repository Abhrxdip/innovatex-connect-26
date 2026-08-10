'use client';

import React from 'react';

const TEAM_MEMBERS = [
  {
    name: 'AARON LOEB',
    role: 'Leader',
    image: '/pic.jpg',
  },
  {
    name: 'DREW FEIG',
    role: 'Marketing',
    image: '/pic.jpg',
  },
  {
    name: 'SACHA DUBOIS',
    role: 'Employee',
    image: '/pic.jpg',
  },
  {
    name: 'JULIANA SILVA',
    role: 'Employee',
    image: '/pic.jpg',
  },
  {
    name: 'DHRUBOJOYTI MONDAL',
    role: 'Convenor',
    image: '/pic.jpg',
  },
  {
    name: 'JIT SARKAR',
    role: 'Co-Convenor',
    image: '/pic.jpg',
  },
  {
    name: 'SK MIRAJUL ISLAM',
    role: 'Tech Lead',
    image: '/pic.jpg',
  },
  {
    name: 'SUBHAJIT ROY',
    role: 'Design Lead',
    image: '/pic.jpg',
  },
];

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

          {/* Subtle Bottom Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1A]/60 via-transparent to-transparent opacity-50 pointer-events-none" />
        </div>
      </div>

      {/* 2. Slanted Bottom Name Card */}
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

        {/* Un-skewed Name & Role Text */}
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
        {TEAM_MEMBERS.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}