import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Brand call-to-action: gold gradient on forest text. */
        gold:
          'rounded-full border border-gold-100/30 bg-gradient-to-br from-[#e4be68] via-gold-500 to-[#b38426] text-forest-900 tracking-wide shadow-[0_4px_16px_rgba(207,161,56,0.28)] hover:-translate-y-0.5 hover:from-gold-300 hover:via-gold-400 hover:to-gold-500 hover:shadow-[0_8px_25px_rgba(207,161,56,0.42)] active:translate-y-0',
        /** Gold outline on dark surfaces. */
        outline:
          'rounded-full border border-gold-400/55 bg-forest-850/45 text-cream-100 backdrop-blur-sm hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400/20 hover:text-gold-400',
        /** Filled forest pill with gold text, inverts on hover. */
        secondary:
          'rounded-full border border-gold-400/40 bg-forest-800 text-gold-400 hover:bg-gold-400 hover:text-forest-900',
        ghost:
          'rounded-full text-mist-400 hover:bg-forest-800 hover:text-gold-400',
        whatsapp:
          'rounded-full bg-green-600 text-white shadow-md hover:bg-green-700',
        destructive:
          'rounded-full bg-destructive text-white hover:bg-destructive/90',
      },
      size: {
        default: 'px-6 py-2.5 text-xs',
        sm: 'px-4 py-2 text-xs',
        lg: 'px-8 py-3.5 text-sm',
        icon: 'size-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'gold',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      type={asChild ? type : (type ?? 'button')}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
