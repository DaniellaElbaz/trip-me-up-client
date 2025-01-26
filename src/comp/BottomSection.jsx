import React, { useState } from "react";
import { Box } from "@mui/material";
import SideBarTimeline from "./SideBarTimeline";
import ImageGallery from "./ImageGallery";

export default function BottomSection({
  startLocation,
  stops,
  endLocation,
  bottomHeight,
  handleScroll,
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
        <SideBarTimeline
          stops={allStops.map((stop) => stop.name)}
          onSelectStop={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
        <ImageGallery
          imageReferences={allStops.map(
            (stop) => stop.photos?.[0] || "https://via.placeholder.com/150"
          )}
          currentImageIndex={selectedIndex}
          onNext={handleNext} // Handle next image
          onPrev={handlePrev} // Handle previous image
        />
      </div>
    </Box>
  );
}
