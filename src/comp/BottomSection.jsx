import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SideBarTimeline from "./SideBarTimeline";

export default function BottomSection({
  stops,
  images,
  currentStopIndex,
  handlePrev,
  handleNext,
  bottomHeight,
  handleScroll,
}) {
  return (
    <Box
      className="absolute bottom-0 left-0 w-full bg-gray-100 transition-all duration-300"
      style={{
        height: `${bottomHeight}%`,
        zIndex: 10,
      }}
      onWheel={handleScroll}
    >
      <div className="flex bg-white p-6 gap-6 h-full">
        {/* Image with Navigation Controls */}
        <Box className="flex-grow relative">
          <div className="relative w-full h-full">
            <img
              src={images[currentStopIndex]}
              alt={stops[currentStopIndex]}
              className="w-full h-full rounded-lg shadow-md object-cover"
            />
            <IconButton
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white hover:bg-blue-600 p-3"
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white hover:bg-blue-600 p-3"
            >
              <ArrowForward />
            </IconButton>
          </div>
        </Box>

        {/* Sidebar timeline */}
        <Box className="w-1/4 p-4 border-l border-gray-400">
          <SideBarTimeline stops={stops} />
        </Box>
      </div>
    </Box>
  );
}
