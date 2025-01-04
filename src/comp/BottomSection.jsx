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
        className="absolute bottom-0 left-0 w-full bg-transparent transition-all duration-300 "
        style={{
           // height: `${bottomHeight}%`,
            maxHeight: "50vh", // לא לעלות על חצי מסך
            zIndex: 10,
        }}
        onWheel={handleScroll}
      >
        <div className="flex bg-white p-6 gap-6 ">
          {/*left size*/}
          <Box className="flex justify-center items-center" style={{ width: "70%" }}>
            <div className="relative w-1/2 "> {/* imag 50% from the left size*/}
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
  
          {/*time line*/}
          <Box className="w-3/10 p-4 border-l border-gray-400" style={{ width: "30%" }}>
            <SideBarTimeline stops={stops} />
          </Box>
        </div>
      </Box>
    );
  }