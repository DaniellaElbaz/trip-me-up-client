/* global google */
import { useState, useMemo, useEffect } from "react";

import{
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import PropTypes from 'prop-types';

const mapContainerStyle = {
  width: '100%',
  height: '100vh'
}
export default function RouteMapView({ startLocation, endLocation, stops }){
  const [routeReady, setRouteReady] = useState(false);
  const [directions, setDirections] = useState();
  const fetchDirections = () => {
    if(!routeReady) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: stops.map(location => ({ location, stopover: true })),
        optimizeWaypoints: true
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  }

  useEffect(fetchDirections, [routeReady]);
  useEffect(() => {
    if( startLocation && endLocation && stops )
      setRouteReady(true);
  }, [startLocation, endLocation, stops])
  
  const center = useMemo(() => ({ lat: 32.03, lng: 34.78 }), []);

  return(
    <div className="h-screen w-screen">
      <GoogleMap zoom={9} center={center} mapContainerStyle={mapContainerStyle}>
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
  )
}

RouteMapView.propTypes = {
  startLocation: PropTypes.string.isRequired,
  endLocation: PropTypes.string.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string).isRequired,
};


