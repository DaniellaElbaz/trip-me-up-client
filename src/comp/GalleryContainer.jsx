import React, { useState, useEffect } from "react";
import LocationImageGallery from "./LocationImageGallery";
import LocationSelector from "./LocationSelector";
import PropTypes from "prop-types";
import { useLoadScript } from "@react-google-maps/api";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

export default function GalleryContainer({ trip }) {
  const [selectedLocation, setSelectedLocation] = useState(
    trip?.places?.[0] || null
  );
  const [images, setImages] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const fetchImagesForLocation = (locationName) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      query: locationName,
      fields: ["photos"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results &&
        results[0].photos
      ) {
        const photoUrls = results[0].photos.map((photo) =>
          photo.getUrl({ maxWidth: 400 })
        );
        setImages(photoUrls);
      } else {
        console.error(`No photos found for ${locationName}`);
        setImages(['https://via.placeholder.com/400']);
      }
    });
  };

  useEffect(() => {
    if (selectedLocation && isLoaded) {
      fetchImagesForLocation(selectedLocation);
    }
  }, [selectedLocation, isLoaded]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <LocationSelector
        locations={trip.places}
        selectedLocation={selectedLocation}
        onLocationSelect={handleLocationSelect}
      />
      <LocationImageGallery location={selectedLocation} images={images} />
    </div>
  );
}

GalleryContainer.propTypes = {
  trip: PropTypes.shape({
    places: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
