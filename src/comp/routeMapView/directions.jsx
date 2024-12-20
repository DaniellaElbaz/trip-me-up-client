/* global google */
import { useEffect, useState } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';


const styles = {
  directions: {
    position: 'absolute',
    top: '40px', 
    right: '20px', 
    backgroundColor: 'black',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1, 
    maxHeight: '90vh',
    overflowY: 'auto', 
    width: '300px', 
  },
};


function Directions({ startLocation, endLocation, stops }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const defaultRoute = 0;
  const selected = routes[defaultRoute];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: stops.map((location) => ({location, stopover:true }))
        //provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, startLocation, endLocation, stops]);

  if (!leg) return null;

  return (
    <div className="directions" style={styles.directions}>
      <h2 className='text-blue-500 text-lg'>{selected.summary}</h2>
      <p className='text-amber-500'>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>
    </div>
  );
}

Directions.propTypes = {
  startLocation: PropTypes.string.isRequired, // A string representing the start location
  endLocation: PropTypes.string.isRequired,   // A string representing the end location
  stops: PropTypes.arrayOf(
    PropTypes.string // An array of strings for the stops
  ).isRequired,
};

export default Directions;