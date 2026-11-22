import React, { useState, useMemo, useEffect } from 'react';
import './styles/restaurant.css';
import { RESTAURANT_INFO } from '@/config';

import { MenuItem, SelectedItem, ReservationConfirmation } from './types/restaurant.types';
import { ResolutionDemoBanner } from './components/ResolutionDemoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { TastingDrawer } from './components/TastingDrawer';
import { ChefSection } from './components/ChefSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ReservationSection } from './components/ReservationSection';
import { ReservationSuccessModal } from './components/ReservationSuccessModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { InquiryModal } from './components/InquiryModal';

export const RestaurantDemoPage: React.FC = () => {
  // Page title update
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${RESTAURANT_INFO.name} | Mediterranean Fine Dining (ReSolution Demo)`;
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Selected dish for details modal
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Tasting flight list
  const [tastingItems, setTastingItems] = useState<SelectedItem[]>([]);
  const [isTastingDrawerOpen, setIsTastingDrawerOpen] = useState(false);

  // Reservation confirmation state
  const [reservationConfirmation, setReservationConfirmation] = useState<ReservationConfirmation | null>(null);

  // ReSolution Agency inquiry modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Set of selected dish IDs for O(1) lookups
  const selectedDishIds = useMemo(() => {
    return new Set(tastingItems.map((item) => item.item.id));
  }, [tastingItems]);

  const totalTastingCount = useMemo(() => {
    return tastingItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [tastingItems]);

  // Toggle dish in tasting list
  const handleToggleTasting = (dish: MenuItem) => {
    setTastingItems((prev) => {
      const exists = prev.find((i) => i.item.id === dish.id);
      if (exists) {
        return prev.filter((i) => i.item.id !== dish.id);
      } else {
        return [...prev, { item: dish, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setTastingItems((prev) =>
      prev
        .map((i) => {
          if (i.item.id === dishId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as SelectedItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setTastingItems((prev) => prev.filter((i) => i.item.id !== dishId));
  };

  const handleClearAll = () => {
    setTastingItems([]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleProceedToBooking = () => {
    setIsTastingDrawerOpen(false);
    scrollToSection('reservation');
  };

  return (
    <div className="tot-restaurant-root min-h-screen flex flex-col bg-cream-50 text-charcoal-900 selection:bg-gold-400 selection:text-forest-900 overflow-x-hidden w-full relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-forest-900 focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Unified Sticky Header: Banner + Navbar */}
      <div className="sticky top-0 z-40 w-full shadow-md">
        <ResolutionDemoBanner onOpenInquiry={() => setIsInquiryModalOpen(true)} />
        <Navbar
          tastingCount={totalTastingCount}
          onOpenTastingDrawer={() => setIsTastingDrawerOpen(true)}
          onBookTableClick={() => scrollToSection('reservation')}
        />
      </div>

      {/* Main Page Body */}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* 3. Cinematic Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reservation')}
        />

        {/* 4. Restaurant Story / About Section with Overlapping 10-Yr Badge */}
        <StorySection />

        {/* 5. Signature Menu Section with Category Filters and Dish Cards */}
        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onAddToTasting={handleToggleTasting}
          selectedDishIds={selectedDishIds}
          onOpenTastingDrawer={() => setIsTastingDrawerOpen(true)}
        />

        {/* 6. Executive Chef Profile with Biography and Signature Quote */}
        <ChefSection />

        {/* 7. Interactive Restaurant and Food Gallery with Lightbox */}
        <GallerySection />

        {/* 8. Verified Diner Testimonials Carousel */}
        <TestimonialsSection />

        {/* 9. Interactive Table Reservation Form with Validation & Simulated Confirmation */}
        <ReservationSection
          onSuccess={(confirmation) => setReservationConfirmation(confirmation)}
          hasTastingMenuSelected={tastingItems.length > 0}
        />

        {/* 10. Contact, Hours, Valet & Location Section */}
        <ContactSection />
      </main>

      {/* 11. Premium Forest Green & Gold Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
      />

      {/* 12. Floating Controls */}
      <FloatingWhatsApp />
      <BackToTop />

      {/* 13. Interactive Modals */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onToggleTasting={handleToggleTasting}
        isSelected={selectedDish ? selectedDishIds.has(selectedDish.id) : false}
      />

      <TastingDrawer
        isOpen={isTastingDrawerOpen}
        onClose={() => setIsTastingDrawerOpen(false)}
        items={tastingItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        onProceedToBooking={handleProceedToBooking}
      />

      <ReservationSuccessModal
        confirmation={reservationConfirmation}
        onClose={() => setReservationConfirmation(null)}
      />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
};

export default RestaurantDemoPage;
