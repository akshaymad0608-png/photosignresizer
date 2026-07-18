import { useState, useEffect, useCallback, useRef } from 'react';

/** Typed localStorage state that survives reloads and tolerates private mode. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota or private mode — state still works in memory */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export type ThemeMode = 'light' | 'dark' | 'system';

/** Theme with an explicit 'system' mode that tracks the OS preference live. */
export function useTheme() {
  const [mode, setMode] = useLocalStorage<ThemeMode>('pr:theme', 'system');

  const apply = useCallback((m: ThemeMode) => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = m === 'dark' || (m === 'system' && prefersDark);
    document.documentElement.classList.toggle('dark', dark);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#070a14' : '#fbfcfe');
  }, []);

  useEffect(() => {
    apply(mode);
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mode, apply]);

  const isDark =
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  return { mode, setMode, isDark };
}

/** Undo/redo stack. Bounded so long editing sessions can't grow without limit. */
export function useUndoRedo<T>(initial: T, limit = 40) {
  const [stack, setStack] = useState<T[]>([initial]);
  const [index, setIndex] = useState(0);

  const push = useCallback(
    (next: T) => {
      setStack(prev => {
        const trimmed = prev.slice(0, index + 1).concat([next]);
        return trimmed.length > limit ? trimmed.slice(trimmed.length - limit) : trimmed;
      });
      setIndex(i => Math.min(i + 1, limit - 1));
    },
    [index, limit]
  );

  const undo = useCallback(() => setIndex(i => Math.max(0, i - 1)), []);
  const redo = useCallback(() => setIndex(i => Math.min(stack.length - 1, i + 1)), [stack.length]);
  const reset = useCallback((v: T) => {
    setStack([v]);
    setIndex(0);
  }, []);

  return {
    state: stack[index],
    push,
    undo,
    redo,
    reset,
    canUndo: index > 0,
    canRedo: index < stack.length - 1,
  };
}

/** SSR-safe media query. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

type Handler = (e: KeyboardEvent) => void;

/**
 * Global hotkeys. Keys are normalised like 'mod+k' / 'mod+shift+z' / 'escape'.
 * Ignores keystrokes typed into inputs unless the combo uses a modifier.
 */
export function useHotkeys(map: Record<string, Handler>) {
  const ref = useRef(map);
  useEffect(() => { ref.current = map; });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      const parts: string[] = [];
      if (mod) parts.push('mod');
      if (e.shiftKey) parts.push('shift');
      if (e.altKey) parts.push('alt');
      parts.push(e.key.toLowerCase());
      const combo = parts.join('+');

      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);
      if (typing && !mod && e.key !== 'Escape') return;

      const fn = ref.current[combo];
      if (fn) {
        e.preventDefault();
        fn(e);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

/** Tracks vertical scroll past a threshold — used for the sticky glass header. */
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [threshold]);
  return scrolled;
}

/** Online/offline indicator for the offline-ready badge. */
export function useOnlineStatus() {
  const [online, setOnline] = useState(
    () => typeof navigator === 'undefined' || navigator.onLine
  );
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);
  return online;
}
