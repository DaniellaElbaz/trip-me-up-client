import React, { useEffect, useState } from "react";
import TripCard from "../comp/TripCard";
import CONFIG from "../config";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
function History() {
  let navigate = useNavigate();

  const [trips, setTrips] = useState(null);

  useEffect(() => {
    document.title = "Trip me up! - History";
  }, []);

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
        alert("Cannot fetch trips. Please try again later.")
      }
    }

    fetchTrips();
  }, []);

  const handleRouteDelete = async (tripId) => {
    try {
      const response = await fetch(`${CONFIG.SERVER_URL}/route/delete`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ route_id: tripId })
      });
      if(!response.ok){
        throw new Error(response.status);
      }
      setTrips(trips.filter((trip) => { return trip.id != tripId }));
      alert("Route deleted succesfully.");
    } catch (error) {
      alert("An error occurred while trying to delete route. Please try again later.");
    }
  };

  const handleViewRoute = (tripId) => {
    navigate(`/routeview/${tripId}`);
  };

  if (!trips) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress color="primary" size={60} />
        <p className="mt-4 text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        My Vacation History
      </h1>
      <div className="grid grid-cols-1 gap-8 p-8">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onViewRoute={handleViewRoute} onDelete={handleRouteDelete} />
        ))}
      </div>
    </div>
  );
}

export default History;
