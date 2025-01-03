import {
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import Directions from "./directions";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const RouteMapView = ({ startLocation, endLocation, stops }) => (
  <APIProvider apiKey={API_KEY}>
    <Map
      defaultCenter={{ lat: 40.7128, lng: -74.006 }}
      defaultZoom={12}
      gestureHandling={"greedy"}
      fullscreenControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <Directions
        startLocation={startLocation}
        endLocation={endLocation}
        stops={stops}
      />
    </Map>
  </APIProvider>
);

RouteMapView.propTypes = {
  startLocation: PropTypes.string.isRequired,
  endLocation: PropTypes.string.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RouteMapView;