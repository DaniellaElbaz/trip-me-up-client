import React, {useEffect, useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CONFIG from '../config';
import { CircularProgress } from "@mui/material";
function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();


    useEffect(() => {
        // const checkAuth = async () => {
        // try {
        //     const response = await fetch(`${CONFIG.SERVER_URL}/user`, { credentials: 'include' }); 
        //     if (response.ok) {
        //         const data = await response.json();
        //         sessionStorage.setItem("userID", data.id);
                 setIsAuthenticated(true);
        //     } else {
        //         console.log(response);
        //         setIsAuthenticated(false);
        //     }
        // } catch (err){
        //     console.log(err);
        //     setIsAuthenticated(false);
        // }
        // };

        // checkAuth();
    }, []);

    if (isAuthenticated === null) {
       return (
             <div className="flex flex-col justify-center items-center h-screen">
               <CircularProgress color="primary" size={60} />
               <p className="mt-4 text-lg text-gray-700">Loading...</p>
             </div>
           );
    }

    if (!isAuthenticated) {
       // return <Navigate to="/login" state={{ from: location }} />;
       return <Navigate to="/chat" state={{ from: location }} />;
    }
    return children;
}

export default ProtectedRoute;