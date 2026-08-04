'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import QRScannerModal from '../components/QRScannerModal';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketFilter, setTicketFilter] = useState('Pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Scanner state
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerType, setScannerType] = useState('gate'); // 'gate' | 'food'
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);

  const fetchAdminData = useCallback(async () => {
    try {
      setLoading(true);
      const [dashRes, tixRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch(`/api/admin/tickets?status=${ticketFilter}`),
      ]);
      const dashJson = await dashRes.json();
      const tixJson = await tixRes.json();
      if (!dashRes.ok || !dashJson.success) throw new Error(dashJson.message || 'Failed to load dashboard.');
      setDashboardData(dashJson.data);
      setTickets(tixJson.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [ticketFilter]);

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
      const endpoint = isGate ? '/api/attendance/scan' : '/api/food/scan';
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

  const analytics = dashboardData?.analytics || {};

  const tabList = [
    { id: 'overview', label: 'Analytics' },
    { id: 'tickets', label: 'Approvals' },
    { id: 'gate', label: 'Gate Scan' },
    { id: 'food', label: 'Food Scan' },
  ];

  const statusColor = (s) =>
    s === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
    s === 'Pending'  ? 'bg-amber-100 text-amber-700' :
    'bg-red-100 text-red-700';

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] bg-grid-pattern flex flex-col overflow-x-hidden font-display">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />
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

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-16">
        {loading && !dashboardData ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="w-10 h-10 border-4 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 text-sm font-medium">Loading admin control center...</p>
          </div>
        ) : error && !dashboardData ? (
          <div className="glass-card bg-white/90 rounded-3xl p-8 max-w-lg mx-auto text-center shadow-xl border border-red-200">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Admin Clearance Required</h2>
            <p className="text-slate-600 text-sm mb-6">{error}</p>
            <Link href="/login" className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-sm transition-all shadow-md">
              Sign In as Administrator
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="glass-card bg-white/90 rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-200/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1E1B4B] text-white text-xs sm:text-sm flex items-center justify-center font-bold shadow-lg shrink-0">Admin</div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Admin Control Center</h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">Organizer Portal</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">InnovateX Connect '26 • Gate & Ticket Operations</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/60">
                {tabList.map((tab) => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setError(''); setSuccessMsg(''); setScanResult(null); }}
                    className={`py-2 px-3 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer text-center ${activeTab === tab.id ? 'bg-[#1E1B4B] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0"/>{error}</div>}
            {successMsg && <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">{successMsg}</div>}

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Users', value: analytics.totalUsers || 0, color: 'text-slate-900', border: 'border-slate-200/80' },
                    { label: 'Pending Review', value: analytics.pendingTickets || 0, color: 'text-amber-700', border: 'border-amber-200/80' },
                    { label: 'Approved Passes', value: analytics.approvedTickets || 0, color: 'text-emerald-700', border: 'border-emerald-200/80' },
                    { label: 'Rejected', value: analytics.rejectedTickets || 0, color: 'text-red-600', border: 'border-red-200/80' },
                  ].map(({ label, value, color, border }) => (
                    <div key={label} className={`glass-card bg-white/90 rounded-2xl p-5 border ${border} shadow-md`}>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                      <p className={`text-3xl font-extrabold mt-1 ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Live Ops KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card bg-white/90 rounded-3xl p-6 border border-emerald-300/80 shadow-xl bg-emerald-50/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Total Gate Check-ins Done</p>
                        <p className="text-[10px] text-slate-500">Attendees physically arrived</p>
                      </div>
                    </div>
                    <p className="text-5xl font-extrabold text-emerald-700">{analytics.checkedInCount || 0}</p>
                    <div className="mt-2 text-xs text-slate-500">
                      of <span className="font-bold text-slate-700">{analytics.approvedTickets || 0}</span> approved passes scanned
                    </div>
                    {analytics.approvedTickets > 0 && (
                      <div className="mt-3 h-2 rounded-full bg-emerald-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(100, Math.round((analytics.checkedInCount / analytics.approvedTickets) * 100))}%` }} />
                      </div>
                    )}
                  </div>

                  <div className="glass-card bg-white/90 rounded-3xl p-6 border border-amber-300/80 shadow-xl bg-amber-50/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Total Food Served</p>
                        <p className="text-[10px] text-slate-500">Meal coupons redeemed</p>
                      </div>
                    </div>
                    <p className="text-5xl font-extrabold text-amber-700">{analytics.foodCollectedCount || 0}</p>
                    <div className="mt-2 text-xs text-slate-500">
                      of <span className="font-bold text-slate-700">{analytics.approvedTickets || 0}</span> approved passes redeemed
                    </div>
                    {analytics.approvedTickets > 0 && (
                      <div className="mt-3 h-2 rounded-full bg-amber-100 overflow-hidden">
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
              <div className="glass-card bg-white/90 rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Manage Ticket Applications</h2>
                    <p className="text-slate-500 text-xs mt-0.5">Approve or reject attendee registrations.</p>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
                    {['Pending', 'Approved', 'Rejected'].map((s) => (
                      <button key={s} onClick={() => setTicketFilter(s)}
                        className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${ticketFilter === s ? 'bg-[#1E1B4B] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {tickets.length > 0 ? (
                  <>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                            <th className="pb-3 px-3">Ticket No</th>
                            <th className="pb-3 px-3">Attendee</th>
                            <th className="pb-3 px-3">Type</th>
                            <th className="pb-3 px-3">College / Org</th>
                            <th className="pb-3 px-3">Date</th>
                            <th className="pb-3 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {tickets.map((t) => (
                            <tr key={t._id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="py-3 px-3 font-mono font-bold text-indigo-600">{t.ticketNumber}</td>
                              <td className="py-3 px-3"><p className="font-bold text-slate-900">{t.userId?.name}</p><p className="text-[11px] text-slate-500">{t.userId?.email}</p></td>
                              <td className="py-3 px-3 font-medium text-slate-700">{t.attendeeType}</td>
                              <td className="py-3 px-3 text-slate-600">{t.userId?.college || t.userId?.company || 'N/A'}</td>
                              <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">{new Date(t.createdAt).toLocaleDateString()}</td>
                              <td className="py-3 px-3 text-right space-x-2">
                                {t.status === 'Pending' ? (
                                  <>
                                    <button onClick={() => handleApprove(t._id)} disabled={actionLoading === t._id}
                                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50">
                                      Approve & Email QR
                                    </button>
                                    <button onClick={() => handleReject(t._id)} disabled={actionLoading === t._id}
                                      className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs transition-all cursor-pointer disabled:opacity-50">
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
                        <div key={t._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-xs text-indigo-600">{t.ticketNumber}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColor(t.status)}`}>{t.status}</span>
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{t.userId?.name}</p>
                            <p className="text-xs text-slate-500">{t.userId?.email}</p>
                            <p className="text-xs text-slate-600 mt-1">{t.userId?.college || t.userId?.company || 'N/A'} • <span className="font-medium">{t.attendeeType}</span></p>
                          </div>
                          {t.status === 'Pending' && (
                            <div className="flex gap-2 pt-2 border-t border-slate-200/60">
                              <button onClick={() => handleApprove(t._id)} disabled={actionLoading === t._id}
                                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all text-center cursor-pointer disabled:opacity-50">
                                Approve & Email QR
                              </button>
                              <button onClick={() => handleReject(t._id)} disabled={actionLoading === t._id}
                                className="py-2 px-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs transition-all cursor-pointer disabled:opacity-50">
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
                    No tickets found with status: <span className="font-bold text-slate-700">{ticketFilter}</span>
                  </div>
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
    <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
        <p className="text-slate-500 text-xs mt-1">{hint}</p>
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
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">or enter manually</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Manual Input */}
      <form onSubmit={onManualSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={scanInput}
          onChange={(e) => setScanInput(e.target.value)}
          placeholder="Enter Ticket Number (e.g. IXC-2026-A1B2C3)"
          className={`flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-mono font-bold focus:outline-none focus:ring-2 ${focusRing}`}
        />
        <button
          type="submit"
          disabled={scanLoading || !scanInput.trim()}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
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
        <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-lg shadow-emerald-500/30">✓</div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-900">
                {scanType === 'gate' ? 'Check-in Confirmed!' : 'Food Coupon Claimed!'}
              </h3>
              <p className="text-xs text-emerald-800 font-medium mt-0.5">
                <span className="font-bold">{myResult.data?.ticket?.userId?.name}</span>
                {' • '}
                <span className="font-mono text-emerald-700">{myResult.data?.ticket?.ticketNumber}</span>
              </p>
            </div>
          </div>
          <div className="pl-14 space-y-1">
            <p className="text-[11px] text-emerald-700 font-mono">
              {scanType === 'gate'
                ? `Gate: ${myResult.data?.attendance?.gate}`
                : `Counter: ${myResult.data?.foodScan?.counter}`}
              {' • '}{new Date().toLocaleTimeString()}
            </p>
            <p className="text-[11px] text-emerald-600">
              {scanType === 'gate'
                ? 'Attendee successfully marked as arrived. Entry allowed.'
                : 'Meal coupon marked as redeemed. One-time use only.'}
            </p>
          </div>
        </div>
      )}

      {/* ── Duplicate / Already-Done Warning Card ───────────────────────── */}
      {myResult?.status === 'duplicate' && (
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-400 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-400 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-lg shadow-amber-400/30">!</div>
            <div>
              <h3 className="text-sm font-extrabold text-amber-900">
                {scanType === 'gate' ? 'Already Checked In!' : 'Food Coupon Already Used!'}
              </h3>
              <p className="text-xs text-amber-800 font-medium mt-0.5 font-mono">
                {myResult.ticketNumber}
              </p>
            </div>
          </div>
          <div className="pl-14">
            <p className="text-xs text-amber-800 leading-relaxed">
              {scanType === 'gate'
                ? 'This attendee has already scanned in at the main gate. Do not allow duplicate entry.'
                : 'This food coupon has already been redeemed. Each ticket allows one meal only.'}
            </p>
          </div>
          <div className="pl-14 pt-1">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-[11px] font-bold">
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
  } catch (_) {}
}
