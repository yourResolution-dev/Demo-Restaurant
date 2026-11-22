import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap [&_svg]:size-3',
  {
    variants: {
      variant: {
        gold: 'border-gold-400/50 bg-gold-400/15 text-gold-700',
        dark: 'border-gold-400/40 bg-forest-800 text-gold-400',
        muted: 'border-transparent bg-cream-100 text-charcoal-500',
      },
    },
    defaultVariants: { variant: 'gold' },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
