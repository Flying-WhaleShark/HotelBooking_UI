import { useScrollToTop } from '../hooks';

/**
 * Renders nothing; runs useScrollToTop to scroll to top on route change.
 * Place once inside the router (e.g. in App) so every navigation scrolls to top.
 */
export function ScrollToTop() {
  useScrollToTop();
  return null;
}
