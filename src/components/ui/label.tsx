import * as React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-forest-900 select-none',
        className
      )}
      {...props}
    />
  );
}

export { Label };
