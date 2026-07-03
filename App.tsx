import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const ToolPage = React.lazy(() => import('./pages/ToolPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-brand">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Home />} />
          <Route path="/free-image-tools" element={<Home />} />
          <Route path="/blog" element={<Home />} />
          <Route path="/jobs" element={<Home />} />
          <Route path="/links" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
