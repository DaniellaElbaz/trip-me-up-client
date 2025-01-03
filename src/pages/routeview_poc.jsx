import {useLocation} from 'react-router-dom';
import { useEffect, useState } from "react";
import RouteMapSection from "../comp/RouteMapSection";
import BottomSection from "../comp/BottomSection";

export default function RouteViewPoc() {
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
  const [bottomHeight, setBottomHeight] = useState(30);

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
    const scrollDelta = e.deltaY;
    setBottomHeight((prevHeight) => {
      let newHeight = prevHeight + scrollDelta * 0.1;
      return Math.min(Math.max(newHeight, 30), 100);
    });
  };

  useEffect(() => {
    document.title = "Trip View - Route Visualization";
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <RouteMapSection
        startLocation={dummyData.startLocation}
        endLocation={dummyData.endLocation}
        stops={dummyData.stops}
        bottomHeight={bottomHeight}
      />
      <BottomSection
        stops={dummyData.stops}
        images={dummyData.images}
        currentStopIndex={currentStopIndex}
        handlePrev={handlePrev}
        handleNext={handleNext}
        bottomHeight={bottomHeight}
        handleScroll={handleScroll}
      />
    </div>
  );
}




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
