'use client';

import { useEffect } from 'react';

export default function TicketDetailsModal({ isOpen, onClose, ticket, onApprove, onReject, actionLoading }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !ticket) return null;

  const user = ticket.userId;

  const statusColor = (s) =>
    s === 'Approved' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20' :
    s === 'Pending' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20' :
    'bg-red-500/15 text-red-300 border border-red-500/20';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0C1235] border border-white/10 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-[#EE4B15]/40" />

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Top section: Avatar and basic info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shrink-0">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white">{user?.name}</h2>
                <p className="text-slate-400 text-sm mt-0.5">{user?.email}</p>
                <div className="mt-2 inline-flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold">
                    {ticket.attendeeType}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity & Org */}
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Organization</p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-sm text-slate-200 font-medium">
                    {user?.college || user?.company || 'N/A'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Role: {user?.role}</p>
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Ticket Details</p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-sm font-mono text-[#EE4B15] font-bold">{ticket.ticketNumber}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Applied on: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact & Socials */}
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Contact</p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-sm text-slate-200 font-medium">
                    {user?.phone ? user.phone : 'No Phone Provided'}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Social Profiles</p>
                <div className="flex gap-2">
                  <a 
                    href={user?.linkedin || '#'} 
                    target={user?.linkedin ? "_blank" : undefined}
                    rel={user?.linkedin ? "noopener noreferrer" : undefined}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium
                      ${user?.linkedin 
                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20' 
                        : 'bg-white/5 border-white/5 text-slate-600 cursor-not-allowed pointer-events-none'}`}
                  >
                    LinkedIn
                  </a>
                  <a 
                    href={user?.github || '#'} 
                    target={user?.github ? "_blank" : undefined}
                    rel={user?.github ? "noopener noreferrer" : undefined}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium
                      ${user?.github 
                        ? 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/80' 
                        : 'bg-white/5 border-white/5 text-slate-600 cursor-not-allowed pointer-events-none'}`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons for Pending */}
          {ticket.status === 'Pending' && (
            <div className="pt-6 border-t border-white/10 flex gap-3">
              <button 
                onClick={() => { onApprove(ticket._id); onClose(); }} 
                disabled={actionLoading === ticket._id}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                Approve & Email QR
              </button>
              <button 
                onClick={() => { onReject(ticket._id); onClose(); }} 
                disabled={actionLoading === ticket._id}
                className="py-3 px-6 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 font-bold text-sm transition-all cursor-pointer disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
