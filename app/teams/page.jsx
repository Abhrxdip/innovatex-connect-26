'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const TEAMS = [
  { slug: 'engineering', name: 'Engineering', category: 'TECH', description: 'Frontend, backend, infrastructure, and developer tooling teams building the technical foundation of the community.', members: 24, mark: 'EN', markColor: '#EE4B15' },
  { slug: 'design', name: 'Design', category: 'DESIGN', description: 'Designers working across product experiences, visual systems, branding, and interaction design.', members: 16, mark: 'DS', markColor: '#F1FDFD' },
  { slug: 'community', name: 'Community', category: 'COMMUNITY', description: 'A group focused on events, collaboration, onboarding, and creating a welcoming community experience.', members: 31, mark: 'CM', markColor: '#EE4B15' },
  { slug: 'research', name: 'Research', category: 'RESEARCH', description: 'Exploring new ideas, technologies, and emerging problems through experimentation and collaborative research.', members: 12, mark: 'RS', markColor: '#F1FDFD' },
  { slug: 'open-source', name: 'Open Source', category: 'OPEN SOURCE', description: 'Contributors collaborating on open-source projects and building tools that anyone can use and improve.', members: 19, mark: 'OS', markColor: '#EE4B15' },
  { slug: 'events', name: 'Events', category: 'EVENTS', description: 'Organizers and volunteers responsible for workshops, meetups, talks, and community-led events.', members: 14, mark: 'EV', markColor: '#F1FDFD' },
];

function TeamMark({ mark, color }) {
  const isOrange = color === '#EE4B15';
  return (
    <div
      className={
        'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ' +
        (isOrange ? 'border-[#EE4B15]/30 bg-[#EE4B15]/10' : 'border-white/15 bg-white/5')
      }
    >
      <span className="font-blackhan text-sm leading-none tracking-tight select-none" style={{ color }}>
        {mark}
      </span>
    </div>
  );
}

function TeamCard({ team }) {
  return (
    <Link href={'/teams/' + team.slug} className="group block">
      <article className="h-full bg-[#0C1235]/70 border border-white/5 rounded-[24px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#EE4B15]/25 hover:bg-[#0C1235]/90 hover:shadow-[0_16px_48px_rgba(238,75,21,0.10)] relative overflow-hidden">
        <div className="absolute inset-0 bg-ticket-grid opacity-[0.06] pointer-events-none rounded-[24px]" />
        <div className="relative z-10 flex items-start justify-between mb-5">
          <TeamMark mark={team.mark} color={team.markColor} />
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 mt-1 select-none">{team.category}</span>
        </div>
        <div className="relative z-10 flex-1">
          <h3 className="font-blackhan text-xl sm:text-2xl text-white tracking-tight leading-tight group-hover:text-[#EE4B15] transition-colors duration-200 select-none">{team.name}</h3>
          <p className="text-slate-400 text-xs sm:text-[13px] font-medium leading-relaxed mt-3">{team.description}</p>
        </div>
        <div className="relative z-10 border-t border-white/5 pt-4 mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-white/10 border border-white/15" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-1 select-none">{team.members} members</span>
          </div>
          <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:border-[#EE4B15]/40 group-hover:text-[#EE4B15] transition-all duration-200">
            <svg className="w-2.5 h-2.5 group-hover:translate-x-px transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function TeamsPage() {
  const totalMembers = TEAMS.reduce((sum, t) => sum + t.members, 0);
  return (
    <div className="relative min-h-screen bg-[#090D2B] flex flex-col justify-between overflow-x-hidden font-display noise-overlay">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-80" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(238,75,21,0.06),transparent_50%)] pointer-events-none z-0" />
      <Navbar />
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-28 sm:pt-32 pb-16 sm:pb-24">
        <header className="mb-14 sm:mb-20">
          <span className="inline-block text-[10px] font-black text-[#EE4B15] uppercase tracking-[0.3em] mb-4 select-none">TEAMS</span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="max-w-xl">
              <h1 className="font-blackhan text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white tracking-tight leading-[1.08] select-none">
                Meet the teams<br />
                <span className="text-gradient-neon">building together.</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed mt-5 max-w-lg">
                Explore the teams, communities, and groups working together to build, learn, and create meaningful projects.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-5 sm:gap-6 self-start sm:self-end">
              <div className="text-right select-none">
                <div className="font-blackhan text-4xl sm:text-5xl text-white leading-none">{TEAMS.length}</div>
                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 mt-1">Teams</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-right select-none">
                <div className="font-blackhan text-4xl sm:text-5xl text-[#EE4B15] leading-none">{totalMembers}</div>
                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 mt-1">Members</div>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-12 w-full h-px bg-white/5" />
        </header>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {TEAMS.map((team) => (
              <TeamCard key={team.slug} team={team} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}