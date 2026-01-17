import React from "react";
import PropTypes from "prop-types";
import GalleryContainer from "./GalleryContainer";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import useLocalStorage from '../hooks/useLocalStorage';

function TripCard({ trip, onViewRoute, onDelete }) {
  const [isDarkMode] = useLocalStorage("darkMode", false);

  return (
    <div 
      className={`flex flex-col md:flex-row justify-between w-full shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 
      ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
       <div className="p-2 items-center">
        <IconButton
          onClick={() => {
            const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
            if (confirmDelete) {
              onDelete(trip.id);
            }
          }}
          sx={{
            backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.8)",
            color: isDarkMode ? "white" : "inherit",
            transition: "color 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              color: "white",
            },
          }}
        >
          <Delete />
        </IconButton>
      </div>

      <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
        <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Trip from {trip.places[0]} to {trip.places[trip.places.length - 1]}
        </h2>

        <p className={`text-xl mb-6 flex items-center font-light italic ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          <EventIcon className="mr-2" /> {trip.start_date}
        </p>

        <p className={`font-semibold flex items-center text-xl ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
          <PlaceIcon className="mr-3" /> Places:
        </p>

        <ul className={`list-disc list-inside mb-8 text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
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

      <div className="w-full md:w-auto">
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
  onDelete: PropTypes.func
};

export default TripCard;