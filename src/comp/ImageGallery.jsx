
import React, { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Box, IconButton } from "@mui/material";
import CustomCard from "./CustomCard";
import NoteBox from "./NoteBox";
export default function ImageGallery({
  imageReferences,
  currentImageIndex,
  onNext,
  onPrev,
}) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const toggleNotes = () => {
    setIsNotesOpen(!isNotesOpen);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={onPrev}
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
       image={imageReferences[currentImageIndex]?.photos}
        title=""
        description=""
        toggleNotes={toggleNotes} // פונקציה לכפתור בפינה
      />
  
  <NoteBox isNotesOpen={isNotesOpen} toggleNotes={toggleNotes}  currentLocation={imageReferences[currentImageIndex]?.name}  />
      <IconButton
        onClick={onNext}
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
  );
}
ImageGallery.propTypes = {
  imageReferences: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photos: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentImageIndex: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};