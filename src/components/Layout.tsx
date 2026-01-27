import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import MotionLayout from "./MotionLayout";
import logo from "../assets/webLogo/bacapparel.png";

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
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

        if (y < 40) {
          setHidden(false);
        } else {
          if (delta > 10) setHidden(true);
          if (delta < -10) setHidden(false);
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
      <header
        className={[
          "sticky top-0 z-40",
          "transition-transform duration-300 ease-out",
          hidden ? "-translate-y-[140%]" : "translate-y-0",
        ].join(" ")}
      >
        <Container className="py-3">
          <div className="rounded-[18px] bg-white/95 px-5 py-3 ring-1 ring-slate-200 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <Link
                to="/"
                className="flex items-center gap-3"
              >
                <img src={logo} alt="BC Apparel" className="h-7 w-auto" width={112} height={28} />
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-900">
                  BC Apparel
                </span>
              </Link>

              <nav className="hidden items-center gap-6 md:flex">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/featured">Featured</NavItem>
                <NavItem to="/about">About</NavItem>
                <NavItem to="/products">Products</NavItem>
                <NavItem to="/brochures-catalogs">Brochures/Catalog</NavItem>
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  to="/contact"
                  className="hidden items-center gap-2 rounded-full bg-[rgb(var(--navy-950))] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white ring-1 ring-[rgb(var(--navy-950))]/10 hover:bg-[rgb(var(--navy-800))] md:inline-flex"
                >
                  Contact
                </Link>
                <button
                  type="button"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:text-slate-900 md:hidden"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    {menuOpen ? (
                      <path
                        d="M6 6l12 12M18 6l-12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="M4 7h16M4 12h16M4 17h16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={[
                "overflow-hidden transition-all duration-300 md:hidden",
                menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
            >
              <div className="mt-4 grid gap-3 rounded-[16px] border border-slate-200 bg-white p-4">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/featured">Featured</NavItem>
                <NavItem to="/about">About</NavItem>
                <NavItem to="/products">Products</NavItem>
                <NavItem to="/brochures-catalogs">Brochures/Catalog</NavItem>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[rgb(var(--navy-950))] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white hover:bg-[rgb(var(--navy-800))]"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <main>
        <MotionLayout>
          <Outlet />
        </MotionLayout>
      </main>

      <footer className="mt-16">
        <Container className="py-10">
          <div className="rounded-[22px] bg-white/95 px-6 py-10 ring-1 ring-slate-200 shadow-sm backdrop-blur md:px-10">
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1.1fr]">
            <div>
              <div className="flex items-center gap-3">
                <img src={logo} alt="BC Apparel" className="h-8 w-auto" width={128} height={32} />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                  BC Apparel
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                Custom apparel and branded products built for teams, businesses, and
                organizations that value consistent quality.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-600">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Company
              </div>
              <Link to="/about" className="hover:text-slate-900">
                About
              </Link>
              <Link to="/products" className="hover:text-slate-900">
                Products
              </Link>
              <Link to="/featured" className="hover:text-slate-900">
                Featured
              </Link>
              <Link to="/brochures-catalogs" className="hover:text-slate-900">
                Brochures/Catalog
              </Link>
              <Link to="/contact" className="hover:text-slate-900">
                Contact
              </Link>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Contact
              </div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div>2506 N Moore Ave</div>
                <div>Moore, OK 73160</div>
                <div>Phone: (877) 783-0422</div>
                <div>E-mail: sales@bcapparel.com</div>
              </div>
            </div>
          </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500">
              <div>© {new Date().getFullYear()} BC Apparel. All rights reserved.</div>
              <div className="flex items-center gap-4">
                <Link to="/brochures-catalogs" className="hover:text-slate-800">
                  Brochures/Catalog
                </Link>
                <Link to="/contact" className="hover:text-slate-800">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
