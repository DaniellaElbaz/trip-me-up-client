import React, { useState } from "react";
import { Box, Button  } from "@mui/material";
import SideBarTimeline from "./SideBarTimeline";
import ImageGallery from "./ImageGallery";
import CONFIG from "../config";
import ButtonC from '@mui/material/Button';
import BoxC from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import CheckIcon from "@mui/icons-material/Check";
export default function BottomSection({
  startLocation,
  stops,
  endLocation,
  bottomHeight,
  handleScroll,
  handleRouteUpdate,
  handleStopAdded,
  handleStopDeleted
}) {
  const allStops = [startLocation, ...stops, endLocation];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = React.useState(true);
  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev < allStops.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : allStops.length - 1
    );
  };

  const handleButtonClick = () => {
    handleRouteUpdate();
  };
  function handleClick() {
    setLoading(true);
  }

  return (
    <Box
      className="absolute bottom-0 left-0 w-full bg-transparent transition-all duration-300"
      style={{
        maxHeight: "50vh",
        zIndex: 10,
      }}
      onWheel={handleScroll}
    >
      <div className="flex flex-col bg-white p-6 gap-6 overflow-x-auto">
      <div className="h-full max-h-1/2 min-h-1/5 overflow-y-auto">

      {/* buttons */}
      <BoxC sx={{ '& > button': { m: 1 } }}>
        {/* saved*/}
        <ButtonC
        size="small"
        variant="contained"
        color="success"
        startIcon={<CheckIcon />}
        sx={{
          backgroundColor: "green",
          "&:hover": {
            backgroundColor: "darkgreen",
          },
      }}
    >
      Saved
    </ButtonC>
      {/* saving*/}
      <ButtonC
        size="small"
        loading
        loadingPosition="end"
        variant="outlined"
      >
        saving...
      </ButtonC>

        {/* save*/}
        <ButtonC
          size="small"
          color="secondary"
          onClick={handleClick}
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{
            "&:hover": {
              color: "black", // הטקסט יהפוך לשחור במעבר עם העכבר
            },
          }}
        >
          Save
        </ButtonC>
      </BoxC>
    </div>
        <SideBarTimeline
          stops={allStops.map((stop) => stop.name)}
          onSelectStop={setSelectedIndex}
          selectedIndex={selectedIndex}
          onStopAdded={handleStopAdded}
        />
        <ImageGallery
          imageReferences={allStops.map(
            (stop) => stop.photos?.[0] || "https://via.placeholder.com/150"
          )}
          currentImageIndex={selectedIndex}
          onNext={handleNext} // Handle next image
          onPrev={handlePrev} // Handle previous image
          onDelete={handleStopDeleted}
        />
      </div>
    </Box>
  );
}

