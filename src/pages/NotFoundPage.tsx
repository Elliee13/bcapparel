import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";
import { useReveal } from "../motion";

export default function NotFoundPage() {
  useReveal({
    elements: ".reveal-on-scroll",
    y: 12,
    duration: 0.5,
    start: "top 80%",
  });

  return (
    <Container className="py-8 md:py-10">
      <div className="reveal-on-scroll rounded-2xl bg-white p-6 md:p-8 ring-1 ring-slate-200">
        <h1 className="text-lg md:text-xl font-extrabold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600">The route you requested does not exist.</p>
        <div className="mt-6">
          <Link to="/products">
            <Button variant="secondary">Back to products</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
