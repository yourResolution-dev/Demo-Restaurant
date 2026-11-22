import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RESTAURANT_INFO } from '@/config';

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
    <footer className="bg-forest-950 text-cream-100 border-t border-gold-400/20 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative top gold gradient line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-gold-400/15">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center bg-forest-800 shadow-[0_0_12px_rgba(223,184,92,0.2)]">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-gold-400"
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
                <span className="tot-font-serif text-xl font-bold tracking-wider text-cream-100 block leading-tight">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gold-400 uppercase font-light block">
                  Est. 2014 • Fine Dining
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-mist-400 leading-relaxed font-light">
              Where culinary mastery unfolds with every bite. Experience an authentic celebration of
              Mediterranean terroir, estate cold-pressed olive oils, and candlelit ambiance.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-forest-800 border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-forest-900 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-forest-800 border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-forest-900 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.socials.tripadvisor}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-forest-800 border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-forest-900 flex items-center justify-center transition-all cursor-pointer"
                aria-label="TripAdvisor"
              >
                <span className="font-serif font-bold text-xs">TA</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-sand-200/80 font-light">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-block py-1 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-block py-1 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  About Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-block py-1 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Signature Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chef')}
                  className="inline-block py-1 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Executive Chef
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="inline-block py-1 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="inline-block py-1 hover:text-gold-400 transition-colors cursor-pointer"
                >
                  Guest Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="inline-block py-1 text-gold-400 font-semibold hover:underline cursor-pointer"
                >
                  Book a Table
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Dining (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Hours & Service
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-mist-400">
              <div>
                <span className="text-cream-100 font-medium block">Lunch Service</span>
                <span>{RESTAURANT_INFO.hours.lunch}</span>
              </div>
              <div>
                <span className="text-cream-100 font-medium block">Dinner Service</span>
                <span>{RESTAURANT_INFO.hours.dinner}</span>
              </div>
              <div>
                <span className="text-cream-100 font-medium block">Weekend Brunch</span>
                <span>{RESTAURANT_INFO.hours.weekendBrunch}</span>
              </div>
              <div className="pt-1 text-[11px] text-gold-400">
                <span>Smart casual dress code • Valet parking</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter / Guest Register (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Guest Register
            </h4>
            <p className="text-xs text-mist-400 leading-relaxed">
              Subscribe for private invitations to seasonal tasting menus, white truffle arrivals,
              and cellar uncorkings.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mist-400" />
                <Input
                  type="email"
                  aria-label="Email address"
                  aria-invalid={error || undefined}
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(false);
                  }}
                  className="rounded-full border-gold-400/35 bg-forest-800 py-2.5 pl-9 pr-10 text-xs text-cream-100 placeholder:text-mist-400/60 aria-invalid:border-red-500 aria-invalid:bg-forest-800"
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="icon"
                  className="absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2 shadow-sm"
                  aria-label="Subscribe to guest register"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>

              {error && (
                <div className="text-[11px] text-red-400">Please enter a valid email address.</div>
              )}

              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-gold-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome to the private guest circle.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Banner: ReSolution Agency Showcase Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mist-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2026 {RESTAURANT_INFO.name}. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-gold-400">ReSolution Luxury Restaurant Demo</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Photography via{' '}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-gold-400"
              >
                Unsplash
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-800 border border-gold-400/40 text-gold-400 hover:bg-gold-400 hover:text-forest-900 transition-colors cursor-pointer font-medium shadow-sm text-xs"
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
