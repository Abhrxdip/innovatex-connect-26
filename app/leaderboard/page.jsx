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
    fetchLeaderboard();
  }, []);

  const topThree = leaderboard.slice(0, 3);
  const remainingRanked = leaderboard.slice(3);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />

      <Navbar />

      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 pt-32 sm:pt-36 pb-16">
        {/* Leaderboard Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-3 shadow-sm">
            <Icons.Sparkle />
            Live Partner Standings
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Community Partner Leaderboard
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Top campus ambassadors & community leaders driving registrations for InnovateX Connect '26
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-medium text-sm">Calculating rankings...</p>
          </div>
        ) : error ? (
          <div className="glass-card bg-white/90 rounded-3xl p-8 max-w-md mx-auto text-center shadow-xl border border-red-200">
            <p className="text-red-700 text-xs font-bold">{error}</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="glass-card bg-white/90 rounded-3xl p-12 text-center shadow-xl border border-slate-200 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
              🏆
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Leaderboard Initializing</h3>
            <p className="text-slate-600 text-xs mt-1 mb-6">
              Be the first Community Partner to share your referral link and claim the #1 spot!
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-xs transition-all shadow-md"
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
                <div className="glass-card bg-white/90 rounded-3xl p-6 border border-slate-300 shadow-xl text-center relative order-2 md:order-1 transform hover:-translate-y-1 transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-extrabold text-sm flex items-center justify-center shadow-md">
                    2
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-700 font-bold text-2xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-inner">
                    🥈
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{topThree[1].partner?.name}</h3>
                  <p className="text-slate-500 text-xs truncate max-w-[180px] mx-auto">
                    {topThree[1].partner?.college || topThree[1].partner?.company || 'Partner'}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-around text-xs">
                    <div>
                      <p className="text-slate-400 font-bold text-[10px]">APPROVED</p>
                      <p className="text-slate-900 font-extrabold text-lg">{topThree[1].approvedReferrals}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold text-[10px]">TOTAL</p>
                      <p className="text-slate-700 font-bold text-sm">{topThree[1].totalReferrals}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rank 1 (Gold) */}
              {topThree[0] && (
                <div className="glass-card bg-gradient-to-b from-amber-50/90 to-white/90 rounded-3xl p-7 border-2 border-amber-400/80 shadow-2xl text-center relative order-1 md:order-2 transform hover:-translate-y-2 transition-all">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-black text-base flex items-center justify-center shadow-lg animate-bounce">
                    1
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 font-black text-3xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-lg shadow-amber-300/40">
                    🥇
                  </div>
                  <h3 className="text-lg font-black text-slate-900">{topThree[0].partner?.name}</h3>
                  <p className="text-amber-800 text-xs font-semibold truncate max-w-[200px] mx-auto">
                    {topThree[0].partner?.college || topThree[0].partner?.company || 'Top Champion'}
                  </p>
                  <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-around text-xs">
                    <div>
                      <p className="text-amber-700 font-bold text-[10px]">APPROVED TICKETS</p>
                      <p className="text-amber-900 font-black text-2xl">{topThree[0].approvedReferrals}</p>
                    </div>
                    <div>
                      <p className="text-amber-700 font-bold text-[10px]">TOTAL CLICKS</p>
                      <p className="text-amber-900 font-bold text-base">{topThree[0].totalReferrals}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rank 3 (Bronze) */}
              {topThree[2] && (
                <div className="glass-card bg-white/90 rounded-3xl p-6 border border-amber-700/30 shadow-xl text-center relative order-3 transform hover:-translate-y-1 transition-all">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-700 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                    3
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 font-bold text-2xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-inner">
                    🥉
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{topThree[2].partner?.name}</h3>
                  <p className="text-slate-500 text-xs truncate max-w-[180px] mx-auto">
                    {topThree[2].partner?.college || topThree[2].partner?.company || 'Partner'}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-around text-xs">
                    <div>
                      <p className="text-slate-400 font-bold text-[10px]">APPROVED</p>
                      <p className="text-slate-900 font-extrabold text-lg">{topThree[2].approvedReferrals}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-bold text-[10px]">TOTAL</p>
                      <p className="text-slate-700 font-bold text-sm">{topThree[2].totalReferrals}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Complete Rankings Table */}
            <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">Complete Partner Standings</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                      <th className="pb-3 px-3">Rank</th>
                      <th className="pb-3 px-3">Partner Name</th>
                      <th className="pb-3 px-3">College / Organization</th>
                      <th className="pb-3 px-3 text-center">Total Signups</th>
                      <th className="pb-3 px-3 text-right">Approved Tickets</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {leaderboard.map((item, idx) => (
                      <tr key={item.partner?.id || idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3 font-extrabold text-slate-900">
                          {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">{item.partner?.name}</td>
                        <td className="py-3 px-3 text-slate-600 font-medium">
                          {item.partner?.college || item.partner?.company || 'Community Partner'}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-700">{item.totalReferrals}</td>
                        <td className="py-3 px-3 text-right font-extrabold text-indigo-600 text-sm">
                          {item.approvedReferrals}
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
