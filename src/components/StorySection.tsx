import React from 'react';
import { Award, Users, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '@/config';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { SectionHeading } from '@/components/ui/section-heading';

export const StorySection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-28 bg-cream-50 text-charcoal-900 relative overflow-hidden"
    >
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative and Milestone Grid (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading align="left" kicker="Our Story" title="About Us" />

            <p className="tot-font-sans text-charcoal-700 text-sm sm:text-base leading-relaxed font-light">
              Founded in 2014,{' '}
              <strong className="font-semibold text-forest-900">{RESTAURANT_INFO.brandName}</strong>{' '}
              was born out of an uncompromising passion for authentic Mediterranean gastronomy,
              centuries-old olive harvest traditions, and slow-dining elegance.
            </p>

            <p className="tot-font-sans text-charcoal-500 text-xs sm:text-sm leading-relaxed">
              Every dish is orchestrated around cold-pressed extra virgin oils from our private
              groves, line-caught sustainable seafood, and hand-foraged mountain herbs. We invite
              you to step away from the bustle of the city and immerse yourself in an atmosphere of
              candlelit warmth, impeccable cellar vintages, and heartfelt culinary devotion.
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Single-Origin Estate Olive Oils',
                'Handcrafted 30-Yolk Fresh Pasta',
                'Sommelier-Curated Vintage Cellar',
                'Zero-Waste Sustainable Ethos',
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-700 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-charcoal-700">{feat}</span>
                </div>
              ))}
            </div>

            {/* 4 Stat Boxes (2x2 grid matching reference design) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3">
              {RESTAURANT_INFO.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-cream-100 border border-gold-400/30 shadow-sm hover:border-gold-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-forest-800 text-gold-400 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform flex-shrink-0">
                      {idx === 0 && <Clock className="w-3.5 h-3.5" />}
                      {idx === 1 && <Users className="w-3.5 h-3.5" />}
                      {idx === 2 && <Award className="w-3.5 h-3.5" />}
                      {idx === 3 && <ShieldCheck className="w-3.5 h-3.5" />}
                    </div>
                    <span className="tot-font-serif text-xl sm:text-2xl font-bold text-forest-900 group-hover:text-gold-700 transition-colors">
                      {m.number}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-forest-900 mb-0.5">{m.title}</div>
                  <div className="text-[11px] text-charcoal-500 leading-snug">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Composition with Overlapping 10-Yr Badge (6 cols) */}
          <div className="lg:col-span-6 relative pt-4 sm:pt-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Circular Gold 10-Year Celebration Badge (Overlapping top-left corner) */}
              <div className="absolute -top-3 left-2 sm:-top-5 sm:-left-3 w-22 h-22 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 text-forest-900 shadow-2xl flex flex-col items-center justify-center p-2 border-4 border-cream-50 tot-animate-pulse-gold z-20 select-none">
                <span className="text-[10px] tracking-widest font-black uppercase text-forest-900">
                  Celebration
                </span>
                <span className="tot-font-serif text-2xl sm:text-3xl font-extrabold leading-none text-forest-900">
                  10
                </span>
                <span className="text-[10px] tracking-wider uppercase font-bold text-forest-900">
                  Years
                </span>
                <span className="text-[10px] tracking-tight font-medium text-forest-800">
                  2014 – 2024
                </span>
              </div>

              {/* Main Primary Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ResponsiveImage
                  sizes="(min-width:1024px) 50vw, 100vw"
                  src="/images/photo-1517248135467-4c7edcad34c4-1200.webp"
                  alt={`${RESTAURANT_INFO.brandName} Dining Experience`}
                  className="w-full h-[320px] sm:h-[420px] object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-cream-100">
                  <span className="tot-font-serif text-base sm:text-lg font-bold block">
                    The Olive Courtyard Salon
                  </span>
                  <span className="text-[11px] sm:text-xs text-gold-400">
                    Bespoke Ambiance & Architectural Heritage
                  </span>
                </div>
              </div>

              {/* Secondary Floating Image */}
              <div className="hidden sm:block absolute -bottom-5 right-4 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ResponsiveImage
                  sizes="160px"
                  src="/images/photo-1544025162-d76694265947-1200.webp"
                  alt="Artisanal Kitchen Craft"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
