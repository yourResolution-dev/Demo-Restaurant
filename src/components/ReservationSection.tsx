import React, { useState } from 'react';
import { Calendar, Sparkles, CheckCircle2, Utensils } from 'lucide-react';
import { ReservationFormData, ReservationConfirmation } from '../types/restaurant.types';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input, Textarea } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const setField = <K extends keyof ReservationFormData>(key: K, value: ReservationFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

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
    <section id="reservation" className="py-16 sm:py-20 lg:py-28 bg-cream-50 text-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="tot-font-display italic text-gold-500 text-xl sm:text-2xl font-normal block mb-1">
            Book Your Table
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight mb-3">
            Make a Reservation
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
            Reserve your table for an evening of sensory indulgence. We recommend booking at least 24 hours in advance for prime weekend dinner slots.
          </p>
        </div>

        {/* 2-Column Desktop / Stacked Mobile Layout matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-card rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gold-400/30 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>

              {/* Optional Tasting Menu Indicator */}
              {hasTastingMenuSelected && (
                <div className="p-3 rounded-xl bg-forest-800/10 border border-gold-400/40 flex items-center gap-2.5 text-xs text-forest-900">
                  <Utensils className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span>
                    <strong>Tasting Flight Linked:</strong> Your selected courses will be forwarded to Chef Marco's kitchen.
                  </span>
                </div>
              )}

              {/* Row 1: Full Name and Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="res-fullName" label="Full Name *" error={errors.fullName}>
                  {(c) => (
                    <Input
                      {...c}
                      type="text"
                      placeholder="e.g. Ranajit Gupta"
                      value={formData.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                    />
                  )}
                </Field>

                <Field id="res-phone" label="Phone Number *" error={errors.phone}>
                  {(c) => (
                    <Input
                      {...c}
                      type="tel"
                      placeholder="e.g. +91 93320 12109"
                      value={formData.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                    />
                  )}
                </Field>
              </div>

              {/* Row 2: Email and Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="res-email" label="Email Address *" error={errors.email}>
                  {(c) => (
                    <Input
                      {...c}
                      type="email"
                      placeholder="e.g. ranajit@example.com"
                      value={formData.email}
                      onChange={(e) => setField('email', e.target.value)}
                    />
                  )}
                </Field>

                <Field id="res-guests" label="Number of Guests *" error={errors.guests}>
                  {(c) => (
                    <Select
                      value={String(formData.guests)}
                      onValueChange={(v) => setFormData({ ...formData, guests: Number(v) })}
                    >
                      <SelectTrigger {...c}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} {num === 1 ? 'Guest (Solo Dining)' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              </div>

              {/* Row 3: Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="res-date" label="Reservation Date *" error={errors.date}>
                  {(c) => (
                    <Input
                      {...c}
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => setField('date', e.target.value)}
                      className="cursor-pointer"
                    />
                  )}
                </Field>

                <Field id="res-time" label="Preferred Time Slot *">
                  {(c) => (
                    <Select
                      value={formData.timeSlot}
                      onValueChange={(v) => setFormData({ ...formData, timeSlot: v })}
                    >
                      <SelectTrigger {...c}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              </div>

              {/* Row 4: Seating Preference and Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="res-seating" label="Seating Preference">
                  {(c) => (
                    <Select
                      value={formData.seatingArea}
                      onValueChange={(v) =>
                        setFormData({ ...formData, seatingArea: v as ReservationFormData['seatingArea'] })
                      }
                    >
                      <SelectTrigger {...c}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Main Dining Room">Main Dining Room (Chandelier Hall)</SelectItem>
                        <SelectItem value="Garden Terrace">Garden Terrace (Alfresco Olive Trees)</SelectItem>
                        <SelectItem value="Chef's Counter">Chef's Counter (Live Open Kitchen)</SelectItem>
                        <SelectItem value="Private Wine Cellar">Private Wine Cellar (Exclusive VIP)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>

                <Field id="res-occasion" label="Dining Occasion">
                  {(c) => (
                    <Select
                      value={formData.occasion}
                      onValueChange={(v) =>
                        setFormData({ ...formData, occasion: v as ReservationFormData['occasion'] })
                      }
                    >
                      <SelectTrigger {...c}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Romantic Date">Romantic Date / Couple</SelectItem>
                        <SelectItem value="Anniversary">Wedding / Relationship Anniversary</SelectItem>
                        <SelectItem value="Birthday Celebration">Birthday Celebration</SelectItem>
                        <SelectItem value="Business Dinner">Executive / Corporate Meeting</SelectItem>
                        <SelectItem value="Casual Dining">Casual Fine Dining</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
              </div>

              {/* Special Requests */}
              <Field id="res-notes" label="Special Notes or Allergies">
                {(c) => (
                  <Textarea
                    {...c}
                    rows={2}
                    placeholder="e.g. Dietary preferences, quiet corner table, anniversary champagne surprise..."
                    value={formData.specialRequests}
                    onChange={(e) => setField('specialRequests', e.target.value)}
                  />
                )}
              </Field>

              {/* Instant Simulation Notice */}
              <div className="flex items-center gap-2 text-xs text-charcoal-500 pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant simulated table allocation pass with reference code. No payment required.</span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 text-sm sm:text-base shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-forest-900 border-t-transparent rounded-full animate-spin" />
                    Allocating Table...
                  </span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </Button>

            </form>
          </div>

          {/* Right Column: Tall Candlelit Ambiance Photo (5 cols) matching screenshot */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl min-h-[420px] lg:min-h-full border border-gold-400/35 flex flex-col justify-end">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
              alt="The Olive Table Candlelit Dining"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/40 to-transparent" />

            {/* Inset Concierge Card at the bottom of the photo */}
            <div className="relative z-10 m-5 sm:m-6 p-5 sm:p-6 rounded-2xl bg-forest-900/85 backdrop-blur-md border border-gold-400/35 text-cream-100 shadow-xl">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Dining Concierge</span>
              </div>
              <h3 className="tot-font-serif text-base sm:text-lg font-bold text-cream-100 mb-1 leading-snug">
                Looking for Exclusive Private Salons?
              </h3>
              <p className="text-xs text-sand-200/90 font-light leading-relaxed mb-3">
                For celebrations larger than 12 guests or bespoke wine cellar tastings, our Maître D' is at your service.
              </p>
              <a
                href="tel:+919332012109"
                className="inline-flex items-center gap-1.5 text-xs text-gold-400 font-semibold hover:underline"
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
