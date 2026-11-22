import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, PhoneCall, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '@/config';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/lazy-section';

interface NavbarProps {
  tastingCount: number;
  onOpenTastingDrawer: () => void;
  onBookTableClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  tastingCount,
  onOpenTastingDrawer,
  onBookTableClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section scroll spy
      const sections = [
        'home',
        'about',
        'menu',
        'chef',
        'gallery',
        'reviews',
        'reservation',
        'contact',
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id, -85);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'chef', label: 'Our Chef' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-forest-900/95 backdrop-blur-md border-b border-gold-400/25 py-2.5 shadow-lg'
          : 'bg-forest-900 border-b border-gold-400/15 py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer rounded-lg"
          >
            {/* Olive Leaf Stylized Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold-400/60 flex items-center justify-center bg-forest-800 group-hover:border-gold-400 transition-all shadow-[0_0_15px_rgba(223,184,92,0.15)] flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 transition-transform duration-300 group-hover:scale-110"
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
            <div className="min-w-0">
              <span className="tot-font-serif text-base sm:text-lg lg:text-xl font-bold tracking-wider text-cream-100 block group-hover:text-gold-400 transition-colors leading-tight truncate">
                {RESTAURANT_INFO.name}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-gold-400 uppercase font-light block">
                Est. 2014 • Fine Dining
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all cursor-pointer relative ${
                    isActive ? 'text-gold-400 font-semibold' : 'text-sand-200 hover:text-gold-400'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold-400 rounded-full shadow-[0_0_8px_#dfb85c]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Tasting Selection Drawer Trigger */}
            <button
              onClick={onOpenTastingDrawer}
              aria-label={`View tasting selections (${tastingCount} items)`}
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-full bg-forest-800 border border-gold-400/35 text-sand-200 hover:text-gold-400 hover:border-gold-400 transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2"
              title="View Tasting Selections"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span className="hidden sm:inline text-xs font-medium">Tasting List</span>
              {tastingCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-gold-400 text-forest-900 font-bold text-[11px] flex items-center justify-center animate-bounce">
                  {tastingCount}
                </span>
              ) : (
                <span className="hidden md:inline-block text-[10px] text-mist-400 bg-forest-900 px-1.5 py-0.2 rounded-full">
                  0
                </span>
              )}
            </button>

            {/* Book A Table Primary CTA */}
            <Button
              onClick={onBookTableClick}
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </Button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-sand-200 hover:text-gold-400 hover:bg-forest-800 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-forest-900/98 border-b border-gold-400/30 px-5 py-5 transition-all duration-300">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-forest-800 text-gold-400 font-semibold border-l-2 border-gold-400'
                    : 'text-sand-200 hover:text-gold-400'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 mt-1 border-t border-gold-400/20 flex flex-col gap-2.5">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookTableClick();
                }}
                className="w-full py-2.5 text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </Button>

              <div className="flex items-center justify-between text-xs text-mist-400 pt-1">
                <span>{RESTAURANT_INFO.hours.dinner}</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center gap-1 text-gold-400"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
