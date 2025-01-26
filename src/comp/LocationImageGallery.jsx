import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function LocationImageGallery({ location, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
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
          maxWidth: 400,
          margin: "0 auto",
          padding: "16px",
        }}
      >
        <IconButton
          onClick={handlePrev}
          disabled={currentIndex === 0}
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
            image={images[currentIndex]}
            alt={`${location} image ${currentIndex + 1}`}
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
          disabled={currentIndex === images.length - 1}
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

LocationImageGallery.propTypes = {
  location: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LocationImageGallery;
