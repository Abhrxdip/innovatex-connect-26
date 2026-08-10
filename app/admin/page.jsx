'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import QRScannerModal from '../components/QRScannerModal';
import TicketDetailsModal from '../components/TicketDetailsModal';
import { Icons } from '../components/Icons';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [ticketFilter, setTicketFilter] = useState('Pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Scanner state
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerType, setScannerType] = useState('gate'); // 'gate' | 'food'
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);

  const fetchAdminData = useCallback(async () => {
    try {
      setLoading(true);
      const [dashRes, tixRes, leaderRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch(`/api/admin/tickets?status=${ticketFilter}`),
        fetch('/api/leaderboard?admin=true'),
      ]);
      if (dashRes.redirected) {
        window.location.href = dashRes.url
      }
      const dashJson = await dashRes.json();
      const tixJson = await tixRes.json();
      const leaderJson = await leaderRes.json();

      if (!dashRes.ok || !dashJson.success) throw new Error(dashJson.message || 'Failed to load dashboard.');
      setDashboardData(dashJson.data);
      setTickets(tixJson.data || []);
      setLeaderboard(leaderJson.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [ticketFilter]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchAdminData(); }, [fetchAdminData]);

  const handleApprove = async (ticketId) => {
    try {
      setActionLoading(ticketId); setError(''); setSuccessMsg('');
      const res = await fetch(`/api/admin/tickets/${ticketId}/approve`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Approval failed.');
      setSuccessMsg('Ticket approved & QR Code emailed!');
      fetchAdminData();
    } catch (err) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  const handleReject = async (ticketId) => {
    try {
      setActionLoading(ticketId); setError(''); setSuccessMsg('');
      const res = await fetch(`/api/admin/tickets/${ticketId}/reject`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Rejection failed.');
      setSuccessMsg('Ticket marked as rejected.');
      fetchAdminData();
    } catch (err) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  const performScan = useCallback(async (ticketNumber, type) => {
    setScanLoading(true); setError(''); setScanResult(null);
    try {
      const isGate = type === 'gate';
      const endpoint = isGate ? '/api/attendance/scan' : '/api/food/scan'
      const body = isGate
        ? { ticketNumber, gate: 'Main Gate' }
        : { ticketNumber, counter: 'Food Counter 1' };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        const msg = json.message || 'Scan failed.';
        // Detect duplicate-scan errors — show a special warning card, not a red error
        const isDuplicate =
          msg.toLowerCase().includes('already checked in') ||
          msg.toLowerCase().includes('already been claimed') ||
          msg.toLowerCase().includes('food coupon has already');
        if (isDuplicate) {
          setScanResult({ type, status: 'duplicate', message: msg, ticketNumber });
          playNotifyBeep('warn');
          setScanInput('');
        } else {
          playNotifyBeep('error');
          throw new Error(msg);
        }
        return;
      }

      setScanResult({ type, status: 'success', data: json.data });
      playNotifyBeep('success');
      setScanInput('');
      fetchAdminData();
    } catch (err) {
      setError(err.message);
    } finally {
      setScanLoading(false);
    }
  }, [fetchAdminData]);

  const handleManualScan = (e, type) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    performScan(scanInput.trim(), type);
  };

  const handleQRScanSuccess = useCallback((ticketNumber) => {
    // DO NOT close scanner — keep it open for batch scanning
    performScan(ticketNumber, scannerType);
  }, [performScan, scannerType]);

  const openScanner = (type) => {
    setScannerType(type);
    setScanResult(null);
    setError('');
    setScannerOpen(true);
  };

  const exportToCSV = () => {
    if (tickets.length === 0) return;

    const headers = [
      'Ticket No', 'Name', 'Email', 'Phone', 'College/Company', 'Type', 'Status', 'Food', 'Laptop', 'LinkedIn', 'GitHub', 'Referred By', 'Date Applied'
    ];

    const csvRows = [headers.join(',')];

    for (const t of tickets) {
      const row = [
        t.ticketNumber,
        `"${t.userId?.name || ''}"`,
        `"${t.userId?.email || ''}"`,
        `"${t.userId?.phone || ''}"`,
        `"${t.userId?.college || t.userId?.company || ''}"`,
        `"${t.attendeeType || ''}"`,
        `"${t.status || ''}"`,
        `"${t.userId?.foodPreference || 'N/A'}"`,
        `"${t.userId?.bringingLaptop ? 'Yes' : 'No'}"`,
        `"${t.userId?.linkedin || ''}"`,
        `"${t.userId?.github || ''}"`,
        `"${t.referralData?.partnerId?.name || ''}"`,
        `"${new Date(t.createdAt).toLocaleString()}"`
      ];
      csvRows.push(row.join(','));
    }

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `innovatex_tickets_${ticketFilter.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const analytics = dashboardData?.analytics || {};

  const tabList = [
    { id: 'overview', label: 'Analytics' },
    { id: 'tickets', label: 'Approvals' },
    { id: 'gate', label: 'Gate Scan' },
    { id: 'food', label: 'Food Scan' },
    { id: 'leaderboard', label: 'Leaderboard' },
  ];

  const statusColor = (s) =>
    s === 'Approved' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20' :
      s === 'Pending' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20' :
        'bg-red-500/15 text-red-300 border border-red-500/20';

  return (
    <div className="relative min-h-screen bg-[#090D2B] bg-grid-pattern flex flex-col overflow-x-hidden font-display text-white">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-650/10 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[170px] pointer-events-none animate-pulse-glow" />
      <Navbar />
     
      <QRScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleQRScanSuccess}
        title={scannerType === 'gate' ? 'Gate Check-in Scanner' : 'Food Coupon Scanner'}
        accentColor={scannerType === 'gate' ? 'blue' : 'amber'}
        scanResult={scanResult}
        scanLoading={scanLoading}
        scanError={error}
      />

      <TicketDetailsModal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        ticket={selectedTicket}
        onApprove={handleApprove}
        onReject={handleReject}
        actionLoading={actionLoading}
      />

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-16">
        {loading && !dashboardData ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-orange-500/20 border-t-[#EE4B15] rounded-full animate-spin mb-4" />
            <p className="text-slate-400 text-sm font-medium">Loading admin control center...</p>
          </div>
        ) : error && !dashboardData ? (
          <div className="glass-card !bg-[#0C1235] rounded-3xl p-8 max-w-lg mx-auto text-center shadow-xl border border-white/10 text-white">
            <h2 className="text-xl font-bold text-white mb-2">Admin Clearance Required</h2>
            <p className="text-slate-300 text-sm mb-6">{error}</p>
            <Link href="/login" className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white font-bold text-sm transition-all shadow-md">
              Sign In as Administrator
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="glass-card !bg-[#0C1235] rounded-3xl p-5 sm:p-8 shadow-xl border border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#EE4B15] to-[#2E6CFF] text-white text-xs sm:text-sm flex items-center justify-center font-bold shadow-lg shrink-0">Admin</div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-white">Admin Control Center</h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EE4B15] text-white">Organizer Portal</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5">InnovateX Connect &apos;26 • Gate & Ticket Operations</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 p-1.5 !bg-[#090D2B] rounded-2xl border border-white/10">
                {tabList.map((tab) => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setError(''); setSuccessMsg(''); setScanResult(null); }}
                    className={`py-2 px-3 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer text-center ${activeTab === tab.id ? 'bg-[#EE4B15] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />{error}</div>}
            {successMsg && <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-bold flex items-center gap-2">{successMsg}</div>}

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Users', value: analytics.totalUsers || 0, color: 'text-white', border: 'border-white/10' },
                    { label: 'Pending Review', value: analytics.pendingTickets || 0, color: 'text-amber-400', border: 'border-amber-500/20' },
                    { label: 'Approved Passes', value: analytics.approvedTickets || 0, color: 'text-emerald-400', border: 'border-emerald-500/20' },
                    { label: 'Rejected', value: analytics.rejectedTickets || 0, color: 'text-red-400', border: 'border-red-500/20' },
                  ].map(({ label, value, color, border }) => (
                    <div key={label} className={`glass-card !bg-[#0C1235] rounded-2xl p-5 border ${border} shadow-md`}>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                      <p className={`text-3xl font-extrabold mt-1 ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Live Ops KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card !bg-[#0C1235] rounded-3xl p-6 border border-emerald-500/20 shadow-xl bg-emerald-500/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Total Gate Check-ins Done</p>
                        <p className="text-[10px] text-slate-400">Attendees physically arrived</p>
                      </div>
                    </div>
                    <p className="text-5xl font-extrabold text-emerald-300">{analytics.checkedInCount || 0}</p>
                    <div className="mt-2 text-xs text-slate-400">
                      of <span className="font-bold text-white">{analytics.approvedTickets || 0}</span> approved passes scanned
                    </div>
                    {analytics.approvedTickets > 0 && (
                      <div className="mt-3 h-2 rounded-full bg-emerald-950 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(100, Math.round((analytics.checkedInCount / analytics.approvedTickets) * 100))}%` }} />
                      </div>
                    )}
                  </div>

                  <div className="glass-card !bg-[#0C1235] rounded-3xl p-6 border border-amber-500/20 shadow-xl bg-amber-500/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Total Food Served</p>
                        <p className="text-[10px] text-slate-400">Meal coupons redeemed</p>
                      </div>
                    </div>
                    <p className="text-5xl font-extrabold text-amber-300">{analytics.foodCollectedCount || 0}</p>
                    <div className="mt-2 text-xs text-slate-400">
                      of <span className="font-bold text-white">{analytics.approvedTickets || 0}</span> approved passes redeemed
                    </div>
                    {analytics.approvedTickets > 0 && (
                      <div className="mt-3 h-2 rounded-full bg-amber-950 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(100, Math.round((analytics.foodCollectedCount / analytics.approvedTickets) * 100))}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TICKET APPROVALS */}
            {activeTab === 'tickets' && (
              <div className="glass-card !bg-[#0C1235] rounded-3xl p-5 sm:p-8 shadow-xl border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-white">Manage Ticket Applications</h2>
                    <p className="text-slate-400 text-xs mt-0.5">Approve or reject attendee registrations.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <button onClick={exportToCSV} disabled={tickets.length === 0}
                      className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-lg bg-[#2E6CFF] hover:bg-[#2E6CFF]/80 text-white transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                      Export CSV
                    </button>
                    <div className="flex items-center gap-1.5 p-1 !bg-[#090D2B] rounded-xl w-full sm:w-auto">
                      {['Pending', 'Approved', 'Rejected'].map((s) => (
                        <button key={s} onClick={() => setTicketFilter(s)}
                          className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${ticketFilter === s ? 'bg-[#EE4B15] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {tickets.length > 0 ? (
                  <>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                            <th className="pb-3 px-3">Ticket No</th>
                            <th className="pb-3 px-3">Attendee</th>
                            <th className="pb-3 px-3">Type</th>
                            <th className="pb-3 px-3">College / Org</th>
                            <th className="pb-3 px-3">Date</th>
                            <th className="pb-3 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs">
                          {tickets.map((t) => (
                            <tr key={t._id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedTicket(t)}>
                              <td className="py-3 px-3 font-mono font-bold text-[#EE4B15]">{t.ticketNumber}</td>
                              <td className="py-3 px-3">
                                <p
                                  className="font-bold text-white hover:text-[#EE4B15] transition-colors"
                                >
                                  {t.userId?.name}
                                </p>
                                <p className="text-[11px] text-slate-400">{t.userId?.email}</p>
                                <div className="flex gap-2 mt-1.5">
                                  <a href={t.userId?.linkedin || undefined} target={t.userId?.linkedin ? "_blank" : undefined} rel={t.userId?.linkedin ? "noopener noreferrer" : undefined} onClick={(e) => e.stopPropagation()} className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${t.userId?.linkedin ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-white/5 text-slate-600 cursor-not-allowed pointer-events-none'}`}>LinkedIn</a>
                                  <a href={t.userId?.github || undefined} target={t.userId?.github ? "_blank" : undefined} rel={t.userId?.github ? "noopener noreferrer" : undefined} onClick={(e) => e.stopPropagation()} className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${t.userId?.github ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/80' : 'bg-white/5 text-slate-600 cursor-not-allowed pointer-events-none'}`}>GitHub</a>
                                </div>
                              </td>
                              <td className="py-3 px-3 font-medium text-slate-200">{t.attendeeType}</td>
                              <td className="py-3 px-3">
                                <p className="text-slate-300">{t.userId?.college || t.userId?.company || 'N/A'}</p>
                                {(t.userId?.foodPreference || t.userId?.bringingLaptop || t.referralData?.partnerId?.name) && (
                                  <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                                    {t.userId?.foodPreference && <span className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-bold text-slate-400 uppercase"> {t.userId.foodPreference}</span>}
                                    {t.userId?.bringingLaptop && <span className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-bold text-slate-400 uppercase"> Laptop</span>}
                                    {t.referralData?.partnerId?.name && <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-[9px] font-bold text-orange-400 border border-orange-500/20 uppercase" title="Referred by">Ref: {t.referralData.partnerId.name}</span>}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{new Date(t.createdAt).toLocaleDateString()}</td>
                              <td className="py-3 px-3 text-right space-x-2">
                                {t.status === 'Pending' ? (
                                  <>
                                    <button onClick={(e) => { e.stopPropagation(); handleApprove(t._id); }} disabled={actionLoading === t._id}
                                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50">
                                      Approve & Email QR
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); handleReject(t._id); }} disabled={actionLoading === t._id}
                                      className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs transition-all cursor-pointer disabled:opacity-50">
                                      Reject
                                    </button>
                                  </>
                                ) : (
                                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${statusColor(t.status)}`}>{t.status}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Mobile cards */}
                    <div className="block md:hidden space-y-3">
                      {tickets.map((t) => (
                        <div key={t._id} className="p-4 rounded-2xl !bg-[#090D2B] border border-white/5 space-y-3 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setSelectedTicket(t)}>
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-xs text-[#EE4B15]">{t.ticketNumber}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColor(t.status)}`}>{t.status}</span>
                          </div>
                          <div>
                            <p
                              className="font-bold text-white text-sm hover:text-[#EE4B15] transition-colors"
                            >
                              {t.userId?.name}
                            </p>
                            <p className="text-xs text-slate-400">{t.userId?.email}</p>
                            <div className="flex gap-2 mt-1.5">
                              <a href={t.userId?.linkedin || undefined} target={t.userId?.linkedin ? "_blank" : undefined} rel={t.userId?.linkedin ? "noopener noreferrer" : undefined} onClick={(e) => e.stopPropagation()} className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${t.userId?.linkedin ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-white/5 text-slate-600 cursor-not-allowed pointer-events-none'}`}>LinkedIn</a>
                              <a href={t.userId?.github || undefined} target={t.userId?.github ? "_blank" : undefined} rel={t.userId?.github ? "noopener noreferrer" : undefined} onClick={(e) => e.stopPropagation()} className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${t.userId?.github ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/80' : 'bg-white/5 text-slate-600 cursor-not-allowed pointer-events-none'}`}>GitHub</a>
                            </div>
                            <p className="text-xs text-slate-300 mt-2">{t.userId?.college || t.userId?.company || 'N/A'} • <span className="font-medium text-slate-200">{t.attendeeType}</span></p>
                            {(t.userId?.foodPreference || t.userId?.bringingLaptop || t.referralData?.partnerId?.name) && (
                              <div className="mt-2 flex items-center gap-2 flex-wrap">
                                {t.userId?.foodPreference && <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-400 uppercase"> {t.userId.foodPreference}</span>}
                                {t.userId?.bringingLaptop && <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-400 uppercase"> Laptop</span>}
                                {t.referralData?.partnerId?.name && <span className="px-2 py-1 rounded bg-orange-500/10 text-[10px] font-bold text-orange-400 border border-orange-500/20 uppercase">Ref: {t.referralData.partnerId.name}</span>}
                              </div>
                            )}
                          </div>
                          {t.status === 'Pending' && (
                            <div className="flex gap-2 pt-2 border-t border-white/5">
                              <button onClick={(e) => { e.stopPropagation(); handleApprove(t._id); }} disabled={actionLoading === t._id}
                                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all text-center cursor-pointer disabled:opacity-50">
                                Approve & Email QR
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); handleReject(t._id); }} disabled={actionLoading === t._id}
                                className="py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs transition-all cursor-pointer disabled:opacity-50">
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    No tickets found with status: <span className="font-bold text-slate-300">{ticketFilter}</span>
                  </div>
                )}
              </div>
            )}
            {/* LEADERBOARD */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-10">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-orange-500/10 text-[#EE4B15] border border-orange-500/20 mb-3 shadow-sm">
                    Live Partner Standings
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Admin Leaderboard View
                  </h2>
                </div>

                {leaderboard.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    No leaderboard data available.
                  </div>
                ) : (
                  <>
                    {/* Top 3 Winners Podium */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                      {/* Rank 2 (Silver) */}
                      {leaderboard[1] && (
                        <div className="bg-[#0C1235] rounded-3xl p-6 border border-slate-700/50 shadow-xl text-center relative order-2 md:order-1 transform hover:-translate-y-1 transition-all">
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-700 text-slate-200 font-extrabold text-sm flex items-center justify-center shadow-md">
                            2
                          </div>
                          <div className="w-16 h-16 rounded-2xl bg-[#151C47] text-slate-355 font-bold text-2xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-inner">
                            🥈
                          </div>
                          <h3 className="text-base font-extrabold text-white">{leaderboard[1].partner?.name}</h3>
                          <p className="text-slate-400 text-xs truncate max-w-[180px] mx-auto">
                            {leaderboard[1].partner?.college || leaderboard[1].partner?.company || 'Partner'}
                          </p>
                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-around text-xs">
                            <div>
                              <p className="text-slate-500 font-bold text-[10px]">APPROVED</p>
                              <p className="text-slate-200 font-extrabold text-lg">{leaderboard[1].approvedReferrals}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-bold text-[10px]">TOTAL</p>
                              <p className="text-slate-400 font-bold text-sm">{leaderboard[1].totalReferrals}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Rank 1 (Gold) */}
                      {leaderboard[0] && (
                        <div className="bg-gradient-to-b from-[#1C170C] to-[#0C1235] rounded-3xl p-7 border-2 border-amber-400/50 shadow-2xl text-center relative order-1 md:order-2 transform hover:-translate-y-2 transition-all">
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-black text-base flex items-center justify-center shadow-lg animate-bounce">
                            1
                          </div>
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-amber-950 font-black text-3xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-lg shadow-amber-500/20">
                            🥇
                          </div>
                          <h3 className="text-lg font-black text-white">{leaderboard[0].partner?.name}</h3>
                          <p className="text-amber-400 text-xs font-semibold truncate max-w-[200px] mx-auto">
                            {leaderboard[0].partner?.college || leaderboard[0].partner?.company || 'Top Champion'}
                          </p>
                          <div className="mt-4 pt-3 border-t border-amber-400/20 flex items-center justify-around text-xs">
                            <div>
                              <p className="text-amber-300 font-bold text-[10px]">APPROVED TICKETS</p>
                              <p className="text-amber-400 font-black text-2xl">{leaderboard[0].approvedReferrals}</p>
                            </div>
                            <div>
                              <p className="text-amber-300 font-bold text-[10px]">TOTAL CLICKS</p>
                              <p className="text-amber-400 font-bold text-base">{leaderboard[0].totalReferrals}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Rank 3 (Bronze) */}
                      {leaderboard[2] && (
                        <div className="bg-[#0C1235] rounded-3xl p-6 border border-amber-900/30 shadow-xl text-center relative order-3 transform hover:-translate-y-1 transition-all">
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-800 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                            3
                          </div>
                          <div className="w-16 h-16 rounded-2xl bg-[#1C1710] text-amber-500 font-bold text-2xl flex items-center justify-center mx-auto mt-2 mb-3 shadow-inner">
                            🥉
                          </div>
                          <h3 className="text-base font-extrabold text-white">{leaderboard[2].partner?.name}</h3>
                          <p className="text-slate-400 text-xs truncate max-w-[180px] mx-auto">
                            {leaderboard[2].partner?.college || leaderboard[2].partner?.company || 'Partner'}
                          </p>
                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-around text-xs">
                            <div>
                              <p className="text-slate-500 font-bold text-[10px]">APPROVED</p>
                              <p className="text-slate-200 font-extrabold text-lg">{leaderboard[2].approvedReferrals}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-bold text-[10px]">TOTAL</p>
                              <p className="text-slate-400 font-bold text-sm">{leaderboard[2].totalReferrals}</p>
                            </div>
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
                              <th className="pb-3 px-3">College / Organization</th>
                              <th className="pb-3 px-3 text-center">Total Signups</th>
                              <th className="pb-3 px-3 text-right">Approved Tickets</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs">
                            {leaderboard.map((item, idx) => (
                              <tr key={item.partner?.id || idx} className="hover:bg-white/5 transition-colors">
                                <td className="py-3 px-3 font-extrabold text-slate-200">
                                  {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                                </td>
                                <td className="py-3 px-3 font-bold text-white">{item.partner?.name}</td>
                                <td className="py-3 px-3 text-slate-355 font-medium">
                                  {item.partner?.college || item.partner?.company || 'Community Partner'}
                                </td>
                                <td className="py-3 px-3 text-center font-bold text-slate-300">{item.totalReferrals}</td>
                                <td className="py-3 px-3 text-right font-extrabold text-[#EE4B15] text-sm">
                                  {item.approvedReferrals}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* GATE SCAN */}
            {activeTab === 'gate' && (
              <ScannerPanel
                title="Main Gate Check-in Scanner"
                iconBg="bg-blue-50 text-blue-600"
                hint="Scan the attendee's QR ticket at the main entrance."
                accentColor="blue"
                focusRing="focus:ring-blue-600"
                btnLabel="Verify Gate Entry"
                scanType="gate"
                scanInput={scanInput}
                setScanInput={setScanInput}
                scanLoading={scanLoading}
                scanResult={scanResult}
                onOpenCamera={() => openScanner('gate')}
                onManualSubmit={(e) => handleManualScan(e, 'gate')}
              />
            )}

            {/* FOOD SCAN */}
            {activeTab === 'food' && (
              <ScannerPanel
                title="Food Coupon Redemption"
                iconBg="bg-amber-50 text-amber-600"
                hint="Scan the attendee's QR ticket to mark meal coupon as redeemed."
                accentColor="amber"
                focusRing="focus:ring-amber-500"
                btnLabel="Redeem Food Coupon"
                scanType="food"
                scanInput={scanInput}
                setScanInput={setScanInput}
                scanLoading={scanLoading}
                scanResult={scanResult}
                onOpenCamera={() => openScanner('food')}
                onManualSubmit={(e) => handleManualScan(e, 'food')}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function ScannerPanel({
  title, iconBg, hint, accentColor, focusRing,
  btnLabel, scanType, scanInput, setScanInput,
  scanLoading, scanResult, onOpenCamera, onManualSubmit,
}) {
  const camBtnColor = accentColor === 'amber'
    ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30';

  const myResult = scanResult?.type === scanType ? scanResult : null;

  return (
    <div className="glass-card !bg-[#0C1235] rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 max-w-2xl mx-auto space-y-6 text-white">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-extrabold text-white">{title}</h2>
        <p className="text-slate-300 text-xs mt-1">{hint}</p>
      </div>

      {/* Camera Scan Button */}
      <button
        onClick={onOpenCamera}
        className={`w-full py-4 rounded-2xl ${camBtnColor} text-white font-extrabold text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer`}
      >
        <span>Open Camera Scanner</span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">or enter manually</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Manual Input */}
      <form onSubmit={onManualSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          placeholder="Enter Ticket Number (e.g. IXC-2026-A1B2C3)"
          className={`flex-1 px-4 py-3 rounded-xl bg-[#090D2B] border border-white/10 text-white text-sm font-mono font-bold focus:outline-none focus:ring-2 ${focusRing}`}
        />
        <button
          type="submit"
          disabled={scanLoading || !scanInput.trim()}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          {scanLoading ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : btnLabel}
        </button>
      </form>

      {/* ── Success Result Card ──────────────────────────────────────────── */}
      {myResult?.status === 'success' && (
        <div className="p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/20 space-y-3 animate-in fade-in text-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-lg shadow-emerald-500/30">✓</div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-400">
                {scanType === 'gate' ? 'Check-in Confirmed!' : 'Food Coupon Claimed!'}
              </h3>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">
                <span className="font-bold">{myResult.data?.ticket?.userId?.name}</span>
                {' • '}
                <span className="font-mono text-emerald-400">{myResult.data?.ticket?.ticketNumber}</span>
              </p>
            </div>
          </div>
          <div className="pl-14 space-y-1">
            <p className="text-[11px] text-emerald-400 font-mono">
              {scanType === 'gate'
                ? `Gate: ${myResult.data?.attendance?.gate}`
                : `Counter: ${myResult.data?.foodScan?.counter}`}
              {' • '}{new Date().toLocaleTimeString()}
            </p>
            <p className="text-[11px] text-emerald-300">
              {scanType === 'gate'
                ? 'Attendee successfully marked as arrived. Entry allowed.'
                : 'Meal coupon marked as redeemed. One-time use only.'}
            </p>
          </div>
        </div>
      )}

      {/* ── Duplicate / Already-Done Warning Card ───────────────────────── */}
      {myResult?.status === 'duplicate' && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3 text-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-lg shadow-amber-500/30">!</div>
            <div>
              <h3 className="text-sm font-extrabold text-amber-400">
                {scanType === 'gate' ? 'Already Checked In!' : 'Food Coupon Already Used!'}
              </h3>
              <p className="text-xs text-amber-300 font-medium mt-0.5 font-mono">
                {myResult.ticketNumber}
              </p>
            </div>
          </div>
          <div className="pl-14">
            <p className="text-xs text-amber-300 leading-relaxed">
              {scanType === 'gate'
                ? 'This attendee has already scanned in at the main gate. Do not allow duplicate entry.'
                : 'This food coupon has already been redeemed. Each ticket allows one meal only.'}
            </p>
          </div>
          <div className="pl-14 pt-1">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/25 border border-amber-500/20 text-amber-300 text-[11px] font-bold">
              {scanType === 'gate' ? 'ENTRY DENIED — ALREADY CHECKED IN' : 'COUPON INVALID — ALREADY REDEEMED'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function playNotifyBeep(type = 'warn') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (_) { }
}
