import * as React from 'react';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  /** Small italic line above the title. */
  kicker: string;
  /** The section's `h2`. */
  title: string;
  /** Intro paragraph under the gold rule (light sections). */
  description?: React.ReactNode;
  /** `light` for cream backgrounds, `dark` for forest-green ones. */
  tone?: 'light' | 'dark';
  align?: 'center' | 'left';
  /** Width and bottom margin, e.g. `max-w-3xl mb-10 sm:mb-14`. */
  className?: string;
  /** Extra content after the rule, such as a rating row. */
  children?: React.ReactNode;
}

const tones = {
  light: { kicker: 'text-gold-700', title: 'text-forest-900', rule: 'bg-gold-500' },
  dark: { kicker: 'text-gold-400', title: 'text-cream-100', rule: 'bg-gold-400' },
};

/** Kicker, title, gold rule and optional intro that open every page section. */
function SectionHeading({
  kicker,
  title,
  description,
  tone = 'light',
  align = 'center',
  className,
  children,
}: SectionHeadingProps) {
  const t = tones[tone];
  const centered = align === 'center';
  const hasBelow = Boolean(description || children);

  return (
    <div
      data-slot="section-heading"
      className={cn(centered ? 'mx-auto text-center' : 'space-y-1.5', className)}
    >
      <span
        className={cn(
          'tot-font-display block font-normal italic',
          centered ? 'mb-1 text-xl sm:text-2xl' : 'text-2xl',
          t.kicker
        )}
      >
        {kicker}
      </span>
      <h2
        className={cn(
          'tot-font-serif text-3xl font-bold sm:text-4xl lg:text-5xl',
          centered ? 'mb-3 tracking-tight' : 'leading-tight',
          t.title
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          'h-0.5',
          t.rule,
          centered
            ? cn('mx-auto', tone === 'dark' ? 'w-20' : 'w-16', hasBelow && 'mb-3')
            : 'mt-2.5 w-16'
        )}
      />
      {description && (
        <p className="text-xs font-light leading-relaxed text-charcoal-500 sm:text-sm">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export { SectionHeading };
