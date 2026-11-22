import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  /** The id the real section renders, so anchor links work before it mounts. */
  id: string;
  /** Tailwind min-height classes that roughly match the real section's height. */
  placeholderClass: string;
  /** Mount immediately (set after a navigation click). */
  force: boolean;
  children: ReactNode;
}

/**
 * Defers a below-the-fold section until it is about to scroll into view. The
 * placeholder keeps the section's id and approximate height, so the page does not
 * jump and anchor links still have a target.
 */
export function LazySection({ id, placeholderClass, force, children }: LazySectionProps) {
  // Without IntersectionObserver (very old browsers) mount everything straight away.
  const [nearViewport, setNearViewport] = useState(() => !('IntersectionObserver' in window));
  const placeholderRef = useRef<HTMLDivElement>(null);
  const shouldMount = nearViewport || force;

  useEffect(() => {
    const el = placeholderRef.current;
    if (shouldMount || !el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setNearViewport(true);
      },
      { rootMargin: '700px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  const placeholder = (
    <div id={id} data-lazy-placeholder="" aria-hidden="true" className={placeholderClass} />
  );

  if (!shouldMount) return <div ref={placeholderRef}>{placeholder}</div>;
  return <Suspense fallback={placeholder}>{children}</Suspense>;
}

// --- Navigation -----------------------------------------------------------

let loadAllSections: () => Promise<void> = async () => {};

/** The page registers how to download and mount every lazy section. */
export function registerSectionLoader(loader: () => Promise<void>) {
  loadAllSections = loader;
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/**
 * Smooth-scrolls to a section. Lazy sections above the target are loaded and
 * mounted first, so the target does not move while the page scrolls.
 */
export async function scrollToSection(id: string, yOffset = -80) {
  await loadAllSections();

  let el = document.getElementById(id);
  for (let i = 0; i < 90 && el?.hasAttribute('data-lazy-placeholder'); i++) {
    await nextFrame();
    el = document.getElementById(id);
  }
  if (!el) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
  window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
}
