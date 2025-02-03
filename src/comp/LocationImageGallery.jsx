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
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        Gallery for {location}
      </Typography>
      <Box
        sx={{
          position: "relative",
          maxWidth: { xs: 200, sm: 250, md: 300 , lg:400},
          minWidth: { xs: 200, sm: 250, md: 300, lg: 400 },
          margin: { xs: "20px auto", sm: "30px auto", md: "50px auto" },
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
              height: { xs: 200, sm: 250, md: 300 },
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
