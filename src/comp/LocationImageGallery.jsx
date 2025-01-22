import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";

function LocationImageGallery({ location, images }) {
  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        Gallery for {location}
      </Typography>
      <ImageList cols={3} gap={8}>
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image}
              alt={`${location} image ${index}`}
              style={{ borderRadius: "8px" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

LocationImageGallery.propTypes = {
  location: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LocationImageGallery;
