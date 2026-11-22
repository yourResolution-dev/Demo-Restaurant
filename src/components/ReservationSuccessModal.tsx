import React from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  Printer,
  MessageCircle,
} from 'lucide-react';
import { ReservationConfirmation } from '../types/restaurant.types';
import { RESTAURANT_INFO } from '@/config';
import { Button } from '@/components/ui/button';
import { bookingWhatsAppUrl } from '@/lib/whatsapp';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

interface ReservationSuccessModalProps {
  confirmation: ReservationConfirmation | null;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  confirmation,
  onClose,
}) => {
  return (
    <Dialog open={!!confirmation} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-y-auto">
        {confirmation && (
          <>
            {/* Top Header Banner */}
            <div className="relative border-b border-gold-400/30 bg-forest-900 p-6 text-center text-cream-100">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-forest-900 shadow-lg">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gold-400">
                Table Allocated • {confirmation.tableNumber}
              </span>
              <DialogTitle className="text-cream-100">Reservation Confirmed!</DialogTitle>
              <DialogDescription className="mt-1 font-light">
                Reference Code:{' '}
                <span className="font-mono font-bold text-gold-400">{confirmation.bookingId}</span>
              </DialogDescription>
            </div>

            {/* Confirmation Details Card */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Demo Notice Banner */}
              <div className="p-3 rounded-xl bg-forest-800/10 border border-gold-400/30 text-xs text-charcoal-500 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-gold-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-forest-900">Demo Simulation:</strong> This is an
                  interactive frontend booking demo. In live deployment, instant SMS & WhatsApp
                  confirmations are sent with valet directions.
                </div>
              </div>

              {/* Table Details Grid */}
              <div className="p-4 rounded-2xl bg-white border border-gold-400/25 shadow-sm space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-gold-400/15 pb-2">
                  <span className="text-charcoal-500">Guest Name:</span>
                  <span className="font-semibold text-forest-900">{confirmation.fullName}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-700" />
                    <div>
                      <span className="text-charcoal-500 block text-[10px]">Date</span>
                      <span className="font-semibold text-forest-900">{confirmation.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-700" />
                    <div>
                      <span className="text-charcoal-500 block text-[10px]">Time</span>
                      <span className="font-semibold text-forest-900">{confirmation.timeSlot}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-gold-700" />
                    <div>
                      <span className="text-charcoal-500 block text-[10px]">Party Size</span>
                      <span className="font-semibold text-forest-900">
                        {confirmation.guests} {confirmation.guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-700" />
                    <div>
                      <span className="text-charcoal-500 block text-[10px]">Seating Area</span>
                      <span className="font-semibold text-forest-900 truncate max-w-[120px] block">
                        {confirmation.seatingArea}
                      </span>
                    </div>
                  </div>
                </div>

                {confirmation.specialRequests && (
                  <div className="pt-2 border-t border-gold-400/15 text-xs">
                    <span className="text-charcoal-500 block text-[10px]">Special Notes:</span>
                    <span className="text-forest-900 italic">"{confirmation.specialRequests}"</span>
                  </div>
                )}
              </div>

              {/* Restaurant Venue Info */}
              <div className="text-center text-xs text-charcoal-500 space-y-0.5">
                <div className="font-semibold text-forest-900">{RESTAURANT_INFO.name}</div>
                <div>{RESTAURANT_INFO.address}</div>
                <div className="text-gold-700">
                  Smart Casual Dress Code • Complimentary Valet Parking
                </div>
              </div>

              {/* Send the booking to the restaurant on WhatsApp */}
              <Button asChild variant="whatsapp" size="lg" className="w-full">
                <a
                  href={bookingWhatsAppUrl(confirmation, {
                    name: RESTAURANT_INFO.brandName,
                    whatsappNumber: RESTAURANT_INFO.whatsappNumber,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send booking to WhatsApp</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between gap-3 border-t border-gold-400/30 bg-cream-100 p-4 sm:p-5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="border-gold-400/40 bg-transparent text-forest-900 hover:bg-white hover:text-forest-900"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Pass</span>
              </Button>

              <Button onClick={onClose} className="shadow-md sm:text-sm">
                Close &amp; Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
