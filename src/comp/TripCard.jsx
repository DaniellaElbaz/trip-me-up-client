import React from "react";
import PropTypes from "prop-types";
import GalleryContainer from "./GalleryContainer";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";

function TripCard({ trip, onViewRoute }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <GalleryContainer trip={trip} />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{trip.name}</h2>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          {/*<EventIcon className="mr-2" /> {trip.date} */}
        </p>
        <p className="text-gray-700 font-semibold flex items-center">
          <PlaceIcon className="mr-2" /> Places:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {trip.places.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
        <button
          className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-shadow shadow-lg flex items-center"
          onClick={() => onViewRoute(trip.id)}
        >
          View Route
        </button>
      </div>
    </div>
  );
}


TripCard.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    places: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number
  }).isRequired,
  onViewRoute: PropTypes.func.isRequired, // Validate 'onViewRoute' as a function
};

export default TripCard;