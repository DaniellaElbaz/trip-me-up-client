import React, { useState, useEffect } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import CustomCard from "./CustomCard";

export default function PlaceGallery({
  places,
  currentPlaceIndex,
  onNextPlace,
  onPrevPlace,
  onDelete
}) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
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
        //description={places[currentPlaceIndex].desc}
        description=""
        onDelete={() => onDelete(currentPlaceIndex)}
      />

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
  );
}

