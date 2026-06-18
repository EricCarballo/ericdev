import { useEffect, useRef } from 'react';

export function useIntersectionOnce(onIntersect: () => void, threshold = 0.25) {
  const ref = useRef<HTMLElement>(null);
  const hasTriggeredRef = useRef(false);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasTriggeredRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;
        observer.disconnect();
        onIntersectRef.current();
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
