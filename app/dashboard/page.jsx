'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Icons } from '../components/Icons';

export default function UserDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [attendeeType, setAttendeeType] = useState('Student');

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/user/dashboard');
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load user dashboard.');
      }
      setData(json.data);
      if (json.data?.user?.role) {
        setAttendeeType(json.data.user.role === 'Working Professional' ? 'Working Professional' : 'Student');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleBookTicket = async () => {
    try {
      setBookingLoading(true);
      setError('');
      const res = await fetch('/api/ticket/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendeeType }),
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
    <div className="relative min-h-screen bg-[#F8FAFC] bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">
      {/* Background Soft Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />

      <Navbar />

      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 pt-32 sm:pt-36 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-medium text-sm">Loading your event dashboard...</p>
          </div>
        ) : error && !data ? (
          <div className="glass-card bg-white/90 rounded-3xl p-8 max-w-lg mx-auto text-center shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Access Required</h2>
            <p className="text-slate-600 text-sm mb-6">{error}</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-sm transition-all shadow-md"
            >
              Sign In to Your Account
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* User Greeting Header */}
            <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  {data?.user?.name ? data.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-extrabold text-slate-900">{data?.user?.name}</h1>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {data?.user?.role}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">{data?.user?.email}</p>
                  {data?.user?.college && (
                    <p className="text-slate-600 text-xs mt-1 font-medium">🎓 {data.user.college}</p>
                  )}
                  {data?.user?.company && (
                    <p className="text-slate-600 text-xs mt-1 font-medium">💼 {data.user.company}</p>
                  )}
                </div>
              </div>

              {/* Status Pill Overview */}
              <div className="flex items-center gap-3">
                {!data?.ticket ? (
                  <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
                    No Ticket Claimed
                  </span>
                ) : data.ticket.status === 'Pending' ? (
                  <span className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200/80 flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Approval Pending ⏳
                  </span>
                ) : data.ticket.status === 'Approved' ? (
                  <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200/80 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Ticket Confirmed 🎉
                  </span>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-red-50 text-red-700 font-bold text-xs border border-red-200">
                    Ticket Rejected ❌
                  </span>
                )}
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            {/* Main Ticket Action Area */}
            {!data?.ticket ? (
              /* Claim Free Pass Form */
              <div className="glass-card bg-white/90 rounded-3xl p-8 shadow-xl border border-slate-200/80 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                  <Icons.Ticket className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">Claim Your Free Conference Ticket</h2>
                <p className="text-slate-600 text-sm max-w-md mx-auto mt-1 mb-6">
                  InnovateX Connect '26 is free for accepted student developers & tech professionals.
                </p>

                <div className="max-w-xs mx-auto space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Attendee Pass Category
                    </label>
                    <select
                      value={attendeeType}
                      onChange={(e) => setAttendeeType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Student">Student Developer</option>
                      <option value="Working Professional">Working Professional</option>
                    </select>
                  </div>

                  <button
                    onClick={handleBookTicket}
                    disabled={bookingLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-sm shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
              /* Pending Ticket Review Banner */
              <div className="glass-card bg-amber-50/70 rounded-3xl p-8 shadow-xl border border-amber-200/80 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  ⏳
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">Registration Under Admin Review</h2>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mt-1">
                  Your ticket request (<span className="font-mono font-bold">{data.ticket.ticketNumber}</span>) has been received. You will receive an email & QR Code as soon as an organizer approves it.
                </p>
              </div>
            ) : data.ticket.status === 'Approved' ? (
              /* Approved Ticket - Scalloped Dark Pass Container */
              <div className="relative bg-[#0A0B1A] bg-ticket-grid rounded-3xl p-6 sm:p-8 border border-blue-500/30 text-white shadow-2xl overflow-hidden">
                {/* Neon Backlight Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Left Side: Ticket Metadata */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                          OFFICIAL EVENT PASS
                        </span>
                        <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
                          InnovateX Connect '26
                        </h2>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                        {data.ticket.ticketNumber}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 font-medium">ATTENDEE</p>
                        <p className="font-bold text-slate-100 text-sm mt-0.5">{data.user?.name}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">CATEGORY</p>
                        <p className="font-bold text-slate-100 text-sm mt-0.5">{data.ticket.attendeeType}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">DATE & VENUE</p>
                        <p className="font-bold text-slate-100 text-xs mt-0.5">Kolkata Tech Hub • 10:00 AM</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">ORGANIZATION</p>
                        <p className="font-bold text-slate-100 text-xs mt-0.5 truncate">
                          {data.user?.college || data.user?.company || 'Developer'}
                        </p>
                      </div>
                    </div>

                    {/* Check-in Badges */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                        data.ticket.checkedIn
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${data.ticket.checkedIn ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        {data.ticket.checkedIn ? 'Main Gate Checked In 🟢' : 'Not Checked In Yet'}
                      </div>

                      <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                        data.ticket.foodCollected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        <span className="text-xs">{data.ticket.foodCollected ? '🍔' : '🎟️'}</span>
                        {data.ticket.foodCollected ? 'Food Claimed' : 'Food Coupon Available'}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Generated QR Code */}
                  <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    {data.ticket.qrCode ? (
                      <img
                        src={data.ticket.qrCode}
                        alt="Event QR Ticket"
                        className="w-44 h-44 rounded-xl shadow-xl bg-white p-2"
                      />
                    ) : (
                      <div className="w-44 h-44 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-xs">
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
              <div className="glass-card bg-red-50/70 rounded-3xl p-8 shadow-xl border border-red-200 text-center">
                <h2 className="text-xl font-bold text-red-800">Registration Not Approved</h2>
                <p className="text-slate-600 text-xs mt-1">
                  Unfortunately, we could not approve your ticket request at this time.
                </p>
              </div>
            )}

            {/* In-App Notifications Feed */}
            <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                Recent Notifications
              </h3>
              {data?.notifications?.length > 0 ? (
                <div className="space-y-3">
                  {data.notifications.map((n) => (
                    <div
                      key={n._id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                        <p className="text-slate-600 text-xs mt-0.5">{n.message}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
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
