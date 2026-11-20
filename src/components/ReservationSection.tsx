import React, { useState } from 'react';
import { Calendar, Sparkles, CheckCircle2, Clock, Users, MapPin, AlertCircle, Utensils } from 'lucide-react';
import { ReservationFormData, ReservationConfirmation } from '../types/restaurant.types';

interface ReservationSectionProps {
  onSuccess: (confirmation: ReservationConfirmation) => void;
  hasTastingMenuSelected?: boolean;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onSuccess,
  hasTastingMenuSelected,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: today,
    timeSlot: '07:30 PM',
    guests: 2,
    seatingArea: 'Main Dining Room',
    occasion: 'Romantic Date',
    specialRequests: hasTastingMenuSelected ? 'Curated tasting flight pre-selected.' : '',
    tastingMenuSelected: hasTastingMenuSelected,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '12:30 PM',
    '01:15 PM',
    '02:00 PM',
    '07:00 PM',
    '07:30 PM',
    '08:00 PM',
    '08:30 PM',
    '09:00 PM',
    '09:30 PM',
  ];

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Full name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.date) {
      errs.date = 'Please select a reservation date.';
    }

    if (formData.guests < 1 || formData.guests > 20) {
      errs.guests = 'Guest count must be between 1 and 20.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate instant responsive booking allocation
    setTimeout(() => {
      setIsSubmitting(false);

      const bookingId = `TOT-${Math.floor(1000 + Math.random() * 9000)}`;
      const tableNumber = `Table T-${Math.floor(1 + Math.random() * 24)}`;

      const confirmation: ReservationConfirmation = {
        ...formData,
        bookingId,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tableNumber,
      };

      onSuccess(confirmation);
    }, 550);
  };

  return (
    <section id="reservation" className="py-16 sm:py-20 lg:py-28 bg-[#fbf9f5] text-[#141c18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="tot-font-display italic text-[#cfa138] text-xl sm:text-2xl font-normal block mb-1">
            Book Your Table
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081510] tracking-tight mb-3">
            Make a Reservation
          </h2>
          <div className="w-16 h-0.5 bg-[#cfa138] mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-[#58685e] font-light leading-relaxed">
            Reserve your table for an evening of sensory indulgence. We recommend booking at least 24 hours in advance for prime weekend dinner slots.
          </p>
        </div>

        {/* 2-Column Desktop / Stacked Mobile Layout matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#ffffff] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-[#dfb85c]/30 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              
              {/* Optional Tasting Menu Indicator */}
              {hasTastingMenuSelected && (
                <div className="p-3 rounded-xl bg-[#10261d]/10 border border-[#dfb85c]/40 flex items-center gap-2.5 text-xs text-[#081510]">
                  <Utensils className="w-4 h-4 text-[#cfa138] flex-shrink-0" />
                  <span>
                    <strong>Tasting Flight Linked:</strong> Your selected courses will be forwarded to Chef Marco's kitchen.
                  </span>
                </div>
              )}

              {/* Row 1: Full Name and Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ranajit Gupta"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#081510] transition-colors tot-input-focus ${
                      errors.fullName
                        ? 'border-red-500 bg-red-50/50'
                        : 'border-[#dfb85c]/40 bg-[#fbf9f5]'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 93320 12109"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#081510] transition-colors tot-input-focus ${
                      errors.phone
                        ? 'border-red-500 bg-red-50/50'
                        : 'border-[#dfb85c]/40 bg-[#fbf9f5]'
                    }`}
                  />
                  {errors.phone && (
                    <span className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Email and Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ranajit@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#081510] transition-colors tot-input-focus ${
                      errors.email
                        ? 'border-red-500 bg-red-50/50'
                        : 'border-[#dfb85c]/40 bg-[#fbf9f5]'
                    }`}
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-[11px] text-red-600 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#fbf9f5] text-sm text-[#081510] tot-input-focus appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest (Solo Dining)' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    <Users className="w-4 h-4 text-[#58685e] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                    Reservation Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#fbf9f5] text-sm text-[#081510] tot-input-focus cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#fbf9f5] text-sm text-[#081510] tot-input-focus appearance-none cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <Clock className="w-4 h-4 text-[#58685e] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 4: Seating Preference and Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                    Seating Preference
                  </label>
                  <div className="relative">
                    <select
                      value={formData.seatingArea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seatingArea: e.target.value as ReservationFormData['seatingArea'],
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#fbf9f5] text-sm text-[#081510] tot-input-focus appearance-none cursor-pointer"
                    >
                      <option value="Main Dining Room">Main Dining Room (Chandelier Hall)</option>
                      <option value="Garden Terrace">Garden Terrace (Alfresco Olive Trees)</option>
                      <option value="Chef's Counter">Chef's Counter (Live Open Kitchen)</option>
                      <option value="Private Wine Cellar">Private Wine Cellar (Exclusive VIP)</option>
                    </select>
                    <MapPin className="w-4 h-4 text-[#58685e] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                    Dining Occasion
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        occasion: e.target.value as ReservationFormData['occasion'],
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#fbf9f5] text-sm text-[#081510] tot-input-focus cursor-pointer"
                  >
                    <option value="Romantic Date">Romantic Date / Couple</option>
                    <option value="Anniversary">Wedding / Relationship Anniversary</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Business Dinner">Executive / Corporate Meeting</option>
                    <option value="Casual Dining">Casual Fine Dining</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-[#081510] uppercase tracking-wider mb-1.5">
                  Special Notes or Allergies
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Dietary preferences, quiet corner table, anniversary champagne surprise..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dfb85c]/40 bg-[#fbf9f5] text-sm text-[#081510] tot-input-focus resize-none"
                />
              </div>

              {/* Instant Simulation Notice */}
              <div className="flex items-center gap-2 text-xs text-[#58685e] pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant simulated table allocation pass with reference code. No payment required.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 rounded-full tot-btn-gold text-sm sm:text-base font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#081510] border-t-transparent rounded-full animate-spin" />
                    Allocating Table...
                  </span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Tall Candlelit Ambiance Photo (5 cols) matching screenshot */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] lg:min-h-full border border-[#dfb85c]/35 flex flex-col justify-end">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
              alt="The Olive Table Candlelit Dining"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081510] via-[#081510]/40 to-transparent" />

            {/* Inset Concierge Card at the bottom of the photo */}
            <div className="relative z-10 m-5 sm:m-6 p-5 sm:p-6 rounded-2xl bg-[#081510]/85 backdrop-blur-md border border-[#dfb85c]/35 text-[#f7f3ea] shadow-xl">
              <div className="flex items-center gap-2 text-[#dfb85c] text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Dining Concierge</span>
              </div>
              <h3 className="tot-font-serif text-base sm:text-lg font-bold text-[#f7f3ea] mb-1 leading-snug">
                Looking for Exclusive Private Salons?
              </h3>
              <p className="text-xs text-[#eadecc]/90 font-light leading-relaxed mb-3">
                For celebrations larger than 12 guests or bespoke wine cellar tastings, our Maître D' is at your service.
              </p>
              <a
                href="tel:+919332012109"
                className="inline-flex items-center gap-1.5 text-xs text-[#dfb85c] font-semibold hover:underline"
              >
                Direct Concierge Desk: +91 93320 12109
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
