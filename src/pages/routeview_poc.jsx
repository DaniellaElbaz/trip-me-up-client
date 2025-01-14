import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import dummyData from '../dev/dummyRouteData.json';
import RouteMapSection from "../comp/RouteMapSection";
import BottomSection from "../comp/BottomSection";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

export default function RouteViewPoc() {
  const location = useLocation();
  const [routeData, setRouteData] = useState(null);
  const [updatedRouteData, setUpdatedRouteData] = useState(null); // contains image URL's instead of references
  const [stops, setStops] = useState(["None"]);
  const [startLocation, setStartLocation] = useState("None");
  const [endLocation, setEndLocation] = useState("None");

  useEffect(() => {
    document.title = "Trip View";
  }, []);

  useEffect(() => {
    if (location.state == null) {
      setRouteData(dummyData);
    } else {
      setRouteData(location.state.routeData);
    }
  }, [location.state]);

  const getImageUrlFromReference = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${photoReference}&key=${API_KEY}`;
  };

  useEffect(() => {
    if (routeData != null) {
      // Map over routeData to update photos
      const updatedRouteData = routeData.map((place) => {
        const updatedPhotos = place.photos
          ? place.photos.map(photo => getImageUrlFromReference(photo.photo_reference))
          : []; // Return an empty array if photos don't exist
  
        return { ...place, photos: updatedPhotos };
      });

      setUpdatedRouteData(updatedRouteData);
      setStops(updatedRouteData.slice(1, updatedRouteData.length - 1));
      setStartLocation(updatedRouteData[0]);
      setEndLocation(updatedRouteData[updatedRouteData.length - 1]);
    }
  }, [routeData])

  const [bottomHeight, setBottomHeight] = useState(30);

  const handleScroll = (e) => {
    const scrollDelta = e.deltaY;
    setBottomHeight((prevHeight) => {
      let newHeight = prevHeight + scrollDelta * 0.1;
      return Math.min(Math.max(newHeight, 30), 100);
    });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading, please wait...</p>;
  }

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <RouteMapSection
        startLocation={startLocation}
        endLocation={endLocation}
        stops={stops}
        bottomHeight={bottomHeight}
      />
      <BottomSection
        startLocation={startLocation}
        stops={stops}
        endLocation={endLocation}
        bottomHeight={bottomHeight}
        handleScroll={handleScroll}
      />
    </div>
  );
}