import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className=' bg-white w-screen h-screen font-inter-tight overflow-x-hidden'>
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
