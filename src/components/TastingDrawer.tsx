import React from 'react';
import { Trash2, Plus, Minus, Calendar, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { SelectedItem } from '../types/restaurant.types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';

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
  const totalEstimate = items.reduce((sum, cur) => sum + cur.item.price * cur.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gold-400/30 bg-forest-900 p-5 text-cream-100 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-forest-800 text-gold-400 shadow-md">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <SheetTitle className="text-cream-100">Your Tasting Selection</SheetTitle>
              <SheetDescription>
                {items.length} {items.length === 1 ? 'course' : 'courses'} chosen
              </SheetDescription>
            </div>
          </div>

          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close tasting drawer">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>

        {/* Body items list */}
        <div className="flex-1 space-y-3.5 overflow-y-auto p-4 sm:p-6 tot-custom-scroll">
          {items.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/30 bg-cream-150 text-gold-500">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h4 className="mb-2 font-serif text-lg font-bold text-forest-900">No Dishes Selected Yet</h4>
              <p className="mb-6 text-xs leading-relaxed text-charcoal-500">
                Browse our signature menu and click "Add to Tasting" to curate your personalized dining flight.
              </p>
              <Button onClick={onClose} className="shadow-md">
                Explore Signature Menu
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-gold-400/20 pb-2 text-xs text-charcoal-500">
                <span>Curated Courses</span>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="cursor-pointer font-medium text-gold-500 hover:text-gold-700"
                >
                  Clear All
                </button>
              </div>

              {items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="group flex items-center gap-3 rounded-2xl border border-gold-400/25 bg-white p-3 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-15 w-15 flex-shrink-0 rounded-xl object-cover sm:h-16 sm:w-16"
                  />

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-serif text-sm font-bold text-forest-900">{item.name}</h4>
                    <span className="mb-0.5 block truncate text-[11px] text-charcoal-500">{item.category}</span>
                    <span className="text-xs font-bold text-gold-500">
                      ₹{(item.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-lg bg-cream-150 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="cursor-pointer p-0.5 text-forest-900 hover:text-gold-500"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-4 text-center text-xs font-bold" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="cursor-pointer p-0.5 text-forest-900 hover:text-gold-500"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="cursor-pointer p-1 text-mist-400 hover:text-red-500"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer & Reserve CTA */}
        {items.length > 0 && (
          <div className="space-y-3.5 border-t border-gold-400/30 bg-cream-100 p-5 sm:p-6">
            <div className="space-y-1.5 text-xs text-charcoal-500">
              <div className="flex justify-between">
                <span>Selected Courses:</span>
                <span className="font-semibold text-forest-900">{items.length} items</span>
              </div>
              <div className="flex justify-between">
                <span>Chef Preparation Notes:</span>
                <span className="font-medium text-green-700">Included</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-gold-400/20 pt-2 text-sm font-bold text-forest-900">
                <span>Estimated Total (INR):</span>
                <span className="font-serif text-xl text-gold-500">₹{totalEstimate.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] italic text-charcoal-500/80">
                *Taxes & service added at table. This flight links directly to your reservation.
              </p>
            </div>

            <Button onClick={onProceedToBooking} size="lg" className="w-full py-3.5 text-xs shadow-lg sm:text-sm">
              <Calendar className="h-4 w-4" />
              <span>Reserve Table with this Tasting Flight</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
