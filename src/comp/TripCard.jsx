import React from "react";
import PropTypes from "prop-types";
import GalleryContainer from "./GalleryContainer";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";

function TripCard({ trip, onViewRoute }) {
  return (
    <div className="flex flex-row justify-between w-full bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
          <div className="w-3/5 p-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{trip.name}</h2>
        <p className="text-gray-500 text-lg mb-4 flex items-center">
          {/*<EventIcon className="mr-2" /> {trip.date} */}
        </p>
        <p className="text-gray-700 font-semibold flex items-center text-lg">
          <PlaceIcon className="mr-2" /> Places:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6 text-lg">
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
       <div className="w-2/5">
        <GalleryContainer trip={trip} />
      </div>
    </div>
  );
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string.isRequired,
    places: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number
  }).isRequired,
  onViewRoute: PropTypes.func.isRequired, 
};

export default TripCard;
