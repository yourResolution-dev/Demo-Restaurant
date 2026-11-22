import React, { useState, useMemo } from 'react';
import { Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, RESTAURANT_INFO } from '@/config';
import { GalleryLightbox } from './GalleryLightbox';
import { ResponsiveImage } from '@/components/ui/responsive-image';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Interior & Ambiance',
    'Plated Dishes',
    'Cocktails & Wine',
    'Terrace',
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-28 bg-cream-50 text-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching screenshot: "Our Gallery" */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="tot-font-display italic text-gold-700 text-xl sm:text-2xl font-normal block mb-1">
            Atmosphere & Moments
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight mb-3">
            Our Gallery
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
            A glimpse into the sensory atmosphere of {RESTAURANT_INFO.brandName}. Where centuries-old architectural charm, vintage cellars, open woodfire, and culinary art converge.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 tot-custom-scroll px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-forest-800 text-gold-400 font-semibold border-gold-400/50 shadow-md'
                  : 'bg-white text-charcoal-500 hover:bg-sand-300 hover:text-forest-900 border-gold-400/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Grid – 8 items balanced with zero layout gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => {
            // When 'All' is selected, create an elegant visual rhythm
            const isFeatured = (index === 0 || index === 7) && selectedCategory === 'All';

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
                onClick={() => setLightboxIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIndex(index);
                  }
                }}
                className={`relative rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-gold-400/25 hover:border-gold-400 transition-all duration-300 ${
                  isFeatured
                    ? 'sm:col-span-2 h-64 sm:h-72 lg:h-80'
                    : 'h-64 sm:h-72 lg:h-80'
                }`}
              >
                <ResponsiveImage
 sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-forest-800/85 text-gold-400 backdrop-blur-sm border border-gold-400/35 shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-forest-800/85 text-gold-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-gold-400/40 shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Title & Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="tot-font-serif text-base sm:text-lg font-bold text-cream-100 leading-snug group-hover:text-gold-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-sand-200/85 line-clamp-1 font-light mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
