import {useLocation} from 'react-router-dom';
import RouteMapView from "../comp/routeMapView/routeMapView";
import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
function SideBarTimeline({ stops }) {
  if (!Array.isArray(stops) || stops.length === 0) {
    return <div>There are no stops to display.</div>;
  }

  return (
    <Box className="flex flex-col items-center w-full">
      <h2 className="text-xl font-bold mb-6">Trip Days</h2>
      <div className="w-full flex flex-col">
        {stops.map((stop, index) => (
          <div key={index} className="flex justify-between w-full">
            {/* שם התחנה בצד שמאל */}
            <span className="text-lg font-semibold w-1/3 text-right break-words">{stop}</span>

            {/* נקודה עם מספר היום והקו האנכי */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full shadow-md flex justify-center items-center">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              {/* קו אנכי מתחת לנקודה */}
              {index < stops.length - 1 && (
                <div className="w-[2px] bg-gray-800 flex-grow min-h-[3vh] sm:min-h-[5vh] md:min-h-[6vh] lg:min-h-[8vh]"></div>
              )}
            </div>

            {/* היום בצד ימין */}
            <span className="text-lg font-semibold w-1/3">{`Day ${index + 1}`}</span>
          </div>
        ))}
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
