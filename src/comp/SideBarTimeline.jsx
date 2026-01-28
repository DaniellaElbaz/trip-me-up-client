import React, { useState, useRef } from "react";
import { Box, Stepper, Step, Typography, StepLabel, Popper, TextField, Paper } from "@mui/material";
import CustomConnector from "./CustomConnector";
import StepLabelWithTooltip from "./StepLabelWithTooltip";
import usePlacesAutocomplete from "use-places-autocomplete";
import useLocalStorage from '../hooks/useLocalStorage'; // <--- ייבוא ההוק שלנו

export default function SideBarTimeline({ stops, onSelectStop, selectedIndex, onStopAdded, isEditPermission }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupIndex, setPopupIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const popperRef = useRef();
  
  // שליפת מצב לילה כדי להתאים צבעים
  const [isDarkMode] = useLocalStorage("darkMode", false);

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
                  backgroundColor: index === selectedIndex ? "#1E90FF" : (isDarkMode ? "#4b5563" : "gray"),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "white",
                  transition: "all 0.3s ease"
                }}
              >
                {index + 1}
              </Box>
            }
          >
            <span
              style={{
                // תיקון צבע טקסט: לבן במצב לילה, שחור במצב יום
                color: index === selectedIndex ? "#1E90FF" : (isDarkMode ? "#ffffff" : "#000000"),
                fontWeight: index === selectedIndex ? "bold" : "normal",
                fontSize: index === selectedIndex ? "1.2rem" : "1rem",
                cursor: "pointer",
                transition: "color 0.3s ease"
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        overflowX: "auto",
        // הבטחה שהרקע יתאים למה שהגדרנו ב-BottomSection
        backgroundColor: "transparent", 
        padding: 2
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{ color: isDarkMode ? "white" : "black" }} // תיקון צבע כותרת
      >
        Trip Timeline
      </Typography>
      
      <Stepper alternativeLabel activeStep={selectedIndex} connector={<CustomConnector />} sx={{ width: "100%" }}>
        {isEditPermission && (
          <Step completed={false} onClick={(event) => handleAddClick(event, 0)} sx={{ cursor: "pointer" }}>
            <StepLabelWithTooltip stop="+" index={-1} isSelected={false} isPlus />
          </Step>
        )}
        {renderSteps()}
        {isEditPermission && (
          <Step completed={false} onClick={(event) => handleAddClick(event, stops.length)} sx={{ cursor: "pointer" }}>
            <StepLabelWithTooltip stop="+" index={stops.length} isSelected={false} isPlus />
          </Step>
        )}
      </Stepper>

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{ zIndex: 9999 }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Paper 
            ref={popperRef} 
            sx={{ 
                padding: 2, 
                maxWidth: 300,
                // התאמת חלונית החיפוש למצב לילה
                backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
                border: isDarkMode ? "1px solid #4b5563" : "none"
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);
                setValue(value);
              }}
              placeholder="Search places"
              sx={{
                input: { color: isDarkMode ? "white" : "black" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "#6b7280" : "rgba(0,0,0,0.2)"
                }
              }}
            />
            {status === "OK" && data.length > 0 && (
              <Box sx={{ marginTop: 1 }}>
                {data.map((suggestion, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: 1,
                      cursor: "pointer",
                      borderRadius: 1,
                      "&:hover": { backgroundColor: isDarkMode ? "#4b5563" : "#f0f0f0" },
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