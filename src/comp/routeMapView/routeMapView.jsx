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
  const [markers, setMarkers] = useState([]);

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
          createMarkers(result);  // Create custom markers after fetching directions
        } else {
          console.error(`Failed to fetch directions: ${status}`);
        }
      }
    );
  };

  // Create markers for start, end, and stops
  const createMarkers = (directionsResult) => {
    const newMarkers = [];
    
    // Add start location marker
    const startMarker = new google.maps.Marker({
      position: startLocation.location,
      map: mapRef.current,
      title: startLocation.name,
    });
    const startInfoWindow = new google.maps.InfoWindow({
      content: `<strong>${startLocation.name}`,
    });
    startMarker.addListener("click", () => {
      console.log("Start location clicked:", startLocation);  // Debugging log
      startInfoWindow.open(mapRef.current, startMarker);
    });
    newMarkers.push(startMarker);

    // Add end location marker
    const endMarker = new google.maps.Marker({
      position: endLocation.location,
      map: mapRef.current,
      title: endLocation.name,
    });
    const endInfoWindow = new google.maps.InfoWindow({
      content: `<strong>${endLocation.name}`,
    });
    endMarker.addListener("click", () => {
      console.log("End location clicked:", endLocation);  // Debugging log
      endInfoWindow.open(mapRef.current, endMarker);
    });
    newMarkers.push(endMarker);

    // Add stop location markers
    stops.forEach(stop => {
      const stopMarker = new google.maps.Marker({
        position: stop.location,
        map: mapRef.current,
        title: stop.name,
      });
      const stopInfoWindow = new google.maps.InfoWindow({
        content: `<strong>${stop.name}`,
      });
      stopMarker.addListener("click", () => {
        console.log("Stop location clicked:", stop);  // Debugging log
        stopInfoWindow.open(mapRef.current, stopMarker);
      });
      newMarkers.push(stopMarker);
    });

    setMarkers(newMarkers); // Update markers state
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
              suppressMarkers: true, // Suppress the default markers
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