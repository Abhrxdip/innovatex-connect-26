'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Icons } from '../components/Icons';

export default function PartnerDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchPartnerData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/partner/dashboard');
      if (res.redirected) {
        window.location.href = res.url
      }
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load partner dashboard.');
      }
      setData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, []);

  const getDynamicReferralLink = () => {
    if (!data?.referralCode || typeof window === 'undefined') return '';
    return `${window.location.origin}/register?ref=${data.referralCode}`;
  };

  const handleCopy = () => {
    const link = getDynamicReferralLink();
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />

      <Navbar />

      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 pt-32 sm:pt-36 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-medium text-sm">Loading partner metrics...</p>
          </div>
        ) : error && !data ? (
          <div className="glass-card bg-white/90 rounded-3xl p-8 max-w-lg mx-auto text-center shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Partner Portal Access</h2>
            <p className="text-slate-600 text-sm mb-6">{error}</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-sm transition-all shadow-md"
            >
              Sign In as Community Partner
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header Profile Section */}
            <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  🤝
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-extrabold text-slate-900">{data?.partner?.name}</h1>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      Community Partner
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">{data?.partner?.email}</p>
                  <p className="text-slate-600 text-xs mt-1 font-mono font-bold text-indigo-600">
                    CODE: {data?.referralCode}
                  </p>
                </div>
              </div>

              <Link
                href="/leaderboard"
                className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200/80 transition-all flex items-center gap-2"
              >
                <Icons.Sparkle />
                View Live Leaderboard
              </Link>
            </div>

            {/* Shareable Referral Link Widget */}
            <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600" />
              <h2 className="text-lg font-extrabold text-slate-900 mb-1">Your Unique Referral Link</h2>
              <p className="text-slate-600 text-xs mb-4">
                Share this link with your student community. Anyone registering via this link attributes points to your rank!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={getDynamicReferralLink()}
                  className="flex-1 w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-mono font-semibold focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? 'Copied! ✨' : 'Copy Referral Link'}
                </button>
              </div>
            </div>

            {/* Metric Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card bg-white/90 rounded-2xl p-5 border border-slate-200/80 shadow-md">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Registrations</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-2">{data?.stats?.totalReferrals || 0}</p>
                <p className="text-[11px] text-slate-500 mt-1">Users signed up using your link</p>
              </div>

              <div className="glass-card bg-white/90 rounded-2xl p-5 border border-amber-200/80 shadow-md bg-amber-50/20">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Approvals</p>
                <p className="text-3xl font-extrabold text-amber-700 mt-2">{data?.stats?.pendingReferrals || 0}</p>
                <p className="text-[11px] text-slate-500 mt-1">Awaiting admin review</p>
              </div>

              <div className="glass-card bg-white/90 rounded-2xl p-5 border border-emerald-200/80 shadow-md bg-emerald-50/20">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Confirmed Tickets</p>
                <p className="text-3xl font-extrabold text-emerald-700 mt-2">{data?.stats?.approvedReferrals || 0}</p>
                <p className="text-[11px] text-slate-500 mt-1">Counts toward Leaderboard rank</p>
              </div>
            </div>

            {/* Referred Attendees Audit Table */}
            <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 overflow-hidden">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4">Referred Attendees</h3>

              {data?.stats?.referrals?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                        <th className="pb-3 px-2">Attendee Name</th>
                        <th className="pb-3 px-2">Email</th>
                        <th className="pb-3 px-2">College / Org</th>
                        <th className="pb-3 px-2">Joined Date</th>
                        <th className="pb-3 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {data.stats.referrals.map((ref) => (
                        <tr key={ref._id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3 px-2 font-bold text-slate-800">{ref.referredUser?.name || 'N/A'}</td>
                          <td className="py-3 px-2 text-slate-600">{ref.referredUser?.email || 'N/A'}</td>
                          <td className="py-3 px-2 text-slate-600">{ref.referredUser?.college || 'Student'}</td>
                          <td className="py-3 px-2 font-mono text-slate-400 text-[11px]">
                            {new Date(ref.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${ref.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-700'
                                : ref.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                                }`}
                            >
                              {ref.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 text-xs text-center py-6">
                  No referrals tracked yet. Share your link to start earning points!
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
