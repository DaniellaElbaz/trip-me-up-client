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
            <span className="text-lg font-semibold w-1/3 text-right break-words">{stop}</span>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full shadow-md flex justify-center items-center">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              {index < stops.length - 1 && (
                <div className="w-[2px] bg-gray-800 flex-grow min-h-[3vh] sm:min-h-[5vh] md:min-h-[6vh] lg:min-h-[8vh]"></div>
              )}
            </div>
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
      "https://travel.usnews.com/dims4/USNEWS/d40353c/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FTimes_Square_Getty.jpg",
      "https://www.concordehotelnewyork.com/hubfs/ezgif-3-577645b4d9.jpg",
      "https://www.travelguide.net/media/Empire-State-Building.jpeg",
    ],
  };

  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(30); // גובה החלק התחתון באחוזים

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

  const handleScroll = (e) => {
    const scrollDelta = e.deltaY; // תנועת הגלילה
    setBottomHeight((prevHeight) => {
      let newHeight = prevHeight + scrollDelta * 0.1;
      return Math.min(Math.max(newHeight, 30), 100); // הגבלות בין 30% ל-100%
    });
  };

  useEffect(() => {
    document.title = "Trip View - Route Visualization";
  }, []);

  return (
    <Box className="w-screen h-screen flex flex-col overflow-hidden">
      {/* Map View */}
      <Box
        className="relative"
        style={{
          height: `${100 - bottomHeight}%`,
          overflow: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
        }}
      >
        <RouteMapView
          startLocation={dummyData.startLocation}
          endLocation={dummyData.endLocation}
          stops={dummyData.stops}
        />
      </Box>

      {/* Bottom Section */}
      <Box
        className="absolute bottom-0 left-0 w-full bg-gray-100 transition-all duration-300"
        style={{
          height: `${bottomHeight}%`,
          zIndex: 10, // מבטיח שהחלק התחתון מעל המפה
        }}
        onWheel={handleScroll} // מאזין לגלילת העכבר
      >
        <div className="flex bg-white p-6 gap-6 h-full">
          {/* Image with Navigation Controls */}
          <Box className="flex-grow relative">
            <div className="relative w-full h-full">
              <img
                src={dummyData.images[currentStopIndex]}
                alt={dummyData.stops[currentStopIndex]}
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

          {/* Sidebar timeline */}
          <Box className="w-1/4 p-4 border-l border-gray-400">
            <SideBarTimeline stops={dummyData.stops} />
          </Box>
        </div>
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
