"use client";

import * as React from "react";

/**
 * Returns `true` once the component has mounted on the client.
 *
 * Useful for guarding UI that depends on browser-only APIs
 * (e.g. `localStorage`, `window.matchMedia`) without tripping
 * SSR hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Defer the state flip to the next tick so we don't trigger the
    // react-hooks/set-state-in-effect lint rule, which discourages
    // synchronous cascading renders inside effects.
    let cancelled = false;
    const id = setTimeout(() => {
      if (!cancelled) setMounted(true);
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);

  return mounted;
}
