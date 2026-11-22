import React from 'react';
import { Award, Quote, Sparkles } from 'lucide-react';
import { CHEF_INFO, RESTAURANT_INFO } from '@/config';
import { ResponsiveImage } from '@/components/ui/responsive-image';

export const ChefSection: React.FC = () => {
  return (
    <section id="chef" className="py-16 sm:py-20 lg:py-28 bg-forest-900 text-cream-100 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,161,56,0.09)_0%,transparent_65%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="tot-font-display italic text-gold-400 text-xl sm:text-2xl font-normal block mb-1">
            Culinary Virtuoso
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-100 tracking-tight mb-3">
            Meet Our Executive Chef
          </h2>
          <div className="w-20 h-0.5 bg-gold-400 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Chef Image Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Gold Border Decorative Frame */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-3xl border border-gold-400/35 transform -rotate-1 hidden sm:block pointer-events-none" />

              {/* Portrait Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-400/40 bg-forest-800">
                <ResponsiveImage
 sizes="(min-width:1024px) 40vw, 100vw"
                  src={CHEF_INFO.image}
                  alt={CHEF_INFO.name}
                  className="w-full h-[360px] sm:h-[450px] lg:h-[500px] object-cover object-top hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/30 to-transparent opacity-85" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800/90 backdrop-blur-md text-gold-400 text-xs font-semibold mb-2 border border-gold-400/30 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>2 Michelin Star Heritage</span>
                  </div>
                  <h3 className="tot-font-serif text-2xl sm:text-3xl font-bold text-cream-100 leading-tight">
                    {CHEF_INFO.name}
                  </h3>
                  <p className="text-xs text-gold-400 tracking-wider uppercase font-light mt-0.5">
                    {CHEF_INFO.title}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Chef Bio & Signature Quote Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Signature Quote in Large Serif Italic */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-forest-800/80 border border-gold-400/30 backdrop-blur-md shadow-xl">
              <Quote className="w-10 h-10 text-gold-400/20 absolute top-4 right-4 pointer-events-none" />
              <p className="tot-font-display italic text-lg sm:text-2xl text-cream-100 leading-relaxed mb-4">
                "{CHEF_INFO.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-0.5 bg-gold-400" />
                <span className="tot-font-serif text-xs sm:text-sm tracking-wider uppercase text-gold-400 font-semibold">
                  {CHEF_INFO.name}
                </span>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-3.5 text-sm sm:text-base text-sand-200/90 font-light leading-relaxed">
              <p>{CHEF_INFO.bio}</p>
              <p>
                Under {CHEF_INFO.shortName}'s vision, every dinner at {RESTAURANT_INFO.brandName} is designed as an intimate theatrical experience: from the tableside aroma of charred wild rosemary to the crisp crackle of handmade sea salt on melt-in-your-mouth seafood.
              </p>
            </div>

            {/* Accolades & Awards */}
            <div className="pt-1">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block mb-3">
                Honors & Accolades
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CHEF_INFO.awards.map((award, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-forest-800/60 border border-gold-400/25 hover:border-gold-400/60 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-gold-400 mb-1">
                      <Award className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-bold">{award.year}</span>
                    </div>
                    <div className="text-xs text-cream-100 font-medium leading-snug">
                      {award.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
