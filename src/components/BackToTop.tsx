import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-forest-800/90 text-gold-400 hover:bg-gold-400 hover:text-forest-900 border border-gold-400/40 shadow-xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md animate-in fade-in zoom-in duration-200"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
