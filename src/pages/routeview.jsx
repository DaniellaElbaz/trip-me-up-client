import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import dummyData from '../dev/dummyRouteData.json';
import RouteMapSection from "../comp/RouteMapSection";
import BottomSection from "../comp/BottomSection";
import CONFIG from "../config";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];

export default function RouteView() {
  const { routeId } = useParams();
  const [userId, setUserId] = useState(sessionStorage.getItem("userID"));
  const [routeData, setRouteData] = useState(null);
  const [routeDataReady, setRouteDataReady] = useState(false);
  const [updatedRouteData, setUpdatedRouteData] = useState(null); // contains image URL's instead of references
  const [stops, setStops] = useState(["None"]);
  const [startLocation, setStartLocation] = useState("None");
  const [endLocation, setEndLocation] = useState("None");
  const [optimizeRoute, setOptimizeRoute] = useState(true)
  const [saveState, setSaveState] = useState("saved");
  const isFirstLoad = useRef(true);
  const [selectedStopIndex, setSelectedStopIndex] = useState(0);

  useEffect(() => {
    document.title = "Trip View";
  }, []);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await fetch(`${CONFIG.SERVER_URL}/route/${routeId}`, {
          method: "GET",
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);
        const transformedData = data.route?.[0].places.map(place => ({
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
          photos: place.photo_ref,
          desc: (place.description ? place.description : "No Description Provided."),
          notes: (place.notes ? place.notes : [])
        }));
        setRouteData(transformedData);
      } catch (error) {
        console.error("Error fetching route data:", error);
        setRouteData(dummyData); // TODO: Fallback to dummy data for dev, handle differently for final build
      }
    };

    if (routeId) {
      fetchRouteData();
      setOptimizeRoute(false);
    } else {
      setRouteData(dummyData);
      setOptimizeRoute(false);
    }
  }, [routeId]);

  const getImageUrlFromReference = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${photoReference}&key=${API_KEY}`;
  };

  useEffect(() => {
    if (routeData != null) {
      // Map over routeData to update photos
      const updatedRouteData = routeData.map((place) => {
        const updatedPhotos = place.photos
          ? place.photos.map(photo => getImageUrlFromReference(photo))
          : []; // Return an empty array if photos don't exist
  
        return { ...place, photos: updatedPhotos };
      });

      setUpdatedRouteData(updatedRouteData);
      setStops(updatedRouteData.slice(1, updatedRouteData.length - 1));
      setStartLocation(updatedRouteData[0]);
      setEndLocation(updatedRouteData[updatedRouteData.length - 1]);
      setRouteDataReady(true);
      if(isFirstLoad.current == true){
        isFirstLoad.current = false;
      }
      else{
        setSaveState("unsaved");
      }
    }
  }, [routeData])

  const [bottomHeight, setBottomHeight] = useState(30);

  const handleRouteUpdate = async () => {
    try {
      console.log(userId);
      setSaveState("saving");
      const response = await fetch(`${CONFIG.SERVER_URL}/route/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_id: userId, route_id: routeId, locations: routeData })
      });
  
      if (response.ok) {
        setSaveState("saved");
        console.log("route updated")
      } else {
        console.error(response);
        //const errorData = await response.json();
        //console.error("Error details:", errorData);
        setSaveState("unsaved");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setSaveState("unsaved");
    }
  }

  const handleStopDeleted = (stopIndex) => {
    console.log(`delete place in index ${stopIndex}`);
    if(routeData.length <= 2){
      return; // should change delete button to greyed out
    }
    const newRouteData = routeData.filter((_, index) => index !== stopIndex);
    setRouteData(newRouteData);
  }

  const handleAddStop = async (place, index) => {
    try {
      const response = await fetch(`${CONFIG.SERVER_URL}/places?place=${encodeURIComponent(place.description)}`, {
        method: "GET",
        credentials: "include"
      });
  
      if (response.ok) {
        const data = await response.json();
        const newStop = data.places[0];
        newStop.photos = newStop.photos.map(photo => photo.photo_reference);
        const newRouteData = [
          ...routeData.slice(0, index),
          newStop,
          ...routeData.slice(index),
        ];
        setRouteDataReady(false);
        setRouteData(newRouteData);
      } else {
        console.error("add stop failed");
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

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
  
  console.log(selectedStopIndex);

  return (
    <div className="w-screen h-screen flex flex-col overflow-visible">
      <RouteMapSection
        startLocation={startLocation}
        endLocation={endLocation}
        stops={stops}
        bottomHeight={bottomHeight}
        optimize={optimizeRoute}
        selectedLocation={updatedRouteData[selectedStopIndex]}
        setSelectedLocation={setSelectedStopIndex}
      />
      <BottomSection
        startLocation={startLocation}
        stops={stops}
        endLocation={endLocation}
        bottomHeight={bottomHeight}
        handleScroll={handleScroll}
        handleRouteUpdate={handleRouteUpdate}
        handleStopAdded={handleAddStop}
        handleStopDeleted={handleStopDeleted}
        saveState={saveState}
        selectedIndex={selectedStopIndex}
        setSelectedIndex={setSelectedStopIndex}
      />
    </div>
  );
}