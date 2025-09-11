import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './components/Home';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className=' bg-white w-screen h-screen font-inter-tight overflow-x-hidden'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={!user ? <Navigate to="/login" /> : <Navigate to="/dashboard" />}  */}
          <Route path="/login" element={<Login />} />  {/* No conditional; Login handles redirects */}
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />}/> 
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />  */}
        {/* <Route path="/reset-password" element={<ResetPassword />} />  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
