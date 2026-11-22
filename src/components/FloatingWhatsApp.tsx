import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    const message = encodeURIComponent(
      'Hello ReSolution! I just viewed "The Olive Table" restaurant website demo and I would love to discuss developing a premium website for my restaurant/business.'
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2.5">
      {/* Floating Action Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#15803d] to-[#22c55e] text-white shadow-[0_8px_25px_rgba(22,163,74,0.45)] hover:shadow-[0_12px_32px_rgba(22,163,74,0.6)] flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/40 relative group"
        aria-label="Contact ReSolution on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        
        {/* Subtle status pulse indicator */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold-400 border-2 border-forest-900 animate-pulse" />
      </button>

      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-forest-900/95 border border-gold-400/40 text-xs text-cream-100 shadow-2xl backdrop-blur-md animate-in fade-in duration-200">
          <span>Inquire about a website like this on WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-mist-400 hover:text-gold-400 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
