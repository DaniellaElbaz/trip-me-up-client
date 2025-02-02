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
  const [openNow, setIsOpenNow] = useState(null);

  function isStoreOpen(openingHours) {
    if(!openingHours)
      return null;
    const now = new Date();
    const dayIndex = now.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[dayIndex];
    
    // Find the string for the current day
    const todayHours = openingHours.find(day => day.startsWith(currentDay));
    if (!todayHours || todayHours.includes("Closed")) {
        return false;
    }
    
    // Extract the hours part after the colon and space
    const hours = todayHours.split(": ")[1];
    // Use a regex to split on any dash (en dash or hyphen) with any surrounding whitespace
    const [openTimeStr, closeTimeStr] = hours.split(/\s*[–-]\s*/);
    
    if (!openTimeStr || !closeTimeStr) {
        //console.error("Error parsing hours:", hours);
        return false;
    }
    
    // Parse the time strings into objects with hour and minute properties
    const parseTime = (timeStr) => {
        const parts = timeStr.trim().split(/\s+/);
        const [hourPart, minutePart] = parts[0].split(":");
        let hour = parseInt(hourPart, 10);
        const minute = parseInt(minutePart, 10);
        const period = parts[1]; // May be undefined
        
        if (period) {
            if (period.toUpperCase() === "PM" && hour !== 12) {
                hour += 12;
            }
            if (period.toUpperCase() === "AM" && hour === 12) {
                hour = 0;
            }
        }
        return { hour, minute };
    };

    const openTime = parseTime(openTimeStr);
    const closeTime = parseTime(closeTimeStr);
    
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    return (
        (currentHour > openTime.hour || (currentHour === openTime.hour && currentMinute >= openTime.minute)) &&
        (currentHour < closeTime.hour || (currentHour === closeTime.hour && currentMinute <= closeTime.minute))
    );
  }

  useEffect(() => setIsOpenNow(isStoreOpen(places[currentPlaceIndex].opening_hours))
  ,[currentPlaceIndex]);
  
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
        openingHours={places[currentPlaceIndex].opening_hours}
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

