import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Auth from './pages/Auth';
import GoalSetup from './pages/GoalSetup';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Navbar from './components/Navbar';
import PublicNavbar from './components/PublicNavbar';
import LandingPage from './pages/LandingPage';
import LoadingSpinner from './components/LoadingSpinner';
import GoalHistory from './pages/GoalHistory';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/welcome" />;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen text-text font-sans">
      {isAuthenticated ? <Navbar /> : <PublicNavbar />}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/goal-setup" element={<PrivateRoute><GoalSetup /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
          <Route path="/goal-history" element={<PrivateRoute><GoalHistory /></PrivateRoute>} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/welcome"} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
