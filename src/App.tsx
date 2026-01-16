import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const RequestPage = lazy(() => import("./pages/RequestPage"));

const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function Loading() {
  return <div className="p-6 text-sm text-slate-600">Loading…</div>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* new: home aligns to original site */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <AboutPage />
            </Suspense>
          }
        />

        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loading />}>
              <ContactPage />
            </Suspense>
          }
        />

        <Route
          path="/request"
          element={
            <Suspense fallback={<Loading />}>
              <RequestPage />
            </Suspense>
          }
        />

        {/* products */}
        <Route
          path="/catalog"
          element={
            <Suspense fallback={<Loading />}>
              <CatalogPage />
            </Suspense>
          }
        />

        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ProductPage />
            </Suspense>
          }
        />

        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loading />}>
              <CartPage />
            </Suspense>
          }
        />

        {/* keep checkout for demo, but request page is closer to the original flow */}
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<Loading />}>
              <CheckoutPage />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
