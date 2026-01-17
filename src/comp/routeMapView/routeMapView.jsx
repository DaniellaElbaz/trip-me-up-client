/* global google */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "@react-google-maps/api";
import PropTypes from "prop-types";
import useLocalStorage from '../hooks/useLocalStorage';

const mapContainerStyle = {
  width: "100%",
  height: "72vh",
};

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export default function RouteMapView({ startLocation, endLocation, stops, optimize, selectedLocation, setSelectedLocation }) {
  const mapRef = useRef();
  const onLoad = useCallback(map => (mapRef.current = map), []);
  const [routeReady, setRouteReady] = useState(false);
  const [directions, setDirections] = useState();
  const [selectedLocationLocal, setSelectedLocationLocal] = useState(null);

  const [isDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() =>{
    if (!mapRef.current || !selectedLocation) return;
    const { lat, lng } = selectedLocation.geometry.location;
    const currentZoom = mapRef.current.getZoom();
    smoothZoom(mapRef.current, 18, currentZoom);
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

function smoothZoom(map, targetZoom, currentZoom) {
  if (currentZoom === targetZoom) return;
  const step = targetZoom > currentZoom ? 1 : -1;
  google.maps.event.addListenerOnce(map, 'zoom_changed', () => {
    setTimeout(() => smoothZoom(map, targetZoom, currentZoom + step), 80);
  });
  map.setZoom(currentZoom);
}

  return (
    <div className="h-screen w-screen">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad}
        options={{
          gestureHandling: "greedy",
          zoomControl: true,
          styles: isDarkMode ? darkMapStyles : [], 
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
            setSelectedLocation(0); 
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
            setSelectedLocation(stops.length + 1)
            setSelectedLocationLocal(endLocation);
          }} 
        />
        {selectedLocationLocal && (
          <InfoWindow
          position={{
            lat: selectedLocationLocal.geometry.location.lat,
            lng: selectedLocationLocal.geometry.location.lng,
          }}
            onCloseClick={() => setSelectedLocationLocal(null)}
          >
            <div style={{ 
                maxWidth: "200px", 
                padding: "16px", 
                marginTop: "3px", 
                borderRadius: "8px", 
                backgroundColor: isDarkMode ? "#333" : "#F3F4F6",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                color: isDarkMode ? "#fff" : "#000"
            }}>
              {/* title */}
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 8px 0", color: "inherit" }}>
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
              <p style={{ fontSize: "14px", margin: "0", color: isDarkMode ? "#ccc" : "black" }}>
                {selectedLocationLocal.formatted_address}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

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