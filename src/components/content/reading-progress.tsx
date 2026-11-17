import { useEffect, useState } from "react";

/** Thin gradient bar that tracks how far the reader has scrolled. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-0.5">
      <div
        className="h-full bg-gradient-to-r from-gold via-primary to-gold transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
