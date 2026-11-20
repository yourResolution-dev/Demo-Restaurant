import React, { useState, useEffect } from 'react';
import { X, Sparkles, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ReSolution! My name is ${form.name || 'a visitor'} and I want a website like "The Olive Table" for ${form.businessName || 'my business'}.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#081510]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#fbf9f5] rounded-3xl overflow-hidden shadow-2xl border border-[#dfb85c]/40 z-10 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#081510] text-[#f7f3ea] border-b border-[#dfb85c]/30 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#a0b0a6] hover:text-[#dfb85c] hover:bg-[#10261d] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#dfb85c] to-[#cfa138] text-[#081510] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#dfb85c] font-semibold block mb-1">
            Built by ReSolution
          </span>
          <h3 className="tot-font-serif text-2xl font-bold text-[#f7f3ea]">
            Want a Website Like This?
          </h3>
          <p className="text-xs text-[#a0b0a6] mt-1 font-light max-w-sm mx-auto">
            Get a high-converting, bespoke digital flagship designed specifically for your culinary establishment or luxury brand.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="tot-font-serif text-xl font-bold text-[#081510]">
                Inquiry Received!
              </h4>
              <p className="text-xs text-[#58685e] max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-[#081510]">{form.name}</strong>. The ReSolution team will connect with you on WhatsApp / Phone within 2 hours.
              </p>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-600 text-white font-semibold text-xs shadow-md hover:bg-green-700 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Connect on WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#081510] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ranajit Gupta"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#ffffff] text-xs text-[#081510] tot-input-focus"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081510] mb-1">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Olive Bistro"
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#ffffff] text-xs text-[#081510] tot-input-focus"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#081510] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 93320 12109"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#ffffff] text-xs text-[#081510] tot-input-focus"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081510] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. hello@mybrand.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#ffffff] text-xs text-[#081510] tot-input-focus"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#081510] mb-1">
                  Tell us about your project
                </label>
                <textarea
                  rows={2}
                  placeholder="Website redesign, online table reservations, tasting menu showcase..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#ffffff] text-xs text-[#081510] tot-input-focus resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 rounded-full tot-btn-gold text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Proposal</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#10261d] border border-[#dfb85c]/40 text-[#dfb85c] hover:bg-[#dfb85c] hover:text-[#081510] transition-colors text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
