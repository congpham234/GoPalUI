import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy-loaded components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ItineraryPage = lazy(() => import('./pages/ItineraryPage'));
const UserPage = lazy(() => import('./pages/UserPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
