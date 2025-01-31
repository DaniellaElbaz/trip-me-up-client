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
  const [notesArray, setNotesArray] = useState([]);
  const [stops, setStops] = useState(["None"]);
  const [startLocation, setStartLocation] = useState("None");
  const [endLocation, setEndLocation] = useState("None");
  const [optimizeRoute, setOptimizeRoute] = useState(true)
  const [saveState, setSaveState] = useState("saved");
  const [selectedStopIndex, setSelectedStopIndex] = useState(0);
  const [permission, setPermission] = useState("view");
  const isFirstLoad = useRef(true);

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
        setPermission(data.permission);
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
        setNotesArray(transformedData.map(place => place.notes));
      } catch (error) {
        console.error("Error fetching route data:", error);
        setRouteData(dummyData); // TODO: Fallback to dummy data for dev, handle differently for final build
        setPermission("edit");
      }
    };

    if (routeId) {
      fetchRouteData();
      setOptimizeRoute(false);
    } else {
      setRouteData(dummyData);
      setPermission("edit");
      setOptimizeRoute(false);
    }
  }, [routeId]);

  useEffect(() => {
    setSaveState("unsaved");
  }, [notesArray])


  useEffect(() => {
    if (routeData != null) {
      setStops(routeData.slice(1, routeData.length - 1));
      setStartLocation(routeData[0]);
      setEndLocation(routeData[routeData.length - 1]);
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
      setSaveState("saving");
      const routeDataWithNotes = routeData.map((obj, index) => ({
        ...obj, 
        notes: notesArray[index] 
      }));
      console.log(notesArray);
      console.log(routeDataWithNotes);
      console.log(routeId);
      const response = await fetch(`${CONFIG.SERVER_URL}/route/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ route_id: routeId, locations: routeDataWithNotes })
      });
  
      if (response.ok) {
        setSaveState("saved");
        console.log("route updated")
      } else {
        console.error(response);
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
    const newNotesData = notesArray.filter((_, index) => index !== stopIndex);
    setNotesArray(newNotesData);
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
        newStop.notes = [];
        const newRouteData = [
          ...routeData.slice(0, index),
          newStop,
          ...routeData.slice(index),
        ];
        const newNotesData = [
          ...notesArray.slice(0, index),
          [],
          ...notesArray.slice(index)
        ]
        setRouteDataReady(false);
        setRouteData(newRouteData);
        setNotesArray(newNotesData);
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
  
  return (
    <div className="w-screen h-screen flex flex-col overflow-visible">
      <RouteMapSection
        startLocation={startLocation}
        endLocation={endLocation}
        stops={stops}
        bottomHeight={bottomHeight}
        optimize={optimizeRoute}
        selectedLocation={routeData[selectedStopIndex]}
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
        isEditPermission={(permission == "view" ? false : true)}
        notesArray={notesArray}
        setNotesArray={setNotesArray}
      />
    </div>
  );
}