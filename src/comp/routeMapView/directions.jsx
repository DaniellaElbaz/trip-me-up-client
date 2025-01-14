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
  
    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({ map });
  
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
  
    return () => {
      renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    //console.log(`start: ${startLocation}, end: ${endLocation}, stops: ${stops}`);
    directionsService.route({
      origin: startLocation,
      destination: endLocation,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: stops.map(location => ({ location, stopover: true })),
      optimizeWaypoints: true
    })
    .then(response => {
      directionsRenderer.setDirections(response);
      setRoutes(response.routes);
    })
    .catch(error => {
      console.error('Error fetching directions:', error);
    });
  }, [directionsService, directionsRenderer, startLocation, endLocation, stops]);  

  if (!leg) return null;

  return (
    <div className="directions" style={styles.directions}>
      <p className='text-amber-500 text-lg'>
        {leg.start_address.split(',')[0]} to {selected.legs[selected.legs.length - 1].end_address.split(',')[0]}
      </p>
      <p>Distance: {calculateTotalDistance(selected.legs) / 1000} km</p> 
      <p>Duration: {formatDuration(calculateTotalDuration(selected.legs))}</p>
      <p className="text-blue-400 font-bold">Locations:</p>
      <ul className="list-decimal pl-6">
        {selected.legs.map((leg, index) => (
        <li key={index} className='text-blue-500'>
          {leg.start_address.split(',')[0]}
        </li>
        ))}
        <li key={selected.legs.length - 1} className='text-blue-500'>
          {selected.legs[selected.legs.length - 1].end_address.split(',')[0]}
        </li>
      </ul>
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

function calculateTotalDistance(legs) {
  return legs.reduce((totalDistance, leg) => {
    const distanceInMeters = leg.distance.value; 
    return totalDistance + distanceInMeters;
  }, 0);
}

function calculateTotalDuration(legs) {
  return legs.reduce((totalDuration, leg) => {
    const durationInSeconds = leg.duration.value; // duration in seconds
    return totalDuration + durationInSeconds;
  }, 0);
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export default Directions;