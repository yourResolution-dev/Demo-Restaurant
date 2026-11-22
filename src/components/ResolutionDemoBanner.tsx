import React from 'react';
import { Sparkles, ArrowLeft, MessageSquare } from 'lucide-react';
import { AGENCY, RESTAURANT_INFO } from '@/config';

interface ResolutionDemoBannerProps {
  onOpenInquiry?: () => void;
}

export const ResolutionDemoBanner: React.FC<ResolutionDemoBannerProps> = ({ onOpenInquiry }) => {
  if (!AGENCY.enabled) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi ${AGENCY.name} Team! I explored "${RESTAURANT_INFO.brandName}" restaurant demo and I am interested in building a luxury website for my business.`
    );
    window.open(`https://wa.me/${AGENCY.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <aside
      aria-label="Demo notice and resolution options"
      className="bg-forest-950 text-xs sm:text-sm text-cream-100 border-b border-gold-500/20 py-2 sm:py-2.5 px-3 sm:px-6 w-full"
    >
      <div className="max-w-7xl mx-auto flex flex-row flex-wrap items-center justify-between gap-x-3 gap-y-1 sm:gap-4">
        {/* Left: Back Link & Showcase Tag */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-start">
          <a
            href={AGENCY.homeUrl}
            className="inline-flex items-center gap-1.5 py-1 text-gold-400 hover:text-gold-100 font-medium transition-colors group cursor-pointer text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to {AGENCY.name}</span>
          </a>
          <span className="hidden sm:inline-block text-charcoal-500">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-sand-200 font-light text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-gold-400">{AGENCY.name} Showcase:</span>
            <span className="hidden lg:inline">
              {RESTAURANT_INFO.brandName} Luxury Mediterranean Dining
            </span>
          </span>
        </div>

        {/* Right: CTA Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleWhatsApp}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-800 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-forest-900 transition-all cursor-pointer font-medium text-[11px] sm:text-xs"
          >
            <MessageSquare className="w-3 h-3" />
            <span>WhatsApp Us</span>
          </button>

          <button
            onClick={onOpenInquiry || handleWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-forest-900 font-semibold hover:shadow-[0_0_15px_rgba(223,184,92,0.4)] transition-all cursor-pointer text-[11px] sm:text-xs"
          >
            <Sparkles className="w-3 h-3" />
            <span>Want a Website Like This?</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
