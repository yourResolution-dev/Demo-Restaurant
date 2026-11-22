import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types/restaurant.types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ResponsiveImage } from '@/components/ui/responsive-image';

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
  const isOpen = currentIndex !== null && !!items[currentIndex];

  // Arrow-key navigation (Escape, focus trap and scroll lock are handled by Dialog)
  useEffect(() => {
    if (currentIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onNavigate]);

  const currentItem = currentIndex !== null ? items[currentIndex] : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="inset-0 top-0 left-0 h-full max-h-none w-full max-w-none translate-x-0 translate-y-0 items-center justify-center rounded-none border-0 bg-forest-900/95 backdrop-blur-xl"
        onClick={onClose}
      >
        {currentItem && currentIndex !== null && (
          <>
            {/* Top Header Bar */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 text-cream-100 sm:p-6">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-sm font-semibold text-gold-400 sm:text-base">
                  {currentItem.title}
                </DialogTitle>
                <span className="hidden text-xs text-mist-400 sm:inline">
                  ({currentIndex + 1} of {items.length})
                </span>
              </div>

              <DialogClose asChild>
                <Button variant="secondary" size="icon" className="h-10 w-10 text-cream-100" aria-label="Close lightbox">
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
            </div>

            {/* Prev / Next */}
            <Button
              variant="secondary"
              size="icon"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex - 1 + items.length) % items.length);
              }}
              className="absolute left-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 bg-forest-800/80 text-cream-100 shadow-xl sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Main Image Stage */}
            <div
              className="z-10 mx-auto flex max-h-[80vh] max-w-5xl flex-col items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <ResponsiveImage
 sizes="(min-width:1024px) 64rem, 100vw"
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="max-h-[68vh] w-auto max-w-full rounded-2xl border border-gold-400/30 object-contain shadow-2xl"
              />
              <DialogDescription className="mt-4 max-w-2xl text-center text-xs font-light leading-relaxed text-sand-200 sm:text-sm">
                {currentItem.caption}
              </DialogDescription>
            </div>

            <Button
              variant="secondary"
              size="icon"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((currentIndex + 1) % items.length);
              }}
              className="absolute right-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 bg-forest-800/80 text-cream-100 shadow-xl sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Bottom Thumbnail Strip */}
            <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2 overflow-x-auto px-4">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={currentIndex === idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(idx);
                  }}
                  className={cn(
                    'h-10 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all',
                    currentIndex === idx
                      ? 'scale-110 border-gold-400 shadow-lg'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  )}
                >
                  <ResponsiveImage
 sizes="48px" src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
