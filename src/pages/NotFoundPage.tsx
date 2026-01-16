import { Link } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/Button";

export default function NotFoundPage() {
  return (
    <Container className="py-8 md:py-10">
      <div className="rounded-2xl bg-white p-6 md:p-8 ring-1 ring-slate-200">
        <h1 className="text-lg md:text-xl font-extrabold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600">The route you requested does not exist.</p>
        <div className="mt-6">
          <Link to="/catalog">
            <Button variant="secondary">Back to catalog</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
