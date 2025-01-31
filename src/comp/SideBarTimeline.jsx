import React, { useState, useRef } from "react";
import { Box, Stepper, Step, Typography, StepLabel, Popper, TextField, Paper } from "@mui/material";
import CustomConnector from "./CustomConnector";
import StepLabelWithTooltip from "./StepLabelWithTooltip";
import usePlacesAutocomplete from "use-places-autocomplete";

export default function SideBarTimeline({ stops, onSelectStop, selectedIndex, onStopAdded, isEditPermission }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupIndex, setPopupIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const popperRef = useRef();

  const { suggestions: { data, status }, setValue, clearSuggestions } = usePlacesAutocomplete({ debounce: 300 });

  const handleAddClick = (event, index) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setPopupIndex(index);
    setInputValue("");
    setValue("");
  };

  const handlePlaceSelect = async (place) => {
    if (!place) return;
    onStopAdded(place, popupIndex);
    clearSuggestions();
    setAnchorEl(null);
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

  const renderSteps = () =>
    stops.map((stop, index) => (
      <React.Fragment key={index}>
        <Step completed={false} onClick={() => onSelectStop(index)} sx={{ cursor: "pointer" }}>
          <StepLabel
            icon={
              <Box
                onClick={() => onSelectStop(index)}
                sx={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  backgroundColor: index === selectedIndex ? "blue" : "gray",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                {index + 1}
              </Box>
            }
          >
            <span
              style={{
                color: index === selectedIndex ? "blue" : "black",
                fontWeight: index === selectedIndex ? "bold" : "normal",
                fontSize: index === selectedIndex ? "1.2rem" : "1rem",
                cursor: "pointer",
              }}
              onClick={() => onSelectStop(index)}
            >
              {stop}
            </span>
          </StepLabel>
        </Step>
        {isEditPermission && index < stops.length - 1 && (
          <Step completed={false} onClick={(event) => handleAddClick(event, index + 1)} sx={{ cursor: "pointer" }}>
            <StepLabelWithTooltip stop="+" index={index + 1} isSelected={false} isPlus />
          </Step>
        )}
      </React.Fragment>
    ));

  return (
    <>
      {isEditPermission ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Trip Timeline
          </Typography>
          <Stepper alternativeLabel activeStep={selectedIndex} connector={<CustomConnector />} sx={{ width: "100%" }}>
            <Step completed={false} onClick={(event) => handleAddClick(event, 0)} sx={{ cursor: "pointer" }}>
              <StepLabelWithTooltip stop="+" index={-1} isSelected={false} isPlus />
            </Step>
            {renderSteps()}
            <Step completed={false} onClick={(event) => handleAddClick(event, stops.length)} sx={{ cursor: "pointer" }}>
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
                  offset: [0, 8],
                },
              },
            ]}
            sx={{ zIndex: 9999 }}
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
      ) : (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Trip Timeline
        </Typography>
        <Stepper
          alternativeLabel
          activeStep={selectedIndex}
          connector={stops.length > 1 ? <CustomConnector /> : null}
          sx={{ width: "100%" }}
        >
          {stops.map((stop, index) => (
            <Step key={index} completed={false} onClick={() => onSelectStop(index)} sx={{ cursor: "pointer" }}>
              <StepLabel
                icon={
                  <Box
                    onClick={() => onSelectStop(index)}
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: index === selectedIndex ? "blue" : "gray",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "white",
                    }}
                  >
                    {index + 1}
                  </Box>
                }
              >
                <span
                  style={{
                    color: index === selectedIndex ? "blue" : "black",
                    fontWeight: index === selectedIndex ? "bold" : "normal",
                    fontSize: index === selectedIndex ? "1.2rem" : "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => onSelectStop(index)}
                >
                  {stop}
                </span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      )}
    </>
  );
}
