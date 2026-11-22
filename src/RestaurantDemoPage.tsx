import React, { lazy, useState, useMemo, useEffect } from 'react';
import { LoadOnFirstUse } from '@/lib/load-on-first-use';
import { LazySection, registerSectionLoader, scrollToSection } from '@/lib/lazy-section';
import './styles/restaurant.css';
import { AGENCY, MENU_ITEMS } from '@/config';
import { loadTasting, saveTasting } from '@/lib/tasting-storage';

import { MenuItem, SelectedItem, ReservationConfirmation } from './types/restaurant.types';
import { ResolutionDemoBanner } from './components/ResolutionDemoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';

// Modals load when first opened. They are also fetched on the first interaction, so the
// first open is instant and keyboard focus is not left behind while a chunk downloads.
const modalImports = {
  dish: () => import('./components/DishDetailModal'),
  drawer: () => import('./components/TastingDrawer'),
  success: () => import('./components/ReservationSuccessModal'),
  inquiry: () => import('./components/InquiryModal'),
};
const DishDetailModal = lazy(() =>
  modalImports.dish().then((m) => ({ default: m.DishDetailModal }))
);
const TastingDrawer = lazy(() => modalImports.drawer().then((m) => ({ default: m.TastingDrawer })));
const ReservationSuccessModal = lazy(() =>
  modalImports.success().then((m) => ({ default: m.ReservationSuccessModal }))
);
const InquiryModal = lazy(() => modalImports.inquiry().then((m) => ({ default: m.InquiryModal })));

// Below-the-fold sections load on demand. The same import functions let navigation
// clicks download everything before scrolling.
const sectionImports = {
  about: () => import('./components/StorySection'),
  menu: () => import('./components/MenuSection'),
  chef: () => import('./components/ChefSection'),
  gallery: () => import('./components/GallerySection'),
  reviews: () => import('./components/TestimonialsSection'),
  reservation: () => import('./components/ReservationSection'),
  contact: () => import('./components/ContactSection'),
};
const StorySection = lazy(() => sectionImports.about().then((m) => ({ default: m.StorySection })));
const MenuSection = lazy(() => sectionImports.menu().then((m) => ({ default: m.MenuSection })));
const ChefSection = lazy(() => sectionImports.chef().then((m) => ({ default: m.ChefSection })));
const GallerySection = lazy(() =>
  sectionImports.gallery().then((m) => ({ default: m.GallerySection }))
);
const TestimonialsSection = lazy(() =>
  sectionImports.reviews().then((m) => ({ default: m.TestimonialsSection }))
);
const ReservationSection = lazy(() =>
  sectionImports.reservation().then((m) => ({ default: m.ReservationSection }))
);
const ContactSection = lazy(() =>
  sectionImports.contact().then((m) => ({ default: m.ContactSection }))
);

export const RestaurantDemoPage: React.FC = () => {
  // Selected dish for details modal
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  // Tasting flight list
  const [tastingItems, setTastingItems] = useState<SelectedItem[]>(() => loadTasting(MENU_ITEMS));

  // Keep the tasting list across reloads
  useEffect(() => {
    saveTasting(tastingItems);
  }, [tastingItems]);
  const [isTastingDrawerOpen, setIsTastingDrawerOpen] = useState(false);

  // Reservation confirmation state
  const [reservationConfirmation, setReservationConfirmation] =
    useState<ReservationConfirmation | null>(null);

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
    setTastingItems(
      (prev) =>
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

  // Navigation needs every lazy section mounted so targets stay put while scrolling.
  const [mountAllSections, setMountAllSections] = useState(false);
  useEffect(() => {
    registerSectionLoader(async () => {
      setMountAllSections(true);
      await Promise.all(Object.values(sectionImports).map((load) => load()));
    });
  }, []);

  // Fetch the modal chunks on the visitor's first interaction, so the first open is
  // instant but the initial page load is untouched. Pressing Tab counts, so keyboard
  // users get the chunks well before they reach a button.
  useEffect(() => {
    const events = ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'scroll'] as const;
    const prefetch = () => {
      events.forEach((name) => window.removeEventListener(name, prefetch));
      Object.values(modalImports).forEach((load) => void load());
    };
    events.forEach((name) =>
      window.addEventListener(name, prefetch, { passive: true, once: true })
    );
    return () => events.forEach((name) => window.removeEventListener(name, prefetch));
  }, []);

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
        <LazySection id="about" placeholderClass="min-h-[1250px]" force={mountAllSections}>
          <StorySection />
        </LazySection>

        {/* 5. Signature Menu Section with Category Filters and Dish Cards */}
        <LazySection
          id="menu"
          placeholderClass="min-h-[6050px] md:min-h-[3500px]"
          force={mountAllSections}
        >
          <MenuSection
            onSelectDish={(dish) => setSelectedDish(dish)}
            onAddToTasting={handleToggleTasting}
            selectedDishIds={selectedDishIds}
            onOpenTastingDrawer={() => setIsTastingDrawerOpen(true)}
          />
        </LazySection>

        {/* 6. Executive Chef Profile with Biography and Signature Quote */}
        <LazySection
          id="chef"
          placeholderClass="min-h-[1450px] md:min-h-[1400px]"
          force={mountAllSections}
        >
          <ChefSection />
        </LazySection>

        {/* 7. Interactive Restaurant and Food Gallery with Lightbox */}
        <LazySection
          id="gallery"
          placeholderClass="min-h-[2550px] md:min-h-[2000px]"
          force={mountAllSections}
        >
          <GallerySection />
        </LazySection>

        {/* 8. Verified Diner Testimonials Carousel */}
        <LazySection
          id="reviews"
          placeholderClass="min-h-[1000px] md:min-h-[765px]"
          force={mountAllSections}
        >
          <TestimonialsSection />
        </LazySection>

        {/* 9. Interactive Table Reservation Form with Validation & Simulated Confirmation */}
        <LazySection
          id="reservation"
          placeholderClass="min-h-[1650px] md:min-h-[1420px]"
          force={mountAllSections}
        >
          <ReservationSection
            onSuccess={(confirmation) => setReservationConfirmation(confirmation)}
            hasTastingMenuSelected={tastingItems.length > 0}
          />
        </LazySection>

        {/* 10. Contact, Hours, Valet & Location Section */}
        <LazySection
          id="contact"
          placeholderClass="min-h-[1750px] md:min-h-[1350px]"
          force={mountAllSections}
        >
          <ContactSection />
        </LazySection>
      </main>

      {/* 11. Premium Forest Green & Gold Footer */}
      <Footer onNavigate={scrollToSection} onOpenInquiry={() => setIsInquiryModalOpen(true)} />

      {/* 12. Floating Controls */}
      <FloatingWhatsApp />
      <BackToTop />

      {/* 13. Interactive Modals */}
      <LoadOnFirstUse when={!!selectedDish}>
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onToggleTasting={handleToggleTasting}
          isSelected={selectedDish ? selectedDishIds.has(selectedDish.id) : false}
        />
      </LoadOnFirstUse>

      <LoadOnFirstUse when={isTastingDrawerOpen}>
        <TastingDrawer
          isOpen={isTastingDrawerOpen}
          onClose={() => setIsTastingDrawerOpen(false)}
          items={tastingItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearAll={handleClearAll}
          onProceedToBooking={handleProceedToBooking}
        />
      </LoadOnFirstUse>

      <LoadOnFirstUse when={!!reservationConfirmation}>
        <ReservationSuccessModal
          confirmation={reservationConfirmation}
          onClose={() => setReservationConfirmation(null)}
        />
      </LoadOnFirstUse>

      <LoadOnFirstUse when={AGENCY.enabled && isInquiryModalOpen}>
        <InquiryModal isOpen={isInquiryModalOpen} onClose={() => setIsInquiryModalOpen(false)} />
      </LoadOnFirstUse>
    </div>
  );
};

export default RestaurantDemoPage;
