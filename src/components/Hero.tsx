import React, { useState, useEffect, useCallback } from 'react';
import { Star, ArrowRight, Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { RESTAURANT_INFO, FALLBACK_AMBIANCE_IMAGE } from '../data/restaurantData';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      title: 'A Taste Worth Remembering.',
      kicker: 'Savor the Moment',
      subtitle: 'Where culinary mastery unfolds with every bite. Experience an exquisite symphony of taste, tradition, and timeless atmosphere.',
      badge: 'MICHELIN RECOMMENDED 2026',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=85',
    },
    {
      title: 'Artisanal Mediterranean Terroir.',
      kicker: 'Heritage & Craft',
      subtitle: 'Cold-pressed estate olive oils, line-caught sustainable seafood, and heirloom produce orchestrated into poetic fine dining.',
      badge: 'ESTATE GROWN & CHEF CRAFTED',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85',
    },
    {
      title: 'Intimate Candlelit Elegance.',
      kicker: 'Atmosphere & Moments',
      subtitle: 'A sanctuary of slow dining where each course is paired with curated vintage wines under ambient amber glow.',
      badge: 'PRIVATE SALON & WINE CELLAR',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1920&q=85',
    },
  ];

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const current = heroSlides[activeSlide];

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#081510] text-[#f7f3ea]"
    >
      {/* Background Slides with Crossfade */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_AMBIANCE_IMAGE;
              }}
              className="w-full h-full object-cover object-center filter brightness-[0.34] contrast-[1.1] transform scale-105"
            />
          </div>
        ))}
        {/* Dark Emerald Vignette & Radial Glow */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#081510] via-[#081510]/60 to-[#081510]/80" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(207,161,56,0.14)_0%,transparent_75%)]" />
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center flex flex-col items-center">
        {/* Top Gold Michelin Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#10261d]/90 border border-[#dfb85c]/40 text-[#dfb85c] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3 sm:mb-5 shadow-[0_0_20px_rgba(223,184,92,0.15)] backdrop-blur-md">
          <div className="flex items-center gap-0.5 text-[#dfb85c]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#dfb85c] text-[#dfb85c]" />
            ))}
          </div>
          <span className="text-[#a0b0a6]">•</span>
          <span>{current.badge}</span>
        </div>

        {/* Script Kicker */}
        <span className="tot-font-display italic text-[#dfb85c] text-xl sm:text-2xl lg:text-3xl font-normal mb-1.5 block tracking-wide">
          {current.kicker}
        </span>

        {/* Headline */}
        <h1 className="tot-font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#f7f3ea] mb-4 sm:mb-5 leading-[1.15] max-w-4xl">
          {current.title.includes('Remembering.') ? (
            <>
              A Taste Worth{' '}
              <span className="tot-gold-gradient-text italic font-normal">
                Remembering.
              </span>
            </>
          ) : (
            current.title
          )}
        </h1>

        {/* Description */}
        <p className="tot-font-sans text-xs sm:text-base md:text-lg text-[#eadecc]/90 max-w-2xl mx-auto mb-7 sm:mb-9 leading-relaxed font-light">
          {current.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3 rounded-full tot-btn-gold text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Explore Our Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onBookTable}
            className="w-full sm:w-auto px-7 py-3 rounded-full tot-btn-outline text-xs sm:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#dfb85c]" />
            <span>Book a Table</span>
          </button>
        </div>

        {/* Glassmorphic Stats Bar */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {RESTAURANT_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="tot-glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#dfb85c]/60"
            >
              <div className="tot-font-serif text-2xl sm:text-3xl font-bold text-[#dfb85c] mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#f7f3ea] mb-0.5 truncate">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#a0b0a6] font-light truncate">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls & dots */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-1 rounded-full text-[#dfb85c]/60 hover:text-[#dfb85c] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeSlide === i
                    ? 'w-7 h-2 bg-[#dfb85c] shadow-[0_0_8px_#dfb85c]'
                    : 'w-2 h-2 bg-[#dfb85c]/30 hover:bg-[#dfb85c]/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-1 rounded-full text-[#dfb85c]/60 hover:text-[#dfb85c] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={onExploreMenu}
        aria-label="Scroll down to restaurant story and menu"
        className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 text-[#dfb85c]/70 hover:text-[#dfb85c] transition-colors flex-col items-center gap-0.5 cursor-pointer z-20"
      >
        <span className="text-[9px] tracking-widest uppercase font-light">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </section>
  );
};
