import { useRef, useEffect } from "react";
import Container from "../components/Container";
import { useHeroIntro, useGsapScope, gsap, ScrollTrigger, usePrefersReducedMotion } from "../motion";

const PARAGRAPHS = [
  {
    id: "p1",
    text: "We are a promotional product distributor and a proud member of the Advertising Specialty Institute (ASI), helping businesses elevate their brand through custom apparel and promotional products.",
  },
  {
    id: "p2",
    text: "Promotional products—often called ad specialties—are part of a nearly $22 billion industry and are trusted by businesses nationwide for their ability to create lasting brand impressions at a lower cost per impression than traditional advertising.",
  },
  {
    id: "p3",
    text: "With access to over 3,000 suppliers, we offer an extensive selection of promotional products designed to support brand visibility, engagement, and long-term customer relationships.",
  },
];

const STATS = [
  {
    value: "$22B",
    label: "Promotional Products Industry",
  },
  {
    value: "3,000+",
    label: "Trusted Suppliers",
  },
  {
    value: "Lower Cost per Impression",
    label: "Compared to Traditional Advertising",
  },
];

export default function AboutPage() {
  const scopeRef = useGsapScope<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const statRefs = useRef<Array<HTMLDivElement | null>>([]);
  const missionWrapRef = useRef<HTMLDivElement>(null);
  const missionTitleRef = useRef<HTMLHeadingElement>(null);
  const missionTextRef = useRef<HTMLParagraphElement>(null);

  // Hero intro timeline
  useHeroIntro({
    elements: [
      { ref: eyebrowRef, delay: 0, y: 10, opacity: 0 },
      { ref: headlineRef, delay: 0.1, y: 18, opacity: 0 },
      { ref: scrollHintRef, delay: 0.2, y: 8, opacity: 0 },
    ],
  });

  // Custom ScrollTriggers for progress line and scroll hint
  useEffect(() => {
    if (!scopeRef.current || prefersReducedMotion) {
      if (prefersReducedMotion && lineProgressRef.current) {
        gsap.set(lineProgressRef.current, { scaleY: 1, transformOrigin: "top" });
      }
      return;
    }

    let cancelled = false;

    const init = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        // Hide scroll hint when line section enters
        if (lineWrapRef.current && scrollHintRef.current) {
          ScrollTrigger.create({
            trigger: lineWrapRef.current,
            start: "top top+=80",
            onEnter: () => {
              gsap.to(scrollHintRef.current, { opacity: 0, duration: 0.4 });
            },
          });
        }

        // Progress line scrub animation
        if (lineWrapRef.current && lineProgressRef.current) {
          gsap.set(lineProgressRef.current, { scaleY: 0, transformOrigin: "top" });
          ScrollTrigger.create({
            trigger: lineWrapRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
            animation: gsap.to(lineProgressRef.current, {
              scaleY: 1,
              ease: "none",
            }),
          });
        }
      }, scopeRef);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => {
        cleanup = init() || undefined;
      }, { timeout: 120 });
    } else {
      requestAnimationFrame(() => {
        setTimeout(() => {
          cleanup = init() || undefined;
        }, 0);
      });
    }

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [scopeRef, prefersReducedMotion]);

  // Paragraph reveals - using refs array
  useEffect(() => {
    if (!scopeRef.current || prefersReducedMotion) return;

    const paragraphs = paragraphRefs.current.filter(Boolean) as HTMLElement[];
    if (paragraphs.length === 0) return;

    let cancelled = false;

    const init = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        paragraphs.forEach((el) => {
          gsap.set(el, { opacity: 0, y: 12 });
          ScrollTrigger.create({
            trigger: el,
            start: "top center+=40",
            animation: gsap.to(el, { opacity: 1, y: 0, duration: 0.5 }),
          });
        });
      }, scopeRef);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => {
        cleanup = init() || undefined;
      }, { timeout: 120 });
    } else {
      requestAnimationFrame(() => {
        setTimeout(() => {
          cleanup = init() || undefined;
        }, 0);
      });
    }

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [scopeRef, prefersReducedMotion]);

  // Stats reveal with stagger
  useEffect(() => {
    if (!scopeRef.current || prefersReducedMotion) return;

    const stats = statRefs.current.filter(Boolean) as HTMLElement[];
    if (stats.length === 0) return;

    let cancelled = false;

    const init = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        stats.forEach((el, index) => {
          gsap.set(el, { opacity: 0, y: 12 });
          ScrollTrigger.create({
            trigger: el,
            start: "top center+=80",
            animation: gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              delay: index * 0.08,
            }),
          });
        });
      }, scopeRef);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => {
        cleanup = init() || undefined;
      }, { timeout: 120 });
    } else {
      requestAnimationFrame(() => {
        setTimeout(() => {
          cleanup = init() || undefined;
        }, 0);
      });
    }

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [scopeRef, prefersReducedMotion]);

  // Mission section reveal
  useEffect(() => {
    if (!scopeRef.current || prefersReducedMotion) return;

    const missionElements = [
      missionTitleRef.current,
      missionTextRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (missionElements.length === 0) return;

    let cancelled = false;

    const init = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        missionElements.forEach((el, index) => {
          gsap.set(el, { opacity: 0, y: 16 });
          ScrollTrigger.create({
            trigger: missionWrapRef.current || el,
            start: "top 75%",
            animation: gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
            }),
          });
        });
      }, scopeRef);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => {
        cleanup = init() || undefined;
      }, { timeout: 120 });
    } else {
      requestAnimationFrame(() => {
        setTimeout(() => {
          cleanup = init() || undefined;
        }, 0);
      });
    }

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [scopeRef, prefersReducedMotion]);

  return (
    <div ref={scopeRef} className="bg-white">
      <section className="bg-white">
        <Container className="py-24">
          <div className="text-center text-[11px] uppercase tracking-[0.24em] text-slate-500">
            <div ref={eyebrowRef}>ABOUT US</div>
          </div>
          <h1
            ref={headlineRef}
            className="display-tight mt-4 text-center text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-slate-900 font-medium"
          >
            Built to Make Branding Memorable
          </h1>

          <div className="mt-6 flex justify-center">
            <div
              ref={scrollHintRef}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-400"
            >
              <span>Scroll</span>
              <span className="inline-flex h-6 w-px bg-slate-300" aria-hidden="true" />
            </div>
          </div>

          <div
            ref={lineWrapRef}
            className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-start"
          >
            <div className="space-y-10 text-sm md:text-base leading-relaxed text-slate-600">
              <p ref={(el) => void (paragraphRefs.current[0] = el)}>
                {PARAGRAPHS[0].text}
              </p>
              <p ref={(el) => void (paragraphRefs.current[2] = el)}>
                {PARAGRAPHS[2].text}
              </p>
            </div>

            <div className="relative hidden lg:block">
              <div className="mx-auto h-full w-px bg-slate-200" />
              <div
                ref={lineProgressRef}
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-500"
              />
            </div>

            <div className="space-y-10 text-sm md:text-base leading-relaxed text-slate-600">
              <p ref={(el) => void (paragraphRefs.current[1] = el)}>
                Promotional products—often called ad specialties—are part of a nearly{" "}
                <span className="font-semibold text-slate-900">$22 billion industry</span>{" "}
                and are trusted by businesses nationwide for their ability to create
                lasting brand impressions at a lower cost per impression than
                traditional advertising.
              </p>

              <div className="space-y-5">
                {STATS.map((stat, index) => (
                  <div
                    key={stat.value}
                    ref={(el) => void (statRefs.current[index] = el)}
                    className="flex flex-col gap-1"
                  >
                    <div className="text-2xl md:text-3xl font-semibold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-visible bg-white">
        <Container className="relative py-24">
        <div ref={missionWrapRef} className="relative z-10 text-center">
            <h2
              ref={missionTitleRef}
              className="text-3xl md:text-6xl font-semibold text-slate-900"
            >
              Our Mission
            </h2>
            <p
              ref={missionTextRef}
              className="mx-auto mt-4 max-w-3xl text-md md:text-base leading-relaxed text-slate-600"
            >
              To help businesses build long-lasting relationships with their customers
              through thoughtfully crafted promotional products.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
