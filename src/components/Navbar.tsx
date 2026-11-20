import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, PhoneCall, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

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
      const sections = ['home', 'about', 'menu', 'chef', 'gallery', 'reviews', 'reservation', 'contact'];
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
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
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
          ? 'bg-[#081510]/95 backdrop-blur-md border-b border-[#dfb85c]/25 py-2.5 shadow-lg'
          : 'bg-[#081510] border-b border-[#dfb85c]/15 py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="The Olive Table - Back to Home"
          >
            {/* Olive Leaf Stylized Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#dfb85c]/60 flex items-center justify-center bg-[#10261d] group-hover:border-[#dfb85c] transition-all shadow-[0_0_15px_rgba(223,184,92,0.15)] flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#dfb85c] transition-transform duration-300 group-hover:scale-110"
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
              <span className="tot-font-serif text-base sm:text-lg lg:text-xl font-bold tracking-wider text-[#f7f3ea] block group-hover:text-[#dfb85c] transition-colors leading-tight truncate">
                THE OLIVE TABLE
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#dfb85c] uppercase font-light block">
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
                    isActive
                      ? 'text-[#dfb85c] font-semibold'
                      : 'text-[#eadecc] hover:text-[#dfb85c]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#dfb85c] rounded-full shadow-[0_0_8px_#dfb85c]" />
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
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#10261d] border border-[#dfb85c]/35 text-[#eadecc] hover:text-[#dfb85c] hover:border-[#dfb85c] transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2"
              title="View Tasting Selections"
            >
              <ShoppingBag className="w-4 h-4 text-[#dfb85c]" />
              <span className="hidden sm:inline text-xs font-medium">Tasting List</span>
              {tastingCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-[#dfb85c] text-[#081510] font-bold text-[11px] flex items-center justify-center animate-bounce">
                  {tastingCount}
                </span>
              ) : (
                <span className="hidden md:inline-block text-[10px] text-[#a0b0a6] bg-[#081510] px-1.5 py-0.2 rounded-full">
                  0
                </span>
              )}
            </button>

            {/* Book A Table Primary CTA */}
            <button
              onClick={onBookTableClick}
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full tot-btn-gold text-xs sm:text-sm font-semibold cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#eadecc] hover:text-[#dfb85c] hover:bg-[#10261d] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#081510]/98 border-b border-[#dfb85c]/30 px-5 py-5 transition-all duration-300">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-[#10261d] text-[#dfb85c] font-semibold border-l-2 border-[#dfb85c]'
                    : 'text-[#eadecc] hover:text-[#dfb85c]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 mt-1 border-t border-[#dfb85c]/20 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookTableClick();
                }}
                className="w-full py-2.5 rounded-full tot-btn-gold text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Table</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#a0b0a6] pt-1">
                <span>{RESTAURANT_INFO.hours.dinner}</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center gap-1 text-[#dfb85c]"
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
