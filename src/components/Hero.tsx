import React, { useState, useEffect, useCallback } from 'react';
import {
  Star,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { RESTAURANT_INFO, HERO_SLIDES } from '@/config';
import { Button } from '@/components/ui/button';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

type HeroSlide = (typeof HERO_SLIDES)[number];

/**
 * One slide's text. Every slide is rendered in the same grid cell and only the
 * active one is visible, so the block always keeps the height of the tallest
 * slide and the page never jumps when the slideshow advances.
 */
function SlideCopy({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const Heading = active ? 'h1' : 'div';
  return (
    <div
      className={`col-start-1 row-start-1 flex flex-col items-center ${active ? '' : 'invisible'}`}
      aria-hidden={active ? undefined : true}
    >
      {/* Top Gold Michelin Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-forest-800/90 border border-gold-400/40 text-gold-400 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3 sm:mb-5 shadow-[0_0_20px_rgba(223,184,92,0.15)] backdrop-blur-md">
        <div className="flex items-center gap-0.5 text-gold-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-gold-400 text-gold-400" />
          ))}
        </div>
        <span className="text-mist-400">•</span>
        <span>{slide.badge}</span>
      </div>

      {/* Script Kicker */}
      <span className="tot-font-display italic text-gold-400 text-xl sm:text-2xl lg:text-3xl font-normal mb-1.5 block tracking-wide">
        {slide.kicker}
      </span>

      {/* Headline */}
      <Heading className="tot-font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-cream-100 mb-4 sm:mb-5 leading-[1.15] max-w-4xl">
        {slide.title.includes('Remembering.') ? (
          <>
            A Taste Worth{' '}
            <span className="tot-gold-gradient-text italic font-normal">Remembering.</span>
          </>
        ) : (
          slide.title
        )}
      </Heading>

      {/* Description */}
      <p className="tot-font-sans text-xs sm:text-base md:text-lg text-sand-200/90 max-w-2xl mx-auto mb-7 sm:mb-9 leading-relaxed font-light">
        {slide.subtitle}
      </p>
    </div>
  );
}

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  // Slides whose image has been mounted. Only the first loads up front; the next
  // one is added shortly after each change so crossfades stay smooth without
  // downloading every slide during the initial load.
  const [mountedSlides, setMountedSlides] = useState<number[]>([0]);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const autoplay = !isPaused && !userPaused && !prefersReducedMotion;

  const heroSlides = HERO_SLIDES;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [autoplay, nextSlide]);

  useEffect(() => {
    const next = (activeSlide + 1) % heroSlides.length;
    const timer = setTimeout(() => {
      setMountedSlides((prev) => Array.from(new Set([...prev, activeSlide, next])));
    }, 2500);
    return () => clearTimeout(timer);
  }, [activeSlide, heroSlides.length]);

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-forest-900 text-cream-100"
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
            {(idx === activeSlide || mountedSlides.includes(idx)) && (
              <ResponsiveImage
                sizes="100vw"
                priority={idx === 0}
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.34] contrast-[1.1] transform scale-105"
              />
            )}
          </div>
        ))}
        {/* Dark Emerald Vignette & Radial Glow */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-forest-900 via-forest-900/60 to-forest-900/80" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(207,161,56,0.14)_0%,transparent_75%)]" />
      </div>

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center flex flex-col items-center">
        <div className="grid justify-items-center">
          {heroSlides.map((slide, i) => (
            <SlideCopy key={i} slide={slide} active={i === activeSlide} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12">
          <Button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-7 py-3 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Explore Our Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            onClick={onBookTable}
            className="w-full sm:w-auto px-7 py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Book a Table</span>
          </Button>
        </div>

        {/* Glassmorphic Stats Bar */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          {RESTAURANT_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="tot-glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/60"
            >
              <div className="tot-font-serif text-2xl sm:text-3xl font-bold text-gold-400 mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-cream-100 mb-0.5 truncate">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-mist-400 font-light truncate">
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
            className="p-1 rounded-full text-gold-400/60 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className="group flex h-6 min-w-6 cursor-pointer items-center justify-center px-0.5"
                aria-label={`Slide ${i + 1}`}
                aria-current={activeSlide === i}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeSlide === i
                      ? 'h-2 w-7 bg-gold-400 shadow-[0_0_8px_var(--gold-400)]'
                      : 'h-2 w-2 bg-gold-400/30 group-hover:bg-gold-400/60'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-1 rounded-full text-gold-400/60 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {!prefersReducedMotion && (
            <button
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
              aria-pressed={userPaused}
              className="p-1 rounded-full text-gold-400/60 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {userPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={onExploreMenu}
        aria-label="Scroll down to restaurant story and menu"
        className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 text-gold-400/70 hover:text-gold-400 transition-colors flex-col items-center gap-0.5 cursor-pointer z-20"
      >
        <span className="text-[9px] tracking-widest uppercase font-light">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </section>
  );
};
