'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Icons } from '../components/Icons';
import Image from "next/image"

/* Inline person avatar SVG component */
function PersonAvatar({ className = '', src, alt = "Profile Picture" }) {
  return src ? (
    <Image src={src} alt={alt} className={className} width={100} height={100} />
  ) : (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="#1A2040" />
      <circle cx="40" cy="30" r="12" fill="#3B4370" />
      <ellipse cx="40" cy="58" rx="20" ry="14" fill="#3B4370" />
    </svg>
  );
}

export default function UserDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/user/dashboard');
      if (res.redirected) {
        window.location.href = res.url
        return
      }
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load user dashboard.');
      }
      setData(json.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard();
  }, []);

  const handleBookTicket = async () => {
    try {
      setBookingLoading(true);
      setError('');
      const res = await fetch('/api/ticket/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to request ticket.');
      }
      await fetchDashboard();
    } catch (err) {
      setError(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090D2B] flex flex-col overflow-x-hidden font-display text-white">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />


      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 pt-28 sm:pt-32 pb-12">
        {loading && !data ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-[#EE4B15]/20 border-t-[#EE4B15] rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-medium text-sm">Loading your event dashboard...</p>
          </div>
        ) : error && !data ? (
          <div className="bg-[#0C1235] rounded-3xl p-8 max-w-lg mx-auto text-center shadow-2xl border border-white/8 text-white">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4 font-bold text-xl border border-red-500/20">
              !
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Access Required</h2>
            <p className="text-slate-300 text-sm mb-6">{error}</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white font-bold text-sm transition-all shadow-md"
            >
              Sign In to Your Account
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* User Greeting Header */}
            <div className="bg-[#0C1235] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
              <div className="flex items-center gap-4">
                {/* Person Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-[#EE4B15]/10 border-2 border-[#EE4B15]/30 shrink-0">
                  {data?.user && (<PersonAvatar className="w-full h-full" src={data.user?.avatar} />)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-extrabold text-white">{data?.user?.name}</h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EE4B15]/10 text-[#EE4B15] border border-[#EE4B15]/20 uppercase tracking-wider">
                      {data?.user?.role}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{data?.user?.email}</p>
                  <div className="flex gap-3 mt-1.5 mb-1.5">
                    {data?.user?.linkedin && (
                      <a href={data.user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs font-medium flex items-center gap-1 transition-colors">
                        🔗 LinkedIn
                      </a>
                    )}
                    {data?.user?.github && (
                      <a href={data.user.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors">
                        💻 GitHub
                      </a>
                    )}
                  </div>
                  {data?.user?.college && (
                    <p className="text-slate-300 text-xs mt-1 font-medium">🎓 {data.user.college}</p>
                  )}
                  {data?.user?.company && (
                    <p className="text-slate-300 text-xs mt-1 font-medium">💼 {data.user.company}</p>
                  )}
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-3">
                {!data?.ticket ? (
                  <span className="px-4 py-2 rounded-xl bg-[#090D2B] text-slate-400 font-bold text-xs border border-white/8">
                    No Ticket Claimed
                  </span>
                ) : data.ticket.status === 'Pending' ? (
                  <span className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 font-bold text-xs border border-amber-500/20 flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Approval Pending ⏳
                  </span>
                ) : data.ticket.status === 'Approved' ? (
                  <span className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 font-bold text-xs border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Ticket Confirmed 🎉
                  </span>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-red-500/10 text-red-300 font-bold text-xs border border-red-500/20">
                    Ticket Rejected ❌
                  </span>
                )}
                {/* <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold text-xs border border-white/10 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button> */}
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Main Ticket Action Area */}
            {!data?.ticket ? (
              /* Claim Free Pass */
              <div className="bg-[#0C1235] rounded-3xl p-8 shadow-2xl border border-white/8 text-center relative overflow-hidden text-white">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-[#EE4B15]/40" />
                <div className="w-14 h-14 rounded-2xl bg-[#EE4B15]/10 text-[#EE4B15] flex items-center justify-center mx-auto mb-4">
                  <Icons.Ticket className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-white">Claim Your Free Conference Ticket</h2>
                <p className="text-slate-300 text-sm max-w-md mx-auto mt-1 mb-6">
                  InnovateX Connect &apos;26 is free for accepted student developers & tech professionals.
                </p>

                <div className="max-w-xs mx-auto space-y-4">
                  <button
                    onClick={handleBookTicket}
                    disabled={bookingLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white font-bold text-sm shadow-lg shadow-[#EE4B15]/15 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {bookingLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Free Ticket Request
                        <Icons.ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : data.ticket.status === 'Pending' ? (
              /* Pending Ticket Review */
              <div className="bg-[#0C1235] rounded-3xl p-8 shadow-2xl border border-amber-500/20 text-center text-white">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-300 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  ⏳
                </div>
                <h2 className="text-xl font-extrabold text-white">Registration Under Admin Review</h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mt-1">
                  Your ticket request (<span className="font-mono font-bold">{data.ticket.ticketNumber}</span>) has been received. You will receive an email & QR Code as soon as an organizer approves it.
                </p>
              </div>
            ) : data.ticket.status === 'Approved' ? (
              /* Approved Ticket - Event Pass */
              <div className="relative bg-[#0A0B1A] bg-ticket-grid rounded-3xl p-6 sm:p-8 border border-[#EE4B15]/30 text-white shadow-2xl overflow-hidden">
                {/* Neon Backlight Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#EE4B15]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Left Side: Ticket Metadata */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EE4B15]">
                          OFFICIAL EVENT PASS
                        </span>
                        <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
                          InnovateX Connect &apos;26
                        </h2>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EE4B15]/20 text-[#EE4B15] border border-[#EE4B15]/30">
                        {data.ticket.ticketNumber}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Attendee</p>
                        <p className="font-bold text-slate-100 text-sm mt-0.5">{data.user?.name}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Category</p>
                        <p className="font-bold text-slate-100 text-sm mt-0.5">{data.ticket.attendeeType}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Date & Venue</p>
                        <p className="font-bold text-slate-100 text-xs mt-0.5">JIS University, Kolkata • 9 AM</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">Organization</p>
                        <p className="font-bold text-slate-100 text-xs mt-0.5 truncate">
                          {data.user?.college || data.user?.company || 'Developer'}
                        </p>
                      </div>
                    </div>

                    {/* Check-in Badges */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${data.ticket.checkedIn
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-[#090D2B] text-slate-400 border border-white/8'
                        }`}>
                        <span className={`w-2 h-2 rounded-full ${data.ticket.checkedIn ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        {data.ticket.checkedIn ? 'Main Gate Checked In 🟢' : 'Not Checked In Yet'}
                      </div>

                      <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${data.ticket.foodCollected
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-[#EE4B15]/15 text-[#EE4B15] border border-[#EE4B15]/25'
                        }`}>
                        <span className="text-xs">{data.ticket.foodCollected ? '🍔' : '🎟️'}</span>
                        {data.ticket.foodCollected ? 'Food Claimed' : 'Food Coupon Available'}
                      </div>
                    </div>

                    {/* Mandatory Laptop Note */}
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                      <span className="text-blue-400 font-bold text-sm">ℹ️</span>
                      <p className="text-blue-200 text-xs font-medium leading-relaxed">
                        <span className="font-bold text-blue-400">Important:</span> Please remember to bring your laptop. It is <span className="font-bold text-white underline">mandatory</span> for participating in this event.
                      </p>
                    </div>
                  </div>

                  {/* Right Side: QR Code */}
                  <div className="flex flex-col items-center justify-center p-4 bg-[#090D2B] rounded-2xl border border-white/8 text-center">
                    {data.ticket.qrCode ? (
                      <img
                        src={data.ticket.qrCode}
                        alt="Event QR Ticket"
                        className="w-44 h-44 rounded-xl shadow-xl bg-white p-2"
                      />
                    ) : (
                      <div className="w-44 h-44 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 text-xs">
                        Generating QR...
                      </div>
                    )}
                    <p className="text-[10px] text-slate-400 mt-3 font-mono">
                      Present at gate for scanning
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0C1235] rounded-3xl p-8 shadow-2xl border border-red-500/20 text-center text-white">
                <h2 className="text-xl font-bold text-red-400">Registration Not Approved</h2>
                <p className="text-slate-300 text-xs mt-1">
                  Unfortunately, we could not approve your ticket request at this time.
                </p>
              </div>
            )}

            {/* Notifications Feed */}
            <div className="bg-[#0C1235] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/8 text-white">
              <h3 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EE4B15]" />
                Recent Notifications
              </h3>
              {data?.notifications?.length > 0 ? (
                <div className="space-y-3">
                  {data.notifications.map((n) => (
                    <div
                      key={n._id}
                      className="p-4 rounded-2xl bg-[#090D2B] border border-white/5 flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{n.title}</h4>
                        <p className="text-slate-300 text-xs mt-0.5">{n.message}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-xs">No recent notifications.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
