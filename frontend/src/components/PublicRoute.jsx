import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'
import LoadingScreen from './LoadingScreen'

function PublicRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return  <LoadingScreen />
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;
