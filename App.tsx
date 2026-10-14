import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import ScrollToHash from './components/ScrollToHash';

const ToolPage = React.lazy(() => import('./pages/ToolPage'));
const About = React.lazy(() => import('./pages/static/About'));
const Contact = React.lazy(() => import('./pages/static/Contact'));
const Privacy = React.lazy(() => import('./pages/static/Privacy'));
const Terms = React.lazy(() => import('./pages/static/Terms'));
const NotFound = React.lazy(() => import('./pages/static/NotFound'));

/** Skeleton shown while a route chunk loads — sized to avoid layout shift. */
const RouteFallback = () => (
  <div className="min-h-screen bg-bg pt-24">
    <div className="shell space-y-4" aria-busy="true" aria-label="Loading page">
      <div className="skeleton h-10 w-2/3 rounded-lg" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
      <div className="skeleton h-64 w-full rounded-2xl mt-8" />
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <a href="#main" className="skip-link">Skip to content</a>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Navigate to="/" replace />} />
          <Route path="/free-image-tools" element={<Navigate to="/" replace />} />
          <Route path="/blog" element={<Navigate to="/" replace />} />
          <Route path="/jobs" element={<Navigate to="/" replace />} />
          <Route path="/links" element={<Navigate to="/" replace />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Navigate to="/privacy" replace />} />

          <Route path="/tools/:toolId" element={<ToolPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
