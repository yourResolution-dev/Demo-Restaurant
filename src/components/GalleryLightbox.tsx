import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types/restaurant.types';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#081510]/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-[#f7f3ea] z-20">
        <div className="flex items-center gap-3">
          <span className="tot-font-serif text-sm sm:text-base font-semibold text-[#dfb85c]">
            {currentItem.title}
          </span>
          <span className="text-xs text-[#a0b0a6] hidden sm:inline">
            ({currentIndex + 1} of {items.length})
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#10261d] text-[#f7f3ea] hover:text-[#dfb85c] flex items-center justify-center border border-[#dfb85c]/30 transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#10261d]/80 text-[#f7f3ea] hover:text-[#dfb85c] hover:bg-[#10261d] flex items-center justify-center border border-[#dfb85c]/30 transition-all z-20 cursor-pointer shadow-xl"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image Stage */}
      <div
        className="max-w-5xl max-h-[80vh] px-4 flex flex-col items-center justify-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.imageUrl}
          alt={currentItem.title}
          className="max-h-[68vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-[#dfb85c]/30"
        />

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl">
          <p className="text-xs sm:text-sm text-[#eadecc] font-light leading-relaxed">
            {currentItem.caption}
          </p>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#10261d]/80 text-[#f7f3ea] hover:text-[#dfb85c] hover:bg-[#10261d] flex items-center justify-center border border-[#dfb85c]/30 transition-all z-20 cursor-pointer shadow-xl"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Thumbnail Strip */}
      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 px-4 overflow-x-auto z-20">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(idx);
            }}
            className={`w-12 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
              currentIndex === idx
                ? 'border-[#dfb85c] scale-110 shadow-lg'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
