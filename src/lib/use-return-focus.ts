import * as React from 'react';

/**
 * Radix modals return focus to their Trigger on close. Our dialogs are opened by
 * state from elsewhere on the page (no Trigger), so remember what had focus
 * when the dialog opened and put it back when it closes.
 */
export function useReturnFocus() {
  const previous = React.useRef<HTMLElement | null>(null);

  return {
    onOpenAutoFocus: () => {
      previous.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    },
    onCloseAutoFocus: (event: Event) => {
      const el = previous.current;
      if (el && el.isConnected) {
        event.preventDefault();
        el.focus();
      }
    },
  };
}
