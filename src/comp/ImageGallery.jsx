import React, { useState } from 'react';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export default function ImageGallery({ imageReferences }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev < imageReferences.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : imageReferences.length - 1
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        left:"30%",
        width: "40%",
        height: "40vh",
        overflow: "hidden",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1))",
          zIndex: 1,
        }}
      />

      {/* Image */}
      <img
        src={imageReferences[currentImageIndex]}
        alt={`Image index ${currentImageIndex}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          aspectRatio: "1 / 1",
        }}
      />

      {/* Navigation Buttons */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.8)" },
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.8)" },
        }}
      >
        <ArrowForward />
      </IconButton>

      {/* Image Caption */}
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          color: "white",
          zIndex: 2,
          textShadow: "0px 0px 8px rgba(0, 0, 0, 0.7)",
        }}
      >
        Image {currentImageIndex + 1} / {imageReferences.length}
      </Typography>
    </Box>
  );
}


{/*in this part we need to add the info about the place */}