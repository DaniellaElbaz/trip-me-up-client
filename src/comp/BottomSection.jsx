import React, { useState } from "react";
import { Box } from "@mui/material";
import SideBarTimeline from "./SideBarTimeline";
import ImageGallery from "./ImageGallery";
import NoteBox from "./NoteBox";
import CustomCard from "./CustomCard";
export default function BottomSection({
  startLocation,
  stops,
  endLocation,
  bottomHeight,
  handleScroll,
}) {
  const allStops = [startLocation, ...stops, endLocation];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState(["פתק 1", "פתק 2", "פתק 3"]);
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

  const toggleNotes = () => {
    setIsNotesOpen((prev) => {
      console.log("isNotesOpen:", !prev);
      return !prev;
    });
  };
  
  return (
    <Box
      className="absolute bottom-0 left-0 w-full bg-transparent transition-all duration-300"
      style={{
        maxHeight: "50vh",
        zIndex: 10,
      }}
      onWheel={handleScroll}
    >
      <div className="flex bg-white p-6 overflow-hidden">
        <div
          className="flex flex-grow overflow-hidden"
          style={{
            overflow: "hidden",
          }}
        >
          <Box
            className="transition-all duration-300"
            style={{
              flex: isNotesOpen ? 2 : 1,
              transition: "flex 0.3s ease",
            }}
          >
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
            <CustomCard
              image="https://via.placeholder.com/150"
              title="Example Title"
              description="Example description"
              toggleNotes={toggleNotes} // פונקציה לפתיחה
            />
          </Box>

          {isNotesOpen && (
            <Box
              className="h-full bg-white shadow-lg p-4"
              style={{
                width: "320px",
                transition: "transform 0.3s ease",
              }}
            >
              <NoteBox notes={notes} />
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
}
