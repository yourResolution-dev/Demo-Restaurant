import React from 'react';
import { MapPin, Phone, Mail, Clock, Car, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '@/config';
import { ResponsiveImage } from '@/components/ui/responsive-image';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-cream-100 text-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching reference mockup */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="tot-font-display italic text-gold-500 text-xl sm:text-2xl font-normal block mb-1">
            Connect With Us
          </span>
          <h2 className="tot-font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight mb-3">
            We'd Love to Hear From You
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
            Whether inquiring about private salon bookings, custom tasting flights, or culinary collaborations, our hospitality team is here to assist.
          </p>
        </div>

        {/* 2-Column Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Concierge Hostess welcoming guests (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col justify-end">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[400px] sm:h-[460px] lg:h-full min-h-[400px]">
              <ResponsiveImage
 sizes="(min-width:1024px) 40vw, 100vw"
                src="/images/photo-1581299894007-aaa50297cf16-960.webp"
                alt={`${RESTAURANT_INFO.brandName} Front Desk Concierge`}
                className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-cream-100">
                <div className="w-10 h-0.5 bg-gold-400 mb-2" />
                <h3 className="tot-font-serif text-xl sm:text-2xl font-bold text-cream-100">
                  Elena Vardalos
                </h3>
                <p className="text-xs text-gold-400 font-light uppercase tracking-wider">
                  Head Concierge & Guest Relations
                </p>
                <p className="text-xs text-sand-200 font-light mt-1.5 leading-relaxed">
                  "We look forward to curating an evening you will cherish for years to come."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Cards Grid (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-white border border-gold-400/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="tot-font-serif text-base font-bold text-forest-900 mb-1">
                    Our Location
                  </h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed mb-3">
                    {RESTAURANT_INFO.address}
                  </p>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-gold-500 hover:text-gold-700 font-semibold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-white border border-gold-400/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="tot-font-serif text-base font-bold text-forest-900 mb-1">
                    Call & Concierge
                  </h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed mb-3">
                    Direct table reservations, sommelier inquiries & private event bookings.
                  </p>
                </div>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-xs text-gold-500 hover:text-gold-700 font-semibold block"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-gold-400/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="tot-font-serif text-base font-bold text-forest-900 mb-1">
                    Email Inquiries
                  </h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed mb-3">
                    Press, media tastings, brand partnerships & catering requests.
                  </p>
                </div>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-xs text-gold-500 hover:text-gold-700 font-semibold block"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </div>

              {/* Opening Hours Card */}
              <div className="p-5 rounded-2xl bg-white border border-gold-400/30 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-400 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="tot-font-serif text-base font-bold text-forest-900 mb-1">
                    Opening Hours
                  </h3>
                  <div className="space-y-1 text-xs text-charcoal-500">
                    <div className="flex justify-between">
                      <span>Lunch:</span>
                      <span className="font-semibold text-forest-900">{RESTAURANT_INFO.hours.lunch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dinner:</span>
                      <span className="font-semibold text-forest-900">{RESTAURANT_INFO.hours.dinner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Brunch:</span>
                      <span className="font-semibold text-forest-900">{RESTAURANT_INFO.hours.weekendBrunch}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-gold-500 font-medium pt-2 block">
                  {RESTAURANT_INFO.hours.cocktailLounge}
                </span>
              </div>
            </div>

            {/* Valet & Dress Code Banner */}
            <div className="p-4 rounded-2xl bg-cream-150 border border-gold-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-forest-900">
                <Car className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="font-medium">Complimentary Valet Parking available at main courtyard entry.</span>
              </div>
              <span className="text-charcoal-500 whitespace-nowrap bg-white/70 px-2.5 py-1 rounded-full border border-gold-400/20">
                Dress Code: Smart Casual
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
