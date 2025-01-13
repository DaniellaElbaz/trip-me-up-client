import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import RouteMapView from "../comp/routeMapView/routeMapView";
import { useLoadScript } from "@react-google-maps/api";
import dummyData from '../dev/dummyRouteData.json';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
function RouteViewPoc() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });
  const location = useLocation();
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    document.title = "Trip me up - POC";
  }, []);

  useEffect(() => {
    if (location.state == null) {
      setRouteData(dummyData);
    } else {
      setRouteData(location.state.routeData);
    }
  }, [location.state]);

  if (!isLoaded) {
    return <p>Loading, please wait...</p>;
  }

  const stops = routeData.slice(1, routeData.length - 1);
  const startLocation = routeData[0];
  const endLocation = routeData[routeData.length - 1];

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex-col">
      <p className="text-xl  bg-gray-500">
        Your Trip from {startLocation.name} to {endLocation.name}
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
