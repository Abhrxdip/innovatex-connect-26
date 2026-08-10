'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import { Icons } from '../components/Icons';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState('Student');
  const [formData, setFormData] = useState(() => ({
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    password: '',
    college: '',
    company: '',
    phone: '',
    github: '',
    linkedin: '',
    otp: '',
    referralCode: searchParams.get('ref') || '',
    provider: searchParams.get('provider') || 'manual',
    foodPreference: '',
    bringingLaptop: false,
    website: '',
    avatar: '',
  }));
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
    if (otpMessage) setOtpMessage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, avatar: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError('Please enter your email first.');
      return;
    }

    setOtpLoading(true);
    setError('');
    setOtpMessage('');

    try {
      const res = await fetch('/api/auth/otp/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Unable to send OTP. Please try again.');
      }

      setOtpMessage(data.message || 'OTP sent successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setOtpLoading(false);
    }
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
        body: JSON.stringify({
          ...formData,
          role,
          auth_provider: formData.provider,
        }),
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

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#090D2B] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EE4B15]/30 focus:border-[#EE4B15]/60 transition-all placeholder:text-slate-500";

  return (
    <div className="w-full max-w-xl">
      <div className="bg-[#0C1235] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/8 relative overflow-hidden text-white">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-[#EE4B15]/40" />

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <p className="text-white font-bold text-sm tracking-wide mb-1">InnovateX Connect&apos;26</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Register  Account
          </h1>
        </div>

        {/* Role Selector */}
        <div className="mb-5">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">
            Select Your Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1.5 bg-[#090D2B] rounded-2xl border border-white/8">
            {['Student', 'Working Professional', 'Community Partner' /*, 'Admin'*/].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2.5 px-1 text-[11px] sm:text-xs font-bold rounded-xl transition-all duration-300 text-center cursor-pointer ${role === r
                  ? 'bg-[#EE4B15] text-white shadow-md shadow-[#EE4B15]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {r === 'Working Professional' ? 'Professional' : r}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
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
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpLoading || !formData.email || formData.provider === 'google'}
                className="sm:w-40 px-4 py-2.5 rounded-xl bg-[#1E1B4B] hover:bg-brand-neon text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {otpLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
            {otpMessage && (
              <p className="mt-2 text-xs font-medium text-emerald-700">
                {otpMessage}
              </p>
            )}
          </div>

          {/* Password */}
          {formData.provider !== 'google' && (
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
                  placeholder="At least 6 characters"
                  className={`${inputClass} pr-10`} // Added pr-10 to prevent text from typing under the button
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-[#EE4B15] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // Eye Off SVG
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    // Eye SVG
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {
            formData.provider !== 'google' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  required
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="6 digit code sent to your email"
                  inputMode="numeric"
                  maxLength={6}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            )
          }

          {
            role === 'Student' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">College / University</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. JIS University"
                  className={inputClass}
                />
              </div>
            )
          }

          {/* Company (Professional) */}
          {
            role === 'Working Professional' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Company / Organization</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google / Microsoft"
                  className={inputClass}
                />
              </div>
            )
          }



          {/* Admin info */}
          {
            role === 'Admin' && (
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs">
                🛡️ <span className="font-bold">Organizer Account:</span> Full admin access to approve tickets, analytics, and QR gate scanners.
              </div>
            )
          }

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              LinkedIn Profile <span className="text-[#EE4B15]">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </div>
              <input
                type="url"
                name="linkedin"
                required
                value={formData.linkedin}
                onChange={handleChange}
                pattern="https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+\/?"
                placeholder="https://linkedin.com/in/yourprofile"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          {/* GitHub (Hidden for Community Partners) */}
          {role !== 'Community Partner' && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                GitHub Profile <span className="text-[#EE4B15]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </div>
                <input
                  type="url"
                  name="github"
                  required
                  value={formData.github}
                  onChange={handleChange}
                  pattern="https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?"
                  placeholder="https://github.com/yourusername"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          )}

          {/* Community Partner Website and Logo (Optional) */}
          {role === 'Community Partner' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Community Partner Website (Optional)
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                  </div>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourcommunity.com"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* 
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Community Logo (Optional)
                </label>
                <div className="relative flex items-center justify-between p-2 rounded-xl bg-[#090D2B] border border-white/10 hover:border-white/20 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center gap-3 px-2 pointer-events-none">
                    {formData.avatar ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-[#EE4B15]/50 flex-shrink-0">
                        <img src={formData.avatar} alt="Logo preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-300">
                      {formData.avatar ? 'Image Selected' : 'Choose Logo Image'}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#EE4B15]/10 text-[#EE4B15] text-[10px] font-bold uppercase tracking-widest pointer-events-none">
                    Upload
                  </span>
                </div>
              </div>
*/}
            </div>
          )}

          {/* Referral Code */}
          {
            formData.referralCode && role !== 'Admin' && (
              <div>
                <label className="block text-[10px] font-bold text-[#EE4B15] uppercase tracking-widest mb-1.5">
                  Referral Code Applied ✨
                </label>
                <input
                  type="text"
                  name="referralCode"
                  readOnly
                  value={formData.referralCode}
                  className="w-full px-4 py-3 rounded-xl bg-[#EE4B15]/10 border border-[#EE4B15]/20 text-[#EE4B15] font-mono text-sm font-bold"
                />
              </div>
            )
          }

          {/* Food and Laptop (Student & Professional) */}
          {
            (role === 'Student' || role === 'Working Professional') && (
              <div className="space-y-2 mt-2 mb-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#090D2B] border border-white/10 hover:border-white/20 transition-all">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Food Preference <span className="text-[#EE4B15]">*</span></span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="foodPreference"
                        value="Veg"
                        checked={formData.foodPreference === 'Veg'}
                        onChange={handleChange}
                        required
                        className="w-3.5 h-3.5 border-white/20 text-[#EE4B15] focus:ring-[#EE4B15] focus:ring-offset-0 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-bold text-slate-300">Veg</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="foodPreference"
                        value="Non-Veg"
                        checked={formData.foodPreference === 'Non-Veg'}
                        onChange={handleChange}
                        required
                        className="w-3.5 h-3.5 border-white/20 text-[#EE4B15] focus:ring-[#EE4B15] focus:ring-offset-0 bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-bold text-slate-300">Non-Veg</span>
                    </label>
                  </div>
                </div>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#090D2B] border border-white/10 hover:border-white/20 transition-all cursor-pointer">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bringing Laptop (Mandatory) <span className="text-[#EE4B15]">*</span></span>
                  <input
                    type="checkbox"
                    name="bringingLaptop"
                    required
                    checked={formData.bringingLaptop}
                    onChange={(e) => setFormData(prev => ({ ...prev, bringingLaptop: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/20 text-[#EE4B15] focus:ring-[#EE4B15] focus:ring-offset-0 bg-transparent cursor-pointer"
                  />
                </label>
              </div>
            )
          }

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white font-bold text-sm shadow-lg shadow-[#EE4B15]/15 hover:shadow-[#EE4B15]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
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
        </form >

        {/* Divider */}
        < div className="relative w-full flex items-center my-5" >
          <div className="flex-1 h-px bg-white/8" />
          <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-white/8" />
        </div >

        {/* Google Sign-in */}
        {
          formData.provider !== 'google' &&
          (<a
            href={formData.referralCode
              ? `/api/auth/google?ref=${encodeURIComponent(formData.referralCode)}`
              : '/api/auth/google'}
            className="w-full py-3 px-6 mb-5 rounded-xl bg-[#090D2B] border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-200 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </a>)
        }

        {/* Sign in link */}
        <div className="text-center mt-4">
          <p className="text-slate-400 text-xs">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#EE4B15] hover:text-[#EE4B15]/80 font-bold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div >
    </div >
  );
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-[#090D2B] flex flex-col overflow-x-hidden font-display text-white">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <Navbar />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-28 sm:pt-32 pb-12">
        <Suspense fallback={<div className="text-center text-slate-400 text-sm">Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </main>
    </div>
  );
}
