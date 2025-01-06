/* global google */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import PropTypes from "prop-types";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

export default function RouteMapView({ startLocation, endLocation, stops }) {
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 32.03, lng: 34.78 }), []);
  const [routeReady, setRouteReady] = useState(false);
  const [directions, setDirections] = useState();

  const onLoad = useCallback(map => (mapRef.current = map), []);

  useEffect(() => {
    if (startLocation && endLocation && stops) {
      setRouteReady(true);
    }
  }, [startLocation, endLocation, stops]);

  const fetchDirections = () => {
    if (!routeReady) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: startLocation.location, 
        destination: endLocation.location, 
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: stops.map((stop) => ({
          location: stop.location, 
          stopover: true,
        })),
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error(`Failed to fetch directions: ${status}`);
        }
      }
    );
  };

  useEffect(fetchDirections, [routeReady]);

  return (
    <div className="h-screen w-screen">
      <GoogleMap
        zoom={9}
        center={center} 
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 5,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

RouteMapView.propTypes = {
  startLocation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  endLocation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};