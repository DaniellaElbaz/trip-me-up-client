import React, { useState, useRef } from "react";
import { Popper, Box, TextField, Paper } from "@mui/material";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

export default function PlacesSearchPopup({ anchorEl, onPlaceSelected }) {
  const [inputValue, setInputValue] = useState(""); // Track user input
  const popperRef = useRef(); // Reference for click outside detection

  const { suggestions: { data, status }, setValue, clearSuggestions } = usePlacesAutocomplete();

  const handleClickOutside = (event) => {
    if (popperRef.current && !popperRef.current.contains(event.target)) {
      setInputValue(""); // Reset the input
      clearSuggestions(); // Clear suggestions
      onPlaceSelected(null); // Close Popper
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setValue(value); // Update `usePlacesAutocomplete`
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      try {
        const result = data[0]; // Select the first suggestion
        if (result) {
          const geocode = await getGeocode({ placeId: result.place_id });
          const latLng = await getLatLng(geocode[0]);
          onPlaceSelected({ description: result.description, latLng });
          clearSuggestions(); // Clear autocomplete suggestions
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start">
      {console.log("Popper anchorEl:", anchorEl)}
      <Paper ref={popperRef} sx={{ padding: 2, maxWidth: 300 }}>
        <TextField
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search places"
        />
        {status === "OK" && (
          <Box sx={{ marginTop: 1 }}>
            {data.map((suggestion, index) => (
              <Box
                key={index}
                sx={{
                  padding: 1,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={async () => {
                  try {
                    const geocode = await getGeocode({ placeId: suggestion.place_id });
                    const latLng = await getLatLng(geocode[0]);
                    onPlaceSelected({ description: suggestion.description, latLng });
                    clearSuggestions(); // Clear autocomplete suggestions
                  } catch (error) {
                    console.error("Error fetching place details:", error);
                  }
                }}
              >
                {suggestion.description}
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Popper>
  );
}