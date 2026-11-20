import React, { useEffect } from 'react';
import { X, Clock, Flame, Wine, Sparkles, Plus, Check, ShieldAlert } from 'lucide-react';
import { MenuItem } from '../types/restaurant.types';

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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#081510]/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#fbf9f5] rounded-3xl overflow-hidden shadow-2xl border border-[#dfb85c]/40 z-10 max-h-[92vh] flex flex-col">
        {/* Header Image */}
        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden flex-shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081510]/90 via-[#081510]/30 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-[#081510]/75 text-[#f7f3ea] hover:text-[#dfb85c] flex items-center justify-center backdrop-blur-sm transition-colors border border-white/20 cursor-pointer shadow-md"
            aria-label="Close dish modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and tags in image banner */}
          <div className="absolute bottom-4 left-5 right-5 sm:left-6 sm:right-6 flex items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {dish.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#dfb85c] text-[#081510] shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="tot-font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#f7f3ea] leading-tight">
                {dish.name}
              </h2>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-[9px] uppercase tracking-widest text-[#dfb85c] block font-medium">Price</span>
              <span className="tot-font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#dfb85c]">
                ₹{dish.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto tot-custom-scroll space-y-5">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 rounded-2xl bg-[#f7f3ea] border border-[#dfb85c]/30 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#58685e]">
                <Clock className="w-3.5 h-3.5 text-[#cfa138]" /> Prep Time
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#081510] mt-0.5">
                {dish.preparationTime || '15 mins'}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-x border-[#dfb85c]/30">
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#58685e]">
                <Flame className="w-3.5 h-3.5 text-[#cfa138]" /> Calories
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#081510] mt-0.5">
                {dish.calories ? `${dish.calories} kcal` : 'Chef Balanced'}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#58685e]">
                <Sparkles className="w-3.5 h-3.5 text-[#cfa138]" /> Course
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#081510] mt-0.5 truncate max-w-[120px]">
                {dish.category}
              </div>
            </div>
          </div>

          {/* Detailed Story & Flavors */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#cfa138] mb-1">
              Flavor Architecture
            </h4>
            <p className="text-xs sm:text-sm text-[#2c3a32] leading-relaxed font-light">
              {dish.longDescription}
            </p>
          </div>

          {/* Sommelier Wine Pairing Note */}
          {dish.winePairing && (
            <div className="p-4 rounded-2xl bg-[#10261d] text-[#f7f3ea] border border-[#dfb85c]/30 flex items-start gap-3 shadow-md">
              <div className="w-8 h-8 rounded-full bg-[#dfb85c] text-[#081510] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Wine className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#dfb85c] block uppercase tracking-wider">
                  Sommelier Pairing Suggestion
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#f7f3ea] block mt-0.5">
                  {dish.winePairing}
                </span>
                <span className="text-[11px] text-[#a0b0a6] font-light mt-0.5 block">
                  Curated to elevate the terroir notes and botanical finish of this dish.
                </span>
              </div>
            </div>
          )}

          {/* Chef’s Perspective */}
          {dish.chefNote && (
            <div className="p-4 rounded-2xl bg-[#f4ede4] border-l-4 border-[#cfa138]">
              <span className="text-xs font-bold text-[#081510] uppercase tracking-wide block mb-1">
                Executive Chef’s Perspective
              </span>
              <p className="tot-font-display italic text-xs sm:text-sm text-[#2c3a32] leading-relaxed">
                "{dish.chefNote}"
              </p>
            </div>
          )}

          {/* Allergens warning */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-[#58685e]">
              <ShieldAlert className="w-4 h-4 text-[#cfa138] flex-shrink-0" />
              <span>Contains: {dish.allergens.join(', ')}. Please inform your server of any severe allergies.</span>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-[#f7f3ea] border-t border-[#dfb85c]/30 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#58685e] hover:text-[#081510] hover:bg-[#ede3d1] transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => onToggleTasting(dish)}
            className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-all ${
              isSelected
                ? 'bg-[#10261d] text-[#dfb85c] border border-[#dfb85c]'
                : 'tot-btn-gold'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                <span>Selected in Tasting Flight</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Tasting Flight</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
