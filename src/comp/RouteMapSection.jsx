import RouteMapView from "./routeMapView/routeMapView";
import { Box } from "@mui/material";

export default function RouteMapSection({ startLocation, endLocation, stops, bottomHeight }) {
  return (
    <Box
  className="relative"
  style={{
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 10,
  }}
>
      <RouteMapView startLocation={startLocation} endLocation={endLocation} stops={stops} />
    </Box>
  );
}
