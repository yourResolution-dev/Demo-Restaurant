import React, { useState, useMemo } from 'react';
import { Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryLightbox } from './GalleryLightbox';

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
    <section id="gallery" className="py-16 sm:py-20 lg:py-28 bg-[#fbf9f5] text-[#141c18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching screenshot: "Our Gallery" */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="tot-font-display italic text-[#cfa138] text-xl sm:text-2xl font-normal block mb-1">
            Atmosphere & Moments
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081510] tracking-tight mb-3">
            Our Gallery
          </h2>
          <div className="w-16 h-0.5 bg-[#cfa138] mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-[#58685e] font-light leading-relaxed">
            A glimpse into the sensory atmosphere of The Olive Table. Where centuries-old architectural charm, vintage cellars, open woodfire, and culinary art converge.
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
                  ? 'bg-[#10261d] text-[#dfb85c] font-semibold border-[#dfb85c]/50 shadow-md'
                  : 'bg-[#ffffff] text-[#58685e] hover:bg-[#ede3d1] hover:text-[#081510] border-[#dfb85c]/25'
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
                onClick={() => setLightboxIndex(index)}
                className={`relative rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-[#dfb85c]/25 hover:border-[#dfb85c] transition-all duration-300 ${
                  isFeatured
                    ? 'sm:col-span-2 h-64 sm:h-72 lg:h-80'
                    : 'h-64 sm:h-72 lg:h-80'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081510]/85 via-[#081510]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#10261d]/85 text-[#dfb85c] backdrop-blur-sm border border-[#dfb85c]/35 shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#10261d]/85 text-[#dfb85c] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[#dfb85c]/40 shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Title & Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="tot-font-serif text-base sm:text-lg font-bold text-[#f7f3ea] leading-snug group-hover:text-[#dfb85c] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#eadecc]/85 line-clamp-1 font-light mt-0.5">
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
