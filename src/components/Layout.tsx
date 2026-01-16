import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { useCart } from "../store/cart";

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "text-xs uppercase tracking-[0.22em] transition",
          isActive ? "text-slate-900 underline underline-offset-8" : "text-slate-600 hover:text-slate-900",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Layout() {
  const { items } = useCart();

  // Hide-on-scroll behavior
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const last = lastYRef.current;
        const delta = y - last;

        // Always show near the top
        if (y < 40) {
          setHidden(false);
        } else {
          // Small threshold to avoid jitter
          if (delta > 10) setHidden(true); // scrolling down
          if (delta < -10) setHidden(false); // scrolling up
        }

        lastYRef.current = y;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-[rgb(var(--bg))]">
      {/* Navbar that hides on scroll down */}
      <header
        className={[
          "sticky top-0 z-40",
          "transition-transform duration-300 ease-out",
          hidden ? "-translate-y-[140%]" : "translate-y-0",
        ].join(" ")}
      >
        <Container className="py-3">
          {/* Reduced size navbar (compact) */}
          <div className="rounded-[16px] bg-white px-5 py-3 ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-6">
              <Link
                to="/"
                className="text-[11px] font-medium tracking-[0.22em] uppercase text-slate-900"
              >
                BC Apparel
              </Link>

              <nav className="hidden items-center gap-6 md:flex">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/about">About</NavItem>
                <NavItem to="/catalog">Products</NavItem>
                <NavItem to="/request">Request</NavItem>
                <NavItem to="/contact">Contact</NavItem>
              </nav>

              <Link
                to="/cart"
                className="inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-slate-700 ring-1 ring-slate-200 hover:text-slate-900"
                aria-label="Cart"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgb(var(--bg))] ring-1 ring-slate-200">
                  👜
                </span>
                <span className="hidden sm:inline">Cart</span>
                <span className="text-slate-500">({items.length})</span>
              </Link>
            </div>

            {/* Mobile nav */}
            <div className="mt-3 flex flex-wrap gap-4 md:hidden">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/catalog">Products</NavItem>
              <NavItem to="/request">Request</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </div>
          </div>
        </Container>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer (kept as your Canva layout) */}
      <footer className="mt-16 bg-[rgb(var(--bg))]">
        <Container className="pb-10">
          <div className="rounded-[28px] bg-[#ECECEC] ring-1 ring-slate-200 overflow-hidden">
            <div className="grid gap-10 px-8 py-10 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div className="text-[56px] md:text-[72px] leading-[0.9] font-semibold tracking-tight text-slate-900">
                LETS TALK
              </div>

              <div className="md:justify-self-end w-full max-w-[520px]">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-700">
                  Subscribe
                </div>

                <div className="mt-3 flex items-stretch gap-3">
                  <input
                    type="email"
                    placeholder="Enter your Email Address"
                    className="h-12 w-full rounded-[14px] bg-transparent px-4 text-sm text-slate-900 ring-1 ring-slate-400 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <button
                    type="button"
                    className="h-12 rounded-[14px] bg-slate-900 px-6 text-xs uppercase tracking-[0.18em] text-white"
                  >
                    Join
                  </button>
                </div>

                <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-slate-600">
                  Product drops, catalog updates, and pricing notes.
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-300/80" />

            <div className="grid gap-6 px-8 py-6 md:grid-cols-2 md:items-center">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-700">
                Copyright
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-700 md:text-right">
                You can add whatever you want here
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
