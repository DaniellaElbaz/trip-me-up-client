import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function LocationImageGallery({ location, locationIndex, image, onLocationSelect }) {

  const handlePrev = () => {
    if(onLocationSelect){
      onLocationSelect(locationIndex - 1);
    }
  };

  const handleNext = () => {
    if(onLocationSelect){
      onLocationSelect(locationIndex + 1);
    }
  };


  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ marginLeft:"75px", fontWeight: "bold", mb: 2 }}
      >
        Gallery for {location}
      </Typography>
      <Box
        sx={{
          position: "relative",
          maxWidth: 400,
          marginLeft: "70px",
          padding: "16px",
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: "-40px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            "&:disabled": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
          }}
        >
          <ArrowBack />
        </IconButton>
        <Card
          sx={{
            boxShadow: 3,
            borderRadius: "16px",
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={`${location} image`}
            sx={{
              height: 300,
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
          <CardContent>
            <Typography variant="body1" component="p" textAlign="center">
              {location}
            </Typography>
          </CardContent>
        </Card>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: "-40px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            "&:disabled": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
}

export default LocationImageGallery;
