import React, { useEffect } from 'react';
import { CheckCircle2, Calendar, Clock, Users, MapPin, X, Sparkles, Printer } from 'lucide-react';
import { ReservationConfirmation } from '../types/restaurant.types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSuccessModalProps {
  confirmation: ReservationConfirmation | null;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  confirmation,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!confirmation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#081510]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#fbf9f5] rounded-3xl overflow-hidden shadow-2xl border border-[#dfb85c]/40 z-10 flex flex-col">
        {/* Top Header Banner */}
        <div className="p-6 bg-[#081510] text-[#f7f3ea] border-b border-[#dfb85c]/30 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#a0b0a6] hover:text-[#dfb85c] hover:bg-[#10261d] transition-colors cursor-pointer"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dfb85c] to-[#cfa138] text-[#081510] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#dfb85c] font-semibold block mb-1">
            Table Allocated • {confirmation.tableNumber}
          </span>
          <h3 className="tot-font-serif text-2xl font-bold text-[#f7f3ea]">
            Reservation Confirmed!
          </h3>
          <p className="text-xs text-[#a0b0a6] mt-1 font-light">
            Reference Code: <span className="text-[#dfb85c] font-mono font-bold">{confirmation.bookingId}</span>
          </p>
        </div>

        {/* Confirmation Details Card */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Demo Notice Banner */}
          <div className="p-3 rounded-xl bg-[#10261d]/10 border border-[#dfb85c]/30 text-xs text-[#58685e] flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#cfa138] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#081510]">Demo Simulation:</strong> This is an interactive frontend booking demo. In live deployment, instant SMS & WhatsApp confirmations are sent with valet directions.
            </div>
          </div>

          {/* Table Details Grid */}
          <div className="p-4 rounded-2xl bg-[#ffffff] border border-[#dfb85c]/25 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-[#dfb85c]/15 pb-2">
              <span className="text-[#58685e]">Guest Name:</span>
              <span className="font-semibold text-[#081510]">{confirmation.fullName}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#cfa138]" />
                <div>
                  <span className="text-[#58685e] block text-[10px]">Date</span>
                  <span className="font-semibold text-[#081510]">{confirmation.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#cfa138]" />
                <div>
                  <span className="text-[#58685e] block text-[10px]">Time</span>
                  <span className="font-semibold text-[#081510]">{confirmation.timeSlot}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#cfa138]" />
                <div>
                  <span className="text-[#58685e] block text-[10px]">Party Size</span>
                  <span className="font-semibold text-[#081510]">
                    {confirmation.guests} {confirmation.guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#cfa138]" />
                <div>
                  <span className="text-[#58685e] block text-[10px]">Seating Area</span>
                  <span className="font-semibold text-[#081510] truncate max-w-[120px] block">
                    {confirmation.seatingArea}
                  </span>
                </div>
              </div>
            </div>

            {confirmation.specialRequests && (
              <div className="pt-2 border-t border-[#dfb85c]/15 text-xs">
                <span className="text-[#58685e] block text-[10px]">Special Notes:</span>
                <span className="text-[#081510] italic">"{confirmation.specialRequests}"</span>
              </div>
            )}
          </div>

          {/* Restaurant Venue Info */}
          <div className="text-center text-xs text-[#58685e] space-y-0.5">
            <div className="font-semibold text-[#081510]">{RESTAURANT_INFO.name}</div>
            <div>{RESTAURANT_INFO.address}</div>
            <div className="text-[#cfa138]">Smart Casual Dress Code • Complimentary Valet Parking</div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#f7f3ea] border-t border-[#dfb85c]/30 flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dfb85c]/40 text-xs font-semibold text-[#081510] hover:bg-[#ffffff] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full tot-btn-gold text-xs sm:text-sm font-semibold cursor-pointer shadow-md"
          >
            Close & Done
          </button>
        </div>
      </div>
    </div>
  );
};
