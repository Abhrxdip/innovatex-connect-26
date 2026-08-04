'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const REGION_ID = 'ixc-qr-region';

export default function QRScannerModal({
  isOpen,
  onClose,
  onScanSuccess,
  title = 'Scan QR Code',
  accentColor = 'blue',
  scanResult,
  scanLoading,
  scanError,
}) {
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [mountKey, setMountKey] = useState(0);

  // toast state: null | { kind: 'success'|'duplicate'|'error', heading, subtext }
  const [toast, setToast] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef(null);

  const scannerRef = useRef(null);
  const cooldownRef = useRef(false);

  // ── Full cleanup ────────────────────────────────────────
  const cleanup = useCallback(() => {
    const s = scannerRef.current;
    scannerRef.current = null;
    if (s) { try { s.clear(); } catch (_) {} }
    try {
      document.querySelectorAll(`#${REGION_ID} video`).forEach((v) => {
        if (v.srcObject) {
          v.srcObject.getTracks().forEach((t) => t.stop());
          v.srcObject = null;
        }
      });
    } catch (_) {}
    setStatus('idle');
  }, []);

  // ── Show toast, then auto-dismiss ─────────────────────
  const showToast = useCallback((kind, heading, subtext) => {
    clearTimeout(toastTimerRef.current);
    setToast({ kind, heading, subtext });
    // Small delay so CSS animation kicks in
    requestAnimationFrame(() => setToastVisible(true));

    const duration = kind === 'error' ? 3500 : 2500;
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToast(null), 300); // let fade-out finish
    }, duration);
  }, []);

  // ── React to scan results coming back from parent ──────
  useEffect(() => {
    if (!scanResult) return;

    if (scanResult.status === 'success') {
      const name = scanResult.data?.ticket?.userId?.name || 'Attendee';
      const num  = scanResult.data?.ticket?.ticketNumber || '';
      const label = accentColor === 'amber' ? 'Food Served!' : 'Checked In!';
      showToast('success', label, `${name}${num ? '  ·  ' + num : ''}`);
    } else if (scanResult.status === 'duplicate') {
      const label = accentColor === 'amber' ? 'Already Claimed' : 'Already Checked In';
      showToast('duplicate', label, scanResult.ticketNumber || '');
    }
  }, [scanResult, accentColor, showToast]);

  useEffect(() => {
    if (scanError) {
      showToast('error', 'Scan Failed', scanError);
    }
  }, [scanError, showToast]);

  // Clear any stale toast while a new scan is processing
  useEffect(() => {
    if (scanLoading) {
      clearTimeout(toastTimerRef.current);
      setToastVisible(false);
      setTimeout(() => setToast(null), 200);
    }
  }, [scanLoading]);

  // ── Start scanner ──────────────────────────────────────
  const startScanner = useCallback(async () => {
    cleanup();
    setStatus('starting');
    setErrorMsg('');
    cooldownRef.current = false;

    await new Promise((r) => setTimeout(r, 400));

    const el = document.getElementById(REGION_ID);
    if (!el) {
      setStatus('error');
      setErrorMsg('Scanner container not found.');
      return;
    }

    try {
      const { Html5QrcodeScanner } = await import('html5-qrcode');

      const scanner = new Html5QrcodeScanner(
        REGION_ID,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
          experimentalFeatures: { useBarCodeDetectorIfSupported: true },
        },
        false
      );

      scannerRef.current = scanner;

      scanner.render(
        (decodedText) => {
          if (cooldownRef.current) return;
          cooldownRef.current = true;

          let ticketNumber = decodedText.trim();
          try {
            const parsed = JSON.parse(decodedText);
            if (parsed?.ticketNumber) ticketNumber = parsed.ticketNumber;
          } catch (_) {}

          playBeep();
          onScanSuccess(ticketNumber);

          setTimeout(() => { cooldownRef.current = false; }, 3000);
        },
        () => {} // per-frame decode errors — ignore
      );

      setStatus('active');
    } catch (err) {
      setStatus('error');
      setErrorMsg(`Camera init failed: ${err?.message || 'Unknown error'}`);
    }
  }, [cleanup, onScanSuccess]);

  // ── Open/close lifecycle ───────────────────────────────
  useEffect(() => {
    if (isOpen) { setMountKey((k) => k + 1); }
    else { cleanup(); setToast(null); }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen || mountKey === 0) return;
    const t = setTimeout(startScanner, 100);
    return () => clearTimeout(t);
  }, [mountKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { cleanup(); clearTimeout(toastTimerRef.current); }, [cleanup]);

  const handleClose = useCallback(() => { cleanup(); onClose(); }, [cleanup, onClose]);

  if (!isOpen) return null;

  // ── Theme colours ──────────────────────────────────────
  const isAmber = accentColor === 'amber';
  const accentDot   = isAmber ? 'bg-amber-400'  : 'bg-blue-400';
  const accentGlow  = isAmber ? 'shadow-amber-500/30' : 'shadow-blue-500/30';
  const accentBtn   = isAmber
    ? 'bg-amber-500 hover:bg-amber-400 text-white'
    : 'bg-blue-600  hover:bg-blue-500  text-white';

  // toast theme
  const toastCfg = {
    success:   { bg: 'bg-emerald-500', icon: '✓', ring: 'ring-emerald-300' },
    duplicate: { bg: 'bg-amber-500',   icon: '!', ring: 'ring-amber-300'   },
    error:     { bg: 'bg-rose-500',    icon: '✕', ring: 'ring-rose-300'    },
  };
  const tc = toast ? toastCfg[toast.kind] : null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* ─── FULL-SCREEN RESULT TOAST ──────────────────────── */}
      {toast && tc && (
        <div
          className={`
            fixed inset-0 z-[400] flex flex-col items-center justify-center gap-6 px-8
            ${tc.bg}
            transition-all duration-300
            ${toastVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          {/* Big icon */}
          <div className={`w-24 h-24 rounded-full bg-white/25 ring-4 ${tc.ring} flex items-center justify-center text-5xl text-white font-black shadow-2xl`}
               style={{ animation: 'scanPop 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
            {tc.icon}
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-white uppercase tracking-wide leading-none">
              {toast.heading}
            </h2>
            {toast.subtext && (
              <p className="text-white/80 text-sm font-semibold mt-2 break-all max-w-xs">
                {toast.subtext}
              </p>
            )}
          </div>

          {/* Scanning loading bar or "next scan" hint */}
          {scanLoading ? (
            <div className="flex items-center gap-2 text-white/70 text-xs font-bold tracking-widest uppercase">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Verifying…
            </div>
          ) : (
            <p className="text-white/60 text-[11px] font-bold tracking-[0.2em] uppercase animate-pulse">
              Ready for next scan
            </p>
          )}

          {/* Tap-anywhere hint */}
          <button
            onClick={() => { setToastVisible(false); setTimeout(() => setToast(null), 300); }}
            className="absolute bottom-8 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold tracking-wide transition-colors cursor-pointer"
          >
            Tap to dismiss
          </button>
        </div>
      )}

      {/* ─── SCANNER CARD ────────────────────────────────────── */}
      <div className="relative w-full sm:max-w-md bg-[#0f0d2e] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/10">
          <div>
            <h2 className="text-white font-extrabold text-sm sm:text-base">{title}</h2>
            <p className="text-white/40 text-[11px] mt-0.5">
              {scanLoading ? 'Verifying ticket…' : 'Point camera at the QR code'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center text-sm transition-colors cursor-pointer"
          >✕</button>
        </div>

        {/* Scanner region */}
        <div className="relative bg-black">
          <div key={mountKey} id={REGION_ID} className="ixc-scanner-container" />

          {/* Verifying spinner — sits over camera while API call is in-flight */}
          {scanLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-3 z-20">
              <span className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/60 text-xs font-bold tracking-widest uppercase">Verifying…</p>
            </div>
          )}

          {/* Camera starting */}
          {status === 'starting' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-3 z-10">
              <span className="w-9 h-9 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/50 text-xs font-medium">Starting camera…</p>
            </div>
          )}

          {/* Camera error */}
          {status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-4 p-6 text-center z-10">
              <span className="text-5xl">📷</span>
              <p className="text-red-400 text-xs leading-relaxed">{errorMsg}</p>
              <button
                onClick={() => setMountKey((k) => k + 1)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-white/10 bg-[#0b0926]">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              scanLoading
                ? 'bg-yellow-400 animate-ping'
                : status === 'active'
                  ? `${accentDot} animate-pulse`
                  : 'bg-slate-600'
            }`} />
            <span className="text-white/40 text-[10px] font-semibold tracking-wide uppercase">
              {scanLoading
                ? 'Verifying…'
                : status === 'active'
                  ? 'Ready to scan'
                  : status === 'starting'
                    ? 'Loading camera…'
                    : '—'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold transition-colors cursor-pointer"
          >
            Close Scanner
          </button>
        </div>
      </div>

      {/* ─── STYLES ──────────────────────────────────────────── */}
      <style>{`
        @keyframes scanPop {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.15); }
          100% { transform: scale(1);   opacity: 1; }
        }

        .ixc-scanner-container {
          width: 100%;
          min-height: 320px;
        }

        #${REGION_ID} {
          padding: 0 !important;
          border: none !important;
        }
        #${REGION_ID}__scan_region {
          min-height: 280px;
        }
        #${REGION_ID}__scan_region video {
          object-fit: cover !important;
          border-radius: 0 !important;
        }
        #${REGION_ID}__dashboard_section {
          background: #16143a !important;
          padding: 10px 16px !important;
        }
        #${REGION_ID}__dashboard_section_csr button {
          background: #3b82f6 !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 10px !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          cursor: pointer !important;
        }
        #${REGION_ID}__dashboard_section_csr select {
          background: #1e1b4b !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
          padding: 6px 10px !important;
          border-radius: 8px !important;
          font-size: 12px !important;
        }
        #${REGION_ID}__dashboard_section_csr span,
        #${REGION_ID}__dashboard_section_csr a {
          color: rgba(255,255,255,0.6) !important;
          font-size: 11px !important;
        }
        #${REGION_ID}__dashboard_section_swaplink {
          color: #60a5fa !important;
          text-decoration: underline !important;
        }
        #${REGION_ID}__header_message {
          display: none !important;
        }
        #${REGION_ID} img[alt="Info icon"] {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 1047;
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch (_) {}
}
