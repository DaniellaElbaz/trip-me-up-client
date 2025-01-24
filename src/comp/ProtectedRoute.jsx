import React, {useEffect, useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CONFIG from '../config';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
        try {
            const response = await fetch(`${CONFIG.SERVER_URL}/user`, { credentials: 'include' }); // Include cookies
            if (response.ok) {
            setIsAuthenticated(true);
            } else {
            setIsAuthenticated(false);
            }
        } catch {
            setIsAuthenticated(false);
        }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}

export default ProtectedRoute;