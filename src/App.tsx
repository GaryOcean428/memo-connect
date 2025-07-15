
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Lazy load pages for code splitting
const Referrals = React.lazy(() => import('./pages/Referrals'));
const Finance = React.lazy(() => import('./pages/Finance'));
const Clients = React.lazy(() => import('./pages/Clients'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const ReferralEmbed = React.lazy(() => import('./pages/ReferralEmbed'));
const ReferralEmbedStandalone = React.lazy(() => import('./pages/ReferralEmbedStandalone'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/referrals" element={<PrivateRoute><Referrals /></PrivateRoute>} />
              <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
              <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
              
              <Route path="/referral-embed" element={<PrivateRoute><ReferralEmbed /></PrivateRoute>} />
              <Route path="/referral-embed-standalone" element={<ReferralEmbedStandalone />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
