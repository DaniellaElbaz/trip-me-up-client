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
  const [isVisible, setIsVisible] = useState(false);
  const [animationStyle, setAnimationStyle] = useState({
    transform: "translateY(100%)",
    opacity: 0,
    transition: "all 0.5s ease-in-out",
  });

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

  const handleScrollDirection = (e) => {
    if (e.deltaY < 0 && !isVisible) {
      setIsVisible(true);
      setAnimationStyle({
        transform: "translateY(0)",
        opacity: 1,
        transition: "all 0.5s ease-in-out",
      });
    }
    handleScroll(e);
  };

  return (
    <Box
      className="absolute bottom-0 left-0 w-full bg-transparent"
      style={{
        maxHeight: "30vh",
        zIndex: 10,
        ...animationStyle,
      }}
      onWheel={handleScrollDirection}
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
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </Box>
  );
}
