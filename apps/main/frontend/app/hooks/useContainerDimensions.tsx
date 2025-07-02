import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useContainerDimensions<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    setDimensions({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight
    });
  }, [containerRef.current]);

  const observer = useMemo(() => {
    if (typeof window === 'undefined') {
      return;
    }
    return new ResizeObserver(() => {
      updateDimensions();
    });
  }, [updateDimensions]);

  useEffect(() => {
    if (!containerRef.current || !observer) return;
    const container = containerRef.current;

    observer.observe(container);
    return () => observer.unobserve(container);
  }, [containerRef, observer]);

  return { containerRef, dimensions };
}
