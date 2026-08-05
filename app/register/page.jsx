'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Icons } from '../components/Icons';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState('Student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    company: '',
    phone: '',
    referralCode: '',
    provider: 'manual',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const refParam = searchParams.get('ref');
    const nameParam = searchParams.get('name');
    const emailParam = searchParams.get('email');
    const providerParam = searchParams.get('provider');

    setFormData((prev) => ({
      ...prev,
      ...(refParam && { referralCode: refParam }),
      ...(nameParam && { name: nameParam }),
      ...(emailParam && { email: emailParam }),
      ...(providerParam && { provider: providerParam }),
    }));
  }, [searchParams]);

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

      const endpoint = formData.provider === 'google' ? '/api/user/profile/update' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      if (role === 'Admin') {
        router.push('/admin');
      } else if (role === 'Community Partner') {
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
    <div className="w-full max-w-xl">
      <div className="glass-card bg-white/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600" />

        <div className="text-center mb-6 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
            <Icons.Ticket className="w-3.5 h-3.5" />
            InnovateX Connect '26
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-600 text-xs mt-1">
            Join 150+ developer attendees, partners & organizers in Kolkata
          </p>
        </div>

        {/* Role Selector Grid */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
            Select Your Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60">
            {['Student', 'Working Professional', 'Community Partner' /*, 'Admin'*/].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all duration-300 text-center cursor-pointer ${role === r
                  ? 'bg-[#1E1B4B] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
              >
                {r === 'Working Professional' ? 'Professional' : r}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={formData.provider === 'google'}
              placeholder="Enter Your Email"
              className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${formData.provider === 'google'
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed opacity-70'
                : 'bg-slate-50/80 text-slate-900 focus:bg-white'
                }`}
            />
          </div>

          {formData.provider !== 'google' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>
          )}

          {role === 'Student' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                College / University Name
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="e.g. JIS University / Heritage Institute"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>
          )}

          {role === 'Working Professional' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Google / Microsoft / Startup"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>
          )}

          {role === 'Admin' && (
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs">
              🛡️ <span className="font-bold">Organizer Account:</span> You will gain full admin access to approve tickets, view event analytics, and run QR gate scanners.
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          {formData.referralCode && role !== 'Admin' && (
            <div>
              <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Referral Code Applied ✨
              </label>
              <input
                type="text"
                name="referralCode"
                readOnly
                value={formData.referralCode}
                className="w-full px-3.5 py-2.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 font-mono text-sm font-bold"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#1E1B4B] hover:bg-[#2E6CFF] text-white font-bold text-sm shadow-lg shadow-indigo-900/20 hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Register as {role}
                <Icons.ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative w-full flex items-center justify-between my-5 select-none opacity-40">
          <span className="text-slate-400 font-mono text-xs font-bold">+</span>
          <div className="flex-1 h-px border-t border-dashed border-slate-400 mx-2" />
          <span className="text-slate-400 font-mono text-xs font-bold">+</span>
        </div>
        {formData.provider !== 'google' &&
          (<a
            href="/api/auth/google"
            className="w-full py-3 px-6 mb-5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-sm transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </a>)}

        <div className="text-center mt-5">
          <p className="text-slate-600 text-xs">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:text-indigo-700 font-bold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />

      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-32 sm:pt-36 pb-16">
        <Suspense fallback={<div className="text-center text-slate-500 text-sm">Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </main>
    </div>
  );
}
