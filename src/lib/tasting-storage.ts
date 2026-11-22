import { MenuItem, SelectedItem } from '../types/restaurant.types';

const STORAGE_KEY = 'tasting-list:v1';

interface StoredEntry {
  id: string;
  quantity: number;
}

/**
 * Restores the saved tasting list. Only dish ids and quantities are stored, so
 * menu edits are picked up on load and dishes that no longer exist are dropped.
 * Never throws: blocked storage, private windows and corrupt data all yield [].
 */
export function loadTasting(menu: MenuItem[]): SelectedItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const byId = new Map(menu.map((item) => [item.id, item]));
    const restored: SelectedItem[] = [];
    for (const entry of parsed as Partial<StoredEntry>[]) {
      const item = typeof entry?.id === 'string' ? byId.get(entry.id) : undefined;
      const quantity = Number(entry?.quantity);
      if (item && Number.isInteger(quantity) && quantity > 0) {
        restored.push({ item, quantity });
      }
    }
    return restored;
  } catch {
    return [];
  }
}

/** Saves the tasting list; silently does nothing if storage is unavailable. */
export function saveTasting(items: SelectedItem[]): void {
  try {
    const entries: StoredEntry[] = items.map(({ item, quantity }) => ({ id: item.id, quantity }));
    if (entries.length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  } catch {
    // Storage is optional: the list still works for this visit.
  }
}
