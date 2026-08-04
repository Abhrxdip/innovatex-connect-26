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
  const [feedback, setFeedback] = useState(null);
  const scannerRef = useRef(null);
  const cooldownRef = useRef(false);

  const accentBorder = accentColor === 'amber' ? 'border-amber-400' : 'border-blue-400';

  // ── Full cleanup ─────────────────────────────────────────
  const cleanup = useCallback(() => {
    const s = scannerRef.current;
    scannerRef.current = null;
    if (s) {
      try { s.clear(); } catch (_) {}
    }
    // Force stop all video tracks in case library missed them
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

  // ── Start scanner using Html5QrcodeScanner (auto-managed) ──
  const startScanner = useCallback(async () => {
    cleanup();
    setStatus('starting');
    setErrorMsg('');
    cooldownRef.current = false;

    // Let React paint the fresh div
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
        false // verbose = false
      );

      scannerRef.current = scanner;

      scanner.render(
        (decodedText) => {
          // Success callback
          if (cooldownRef.current) return;
          cooldownRef.current = true;

          let ticketNumber = decodedText.trim();
          try {
            const parsed = JSON.parse(decodedText);
            if (parsed?.ticketNumber) ticketNumber = parsed.ticketNumber;
          } catch (_) {}

          playBeep();
          onScanSuccess(ticketNumber);

          // Allow next scan after 2s
          setTimeout(() => { cooldownRef.current = false; }, 2000);
        },
        (errorMessage) => {
          // Per-frame decode error — completely normal, ignore
        }
      );

      setStatus('active');
    } catch (err) {
      setStatus('error');
      setErrorMsg(`Scanner init failed: ${err?.message || 'Unknown error'}`);
    }
  }, [cleanup, onScanSuccess]);

  // ── Watch results for visual feedback overlay ─────────────
  useEffect(() => {
    if (scanResult) {
      if (scanResult.status === 'success') {
        const name = scanResult.data?.ticket?.userId?.name || 'Attendee';
        const num = scanResult.data?.ticket?.ticketNumber || '';
        setFeedback({
          status: 'success',
          title: accentColor === 'amber' ? 'Food Served' : 'Check-In Success',
          message: `${name} (${num})`,
        });
      } else if (scanResult.status === 'duplicate') {
        setFeedback({
          status: 'duplicate',
          title: accentColor === 'amber' ? 'Already Claimed' : 'Already Checked In',
          message: scanResult.ticketNumber || '',
        });
      }

      const timer = setTimeout(() => {
        setFeedback(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [scanResult, accentColor]);

  useEffect(() => {
    if (scanError) {
      setFeedback({
        status: 'error',
        title: 'Scan Failed',
        message: scanError,
      });

      const timer = setTimeout(() => {
        setFeedback(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanError]);

  useEffect(() => {
    if (scanLoading) {
      setFeedback(null);
    }
  }, [scanLoading]);

  // ── Open/close lifecycle ──────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setMountKey((k) => k + 1);
    } else {
      cleanup();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // After fresh DOM is mounted, start scanner
  useEffect(() => {
    if (!isOpen || mountKey === 0) return;
    const t = setTimeout(startScanner, 100);
    return () => clearTimeout(t);
  }, [mountKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => () => cleanup(), [cleanup]);

  const handleClose = useCallback(() => {
    cleanup();
    onClose();
  }, [cleanup, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="relative w-full sm:max-w-md bg-[#0f0d2e] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/10">
          <div>
            <h2 className="text-white font-extrabold text-sm sm:text-base">{title}</h2>
            <p className="text-white/40 text-[11px] mt-0.5">Point camera at the QR code</p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center text-sm transition-colors cursor-pointer"
          >✕</button>
        </div>

        {/* Scanner Region — html5-qrcode renders its own UI here */}
        <div className="relative bg-black">
          <div key={mountKey} id={REGION_ID} className="ixc-scanner-container" />

          {/* Feedback Overlay */}
          {feedback && (
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 transition-all duration-300 ${
              feedback.status === 'success' ? 'bg-emerald-600/95 text-white' :
              feedback.status === 'duplicate' ? 'bg-amber-600/95 text-white' :
              'bg-rose-600/95 text-white'
            }`}>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-4xl mb-4 font-black shadow-lg animate-bounce">
                {feedback.status === 'success' ? '✓' : feedback.status === 'duplicate' ? '!' : '✕'}
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider">{feedback.title}</h3>
              <p className="text-sm font-semibold mt-2 opacity-90 max-w-[280px] break-all">{feedback.message}</p>
              <p className="text-[10px] mt-4 font-bold tracking-widest uppercase opacity-60 animate-pulse">Ready for next scan</p>
            </div>
          )}

          {status === 'starting' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-3 z-10">
              <span className="w-9 h-9 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/50 text-xs font-medium">Starting camera…</p>
            </div>
          )}

          {status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-4 p-6 text-center z-10">
              <span className="text-4xl">📷</span>
              <p className="text-red-400 text-xs leading-relaxed">{errorMsg}</p>
              <button
                onClick={() => setMountKey((k) => k + 1)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-white/10 bg-[#0b0926]">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-white/40 text-[10px]">
              {status === 'active' ? 'Ready to scan' : status === 'starting' ? 'Loading…' : '—'}
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

      {/* Style overrides for the html5-qrcode built-in UI */}
      <style>{`
        .ixc-scanner-container {
          width: 100%;
          min-height: 320px;
        }
        /* Style the library's built-in select/button elements */
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
