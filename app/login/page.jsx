'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Icons } from '../components/Icons';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
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
      if (res.redirected) {
        window.location.href = res.url;
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

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#090D2B] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EE4B15]/30 focus:border-[#EE4B15]/60 transition-all placeholder:text-slate-500";

  return (
    <div className="relative min-h-screen bg-[#090D2B] flex flex-col overflow-x-hidden font-display text-white">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-28 sm:pt-32 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-[#0C1235] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/8 relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-[#EE4B15]/40" />

            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <p className="text-white font-bold text-sm tracking-wide mb-1">InnovateX Connect&apos;26</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Sign In
              </h1>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#EE4B15] transition-colors"
                  >
                    {showPassword ? (
                      <Icons.EyeOff className="w-5 h-5" />
                    ) : (
                      <Icons.Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white font-bold text-sm shadow-lg shadow-[#EE4B15]/15 hover:shadow-[#EE4B15]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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

            {/* Divider */}
            <div className="relative w-full flex items-center my-5">
              <div className="flex-1 h-px bg-white/8" />
              <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Google Sign-in */}
            <a
              href="/api/auth/google"
              className="w-full py-3 px-6 mb-5 rounded-xl bg-[#090D2B] border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-200 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </a>

            {/* Register link */}
            <div className="text-center mt-4">
              <p className="text-slate-400 text-xs">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-[#EE4B15] hover:text-[#EE4B15]/80 font-bold transition-colors"
                >
                  Register Now
                </Link>

              </p>
              <div className="mt-4 text-center text-sm text-slate-400">
                Can&apos;t remember your password?{' '}
                <Link
                  href="/login/forget-password"
                  className="font-semibold text-indigo-600 hover:text-red-500 hover:underline transition-all duration-200 dark:text-red-400 dark:hover:text-red-300"
                >
                  Reset it here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
