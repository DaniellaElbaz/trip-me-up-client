import {useEffect} from "react"
import RouteMapView from "../comp/routeMapView/routeMapView";


function RouteViewPoc(){

    useEffect(() => {
        document.title = "Trip me up - POC"
    }, []);

    const startLocation = "Pardes Hanna-Karkur";
    const endLocation = "Heftsiba";
    const stops = ["Hadera", "Haifa"];

    return(
      <>
        <div className="w-screen h-screen">
          <p className="text-xl bg-gray-500">Your Trip from {startLocation} to {endLocation}</p>
          <RouteMapView 
            startLocation={startLocation}
            endLocation={endLocation}
            stops={stops}
          />
        </div>
      </>
    );
}

export default RouteViewPoc
