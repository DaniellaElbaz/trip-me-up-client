import { Box } from "@mui/material";
import PropTypes from "prop-types";
import RouteMapView from "./routeMapView/routeMapView";

export default function RouteMapSection({ startLocation, endLocation, stops, bottomHeight, optimize, selectedLocation, setSelectedLocation }) {

  return (
    <Box
      className="relative"
      style={{
      height: "100%",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "transparent",
      zIndex: 10,
      }}
    >
      <RouteMapView
        startLocation={startLocation}
        endLocation={endLocation}
        stops={stops} 
        optimize={optimize} 
        selectedLocation={selectedLocation} 
        setSelectedLocation={setSelectedLocation}
      />
    </Box>
  );
}

// PropTypes
const LocationPropTypes = PropTypes.shape({
  formatted_address: PropTypes.string.isRequired,
  geometry: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired
});

RouteMapSection.propTypes = {
  startLocation: LocationPropTypes.isRequired,
  stops: PropTypes.arrayOf(LocationPropTypes).isRequired,
  endLocation: LocationPropTypes.isRequired,
  optimize: PropTypes.bool
};
