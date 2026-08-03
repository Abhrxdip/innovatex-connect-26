'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Icons } from '../components/Icons';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketFilter, setTicketFilter] = useState('Pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Scanner State
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [dashRes, tixRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch(`/api/admin/tickets?status=${ticketFilter}`),
      ]);

      const dashJson = await dashRes.json();
      const tixJson = await tixRes.json();

      if (!dashRes.ok || !dashJson.success) {
        throw new Error(dashJson.message || 'Failed to load admin dashboard.');
      }

      setDashboardData(dashJson.data);
      setTickets(tixJson.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [ticketFilter]);

  const handleApprove = async (ticketId) => {
    try {
      setActionLoading(ticketId);
      setError('');
      setSuccessMsg('');

      const res = await fetch(`/api/admin/tickets/${ticketId}/approve`, {
        method: 'POST',
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to approve ticket.');
      }

      setSuccessMsg('Ticket approved & QR Code emailed to attendee! 🎉');
      await fetchAdminData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (ticketId) => {
    try {
      setActionLoading(ticketId);
      setError('');
      setSuccessMsg('');

      const res = await fetch(`/api/admin/tickets/${ticketId}/reject`, {
        method: 'POST',
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to reject ticket.');
      }

      setSuccessMsg('Ticket request marked as rejected.');
      await fetchAdminData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleGateScan = async (e) => {
    e.preventDefault();
    if (!scanInput) return;
    try {
      setScanLoading(true);
      setError('');
      setScanResult(null);

      const res = await fetch('/api/attendance/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketNumber: scanInput.trim(), gate: 'Main Gate' }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Check-in failed.');
      }

      setScanResult({ type: 'gate', data: json.data });
      setScanInput('');
      fetchAdminData();
    } catch (err) {
      setError(err.message);
    } finally {
      setScanLoading(false);
    }
  };

  const handleFoodScan = async (e) => {
    e.preventDefault();
    if (!scanInput) return;
    try {
      setScanLoading(true);
      setError('');
      setScanResult(null);

      const res = await fetch('/api/food/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketNumber: scanInput.trim(), counter: 'Food Counter 1' }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Food scan failed.');
      }

      setScanResult({ type: 'food', data: json.data });
      setScanInput('');
      fetchAdminData();
    } catch (err) {
      setError(err.message);
    } finally {
      setScanLoading(false);
    }
  };

  const analytics = dashboardData?.analytics || {};

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />

      <Navbar />

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 pt-32 sm:pt-36 pb-16">
        {loading && !dashboardData ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-medium text-sm">Loading admin command center...</p>
          </div>
        ) : error && !dashboardData ? (
          <div className="glass-card bg-white/90 rounded-3xl p-8 max-w-lg mx-auto text-center shadow-xl border border-red-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              🛡️
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Admin Clearance Required</h2>
            <p className="text-slate-600 text-sm mb-6">{error}</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-sm transition-all shadow-md"
            >
              Sign In as Administrator
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header Control Bar */}
            <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1E1B4B] text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-indigo-900/20">
                  🛡️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-extrabold text-slate-900">Admin Control Center</h1>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white">
                      Organizer Portal
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                    InnovateX Connect '26 • Gate & Ticket Operations
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 w-full md:w-auto">
                {[
                  { id: 'overview', label: 'Analytics' },
                  { id: 'tickets', label: 'Ticket Approvals' },
                  { id: 'gate', label: 'Gate Check-in' },
                  { id: 'food', label: 'Food Counter' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setError('');
                      setSuccessMsg('');
                      setScanResult(null);
                    }}
                    className={`flex-1 md:flex-initial py-2 px-3 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#1E1B4B] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <span>✨</span>
                {successMsg}
              </div>
            )}

            {/* TAB 1: OVERVIEW ANALYTICS */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-card bg-white/90 rounded-2xl p-5 border border-slate-200/80 shadow-md">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Users</p>
                    <p className="text-3xl font-extrabold text-slate-900 mt-1">{analytics.totalUsers || 0}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Registered accounts</p>
                  </div>

                  <div className="glass-card bg-white/90 rounded-2xl p-5 border border-amber-200/80 shadow-md bg-amber-50/20">
                    <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Pending Review</p>
                    <p className="text-3xl font-extrabold text-amber-700 mt-1">{analytics.pendingTickets || 0}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Awaiting approval</p>
                  </div>

                  <div className="glass-card bg-white/90 rounded-2xl p-5 border border-emerald-200/80 shadow-md bg-emerald-50/20">
                    <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Approved Passes</p>
                    <p className="text-3xl font-extrabold text-emerald-700 mt-1">{analytics.approvedTickets || 0}</p>
                    <p className="text-[11px] text-slate-500 mt-1">QR tickets issued</p>
                  </div>

                  <div className="glass-card bg-white/90 rounded-2xl p-5 border border-blue-200/80 shadow-md bg-blue-50/20">
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Gate Check-ins</p>
                    <p className="text-3xl font-extrabold text-blue-700 mt-1">{analytics.checkedInCount || 0}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Attendees at venue</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card bg-white/90 rounded-3xl p-6 border border-slate-200/80 shadow-xl">
                    <h3 className="text-sm font-extrabold text-slate-900 mb-2">🎟️ Food Coupons Redeemed</h3>
                    <p className="text-4xl font-extrabold text-indigo-600">{analytics.foodCollectedCount || 0}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      out of {analytics.approvedTickets || 0} approved attendees
                    </p>
                  </div>

                  <div className="glass-card bg-white/90 rounded-3xl p-6 border border-slate-200/80 shadow-xl">
                    <h3 className="text-sm font-extrabold text-slate-900 mb-2">❌ Rejected Applications</h3>
                    <p className="text-4xl font-extrabold text-red-600">{analytics.rejectedTickets || 0}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      declined ticket requests
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TICKET APPROVAL MANAGER */}
            {activeTab === 'tickets' && (
              <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Manage Ticket Applications</h2>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Review attendee registrations, generate QR passes & trigger auto emails.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                    {['Pending', 'Approved', 'Rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setTicketFilter(status)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          ticketFilter === status
                            ? 'bg-[#1E1B4B] text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {tickets.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                          <th className="pb-3 px-3">Ticket No</th>
                          <th className="pb-3 px-3">Attendee</th>
                          <th className="pb-3 px-3">Category</th>
                          <th className="pb-3 px-3">College / Org</th>
                          <th className="pb-3 px-3">Requested</th>
                          <th className="pb-3 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {tickets.map((t) => (
                          <tr key={t._id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-indigo-600">{t.ticketNumber}</td>
                            <td className="py-3 px-3">
                              <p className="font-bold text-slate-900">{t.userId?.name}</p>
                              <p className="text-[11px] text-slate-500">{t.userId?.email}</p>
                            </td>
                            <td className="py-3 px-3 font-medium text-slate-700">{t.attendeeType}</td>
                            <td className="py-3 px-3 text-slate-600">
                              {t.userId?.college || t.userId?.company || 'N/A'}
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                              {new Date(t.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-3 text-right space-x-2">
                              {t.status === 'Pending' ? (
                                <>
                                  <button
                                    onClick={() => handleApprove(t._id)}
                                    disabled={actionLoading === t._id}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                  >
                                    Approve & Email QR
                                  </button>
                                  <button
                                    onClick={() => handleReject(t._id)}
                                    disabled={actionLoading === t._id}
                                    className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs transition-all cursor-pointer disabled:opacity-50"
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    t.status === 'Approved'
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {t.status}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    No tickets found with status: <span className="font-bold text-slate-700">{ticketFilter}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: GATE ENTRY SCANNER */}
            {activeTab === 'gate' && (
              <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                    🚪
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">Main Gate Check-in Scanner</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Scan attendee QR Code or enter ticket number (<span className="font-mono font-bold">IXC-2026-XXXXXX</span>).
                  </p>
                </div>

                <form onSubmit={handleGateScan} className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder="Enter Ticket Number (e.g. IXC-2026-A1B2C3)"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    disabled={scanLoading}
                    className="px-6 py-3 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {scanLoading ? 'Scanning...' : 'Verify Gate Entry'}
                  </button>
                </form>

                {scanResult?.type === 'gate' && (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                      ✓
                    </div>
                    <h3 className="text-base font-extrabold text-emerald-900">Check-in Confirmed!</h3>
                    <p className="text-xs text-emerald-800 font-medium">
                      Attendee: <span className="font-bold">{scanResult.data?.ticket?.userId?.name}</span> ({scanResult.data?.ticket?.ticketNumber})
                    </p>
                    <p className="text-[11px] text-emerald-700 font-mono">
                      Gate: {scanResult.data?.attendance?.gate} • {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: FOOD COUNTER SCANNER */}
            {activeTab === 'food' && (
              <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                    🍔
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">Food Counter Coupon Redemption</h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Scan attendee QR Code or enter ticket number to redeem meal pass.
                  </p>
                </div>

                <form onSubmit={handleFoodScan} className="flex gap-3">
                  <input
                    type="text"
                    required
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder="Enter Ticket Number (e.g. IXC-2026-A1B2C3)"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                  <button
                    type="submit"
                    disabled={scanLoading}
                    className="px-6 py-3 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {scanLoading ? 'Processing...' : 'Redeem Food Coupon'}
                  </button>
                </form>

                {scanResult?.type === 'food' && (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                      ✓
                    </div>
                    <h3 className="text-base font-extrabold text-emerald-900">Food Coupon Claimed!</h3>
                    <p className="text-xs text-emerald-800 font-medium">
                      Attendee: <span className="font-bold">{scanResult.data?.ticket?.userId?.name}</span> ({scanResult.data?.ticket?.ticketNumber})
                    </p>
                    <p className="text-[11px] text-emerald-700 font-mono">
                      Counter: {scanResult.data?.foodScan?.counter} • {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
