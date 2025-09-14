import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import LoadingScreen from './components/LoadingScreen';
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className=' bg-white w-screen h-screen font-inter-tight overflow-x-hidden'>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={!user ? <Navigate to="/" /> : <Navigate to="/dashboard" />} /> */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} /> */}
            {/* <Route path="/forgot-password" element={<ForgotPassword />} />  */}
            {/* <Route path="/reset-password" element={<ResetPassword />} />  */}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
