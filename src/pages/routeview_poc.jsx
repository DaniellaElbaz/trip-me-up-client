import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import RouteMapView from "../comp/routeMapView/routeMapView";
import { useLoadScript } from "@react-google-maps/api";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
function RouteViewPoc() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });
  const location = useLocation();
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    document.title = "Trip me up - POC";
  }, []);

  useEffect(() => {
    console.log(location.state.routeData);
    if(location.state.routeData == null){
      setRouteData([
        {
          "formatted_address": "Nemal Tel Aviv St, Tel Aviv-Yafo, Israel",
          "geometry": {
            "location": {
              "lat": 32.0972969,
              "lng": 34.7737774
            },
            "viewport": {
              "northeast": {
                "lat": 32.09863777989272,
                "lng": 34.77517067989272
              },
              "southwest": {
                "lat": 32.09593812010728,
                "lng": 34.77247102010728
              }
            }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
          "name": "Tel Aviv Port",
          "opening_hours": {
            "open_now": true
          },
          "photos": [
            {
              "height": 3456,
              "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/116662672862060853074\">אורטל ירושלמי</a>"
              ],
              "photo_reference": "AWYs27wxa6G8yOjJh-cVFBlod8HBUTxNUGZ1TqAKbhPm-HMA86im024qt2Hvy-nn92sjuDlOVd1aAyDpHlNwW9qcD9DdqrXoLZx1rUsiCqPnBOyR_Ann0vrsMZFlTwieD6kgZuqm-Kus8AJoFL3wQhgNmnwuAPt_x0JWmA6lxVv7ayiHEItJ",
              "width": 4608
            }
          ],
          "rating": 4.5
        },
        {
          "formatted_address": "Gordon Beach, Israel",
          "geometry": {
            "location": {
              "lat": 32.0826977,
              "lng": 34.7674219
            },
            "viewport": {
              "northeast": {
                "lat": 32.0848795,
                "lng": 34.7687513
              },
              "southwest": {
                "lat": 32.081417,
                "lng": 34.7658959
              }
            }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
          "name": "Gordon Beach",
          "photos": [
            {
              "height": 2268,
              "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/104080219373796678894\">Orosz Enid</a>"
              ],
              "photo_reference": "AWYs27xbcBND3JjlRB0ANJj-2ebXua1qB--jEjBwUWsO90N7n7FwGSpDkRlSU-7UFTbH48M_w0-51BQI4KIeN8SdiIjIhNo42wlQIzTy9hCTEtmjB3tTL5xQ8P-DbSFqHuDWIjZnNYYYHdT7VjmOm524RYyR11Oa2O5xrNirHrvuZWd1dXqW",
              "width": 4032
            }
          ],
          "rating": 4.6
        },
        {
          "formatted_address": "Aluf Kalman Magen St 3, Tel Aviv-Yafo, Israel",
          "geometry": {
            "location": {
              "lat": 32.0709839,
              "lng": 34.7872963
            },
            "viewport": {
              "northeast": {
                "lat": 32.07230767989272,
                "lng": 34.78844322989272
              },
              "southwest": {
                "lat": 32.06960802010727,
                "lng": 34.78574357010727
              }
            }
          },
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          "name": "Sarona Market",
          "opening_hours": {
            "open_now": true
          },
          "photos": [
            {
              "height": 2988,
              "html_attributions": [
                "<a href=\"https://maps.google.com/maps/contrib/102034957881172912980\">Adam Ohayon</a>"
              ],
              "photo_reference": "AWYs27yHdfllfX3kdfy7OyQ6RI82b9GsQEAKiezSP8qbPxYcAHf3Z1gFNX-r79yvrqoWd2NMs0diwTb_bpvOLxLH4uXMaM3EzLbMeKlMrPymzeSpGJlqq7zYBhdTX7WO5hOczG0TQRkarlx5ZCSZbtjHsCIRc2Gztf5ZKhQJL61G94dl6GdX",
              "width": 5312
            }
          ],
          "rating": 4.3
        }
      ]);
    }
    else{
      setRouteData(location.state.routeData);
    }
  }, [isLoaded, location.routeData]);

  if (!isLoaded) {
    return <p>Loading, please wait...</p>;
  }

  const stops = routeData.slice(1, routeData.length - 1);
  const startLocation = routeData[0];
  const endLocation = routeData[routeData.length - 1];

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex-col">
      <p className="text-xl  bg-gray-500">
        Your Trip from {startLocation.name} to {endLocation.name}
      </p>

      {startLocation && endLocation && stops.length > 0 && (
        <RouteMapView
          startLocation={startLocation}
          endLocation={endLocation}
          stops={stops}
        />
      )}
    </div>
  );
}

export default RouteViewPoc;
