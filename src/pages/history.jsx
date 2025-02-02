import React, { useEffect, useState } from "react";
import TripCard from "../comp/TripCard";
import CONFIG from "../config";
import { useNavigate } from "react-router-dom";

function History() {
  let navigate = useNavigate();

  const [trips, setTrips] = useState(null);

  useEffect(() => {
    const fetchTrips = async () =>{
      try {
        const response = await fetch(`${CONFIG.SERVER_URL}/route/all`, {
          method: "GET",
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setTrips(data.routes);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    }

    fetchTrips();
  }, []);

  const handleViewRoute = (tripId) => {
    navigate(`/routeview/${tripId}`);
  };

  if(!trips){
    return (<h1>Loading data, please wait...</h1>);
  }

  return (
    <div className=" min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        My Vacation History
      </h1>
      <div className="grid grid-cols-1 gap-8 p-2">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onViewRoute={handleViewRoute} />
        ))}
      </div>
    </div>
  );
}

export default History;
