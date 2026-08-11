import { useCallback, useEffect, useState } from 'react';

/** True once the ref'd element has entered the viewport. Stays true afterwards
 *  (one-shot reveal, not a repeating scroll-spy).
 *
 *  Uses a callback ref (not useRef) so the observer re-attaches correctly when
 *  the element mounts later than the first render — e.g. a section that
 *  renders `null` until async data arrives, then mounts for real. A plain
 *  useRef's effect only runs once on mount, when `.current` is still null in
 *  that case, and never re-fires once the node actually shows up. */
export const useInView = <T extends HTMLElement>(threshold = 0.15) => {
    const [node, setNode] = useState<T | null>(null);
    const [inView, setInView] = useState(false);

    const ref = useCallback((el: T | null) => {
        setNode(el);
    }, []);

    useEffect(() => {
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [node, threshold]);

    return { ref, inView };
};
