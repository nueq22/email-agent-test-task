import {
  type ComponentType,
  type RefObject,
  useLayoutEffect,
  useRef,
} from "react";

export function withScrollRestoration<P extends object>(
  WrappedComponent: ComponentType<P & { scrollRef: RefObject<HTMLElement> }>,
) {
  const ScrollRestoringComponent = (props: P) => {
    const scrollRef = useRef<HTMLElement>(null!);
    const scrollTop = useRef<number>(0);

    useLayoutEffect(() => {
      const el = scrollRef.current;
      if (el) {
        scrollTop.current = el.scrollTop;
      }

      return () => {
        if (el) scrollTop.current = el.scrollTop;
      };
    });

    useLayoutEffect(() => {
      const el = scrollRef.current;
      if (el) {
        el.scrollTop = scrollTop.current;
      }
    });

    return <WrappedComponent {...props} scrollRef={scrollRef} />;
  };

  ScrollRestoringComponent.displayName = "withScrollRestoration";

  return ScrollRestoringComponent;
}
