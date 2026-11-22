import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '@/config';
import { ResponsiveImage } from '@/components/ui/responsive-image';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeState, setFadeState] = useState<'fade-in' | 'fade-out'>('fade-in');

  const goToSlide = useCallback((index: number) => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeState('fade-in');
    }, 200);
  }, []);

  const handleNext = useCallback(() => {
    goToSlide((currentIndex + 1) % TESTIMONIALS.length);
  }, [currentIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="reviews"
      className="py-16 sm:py-20 lg:py-28 bg-forest-900 text-cream-100 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,161,56,0.07)_0%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="tot-font-display italic text-gold-400 text-xl sm:text-2xl font-normal block mb-1">
            Cherished Impressions
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-100 tracking-tight mb-3">
            Voices of Our Guests
          </h2>
          <div className="w-20 h-0.5 bg-gold-400 mx-auto mb-4" />

          <div className="flex items-center justify-center gap-1.5 text-gold-400 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
            ))}
            <span className="text-xs sm:text-sm text-sand-200 ml-2 font-medium">
              4.9 / 5 Rating across 1,840+ verified diner reviews
            </span>
          </div>
        </div>

        {/* Carousel Card Stage */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Testimonial Card */}
          <div
            className={`p-6 sm:p-10 lg:p-12 rounded-3xl bg-forest-800/85 border border-gold-400/30 backdrop-blur-md shadow-2xl relative transition-all duration-300 ${
              fadeState === 'fade-in'
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-2'
            }`}
          >
            <Quote className="w-12 h-12 text-gold-400/15 absolute top-5 right-6 sm:top-6 sm:right-8 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
              {/* Diner Avatar */}
              <div className="relative flex-shrink-0">
                <ResponsiveImage
                  sizes="96px"
                  widths={[160, 320]}
                  src={current.avatar}
                  alt={current.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gold-400 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gold-400 text-forest-900 flex items-center justify-center shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-forest-900" />
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-4 text-center sm:text-left flex-1 min-w-0">
                {/* 5 Stars + Verified Badge */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <div className="flex items-center gap-0.5 text-gold-400">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Verified Guest
                  </span>
                  <span className="text-[11px] text-mist-400">• {current.date}</span>
                </div>

                {/* Comment quote */}
                <p className="tot-font-display italic text-lg sm:text-2xl text-cream-100 leading-relaxed">
                  "{current.comment}"
                </p>

                {/* Diner Information */}
                <div className="pt-3 border-t border-gold-400/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h3 className="tot-font-serif text-base sm:text-lg font-bold text-cream-100">
                      {current.name}
                    </h3>
                    <p className="text-xs text-mist-400 font-light">{current.role}</p>
                  </div>

                  <div className="text-center sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-gold-400 block font-medium">
                      Favorite Course
                    </span>
                    <span className="text-xs font-semibold text-sand-200">
                      {current.favoriteDish}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-6 px-1">
            <button
              onClick={handlePrev}
              className="p-2.5 sm:p-3 rounded-full bg-forest-800 text-sand-200 hover:text-gold-400 hover:bg-forest-700 border border-gold-400/30 transition-all cursor-pointer shadow-md"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Diner Avatar Thumbnails / Dots */}
            <div className="flex items-center gap-2 sm:gap-3">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer flex items-center gap-1.5 p-1 ${
                    currentIndex === i
                      ? 'bg-gold-400/20 border border-gold-400 shadow-[0_0_10px_rgba(223,184,92,0.3)]'
                      : 'opacity-50 hover:opacity-100 border border-transparent'
                  }`}
                  aria-label={`View review by ${t.name}`}
                >
                  <ResponsiveImage
                    sizes="24px"
                    widths={[160, 320]}
                    src={t.avatar}
                    alt={t.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  {currentIndex === i && (
                    <span className="hidden md:inline text-[11px] font-semibold text-gold-400 pr-1.5">
                      {t.name.split(' ')[0]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 sm:p-3 rounded-full bg-forest-800 text-sand-200 hover:text-gold-400 hover:bg-forest-700 border border-gold-400/30 transition-all cursor-pointer shadow-md"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
