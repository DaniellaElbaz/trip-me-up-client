import React, { useState } from "react";
import { Box, Button  } from "@mui/material";
import SideBarTimeline from "./SideBarTimeline";
import PlaceGallery from "./PlaceGallery";
import CONFIG from "../config";

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

  const handleDelete = () => {
    handleStopDeleted(selectedIndex);
    handlePrev();
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
          style={{ alignSelf: "center", marginBottom: "16px" }} // Center align and add spacing
        >
          Update Route
        </Button>
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

