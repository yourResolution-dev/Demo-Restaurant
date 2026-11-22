import React from 'react';
import { X, Clock, Flame, Wine, Sparkles, Plus, Check, ShieldAlert } from 'lucide-react';
import { MenuItem } from '../types/restaurant.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onToggleTasting: (dish: MenuItem) => void;
  isSelected: boolean;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onToggleTasting,
  isSelected,
}) => {
  return (
    <Dialog open={!!dish} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-2xl">
        {dish && (
          <>
        {/* Header Image */}
        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden flex-shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/30 to-black/30" />

          {/* Close button */}
          <DialogClose asChild>
            <Button variant="secondary" size="icon" aria-label="Close dish modal" className="absolute top-3.5 right-3.5 h-9 w-9 border-white/20 bg-forest-900/75 text-cream-100 backdrop-blur-sm">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>

          {/* Title and tags in image banner */}
          <div className="absolute bottom-4 left-5 right-5 sm:left-6 sm:right-6 flex items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {dish.tags.map((tag, i) => (
                  <Badge key={i} className="border-transparent bg-gold-400 text-forest-900 normal-case tracking-normal shadow-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <DialogTitle className="text-xl leading-tight text-cream-100 sm:text-2xl md:text-3xl">
                {dish.name}
              </DialogTitle>
              <DialogDescription className="sr-only">{dish.description}</DialogDescription>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-[9px] uppercase tracking-widest text-gold-400 block font-medium">Price</span>
              <span className="tot-font-serif text-xl sm:text-2xl md:text-3xl font-bold text-gold-400">
                ₹{dish.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto tot-custom-scroll space-y-5">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 rounded-2xl bg-cream-100 border border-gold-400/30 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-charcoal-500">
                <Clock className="w-3.5 h-3.5 text-gold-500" /> Prep Time
              </div>
              <div className="text-xs sm:text-sm font-bold text-forest-900 mt-0.5">
                {dish.preparationTime || '15 mins'}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-x border-gold-400/30">
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-charcoal-500">
                <Flame className="w-3.5 h-3.5 text-gold-500" /> Calories
              </div>
              <div className="text-xs sm:text-sm font-bold text-forest-900 mt-0.5">
                {dish.calories ? `${dish.calories} kcal` : 'Chef Balanced'}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-charcoal-500">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Course
              </div>
              <div className="text-xs sm:text-sm font-bold text-forest-900 mt-0.5 truncate max-w-[120px]">
                {dish.category}
              </div>
            </div>
          </div>

          {/* Detailed Story & Flavors */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-gold-500 mb-1">
              Flavor Architecture
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
              {dish.longDescription}
            </p>
          </div>

          {/* Sommelier Wine Pairing Note */}
          {dish.winePairing && (
            <div className="p-4 rounded-2xl bg-forest-800 text-cream-100 border border-gold-400/30 flex items-start gap-3 shadow-md">
              <div className="w-8 h-8 rounded-full bg-gold-400 text-forest-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Wine className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gold-400 block uppercase tracking-wider">
                  Sommelier Pairing Suggestion
                </span>
                <span className="text-xs sm:text-sm font-medium text-cream-100 block mt-0.5">
                  {dish.winePairing}
                </span>
                <span className="text-[11px] text-mist-400 font-light mt-0.5 block">
                  Curated to elevate the terroir notes and botanical finish of this dish.
                </span>
              </div>
            </div>
          )}

          {/* Chef’s Perspective */}
          {dish.chefNote && (
            <div className="p-4 rounded-2xl bg-cream-150 border-l-4 border-gold-500">
              <span className="text-xs font-bold text-forest-900 uppercase tracking-wide block mb-1">
                Executive Chef’s Perspective
              </span>
              <p className="tot-font-display italic text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                "{dish.chefNote}"
              </p>
            </div>
          )}

          {/* Allergens warning */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-charcoal-500">
              <ShieldAlert className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span>Contains: {dish.allergens.join(', ')}. Please inform your server of any severe allergies.</span>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="flex items-center justify-between gap-3 border-t border-gold-400/30 bg-cream-100 p-4 sm:p-5">
          <Button variant="ghost" onClick={onClose} className="font-medium text-charcoal-500 hover:bg-sand-300 hover:text-forest-900">
            Close
          </Button>

          <Button
            variant={isSelected ? 'secondary' : 'gold'}
            onClick={() => onToggleTasting(dish)}
            className={isSelected ? 'border-gold-400 shadow-md' : 'shadow-md'}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4" />
                <span>Selected in Tasting Flight</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add to Tasting Flight</span>
              </>
            )}
          </Button>
        </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
