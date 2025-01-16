import { Box } from "@mui/material";
import SideBarTimeline from "./SideBarTimeline";

export default function BottomSection({
  startLocation,
  stops,
  endLocation,
  bottomHeight,
  handleScroll,
}) {
  const allStops = [startLocation, ...stops, endLocation];

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
        <SideBarTimeline stops={allStops.map((stop) => stop.name)} />
        <Box className="flex gap-4 mt-4 overflow-x-auto">
          {allStops.map((stop, index) => (
            <img
              key={index}
              src={stop.photos?.[0] || "https://via.placeholder.com/150"}
              alt={`Stop ${index + 1}`}
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          ))}
        </Box>
      </div>
    </Box>
  );
}
