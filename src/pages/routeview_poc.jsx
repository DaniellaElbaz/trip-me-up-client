import {useLocation} from 'react-router-dom';
import {useEffect,useContext} from "react"
import RouteMapView from "../comp/routeMapView/routeMapView";


function RouteViewPoc(){
    //const location = useLocation();
    //if(location.state !== null){
     // const routeData = location.state.routeData;
    //}
  
    useEffect(() => {
        document.title = "Trip me up - POC"
    }, []);

    //console.log("Route data:")
    //console.log(routeData)

   // const stopsData = routeData.slice(1,routeData.length - 1)
  //  const stops = stopsData.map((x)=>{
   //   return x.name
   // })
  //  console.log("stops data")
   // console.log(stopsData)

   // const startLocation = routeData[0].name;
    //const endLocation = routeData[routeData.length - 1].name

     const stops = []
     const startLocation = "Alamo Drafthouse Cinema"
    const endLocation = "Central Park"

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
