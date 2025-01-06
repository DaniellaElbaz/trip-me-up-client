import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RouteMapView from '../comp/routeMapView/routeMapView';
import {
  setKey,
  setLanguage,
  fromAddress,
} from "react-geocode";
import { useLoadScript } from '@react-google-maps/api';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

setKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
setLanguage('en');
const devMode = false;

function RouteViewPoc() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  })
  const location = useLocation();
  const [validatedRouteData, setValidatedRouteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Trip me up - POC';
  }, []);

  useEffect(() => {
    //TODO: move to server
    const validateLocations = async () => {
      if (location.state && location.state.routeData) {
        const routeData = location.state.routeData.map((r) => r.name);
        const validatedData = [];

        for (const place of routeData) {
          try {
            const response = await fromAddress(place);
            if (response.status === 'OK' && response.results.length > 0) {
              validatedData.push(place);
            } else {
              console.warn(`Location not found: ${place}`);
            }
          } catch (error) {
            console.error(`Error validating location: ${place}`, error);
          }
        }
        setValidatedRouteData(validatedData);
      }
      if (devMode){
        setValidatedRouteData(["Aviv Beach", "Sarona Market", "Tel Aviv University"]);
      }
    };

    validateLocations();
  }, [location.state]);

  useEffect(() => {
    setLoading(false);
  }, [validatedRouteData]);

  if (loading || !validatedRouteData || validatedRouteData.length < 2) {
    return <p>Loading, please wait...</p>;
  }

  const stops = validatedRouteData.slice(1, validatedRouteData.length - 1);
  const startLocation = validatedRouteData[0];
  const endLocation = validatedRouteData[validatedRouteData.length - 1];

  if(!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex-col">
      <p className="text-xl bg-gray-500">
        Your Trip from {startLocation} to {endLocation}
      </p>

      {startLocation && endLocation && stops.length > 0 && (
        <RouteMapView
          startLocation={startLocation}
          endLocation={endLocation}
          stops={stops}
        />
      )}
    </div>
  );
}
export default RouteViewPoc;
