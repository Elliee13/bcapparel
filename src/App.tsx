import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";


const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const BrochuresCatalogsPage = lazy(() => import("./pages/BrochuresCatalogsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function Loading() {
  return <div className="p-6 text-sm text-slate-600">Loading...</div>;
}

export default function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route element={<Layout />}>
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
          path="/products"
          element={
            <Suspense fallback={<Loading />}>
              <ProductsPage />
            </Suspense>
          }
        />

        <Route
          path="/brochures-catalogs"
          element={
            <Suspense fallback={<Loading />}>
              <BrochuresCatalogsPage />
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
    </div>
  );
}
