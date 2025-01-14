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
          {/*<ImageGallery imageReferences={startLocation.photos}/>*/}
  
          {/*time line*/}
          <Box className="w-3/10 p-4 border-l border-gray-400" style={{ width: "30%" }}>
            <SideBarTimeline stops={[startLocation.name].concat(stops.map(stop => stop.name)).concat(endLocation.name)} />
          </Box>
        </div>
      </Box>
    );
  }