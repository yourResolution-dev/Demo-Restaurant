import React from 'react';
import { Award, Users, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO, FALLBACK_AMBIANCE_IMAGE, FALLBACK_FOOD_IMAGE } from '../data/restaurantData';

export const StorySection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 bg-[#fbf9f5] text-[#141c18] relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#cfa138]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#163428]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative and Milestone Grid (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1.5">
              <span className="tot-font-display italic text-[#cfa138] text-2xl font-normal block">
                Our Story
              </span>
              <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081510] leading-tight">
                About Us
              </h2>
              <div className="w-16 h-0.5 bg-[#cfa138] mt-2.5" />
            </div>

            <p className="tot-font-sans text-[#2c3a32] text-sm sm:text-base leading-relaxed font-light">
              Founded in 2014, <strong className="font-semibold text-[#081510]">The Olive Table</strong> was born out of an uncompromising passion for authentic Mediterranean gastronomy, centuries-old olive harvest traditions, and slow-dining elegance.
            </p>

            <p className="tot-font-sans text-[#58685e] text-xs sm:text-sm leading-relaxed">
              Every dish is orchestrated around cold-pressed extra virgin oils from our private groves, line-caught sustainable seafood, and hand-foraged mountain herbs. We invite you to step away from the bustle of the city and immerse yourself in an atmosphere of candlelit warmth, impeccable cellar vintages, and heartfelt culinary devotion.
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
                  <CheckCircle2 className="w-4 h-4 text-[#cfa138] flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-[#2c3a32]">{feat}</span>
                </div>
              ))}
            </div>

            {/* 4 Stat Boxes (2x2 grid matching reference design) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3">
              {RESTAURANT_INFO.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-[#f7f3ea] border border-[#dfb85c]/30 shadow-sm hover:border-[#dfb85c] hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#10261d] text-[#dfb85c] flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform flex-shrink-0">
                      {idx === 0 && <Clock className="w-3.5 h-3.5" />}
                      {idx === 1 && <Users className="w-3.5 h-3.5" />}
                      {idx === 2 && <Award className="w-3.5 h-3.5" />}
                      {idx === 3 && <ShieldCheck className="w-3.5 h-3.5" />}
                    </div>
                    <span className="tot-font-serif text-xl sm:text-2xl font-bold text-[#081510] group-hover:text-[#cfa138] transition-colors">
                      {m.number}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#081510] mb-0.5">{m.title}</div>
                  <div className="text-[11px] text-[#58685e] leading-snug">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Composition with Overlapping 10-Yr Badge (6 cols) */}
          <div className="lg:col-span-6 relative pt-4 sm:pt-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Circular Gold 10-Year Celebration Badge (Overlapping top-left corner) */}
              <div className="absolute -top-3 left-2 sm:-top-5 sm:-left-3 w-22 h-22 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#dfb85c] via-[#cfa138] to-[#88621a] text-[#081510] shadow-2xl flex flex-col items-center justify-center p-2 border-4 border-[#fbf9f5] tot-animate-pulse-gold z-20 select-none">
                <span className="text-[8px] sm:text-[9px] tracking-widest font-black uppercase text-[#081510]">
                  Celebration
                </span>
                <span className="tot-font-serif text-2xl sm:text-3xl font-extrabold leading-none text-[#081510]">
                  10
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-bold text-[#081510]">
                  Years
                </span>
                <span className="text-[7px] sm:text-[8px] tracking-tight font-medium text-[#10261d]">
                  2014 – 2024
                </span>
              </div>

              {/* Main Primary Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ffffff]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                  alt="The Olive Table Dining Experience"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_AMBIANCE_IMAGE;
                  }}
                  className="w-full h-[320px] sm:h-[420px] object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081510]/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-[#f7f3ea]">
                  <span className="tot-font-serif text-base sm:text-lg font-bold block">The Olive Courtyard Salon</span>
                  <span className="text-[11px] sm:text-xs text-[#dfb85c]">Bespoke Ambiance & Architectural Heritage</span>
                </div>
              </div>

              {/* Secondary Floating Image */}
              <div className="hidden sm:block absolute -bottom-5 right-4 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ffffff]">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
                  alt="Artisanal Kitchen Craft"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_FOOD_IMAGE;
                  }}
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
