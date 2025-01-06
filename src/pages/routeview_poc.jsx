import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import RouteMapView from "../comp/routeMapView/routeMapView";
import { useLoadScript } from "@react-google-maps/api";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const devMode = false;

function RouteViewPoc() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });
  const location = useLocation();
  const [validatedRouteData, setValidatedRouteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Trip me up - POC";
  }, []);

  useEffect(() => {
    const validateLocations = async () => {
      if (location.state && location.state.routeData && isLoaded) {
        const routeData = location.state.routeData.map((r) => r.name);
        const validatedData = [];

        const map = new window.google.maps.Map(document.createElement("div"));
        const placesService = new window.google.maps.places.PlacesService(map);

        for (const place of routeData) {
          try {
            const request = {
              query: place,
              fields: ["name", "geometry"],
            };

            const result = await new Promise((resolve, reject) => {
              placesService.findPlaceFromQuery(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                  resolve(results[0]);
                } else {
                  reject(`Location not found: ${place}`);
                }
              });
            });

            if (result) {
              validatedData.push({
                name: result.name,
                location: result.geometry.location.toJSON(),
              });
            }
          } catch (error) {
            console.warn(error);
          }
        }

        if (validatedData.length > 0) {
          setValidatedRouteData(validatedData);
        }
      }

      if (devMode) {
        setValidatedRouteData([
          { name: "Aviv Beach", location: { lat: 32.0853, lng: 34.7818 } },
          { name: "Sarona Market", location: { lat: 32.0718, lng: 34.7860 } },
          { name: "Tel Aviv University", location: { lat: 32.1133, lng: 34.8044 } },
        ]);
      }
    };

    validateLocations();
  }, [location.state, isLoaded]);

  useEffect(() => {
    setLoading(false);
  }, [validatedRouteData]);

  if (loading || !validatedRouteData || validatedRouteData.length < 2) {
    return <p>Loading, please wait...</p>;
  }

  const stops = validatedRouteData.slice(1, validatedRouteData.length - 1);
  const startLocation = validatedRouteData[0];
  const endLocation = validatedRouteData[validatedRouteData.length - 1];

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex-col">
      <p className="text-xl bg-gray-500">
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
