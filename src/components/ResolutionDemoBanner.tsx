import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ResolutionDemoBannerProps {
  onOpenInquiry?: () => void;
}

export const ResolutionDemoBanner: React.FC<ResolutionDemoBannerProps> = ({ onOpenInquiry }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hi ReSolution Team! I explored "The Olive Table" restaurant demo and I am interested in building a luxury website for my business.'
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <aside
      aria-label="Demo notice and resolution options"
      className="bg-[#050d0a] text-xs sm:text-sm text-[#f7f3ea] border-b border-[#cfa138]/20 py-2 sm:py-2.5 px-3 sm:px-6 w-full"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Left: Back Link & Showcase Tag */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-[#dfb85c] hover:text-[#fbf5e6] font-medium transition-colors group cursor-pointer text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to ReSolution</span>
          </button>
          <span className="hidden sm:inline-block text-[#58685e]">|</span>
          <span className="inline-flex items-center gap-1.5 text-[#eadecc] font-light text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-[#dfb85c]">ReSolution Showcase:</span>
            <span className="hidden md:inline">The Olive Table Luxury Mediterranean Dining</span>
          </span>
        </div>

        {/* Right: CTA Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#10261d] border border-[#cfa138]/40 text-[#dfb85c] hover:bg-[#cfa138] hover:text-[#081510] transition-all cursor-pointer font-medium text-[11px] sm:text-xs"
          >
            <MessageSquare className="w-3 h-3" />
            <span>WhatsApp Us</span>
          </button>

          <button
            onClick={onOpenInquiry || handleWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#dfb85c] to-[#cfa138] text-[#081510] font-semibold hover:shadow-[0_0_15px_rgba(223,184,92,0.4)] transition-all cursor-pointer text-[11px] sm:text-xs"
          >
            <Sparkles className="w-3 h-3" />
            <span>Want a Website Like This?</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
