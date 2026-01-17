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

  function isStoreOpen(rawOpeningHours) {
    if (!rawOpeningHours) return null;

    let openingHours = rawOpeningHours;

    if (typeof rawOpeningHours === 'string') {
        openingHours = rawOpeningHours.split(',').map(day => day.trim());
    }

    if (!Array.isArray(openingHours)) return null;

    const now = new Date();
    const dayIndex = now.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[dayIndex];
    
    const todayHours = openingHours.find(day => day.startsWith(currentDay));
    
    if (!todayHours || todayHours.includes("Closed")) {
        return false;
    }
    
    if (!todayHours.includes(": ")) return false;

    const hours = todayHours.split(": ")[1];
    const [openTimeStr, closeTimeStr] = hours.split(/\s*[–-]\s*/);
    
    if (!openTimeStr || !closeTimeStr) {
        return false;
    }
    
    const parseTime = (timeStr) => {
        const parts = timeStr.trim().split(/\s+/);
        const [hourPart, minutePart] = parts[0].split(":");
        let hour = parseInt(hourPart, 10);
        const minute = parseInt(minutePart, 10);
        const period = parts[1]; 
        
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
  // --------------------------------

  useEffect(() => {
    if (places && places[currentPlaceIndex]) {
        setIsOpenNow(isStoreOpen(places[currentPlaceIndex]?.opening_hours));
    }
  }, [currentPlaceIndex, places]);
  
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
    const photosLength = places[currentPlaceIndex]?.photos?.length || 0;

    if (imageIndex >= photosLength - 1) {
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
      
      const prevPhotos = places[prevIndex]?.photos || [];
      let prevLastImageIndex = prevPhotos.length > 0 ? prevPhotos.length - 1 : 0;
      
      setImageIndex(prevLastImageIndex);
      setIsPlaceSwappedHere(true);
      onPrevPlace();
    }
    else{
      setImageIndex(imageIndex - 1);
    }
  };

  const currentPlace = places[currentPlaceIndex];
  const safeImage = (currentPlace?.photos && currentPlace.photos.length > 0) 
                    ? currentPlace.photos[imageIndex] 
                    : ""; 

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

      <CustomCard
        image={safeImage} 
        title={currentPlace?.name || ""}
        subtitle={currentPlace?.formatted_address || ""}
        description={currentPlace?.desc || ""}
        rating={currentPlace?.rating || 0}
        openNow={null} 
        openingHours={currentPlace?.opening_hours}
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
          currentLocationName={currentPlace?.name}
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