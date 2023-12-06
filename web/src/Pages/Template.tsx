import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return !isAuthenticated ? (
        <Navigate to="/login" />
    ) : (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;
