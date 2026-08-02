import React from 'react';
import { Icons } from './Icons';

export default function Navbar() {
  return (
    <header className="w-full flex justify-center pt-8 px-4 z-50">
      <nav className="glass-nav flex items-center px-4 py-2 rounded-full text-sm font-semibold text-slate-600">
        <a href="#home" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.Home />
          <span>Home</span>
        </a>
        <a href="#speakers" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.Speakers />
          <span>Speakers</span>
        </a>
        <a href="#agenda" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.Agenda />
          <span>Agenda</span>
        </a>
        <a href="#about" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.About />
          <span>About</span>
        </a>
        <a href="#ticket" className="group flex items-center px-3 py-1.5 rounded-full hover:text-indigo-650 transition-colors">
          <Icons.Ticket />
          <span>Ticket</span>
        </a>
      </nav>
    </header>
  );
}
