import React from 'react';
import { Icons } from './Icons';

export default function Navbar() {
  return (
    <header className="w-full flex justify-center pt-8 px-4 z-50">
      <nav className="glass-nav flex items-center px-2 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-slate-600">
        <a href="#home" className="group flex items-center px-3.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.Home />
          <span className="hidden sm:inline">Home</span>
        </a>
        <a href="#speakers" className="group flex items-center px-3.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.Speakers />
          <span className="hidden sm:inline">Speakers</span>
        </a>
        <a href="#agenda" className="group flex items-center px-3.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.Agenda />
          <span className="hidden sm:inline">Agenda</span>
        </a>
        <a href="#about" className="group flex items-center px-3.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.About />
          <span className="hidden sm:inline">About</span>
        </a>
        <a href="#ticket" className="group flex items-center px-3.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.Ticket />
          <span className="hidden sm:inline">Ticket</span>
        </a>
      </nav>
    </header>
  );
}
