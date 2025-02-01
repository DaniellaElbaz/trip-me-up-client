import React, { useState, useEffect } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import CustomCard from "./CustomCard";
import NoteBox from "./NoteBox";

export default function PlaceGallery({
  places,
  currentPlaceIndex,
  onNextPlace,
  onPrevPlace,
  onDelete,
  isEditPermission,
  notesArray,
  setNotesArray
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isPlaceSwappedHere, setIsPlaceSwappedHere] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  function isStoreOpen(openingHours) {
    const now = new Date();
    const dayIndex = now.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[dayIndex];
    const todayHours = openingHours.find(day => day.startsWith(currentDay));
    if (!todayHours || todayHours.includes("Closed")) {
        return false;
    }
    const hours = todayHours.split(": ")[1];
    const [openTime, closeTime] = hours.split(" – ").map(time => {
        const [hour, minute] = time.split(/:| /);
        const isPM = time.includes("PM");
        return {
            hour: (parseInt(hour) % 12) + (isPM ? 12 : 0),
            minute: parseInt(minute)
        };
    });
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    return (currentHour > openTime.hour || (currentHour === openTime.hour && currentMinute >= openTime.minute)) &&
           (currentHour < closeTime.hour || (currentHour === closeTime.hour && currentMinute <= closeTime.minute));
}
const mockOpeningHours = [
  "Monday: 12:00 AM – 11:59 PM",
  "Tuesday: 12:00 AM – 11:59 PM",
  "Wednesday: 12:00 AM – 11:59 PM",
  "Thursday: 12:00 AM – 11:59 PM",
  "Friday: 12:00 AM – 11:59 PM",
  "Saturday: 12:00 AM – 11:59 PM",
  "Sunday: 12:00 AM – 11:59 PM"
];

const openingHours = places[currentPlaceIndex].opening_hours?.weekday_text || mockOpeningHours;
const openNow = isStoreOpen(openingHours);

  const toggleNotes = () => {
    setIsNotesOpen(!isNotesOpen);
  };

  useEffect(() => {
    if(places.length <= 2){
      setDeleteDisabled(true);
    }
    else{
      setDeleteDisabled(false);
    }
  }, [places])

  useEffect(() => {
    if(!isPlaceSwappedHere){
      setImageIndex(0);
    }
    else{
      setIsPlaceSwappedHere(false)
    }
  }, [currentPlaceIndex])

  const handleNext = () => {
    if (imageIndex == places[currentPlaceIndex].photos.length - 1) {
      onNextPlace();
      setImageIndex(0);
    }
    else{
      setImageIndex(imageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (imageIndex == 0) {
      let prevIndex = currentPlaceIndex > 0 ? currentPlaceIndex - 1 : places.length - 1;
      let prevLastImageIndex = places[prevIndex].photos.length - 1;
      setImageIndex(prevLastImageIndex);
      setIsPlaceSwappedHere(true);
      onPrevPlace();
    }
    else{
      setImageIndex(imageIndex - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        maxWidth: "100%",
        width: "80vh",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* CustomCard for Image Display */}
      <CustomCard
        image={places[currentPlaceIndex].photos[imageIndex]}
        title={places[currentPlaceIndex].name}
        subtitle={places[currentPlaceIndex].formatted_address}
        description={places[currentPlaceIndex].desc}
        rating={places[currentPlaceIndex].rating}
        openNow={openNow}
        openingHours={openingHours}
        onDelete={() => onDelete(currentPlaceIndex)}
        isDeleteDisabled={deleteDisabled}
        toggleNotes={toggleNotes}
        isEditPermission={isEditPermission}
      />

      {isEditPermission &&
        <NoteBox 
          isNotesOpen={isNotesOpen} 
          toggleNotes={toggleNotes} 
          currentLocationIndex={currentPlaceIndex} 
          currentLocationName={places[currentPlaceIndex].name}
          notesArray={notesArray} 
          setNotesArray={setNotesArray}
        />
      }

      <IconButton
        onClick={handleNext}
        sx={{
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
    </Box>
  );
}

