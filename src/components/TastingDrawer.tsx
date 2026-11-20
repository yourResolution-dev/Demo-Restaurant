import React from 'react';
import { X, Trash2, Plus, Minus, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import { SelectedItem } from '../types/restaurant.types';

interface TastingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: SelectedItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearAll: () => void;
  onProceedToBooking: () => void;
}

export const TastingDrawer: React.FC<TastingDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onProceedToBooking,
}) => {
  if (!isOpen) return null;

  const totalEstimate = items.reduce(
    (sum, cur) => sum + cur.item.price * cur.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#081510]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] border-l border-[#dfb85c]/40 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#081510] text-[#f7f3ea] border-b border-[#dfb85c]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#10261d] border border-[#dfb85c]/40 flex items-center justify-center text-[#dfb85c] shadow-md">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="tot-font-serif text-lg font-bold text-[#f7f3ea]">
                  Your Tasting Selection
                </h3>
                <span className="text-xs text-[#dfb85c] font-light">
                  {items.length} {items.length === 1 ? 'course' : 'courses'} chosen
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#a0b0a6] hover:text-[#dfb85c] hover:bg-[#10261d] transition-colors cursor-pointer"
              aria-label="Close tasting drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 tot-custom-scroll">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#f4ede4] border border-[#dfb85c]/30 flex items-center justify-center mx-auto mb-4 text-[#cfa138]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="tot-font-serif text-lg font-bold text-[#081510] mb-2">
                  No Dishes Selected Yet
                </h4>
                <p className="text-xs text-[#58685e] leading-relaxed mb-6">
                  Browse our signature menu and click "Add to Tasting" to curate your personalized dining flight.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full tot-btn-gold text-xs font-semibold shadow-md cursor-pointer"
                >
                  Explore Signature Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-[#dfb85c]/20 text-xs text-[#58685e]">
                  <span>Curated Courses</span>
                  <button
                    onClick={onClearAll}
                    className="text-[#cfa138] hover:text-[#88621a] font-medium cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {items.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-[#ffffff] border border-[#dfb85c]/25 shadow-sm flex items-center gap-3 group"
                  >
                    {/* Dish Mini Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-15 h-15 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0"
                    />

                    {/* Dish Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="tot-font-serif text-sm font-bold text-[#081510] truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-[#58685e] block mb-0.5 truncate">
                        {item.category}
                      </span>
                      <span className="text-xs font-bold text-[#cfa138]">
                        ₹{(item.price * quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-[#f4ede4] rounded-lg px-2 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-[#081510] hover:text-[#cfa138] p-0.5 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-[#081510] hover:text-[#cfa138] p-0.5 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#a0b0a6] hover:text-red-500 p-1 cursor-pointer"
                      title="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Reserve CTA */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#f7f3ea] border-t border-[#dfb85c]/30 space-y-3.5">
              <div className="space-y-1.5 text-xs text-[#58685e]">
                <div className="flex justify-between">
                  <span>Selected Courses:</span>
                  <span className="font-semibold text-[#081510]">{items.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span>Chef Preparation Notes:</span>
                  <span className="text-green-700 font-medium">Included</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#dfb85c]/20 text-sm font-bold text-[#081510]">
                  <span>Estimated Total (INR):</span>
                  <span className="tot-font-serif text-xl text-[#cfa138]">
                    ₹{totalEstimate.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-[#58685e]/80 italic">
                  *Taxes & service added at table. This flight links directly to your reservation.
                </p>
              </div>

              <button
                onClick={onProceedToBooking}
                className="w-full py-3.5 rounded-full tot-btn-gold text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Table with this Tasting Flight</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
