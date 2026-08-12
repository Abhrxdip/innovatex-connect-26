/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Icons } from './Icons';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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
      <nav className="flex items-center justify-between px-2.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white shadow-lg bg-[#0C1235]/85 backdrop-blur-md border border-white/10 max-w-full">

        {/* Navigation Links */}
        <div className="flex items-center space-x-0.5 sm:space-x-2">
          <Link href="/#home" aria-label="Home" className="group flex items-center px-2 sm:px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-all">
            <Icons.Home />
            <span className="hidden sm:inline">Home</span>
          </Link>
          { /*//TODO: Change this*/}
          <Link href="/#comingsoon" aria-label="Speakers" className="group flex items-center px-2 sm:px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-all">
            <Icons.Speakers />
            <span className="hidden sm:inline">Speakers</span>
          </Link>

          <Link href="/#comingsoon" aria-label="Agenda" className="group flex items-center px-2 sm:px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-all">
            <Icons.Agenda />
            <span className="hidden sm:inline">Agenda</span>
          </Link>

          {/* <Link href="/leaderboard" aria-label="Leaderboard" className="group flex items-center px-2 sm:px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-all">
            <Icons.Sparkle />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link> */}

          <Link
            href="/teams"
            aria-label="Teams"
            className={`group flex items-center px-2 sm:px-3 py-1.5 rounded-full transition-all ${pathname === '/teams'
              ? 'text-white bg-white/10'
              : 'hover:text-white hover:bg-white/10'
              }`}
          >
            <svg className="w-4 h-4 mr-0 sm:mr-1.5 opacity-85 transition-colors group-hover:text-[#EE4B15]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">Teams</span>
          </Link>
        </div>

        {/* Separator Bar */}
        <div className="w-px h-4 sm:h-5 bg-white/20 mx-1.5 sm:mx-2.5 shrink-0" />

        {/* Register Button */}
        <div className="relative shrink-0">
          <Link
            href={user ? (user.role === 'Admin' ? '/admin' : user.role === 'Community Partner' ? '/partner' : '/dashboard') : '/register'}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-[#EE4B15] text-white font-bold text-xs sm:text-sm hover:bg-[#EE4B15]/90 hover:shadow-[0_4px_20px_rgba(238,75,21,0.4)] transition-all duration-300 shadow-md cursor-pointer group"
          >
            <span>{user ? 'Dashboard' : 'Register'}</span>
            <span className="text-sm group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </Link>
        </div>

      </nav>
    </header>
  );
}
