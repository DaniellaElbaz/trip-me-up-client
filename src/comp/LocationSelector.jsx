import React from "react";
import PropTypes from "prop-types";
import { Box, MenuItem, FormControl, Select } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

function LocationSelector({ locations, selectedLocation, onLocationSelect }) {
  return (
    <Box sx={{ maxWidth: "50%", margin: "0 auto", mb: 4 ,marginTop:"10px"}}>
      <FormControl fullWidth>
        <Select
          value={selectedLocation}
          onChange={(event) => onLocationSelect(event.target.value)}
          displayEmpty
          startAdornment={<PlaceIcon sx={{ mr: 1 }} />}
        >
          {locations.map((location, index) => (
            <MenuItem key={index} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

LocationSelector.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedLocation: PropTypes.string.isRequired,
  onLocationSelect: PropTypes.func.isRequired,
};

export default LocationSelector;
