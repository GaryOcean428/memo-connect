
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Referrals from './pages/Referrals';
import Finance from './pages/Finance';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from '@/components/ui/toaster';
import ReferralEmbed from './pages/ReferralEmbed';
import ReferralEmbedStandalone from './pages/ReferralEmbedStandalone';

function App() {
  return (
    <AuthProvider>
      <Router>
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
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
