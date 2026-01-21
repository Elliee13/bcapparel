import { useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import contactImage from "../assets/contact/contact.png";
import logo from "../assets/webLogo/bacapparel.png";
import contactAvif800 from "../assets/optimized/contact/contact-800.avif";
import contactAvif1200 from "../assets/optimized/contact/contact-1200.avif";
import contactAvif1600 from "../assets/optimized/contact/contact-1600.avif";
import contactWebp800 from "../assets/optimized/contact/contact-800.webp";
import contactWebp1200 from "../assets/optimized/contact/contact-1200.webp";
import contactWebp1600 from "../assets/optimized/contact/contact-1600.webp";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 1500);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="bg-white">
      <section className="bg-white">
        <Container className="py-24">
          <div className="text-center text-[11px] uppercase tracking-[0.24em] text-slate-500">
            Contact
          </div>
          <h1 className="display-tight mt-4 text-center text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-slate-900 font-medium">
            Ready to start a project or have a question?
          </h1>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-[28px]">
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${contactAvif800} 800w, ${contactAvif1200} 1200w, ${contactAvif1600} 1600w`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <source
                  type="image/webp"
                  srcSet={`${contactWebp800} 800w, ${contactWebp1200} 1200w, ${contactWebp1600} 1600w`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <img
                  src={contactImage}
                  alt="Mountain landscape at sunset"
                  width={1200}
                  height={1600}
                  className="h-full min-h-[520px] w-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/40" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-2xl font-semibold leading-tight">“Serving teams and businesses nationwide.”</div>
                <div className="mt-2 text-sm text-white/80">Custom apparel and branded products built for reliability.</div>
              </div>
            </div>

            <div className="rounded-[28px] bg-[rgb(var(--navy-950))] p-8 text-white shadow-sm">
              <div className="flex items-center gap-3">
                <img src={logo} alt="BC Apparel" className="h-8 w-auto" />
                <div className="text-xs uppercase tracking-[0.22em] text-white/80">
                  BC Apparel
                </div>
              </div>

              <div className="mt-6 text-xl font-semibold leading-tight">
                Reach out and
                <br />
                our team will
                <br />
                follow up.
              </div>

              <form className="mt-8 space-y-6" onSubmit={submit}>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Fullname"
                    className="mt-2 w-full border-b border-white/40 bg-transparent pb-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                    Email
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="you@company.com"
                    className="mt-2 w-full border-b border-white/40 bg-transparent pb-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                    Message
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Tell us what you need"
                    className="mt-2 min-h-28 w-full border-b border-white/40 bg-transparent pb-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white"
                  />
                </label>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[rgb(var(--navy-700))] text-xs uppercase tracking-[0.18em] text-white hover:bg-[rgb(var(--navy-800))]"
                >
                  {sent ? "Sent" : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-16 rounded-[28px] border border-slate-200 bg-white px-6 py-10 md:px-12">
            <div className="text-center">
              <div className="text-xl font-semibold text-slate-900">
                For business enquires
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div className="rounded-[20px] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M4 6h16v12H4z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M4 7l8 6 8-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  For all inquiries, please send an email to{" "}
                  <span className="font-semibold text-slate-900">
                    sales@bcapparel.com
                  </span>{" "}
                  |{" "}
                  <span className="font-semibold text-slate-900">
                    artwork@bcapparel.com
                  </span>
                </div>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M5 4h14a2 2 0 0 1 2 2v12a0 0 0 0 1 0 0H3a0 0 0 0 1 0 0V6a2 2 0 0 1 2-2z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M8 20h8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  or call us at{" "}
                  <span className="font-semibold text-slate-900">Local</span>: (405)
                  573-9118 &{" "}
                  <span className="font-semibold text-slate-900">toll free</span>{" "}
                  (877) 783-0422
                </div>
              </div>

              <div className="rounded-[20px] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M12 3a6 6 0 0 1 6 6c0 4.5-6 12-6 12S6 13.5 6 9a6 6 0 0 1 6-6z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </div>
                <div className="mt-4">
                  <span className="font-semibold text-slate-900">Address:</span>
                  <br />
                  2506 N Moore Ave, Moore, OK 73160, United States.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
