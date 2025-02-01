import React from "react";
import PropTypes from "prop-types";
import GalleryContainer from "./GalleryContainer";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";

function TripCard({ trip, onViewRoute }) {
  return (
    <div className="flex flex-row justify-between w-full bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      {/* תוכן בצד שמאל */}
      <div className="w-3/5 p-8 flex flex-col justify-center">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6 font-serif">Trip from {trip.places[0]} to {trip.places[trip.places.length - 1]}</h2>
        <p className="text-gray-600 text-xl mb-6 flex items-center font-light italic">
          {/*<EventIcon className="mr-2" /> {trip.date} */}
        </p>
        <p className="text-gray-800 font-semibold flex items-center text-xl font-mono">
          <PlaceIcon className="mr-3" /> Places:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-8 text-xl font-sans">
          {trip.places.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-shadow shadow-lg flex items-center text-lg"
          onClick={() => onViewRoute(trip.id)}
        >
          View Route
        </button>
      </div>
      {/* גלריה בצד ימין */}
      <div >
        <GalleryContainer trip={trip} />
      </div>
    </div>
  );
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    places: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number
  }).isRequired,
  onViewRoute: PropTypes.func.isRequired, 
};

export default TripCard;
