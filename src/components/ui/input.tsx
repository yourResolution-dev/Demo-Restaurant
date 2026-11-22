import * as React from 'react';

import { cn } from '@/lib/utils';

const controlClasses =
  'w-full rounded-xl border border-input bg-cream-50 px-4 py-2.5 text-sm text-forest-900 transition-colors outline-none placeholder:text-charcoal-500/60 focus-visible:border-gold-500 focus-visible:ring-[3px] focus-visible:ring-gold-500/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:bg-red-50/50 aria-invalid:ring-red-500/20';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn(controlClasses, className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(controlClasses, 'resize-none', className)}
      {...props}
    />
  );
}

export { Input, Textarea, controlClasses };
