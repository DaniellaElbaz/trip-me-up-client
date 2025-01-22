import React from "react";
import PropTypes from "prop-types";
import { Place, DateRange, Visibility } from "@mui/icons-material";

function TripCard({ trip, onViewRoute }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={trip.image}
        alt={trip.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          {trip.name}
        </h2>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <DateRange className="text-gray-500 mr-2" /> {trip.date}
        </p>
        <p className="text-gray-700 font-semibold flex items-center">
          <Place className="text-gray-700 mr-2" /> Places:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {trip.places.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"

          onClick={() => onViewRoute(trip.name)}
        >
          <Visibility className="mr-2" /> View Route
        </button>
      </div>
    </div>
  );
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    places: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onViewRoute: PropTypes.func.isRequired,
};

export default TripCard;

