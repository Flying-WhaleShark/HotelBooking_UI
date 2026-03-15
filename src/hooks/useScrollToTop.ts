import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Scrolls window to top when route pathname changes.
 * Use inside a route tree so location updates on navigation.
 */
export function useScrollToTop(): void {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
