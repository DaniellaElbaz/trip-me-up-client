/* global google */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "@react-google-maps/api";
import PropTypes from "prop-types";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

export default function RouteMapView({ startLocation, endLocation, stops }) {
  const mapRef = useRef();
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const center = useMemo(() => ({ lat: 32.03, lng: 34.78 }), []); // map default center
  const [routeReady, setRouteReady] = useState(false);
  const [directions, setDirections] = useState();
  const [selectedLocation, setSelectedLocation] = useState(null); // State for selected marker

  useEffect(() => {
    if (startLocation && endLocation && stops) {
      setRouteReady(true);
    }
  }, [startLocation, endLocation, stops]);

  useEffect(() => {
    if (!routeReady) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin: startLocation.geometry.location, 
        destination: endLocation.geometry.location, 
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: stops.map((stop) => ({
          location: stop.geometry.location, 
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
  }, [routeReady]);

  return (
    <div className="h-screen w-screen">
      <GoogleMap
        zoom={9}
        center={center} 
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad}
      >
        {/* directions rendering */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#1976D2",
                strokeWeight: 5,
              },
              suppressMarkers: true,
            }}
          />
        )}
        {/* markers rendering */}
        <Marker
          position={startLocation.geometry.location} 
          title={startLocation.name} 
          icon={{
            url: startLocation.icon,
            scaledSize: new google.maps.Size(30, 30)
          }}
          onClick={() => setSelectedLocation(startLocation)}
        />
        {stops.map(stop => 
          <Marker 
            key={stop.geometry.location.lat} 
            position={stop.geometry.location} 
            title={stop.name} 
            icon={{
              url: stop.icon,
              scaledSize: new google.maps.Size(30, 30)
            }}
            onClick={() => setSelectedLocation(stop)}
          />
        )}
        <Marker 
          position={endLocation.geometry.location} 
          title={endLocation.name} 
          icon={{
            url: endLocation.icon,
            scaledSize: new google.maps.Size(30, 30)
          }}
          onClick={() => setSelectedLocation(endLocation)}
        />
        {/* info window */}
        {selectedLocation && (
          <InfoWindow
          position={selectedLocation.geometry.location}
          onCloseClick={() => setSelectedLocation(null)}
          title={selectedLocation.formatted_address}
        >
          <div style={{
            maxWidth: "300px",
            backgroundColor: "#F3F4F6", 
            padding: "16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
            borderRadius: "8px", 
          }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "black", 
              margin: "0 0 8px 0",
            }}>
              {selectedLocation.name}
            </h3>
            <p style={{
              fontSize: "14px",
              color: "black", 
              margin: "0",
            }}>
              {selectedLocation.formatted_address}
            </p>
          </div>
        </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

// props

const LocationPropTypes = PropTypes.shape({
  formatted_address: PropTypes.string.isRequired,
  geometry: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      html_attributions: PropTypes.arrayOf(PropTypes.string).isRequired,
      photo_reference: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })
  )
});

RouteMapView.propTypes = {
  startLocation: LocationPropTypes.isRequired,
  stops: PropTypes.arrayOf(LocationPropTypes).isRequired,
  endLocation: LocationPropTypes.isRequired
};
