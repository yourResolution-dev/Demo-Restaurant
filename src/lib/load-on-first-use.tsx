import { Suspense, useState, type ReactNode } from 'react';

interface LoadOnFirstUseProps {
  /** Becomes true when the lazy content is first needed (e.g. a modal opens). */
  when: boolean;
  children: ReactNode;
}

/**
 * Keeps lazy-loaded UI (modals, drawers) out of the initial render and the
 * initial JS download. Once `when` has been true, the children stay mounted so
 * their close animations and state keep working.
 */
export function LoadOnFirstUse({ when, children }: LoadOnFirstUseProps) {
  const [needed, setNeeded] = useState(when);
  if (when && !needed) setNeeded(true);

  return needed ? <Suspense fallback={null}>{children}</Suspense> : null;
}
