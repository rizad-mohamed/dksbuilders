type ScrollOptions = NonNullable<Parameters<typeof import("motion").scroll>[1]>;

// Load the DOM animation engine only when its section approaches the viewport.
export function observeScroll(
  update: (progress: number) => void,
  options?: ScrollOptions,
  fallback?: () => void,
) {
  let disposed = false;
  let stop: (() => void) | undefined;
  let observer: IntersectionObserver | undefined;
  const start = () => {
    observer?.disconnect();
    void import("motion")
      .then(({ scroll }) => {
        if (!disposed) stop = scroll(update, options);
      })
      .catch(() => {
        if (!disposed) fallback?.();
      });
  };
  if (options?.target) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
      },
      { rootMargin: "200px" },
    );
    observer.observe(options.target);
  } else start();
  return () => {
    disposed = true;
    observer?.disconnect();
    stop?.();
  };
}
