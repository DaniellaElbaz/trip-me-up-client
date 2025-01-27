import React, { useState, useEffect } from "react";
import LocationImageGallery from "./LocationImageGallery";
import LocationSelector from "./LocationSelector";
import PropTypes from "prop-types";

export default function GalleryContainer({ trip }) {
  const [selectedLocation, setSelectedLocation] = useState(
    trip?.places?.[0] || null
  );

  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);

  const handleLocationSelect = (location) => {
    console.log(location);
    setSelectedLocation(location);
    setSelectedLocationIndex(trip.places.indexOf(location));
  };

  const handleLocationSelectIndex = (locationIndex) => {
    let newIndex = locationIndex;
    if(locationIndex < 0){
      newIndex = trip.places.length - 1;
    }
    else if(locationIndex >= trip.places.length){
      newIndex = 0;
    }
    setSelectedLocationIndex(newIndex);
    setSelectedLocation(trip.places[newIndex]);
  };

  return (
    <div>
      <LocationSelector
        locations={trip.places}
        selectedLocation={selectedLocation}
        onLocationSelect={handleLocationSelect}
      />
      <LocationImageGallery location={selectedLocation} locationIndex={selectedLocationIndex} image={trip.images[selectedLocationIndex]} onLocationSelect={handleLocationSelectIndex} />
    </div>
  );
}

GalleryContainer.propTypes = {
  trip: PropTypes.shape({
    places: PropTypes.arrayOf(PropTypes.string).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};
