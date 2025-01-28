/* global google */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "@react-google-maps/api";
import PropTypes from "prop-types";

const mapContainerStyle = {
  width: "100%",
  height: "70vh",
};

export default function RouteMapView({ startLocation, endLocation, stops, optimize, selectedLocation, setSelectedLocation }) {
  const mapRef = useRef();
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const [routeReady, setRouteReady] = useState(false);
  const [directions, setDirections] = useState();
  const [selectedLocationLocal, setSelectedLocationLocal] = useState(null);

  useEffect(() =>{
    if (!mapRef.current || !selectedLocation) return;
    const { lat, lng } = selectedLocation.geometry.location;
    mapRef.current.panTo(new google.maps.LatLng(lat, lng));
  }, [selectedLocation])

  useEffect(() => {
    if (startLocation && endLocation && stops) {
      setRouteReady(true);
    }
  }, [startLocation, endLocation, stops]);

  useEffect(() => {
    if (!routeReady || !mapRef.current) return;

    // fit map to markers
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(startLocation.geometry.location.lat, startLocation.geometry.location.lng));
    stops.forEach(stop => {
     bounds.extend(new google.maps.LatLng(stop.geometry.location.lat, stop.geometry.location.lng));
    });
    bounds.extend(new google.maps.LatLng(endLocation.geometry.location.lat, endLocation.geometry.location.lng));
    mapRef.current.fitBounds(bounds);

   const service = new google.maps.DirectionsService();

    service.route(
      {
       origin: startLocation.geometry.location,
       destination: endLocation.geometry.location,
       travelMode: google.maps.TravelMode.DRIVING,
       waypoints: stops.map(stop => ({
         location: stop.geometry.location,
         stopover: true,
       })),
       optimizeWaypoints: optimize,
     },
      (result, status) => {
       if (status === "OK" && result) {
         setDirections(result);
       } else {
         console.error(`Failed to fetch directions: ${status}`);
       }
     }
    );
  }, [routeReady, startLocation, endLocation, stops]
);

  return (
    <div className="h-screen w-screen">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad}
        options={{
          gestureHandling: "greedy",
          zoomControl: true, 
        }}
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
              suppressMarkers: true,
            }}
          />
        )}
        <Marker
          position={startLocation.geometry.location}
          title={startLocation.name}
          icon={{
            url: startLocation.icon,
            scaledSize: new google.maps.Size(30, 30),
          }}
          onClick={() => {
            setSelectedLocation(0); // sets selected place index to first
            setSelectedLocationLocal(startLocation);
          }} 
        />
        {stops.map((stop, index) => (
          <Marker
            key={stop.geometry.location.lat}
            position={stop.geometry.location}
            title={stop.name}
            icon={{
              url: stop.icon,
              scaledSize: new google.maps.Size(30, 30),
            }}
            onClick={() => {
              setSelectedLocation(index + 1);
              setSelectedLocationLocal(stop);
            }}
          />
        ))}
        <Marker
          position={endLocation.geometry.location}
          title={endLocation.name}
          icon={{
            url: endLocation.icon,
            scaledSize: new google.maps.Size(30, 30),
          }}
          onClick={() => {
            setSelectedLocation(stops.length + 1) // sets selected place index to last
            setSelectedLocationLocal(endLocation);
          }} 
        />
        {selectedLocationLocal && (
          <InfoWindow
          position={{
            lat: selectedLocationLocal.geometry.location.lat + 0.005, // move upwards from exact marker
            lng: selectedLocationLocal.geometry.location.lng,
          }}
            onCloseClick={() => setSelectedLocationLocal(null)}
          >
            <div style={{ maxWidth: "200px", padding: "16px", marginTop: "3px", borderRadius: "8px", backgroundColor: "#F3F4F6", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
              {/* title */}
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "black", margin: "0 0 8px 0" }}>
                {selectedLocationLocal.name}
              </h3>
              {/* photo */}
              {selectedLocationLocal.photos && selectedLocationLocal.photos.length > 0 && (
                <img
                  src={selectedLocationLocal.photos[0]} 
                  alt={selectedLocationLocal.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginTop: "2px",
                    marginBottom: "4px",
                    borderRadius: "8px"
                  }}
                />
              )}
              {/* address */}
              <p style={{ fontSize: "14px", color: "black", margin: "0" }}>
                {selectedLocationLocal.formatted_address}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

// PropTypes
const LocationPropTypes = PropTypes.shape({
  formatted_address: PropTypes.string.isRequired,
  geometry: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired
});

RouteMapView.propTypes = {
  startLocation: LocationPropTypes.isRequired,
  stops: PropTypes.arrayOf(LocationPropTypes).isRequired,
  endLocation: LocationPropTypes.isRequired,
  optimize: PropTypes.bool
};
