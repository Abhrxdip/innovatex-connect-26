'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { Icons } from '../../components/Icons';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      const userRole = data.data?.user?.role;
      if (userRole === 'Admin') {
        router.push('/admin');
      } else if (userRole === 'Community Partner') {
        router.push('/partner');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">
      {/* Soft Radial Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />

      <Navbar />

      {/* Main Container with generous top padding (pt-32 sm:pt-36) so navbar never overlaps */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-32 sm:pt-36 pb-16">
        <div className="w-full max-w-md">
          {/* Main Glassmorphism Ticket Card */}
          <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600" />

            <div className="text-center mb-6 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-3">
                <Icons.Ticket className="w-3.5 h-3.5" />
                InnovateX Account
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Log in to access your event dashboard & QR ticket
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="enter your email "
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-sm shadow-lg shadow-indigo-900/20 hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <Icons.ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="relative w-full flex items-center justify-between my-6 select-none opacity-40">
              <span className="text-slate-400 font-mono text-xs font-bold">+</span>
              <div className="flex-1 h-px border-t border-dashed border-slate-400 mx-2" />
              <span className="text-slate-400 font-mono text-xs font-bold">+</span>
            </div>

            <div className="text-center">
              <p className="text-slate-600 text-xs">
                Don't have an account yet?{' '}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-indigo-700 font-bold transition-colors"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
