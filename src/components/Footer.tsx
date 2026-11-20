import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(true);
      return;
    }
    setError(false);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#050d0a] text-[#f7f3ea] border-t border-[#dfb85c]/20 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative top gold gradient line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#dfb85c]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#dfb85c]/15">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#dfb85c] flex items-center justify-center bg-[#10261d] shadow-[0_0_12px_rgba(223,184,92,0.2)]">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#dfb85c]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.5 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <div>
                <span className="tot-font-serif text-xl font-bold tracking-wider text-[#f7f3ea] block leading-tight">
                  THE OLIVE TABLE
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#dfb85c] uppercase font-light block">
                  Est. 2014 • Fine Dining
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#a0b0a6] leading-relaxed font-light">
              Where culinary mastery unfolds with every bite. Experience an authentic celebration of Mediterranean terroir, estate cold-pressed olive oils, and candlelit ambiance.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#10261d] border border-[#dfb85c]/30 text-[#dfb85c] hover:bg-[#dfb85c] hover:text-[#081510] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#10261d] border border-[#dfb85c]/30 text-[#dfb85c] hover:bg-[#dfb85c] hover:text-[#081510] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.tripadvisor}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#10261d] border border-[#dfb85c]/30 text-[#dfb85c] hover:bg-[#dfb85c] hover:text-[#081510] flex items-center justify-center transition-all cursor-pointer"
                aria-label="TripAdvisor"
              >
                <span className="font-serif font-bold text-xs">TA</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#dfb85c] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#eadecc]/80 font-light">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#dfb85c] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#dfb85c] transition-colors cursor-pointer"
                >
                  About Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#dfb85c] transition-colors cursor-pointer"
                >
                  Signature Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chef')}
                  className="hover:text-[#dfb85c] transition-colors cursor-pointer"
                >
                  Executive Chef
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#dfb85c] transition-colors cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#dfb85c] transition-colors cursor-pointer"
                >
                  Guest Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="text-[#dfb85c] font-semibold hover:underline cursor-pointer"
                >
                  Book a Table
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Dining (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#dfb85c] font-bold">
              Hours & Service
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#a0b0a6]">
              <div>
                <span className="text-[#f7f3ea] font-medium block">Lunch Service</span>
                <span>{RESTAURANT_INFO.hours.lunch}</span>
              </div>
              <div>
                <span className="text-[#f7f3ea] font-medium block">Dinner Service</span>
                <span>{RESTAURANT_INFO.hours.dinner}</span>
              </div>
              <div>
                <span className="text-[#f7f3ea] font-medium block">Weekend Brunch</span>
                <span>{RESTAURANT_INFO.hours.weekendBrunch}</span>
              </div>
              <div className="pt-1 text-[11px] text-[#dfb85c]">
                <span>Smart casual dress code • Valet parking</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter / Guest Register (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#dfb85c] font-bold">
              Guest Register
            </h4>
            <p className="text-xs text-[#a0b0a6] leading-relaxed">
              Subscribe for private invitations to seasonal tasting menus, white truffle arrivals, and cellar uncorkings.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0b0a6]" />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`w-full pl-9 pr-10 py-2.5 rounded-full bg-[#10261d] border text-xs text-[#f7f3ea] placeholder-[#a0b0a6]/60 focus:outline-none transition-colors ${
                    error ? 'border-red-500' : 'border-[#dfb85c]/35 focus:border-[#dfb85c]'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#dfb85c] text-[#081510] flex items-center justify-center hover:bg-[#cfa138] transition-colors cursor-pointer shadow-sm"
                  aria-label="Subscribe to guest register"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {error && (
                <div className="text-[11px] text-red-400">
                  Please enter a valid email address.
                </div>
              )}

              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#dfb85c]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome to the private guest circle.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Banner: ReSolution Agency Showcase Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#a0b0a6]">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 THE OLIVE TABLE. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#dfb85c]">ReSolution Luxury Restaurant Demo</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#10261d] border border-[#dfb85c]/40 text-[#dfb85c] hover:bg-[#dfb85c] hover:text-[#081510] transition-colors cursor-pointer font-medium shadow-sm text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Want a Website Like This? Inquire</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
