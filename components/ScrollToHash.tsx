import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not scroll to #hash targets on its own, so links like
 * `/#resize` changed the URL and appeared to do nothing. This watches the
 * location and scrolls to the element once the route has painted.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // A plain route change should start at the top.
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));

    // The target may be inside a lazily-rendered tab, so retry briefly
    // instead of giving up on the first miss.
    let attempts = 0;
    let frame = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts++ < 20) frame = requestAnimationFrame(tryScroll);
    };

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
