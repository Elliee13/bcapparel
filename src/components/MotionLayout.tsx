import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger, usePrefersReducedMotion } from "../motion";

interface MotionLayoutProps {
  children: React.ReactNode;
}

/**
 * MotionLayout wraps page content with Framer Motion transitions
 * Refreshes ScrollTrigger after page transitions complete
 */
export default function MotionLayout({ children }: MotionLayoutProps) {
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Refresh ScrollTrigger after route change completes
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  // If reduced motion, skip animations but still refresh ScrollTrigger
  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        exit={{ y: 0 }}
        transition={{
          duration: 0.28,
          ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth motion
        }}
        onAnimationComplete={() => {
          // Refresh ScrollTrigger after animation completes
          ScrollTrigger.refresh();
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
