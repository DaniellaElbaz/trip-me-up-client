import React from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

function LocationSelector({ locations, selectedLocation, onLocationSelect }) {
  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 4 }}>
      {locations.map((location, index) => (
        <Button
          key={index}
          variant={selectedLocation === location ? "contained" : "outlined"}
          color="primary"
          onClick={() => onLocationSelect(location)}
          startIcon={<PlaceIcon />}
        >
          {location}
        </Button>
      ))}
    </Box>
  );
}

LocationSelector.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedLocation: PropTypes.string.isRequired,
  onLocationSelect: PropTypes.func.isRequired,
};

export default LocationSelector;
