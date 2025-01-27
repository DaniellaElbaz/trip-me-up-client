import React, { useState } from "react";
import { Box, Button  } from "@mui/material";
import SideBarTimeline from "./SideBarTimeline";
import PlaceGallery from "./PlaceGallery";
import CONFIG from "../config";
import BoxC from '@mui/material/Box';
import StatefulSaveButton from "./SaveButton";

export default function BottomSection({
  startLocation,
  stops,
  endLocation,
  bottomHeight,
  handleScroll,
  handleRouteUpdate,
  handleStopAdded,
  handleStopDeleted,
  saveState
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

  const handleDelete = () => {
    handleStopDeleted(selectedIndex);
    if(selectedIndex == 0){
      setSelectedIndex(0);
    }
    else{
      handlePrev();
    }
  }

  return (
    <Box
      className="absolute bottom-0 left-0 w-full bg-transparent transition-all duration-300"
      style={{
        maxHeight: "30vh",
        zIndex: 10,
      }}
      onWheel={handleScroll}
    >
      <div className="flex flex-col bg-white p-6 gap-6 overflow-x-auto">
      <div className="h-full max-h-1/2 min-h-1/5 overflow-y-auto">

      {/* buttons */}
      <BoxC sx={{ '& > button': { m: 1 } }}>
        <StatefulSaveButton 
          buttonState={saveState}
          onSave={handleRouteUpdate}
        />
      </BoxC>
    </div>
        <SideBarTimeline
          stops={allStops.map((stop) => stop.name)}
          onSelectStop={setSelectedIndex}
          selectedIndex={selectedIndex}
          onStopAdded={handleStopAdded}
        />
        <PlaceGallery
          places={allStops}
          currentPlaceIndex={selectedIndex}
          onNextPlace={handleNext} 
          onPrevPlace={handlePrev} 
          onDelete={handleDelete}
        />
      </div>
    </Box>
  );
}
