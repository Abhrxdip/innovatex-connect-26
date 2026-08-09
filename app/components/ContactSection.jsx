'use client';

import React from 'react';

export default function ContactSection() {
  return (
    <section className="w-full max-w-5xl mx-auto px-3 sm:px-6 mt-12 sm:mt-16 mb-16 sm:mb-24 relative z-10">
      <div className="bg-[#0C1235]/60 border border-white/5 rounded-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col lg:flex-row items-stretch text-white">

        <div className="w-full lg:w-[60%] p-4 sm:p-6 md:p-10 flex flex-col justify-between gap-6 sm:gap-8 border-b lg:border-b-0 lg:border-r border-white/5">
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-blackhan text-white tracking-tight leading-none mb-3 sm:mb-4 select-none">Get in touch</h3>
            <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed">If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 p-3 bg-[#090D2B]/50 rounded-2xl border border-white/5 min-w-0 transition-all duration-300 hover:border-[#EE4B15]/40 hover:-translate-y-0.5 hover:shadow-md">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EE4B15]/10 flex items-center justify-center text-[#EE4B15] flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[8.5px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider">Email</p>
                <a href="mailto:connect@innovatex.community" className="text-[10px] sm:text-[11px] font-bold text-slate-200 block truncate hover:text-[#EE4B15] transition-colors">connect@innovatex.community</a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#090D2B]/50 rounded-2xl border border-white/5 min-w-0 transition-all duration-300 hover:border-[#EE4B15]/40 hover:-translate-y-0.5 hover:shadow-md">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EE4B15]/10 flex items-center justify-center text-[#EE4B15] flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.017 12.017 0 01-4.5-4.5c-.155-.44.01-1.047.386-1.328l1.293-.97c.362-.271.527-.734.417-1.173L9.663 3.24c-.125-.501-.575-.852-1.091-.852H4.86c-1.245 0-2.25 1.005-2.25 2.25v1.356z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[8.5px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider">Phone</p>
                <a href="tel:+919995786350" className="text-[10px] sm:text-[11px] font-bold text-slate-200 block truncate hover:text-[#EE4B15] transition-colors">+91 99957 86350</a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#090D2B]/50 rounded-2xl border border-white/5 min-w-0 transition-all duration-300 hover:border-[#EE4B15]/40 hover:-translate-y-0.5 hover:shadow-md">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EE4B15]/10 flex items-center justify-center text-[#EE4B15] flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[8.5px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider">Instagram</p>
                <a href="https://instagram.com/innovatex.community" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-[11px] font-bold text-slate-200 block truncate hover:text-[#EE4B15] transition-colors">@innovatex.community</a>
              </div>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Location</span>
            <div className="w-full rounded-2xl overflow-hidden border border-white/5 shadow-sm relative h-[180px] sm:h-[200px] hover:border-[#EE4B15]/30 transition-colors duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.404764555675!2d88.37576757601681!3d22.67597127941829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89c46c06efd83%3A0x36a29a26ce825e99!2sJIS%20UNIVERSITY!5e0!3m2!1sen!2sin!4v1785765848926!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] p-4 sm:p-6 md:p-10 flex flex-col justify-between bg-[#090D2B]/30 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message! Our team will respond shortly.'); }} className="flex flex-col gap-3.5 sm:gap-4">
            <div>
              <label htmlFor="name" className="block text-[9.5px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Name</label>
              <input type="text" id="name" required placeholder="Your Name" className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/10 bg-[#090D2B]/80 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#EE4B15] transition-all placeholder:text-slate-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-[9.5px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Email</label>
              <input type="email" id="email" required placeholder="Email Address" className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/10 bg-[#090D2B]/80 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#EE4B15] transition-all placeholder:text-slate-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[9.5px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Phone</label>
              <input type="tel" id="phone" required placeholder="Phone Number" className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/10 bg-[#090D2B]/80 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#EE4B15] transition-all placeholder:text-slate-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-[9.5px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Message</label>
              <textarea id="message" required rows={3} placeholder="Message" className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-white/10 bg-[#090D2B]/80 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#EE4B15] transition-all placeholder:text-slate-500 resize-none" />
            </div>
            <button type="submit" className="w-full mt-2 py-3 sm:py-3.5 bg-gradient-to-r from-[#EE4B15] to-[#EE4B15]/80 hover:from-[#EE4B15]/95 hover:to-[#EE4B15]/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_12px_rgba(238,75,21,0.2)] hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer">
              <span>Submit Message</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
