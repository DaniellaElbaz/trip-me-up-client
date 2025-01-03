import {useLocation} from 'react-router-dom';
import RouteMapView from "../comp/routeMapView/routeMapView";
import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
function SideBarTimeline({ stops }) {
  return (
    <Box className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center gap-8">
        {/* כותרת */}
        <h2 className="text-xl font-bold">Trip Days</h2>

        {/* הקו המרכזי עם הנקודות */}
        <div className="w-1 bg-gray-800 h-full flex flex-col justify-between py-4">
          {stops.map((stop, index) => (
            <div key={index} className="flex flex-row items-center gap-4">
              {/* טקסט התחנה */}
              <span className="text-lg font-semibold w-40 text-right">{stop}</span>

              {/* הנקודה */}
              <div className="w-8 h-8 bg-blue-600 rounded-full shadow-md"></div>

              {/* היום */}
              <span className="text-lg font-semibold">{`Day ${index + 1}`}</span>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}

function RouteViewPoc() {
  const dummyData = {
    startLocation: "Statue of Liberty, New York",
    endLocation: "Central Park, New York",
    stops: ["Times Square", "Rockefeller Center", "Empire State Building"],
    images: [
      "https://example.com/times-square.jpg",
      "https://example.com/rockefeller-center.jpg",
      "https://example.com/empire-state.jpg",
    ],
  };

  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const handleNext = () => {
    setCurrentStopIndex((prev) =>
      prev < dummyData.stops.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentStopIndex((prev) =>
      prev > 0 ? prev - 1 : dummyData.stops.length - 1
    );
  };

  useEffect(() => {
    document.title = "Trip View - Route Visualization";
  }, []);

  return (
    <Box className="w-screen h-screen flex flex-col">
      {/* Map View */}
      <Box className="flex-grow">
        <RouteMapView
          startLocation={dummyData.startLocation}
          endLocation={dummyData.endLocation}
          stops={dummyData.stops}
        />
      </Box>

      {/* Bottom View */}
      <Box className="flex bg-gray-100 p-6 gap-6 items-start">
        {/* Image and controls */}
        <Box className="flex-grow relative max-w-[75%]">
          <div className="relative">
            <img
              src={dummyData.images[currentStopIndex]}
              alt={dummyData.stops[currentStopIndex]}
              className="w-full h-[400px] rounded-lg shadow-md object-cover"
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

        {/* Station Sidebar */}
        <Box className="w-1/4 p-4 border-l border-gray-400">
          <h2 className="text-center text-xl font-bold mb-6">Trip Days</h2>
          <SideBarTimeline stops={dummyData.stops} />
        </Box>
      </Box>
    </Box>
  );
}

export default RouteViewPoc;
//function RouteViewPoc(){
   // const location = useLocation();
   // if(location.state !== null){
    //  const routeData = location.state.routeData;
  //  }
  
    //useEffect(() => {
       // document.title = "Trip me up - POC"
  //  }, []);

    //console.log("Route data:")
    //console.log(routeData)

   // const stopsData = routeData.slice(1,routeData.length - 1)
    //const stops = stopsData.map((x)=>{
      //return x.name
   // })
    //console.log("stops data")
   // console.log(stopsData)

    //const startLocation = routeData[0].name;
    //const endLocation = routeData[routeData.length - 1].name

     //const stops = []
     //const startLocation = "Alamo Drafthouse Cinema"
     //const endLocation = "Central Park"

    //return(
     // <>
        //<div className="w-screen h-screen">
          //<p className="text-xl bg-gray-500">Your Trip from {startLocation} to {endLocation}</p>
         // <RouteMapView 
           // startLocation={startLocation}
           // endLocation={endLocation}
           // stops={stops}
         // />
      //  </div>
     // </>
   // );
//}

//export default RouteViewPoc
