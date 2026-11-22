import * as React from 'react';
import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface FieldProps {
  label: string;
  /** Rendered as the control's id; also wires label and error for a11y. */
  id: string;
  error?: string;
  className?: string;
  labelClassName?: string;
  /** Receives the props the control must spread to stay accessible. */
  children: (control: {
    id: string;
    'aria-invalid': boolean | undefined;
    'aria-describedby': string | undefined;
  }) => React.ReactNode;
}

/** Label + control + error message with correct aria wiring. */
function Field({ label, id, error, className, labelClassName, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div data-slot="field" className={className}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
      </Label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <span
          id={errorId}
          role="alert"
          className={cn('mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600')}
        >
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </span>
      )}
    </div>
  );
}

export { Field };
