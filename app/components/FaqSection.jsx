import React from 'react';
import { faqData } from '../data/constants';

export default function FaqSection() {
  return (
    <section className="w-full max-w-2xl mx-auto px-3 sm:px-6 mt-16 sm:mt-20 mb-8 relative z-10 text-center">
      <span className="text-[10px] font-black text-indigo-650 uppercase tracking-widest block mb-2 select-none">• FAQ</span>
      <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mb-6 sm:mb-8">Frequently Asked Questions</h3>
      <div className="flex flex-col gap-1 text-left bg-slate-50/50 border border-slate-200/40 rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
        {faqData.map((faq, idx) => (
          <details key={idx} className="group border-b border-slate-200 last:border-b-0 py-3.5 sm:py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-display font-extrabold text-slate-800 text-xs sm:text-sm md:text-base select-none outline-none list-none [&::-webkit-details-marker]:hidden">
              <span className="pr-2">{faq.q}</span>
              <span className="relative flex-shrink-0 ml-2 sm:ml-4 w-3.5 h-3.5 flex items-center justify-center">
                <span className="absolute w-3.5 h-0.5 bg-slate-800 rounded-full transition-transform duration-200 group-open:rotate-90" />
                <span className="absolute w-3.5 h-0.5 bg-slate-800 rounded-full rotate-90 transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="text-slate-500 text-xs md:text-sm font-medium mt-2.5 sm:mt-3 leading-relaxed pr-2 sm:pr-6">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
