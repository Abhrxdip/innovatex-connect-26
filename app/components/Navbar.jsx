'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icons } from './Icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user profile to check auth state
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/profile');
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full flex justify-center pt-6 px-4 z-50 fixed top-0 left-0 right-0">
      <nav className="glass-nav flex items-center justify-between px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-700 shadow-lg border border-white/60">
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Link href="/" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 hover:bg-slate-100/60 transition-all">
            <Icons.Home />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          <a href="#speakers" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 hover:bg-slate-100/60 transition-all">
            <Icons.Speakers />
            <span className="hidden sm:inline">Speakers</span>
          </a>

          <a href="#agenda" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 hover:bg-slate-100/60 transition-all">
            <Icons.Agenda />
            <span className="hidden sm:inline">Agenda</span>
          </a>

          <Link href="/leaderboard" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 hover:bg-slate-100/60 transition-all">
            <Icons.Sparkle />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>

          <a href="#ticket" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-600 hover:bg-slate-100/60 transition-all">
            <Icons.Ticket />
            <span className="hidden sm:inline">Ticket</span>
          </a>
        </div>

        {/* Separator Dot */}
        <div className="w-1 h-1 rounded-full bg-slate-300 mx-2" />

        {/* User Account / Auth Dropdown Trigger Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1E1B4B] text-white hover:bg-[#2E6CFF] transition-all duration-300 shadow-md cursor-pointer group"
            aria-label="Account Menu"
          >
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Icons.User className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold hidden xs:inline pr-1">Account</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Cool Glassmorphism Auth Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-slate-200/80 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Account Access</p>
                <p className="text-xs font-bold text-slate-800">InnovateX Connect '26</p>
              </div>

              <div className="space-y-1">
                {loading ? (
                  <div className="px-3 py-2 text-xs text-slate-500 font-medium text-center">Loading...</div>
                ) : user ? (
                  <>
                    <Link
                      href={
                        user.role === 'Admin' ? '/admin' :
                        user.role === 'Community Partner' ? '/partner' :
                        '/dashboard'
                      }
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
                    >
                      <Icons.Ticket className="w-3.5 h-3.5 text-slate-500" />
                      <span>My Dashboard</span>
                    </Link>

                    <div className="h-px bg-slate-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                    >
                      <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                        <Icons.User className="w-3.5 h-3.5" />
                      </div>
                      <span>Sign In</span>
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#1E1B4B] hover:bg-[#2E6CFF] transition-all shadow-sm"
                    >
                      <div className="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center">
                        <Icons.UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <span>Create Free Account</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

      </nav>
    </header>
  );
}
