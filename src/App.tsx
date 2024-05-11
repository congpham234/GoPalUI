import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Lazy-loaded components
const LandingPage = lazy(() => import('./pages/LandingPage'))
const ItineraryPage = lazy(() => import('./pages/ItineraryPage'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
