'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Icons } from '../components/Icons';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/leaderboard');
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load referral leaderboard.');
      }
      setLeaderboard(json.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeaderboard();
  }, []);

  const topThree = leaderboard.slice(0, 3);
  const remainingRanked = leaderboard.slice(3);

  return (
    <div className="relative min-h-screen bg-[#090D2B] bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display text-white">
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[170px] pointer-events-none animate-pulse-glow" />

      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 pt-32 sm:pt-36 pb-16">
        {/* Leaderboard Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-orange-500/10 text-[#EE4B15] border border-orange-500/20 mb-3 shadow-sm">
            <Icons.Sparkle />
            Live Partner Standings
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Community Partner Leaderboard
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            Top campus ambassadors & community leaders driving registrations for InnovateX Connect &apos;26
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-orange-500/20 border-t-[#EE4B15] rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-medium text-sm">Calculating rankings...</p>
          </div>
        ) : error ? (
          <div className="glass-card bg-[#0C1235]/90 rounded-3xl p-8 max-w-md mx-auto text-center shadow-xl border border-red-500/20 text-white">
            <p className="text-red-400 text-xs font-bold">{error}</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="glass-card bg-[#0C1235]/90 rounded-3xl p-12 text-center shadow-xl border border-white/10 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-950/40 text-indigo-400 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
              🏆
            </div>
            <h3 className="text-lg font-extrabold text-white">Leaderboard Initializing</h3>
            <p className="text-slate-400 text-xs mt-1 mb-6">
              Be the first Community Partner to share your referral link and claim the #1 spot!
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white font-bold text-xs transition-all shadow-md"
            >
              Become a Community Partner
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Top 3 Winners Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Rank 2 (Silver) */}
              {topThree[1] && (
                <div className="bg-[#0C1235] rounded-3xl p-6 border border-slate-700/50 shadow-xl text-center relative order-2 md:order-1 transform hover:-translate-y-1 transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-700 text-slate-200 font-extrabold text-sm flex items-center justify-center shadow-md">
                    2
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#151C47] text-slate-355 font-bold text-2xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-inner">
                    🥈
                  </div>
                  <h3 className="text-base font-extrabold text-white">{topThree[1].partner?.company}</h3>
                  <p className="text-slate-400 text-xs truncate max-w-[180px] mx-auto">
                    {topThree[1].partner?.college || topThree[1].partner?.name || 'Partner'}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-col items-center justify-center text-xs">
                    <p className="text-slate-500 font-bold text-[10px] uppercase">Total Signups</p>
                    <p className="text-slate-200 font-extrabold text-xl">{topThree[1].totalReferrals}</p>
                  </div>
                </div>
              )}

              {/* Rank 1 (Gold) */}
              {topThree[0] && (
                <div className="bg-gradient-to-b from-[#1C170C] to-[#0C1235] rounded-3xl p-7 border-2 border-amber-400/50 shadow-2xl text-center relative order-1 md:order-2 transform hover:-translate-y-2 transition-all">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-black text-base flex items-center justify-center shadow-lg animate-bounce">
                    1
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-amber-950 font-black text-3xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-lg shadow-amber-500/20">
                    🥇
                  </div>
                  <h3 className="text-lg font-black text-white">{topThree[0].partner?.company}</h3>
                  <p className="text-amber-400 text-xs font-semibold truncate max-w-[200px] mx-auto">
                    {topThree[0].partner?.college || topThree[0].partner?.name || 'Top Champion'}
                  </p>
                  <div className="mt-4 pt-3 border-t border-amber-400/20 flex flex-col items-center justify-center text-xs">
                    <p className="text-amber-300 font-bold text-[10px] uppercase">Total Signups</p>
                    <p className="text-amber-400 font-black text-3xl">{topThree[0].totalReferrals}</p>
                  </div>
                </div>
              )}

              {/* Rank 3 (Bronze) */}
              {topThree[2] && (
                <div className="bg-[#0C1235] rounded-3xl p-6 border border-amber-900/30 shadow-xl text-center relative order-3 transform hover:-translate-y-1 transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-800 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                    3
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#1C1710] text-amber-500 font-bold text-2xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-inner">
                    🥉
                  </div>
                  <h3 className="text-base font-extrabold text-white">{topThree[2].partner?.company}</h3>
                  <p className="text-slate-400 text-xs truncate max-w-[180px] mx-auto">
                    {topThree[2].partner?.college || topThree[2].partner?.name || 'Partner'}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-col items-center justify-center text-xs">
                    <p className="text-slate-500 font-bold text-[10px] uppercase">Total Signups</p>
                    <p className="text-slate-200 font-extrabold text-xl">{topThree[2].totalReferrals}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Complete Rankings Table */}
            <div className="bg-[#0C1235] rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10">
              <h2 className="text-lg font-extrabold text-white mb-4">Complete Partner Standings</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                      <th className="pb-3 px-3">Rank</th>
                      <th className="pb-3 px-3">Partner Name</th>
                      <th className="pb-3 px-3">Name</th>
                      <th className="pb-3 px-3 text-right">Total Signups</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {leaderboard.map((item, idx) => (
                      <tr key={item.partner?.id || idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-extrabold text-slate-200">
                          {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                        </td>
                        <td className="py-3 px-3 font-bold text-white">{item.partner?.company}</td>
                        <td className="py-3 px-3 text-slate-355 font-medium">
                          {item.partner?.college || item.partner?.name || 'Community Partner'}
                        </td>
                        <td className="py-3 px-3 text-right font-extrabold text-[#EE4B15] text-sm">
                          {item.totalReferrals}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
