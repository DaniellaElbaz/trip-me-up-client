import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import dummyData from '../dev/dummyRouteData.json';
import RouteMapSection from "../comp/RouteMapSection";
import BottomSection from "../comp/BottomSection";
import CONFIG from "../config";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

export default function RouteViewPoc() {
  const { routeId } = useParams();
  const [routeData, setRouteData] = useState(null);
  const [routeDataReady, setRouteDataReady] = useState(false);
  const [updatedRouteData, setUpdatedRouteData] = useState(null); // contains image URL's instead of references
  const [stops, setStops] = useState(["None"]);
  const [startLocation, setStartLocation] = useState("None");
  const [endLocation, setEndLocation] = useState("None");

  useEffect(() => {
    document.title = "Trip View";
  }, []);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await fetch(`${CONFIG.SERVER_URL}/route/${routeId}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        const transformedData = data?.[0].places.map(place => ({
          formatted_address: place.address,
          geometry: {
            location: {
              lat: place.lat,
              lng: place.lng,
            }
          },
          icon: place.icon_url,
          name: place.name,
          rating: place.rating,
          photos: [] // TODO: add photo references from server
        }));
        setRouteData(transformedData); 
      } catch (error) {
        console.error("Error fetching route data:", error);
        setRouteData(dummyData); // TODO: Fallback to dummy data for dev, handle differently for final build
      }
    };

    if (routeId) {
      fetchRouteData();
    } else {
      setRouteData(dummyData);
    }
  }, [routeId]);

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
      setRouteDataReady(true);
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

  if (!isLoaded || !routeDataReady) {
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