import React, { useState, useRef } from "react";
import { Box, Stepper, Step, Typography, Popper, TextField, Paper } from "@mui/material";
import CustomConnector from "./CustomConnector";
import StepLabelWithTooltip from "./StepLabelWithTooltip";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

export default function SideBarTimeline({ stops, onSelectStop, selectedIndex, onStopAdded }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupIndex, setPopupIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const popperRef = useRef();

  const { suggestions: { data, status }, setValue, clearSuggestions } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleAddClick = (event, index) => {
    event.stopPropagation(); // Prevent click propagation
    setAnchorEl(event.currentTarget);
    setPopupIndex(index);
    setInputValue("");
    setValue("");
  };

  const handlePlaceSelect = async (place) => {
    if (!place) return;
    console.log(`place: ${place}, index: ${popupIndex}`)
    //onStopAdded(selectedPlace, popupIndex);
    clearSuggestions();
    setAnchorEl(null);

  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      if (data.length > 0) {
        await handlePlaceSelect(data[0]);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (
      (popperRef.current && popperRef.current.contains(event.target)) ||
      (anchorEl && anchorEl.contains(event.target))
    ) {
      return;
    }
    setAnchorEl(null);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Trip Timeline
      </Typography>
      <Stepper
        alternativeLabel
        activeStep={selectedIndex}
        connector={<CustomConnector />}
        sx={{
          width: "100%",
          padding: "0",
        }}
      >
        <Step
          completed={false}
          onClick={(event) => handleAddClick(event, 0)}
          sx={{ cursor: "pointer" }}
        >
          <StepLabelWithTooltip stop="+" index={-1} isSelected={false} isPlus />
        </Step>
        {stops.map((stop, index) => (
          <React.Fragment key={index}>
            <Step
              completed={false}
              onClick={() => onSelectStop(index)}
              sx={{ cursor: "pointer" }}
            >
              <StepLabelWithTooltip
                stop={stop}
                index={index}
                isSelected={index === selectedIndex}
                isPlus={false}
              />
            </Step>
            {index < stops.length - 1 && (
              <Step
                completed={false}
                onClick={(event) => handleAddClick(event, index + 1)}
                sx={{ cursor: "pointer" }}
              >
                <StepLabelWithTooltip stop="+" index={index + 1} isSelected={false} isPlus />
              </Step>
            )}
          </React.Fragment>
        ))}
        <Step
          completed={false}
          onClick={(event) => handleAddClick(event, stops.length)}
          sx={{ cursor: "pointer" }}
        >
          <StepLabelWithTooltip stop="+" index={stops.length} isSelected={false} isPlus />
        </Step>
      </Stepper>

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8], // Adjust the offset to ensure visibility
            },
          },
        ]}
        sx={{
          zIndex: 9999, // Ensure it renders above other elements
        }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Paper ref={popperRef} sx={{ padding: 2, maxWidth: 300 }}>
            <TextField
              fullWidth
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);
                setValue(value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search places"
            />
            {status === "OK" && data.length > 0 && (
              <Box sx={{ marginTop: 1 }}>
                {data.map((suggestion, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: 1,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                    onClick={() => handlePlaceSelect(suggestion)}
                  >
                    {suggestion.description}
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </div>
      </Popper>
    </Box>
  );
}