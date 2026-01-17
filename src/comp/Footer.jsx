import React, { useEffect } from 'react';
import { useApi } from '../hooks/useApi';

const Footer = () => {
  const { data, loading, request } = useApi();

  useEffect(() => {
    request('https://dog.ceo/api/breeds/image/random'); 
  }, [request]);

  return (
    <footer className="w-full bg-gray-100 text-center p-2 text-xs text-gray-500 fixed bottom-0 left-0 z-50 border-t">
      <div className="flex justify-center items-center gap-4">
        <span>© 2025 TripMeUp</span>
        <span className="flex items-center gap-1">
          System: 
          {loading ? <span className="text-yellow-500">...</span> : (data ? <span className="text-green-600">● Online</span> : <span className="text-red-500">● Offline</span>)}
        </span>
      </div>
    </footer>
  );
};

export default Footer;