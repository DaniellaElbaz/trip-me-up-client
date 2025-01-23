import React from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import CustomCard from "./CustomCard";
import NoteBox from "./NoteBox";
export default function ImageGallery({
  imageReferences,
  currentImageIndex,
  onNext,
  onPrev,
}) {
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
        image={imageReferences[currentImageIndex]}
        title=""
        description=""
      />
 <NoteBox />
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

