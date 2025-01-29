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

