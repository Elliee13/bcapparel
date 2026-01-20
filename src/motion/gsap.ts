import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin (only once)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Set GSAP defaults for subtle, high-end animations
gsap.config({
  nullTargetWarn: false,
});

// Default ease for smooth animations
gsap.defaults({
  ease: "power3.out",
});

export { gsap, ScrollTrigger };
