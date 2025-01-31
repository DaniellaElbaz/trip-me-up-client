import React, { useEffect, useState } from "react";
import TripCard from "../comp/TripCard";
import CONFIG from "../config";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
        data.routes = data.routes.map(route => ({
          ...route, 
          images: route.images.map(image => getImageUrlFromReference(image)),
          name: `Trip from ${route.places[0]} to ${route.places[route.places.length - 1]}`
        }));
        console.log(data);
        setTrips(data.routes);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    }

    fetchTrips();
  }, []);

  const getImageUrlFromReference = (photoReference) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${photoReference}&key=${API_KEY}`;
  };

  const fakeTrips = [
    {
      id: 1,
      name: "Trip to Italy",
      date: "2025-01-20",
      places: ["Rome", "Venice", "Florence"],
      images: [
        "https://media.istockphoto.com/id/496793764/photo/harbor-seal.jpg?s=612x612&w=0&k=20&c=DUopE8zbsWdofUcMBReLQCi2_g3vOzATl23PGwxUN1I=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ2tuwgsEJHeh-QOLymZpzJGUWwNXQ5HIPSA&s",
        "https://i.natgeofe.com/n/53129fb3-7738-4008-ac76-677787cd3765/thumbnail-seals-nationalgeographic_2199074_4x3.jpg",
      ],
    },
    {
      id: 2,
      name: "Trip to Japan",
      date: "2025-02-15",
      places: ["Tokyo", "Kyoto", "Osaka"],
      images: [
        "https://via.placeholder.com/300x200?text=Tokyo",
        "https://via.placeholder.com/300x200?text=Kyoto",
        "https://via.placeholder.com/300x200?text=Osaka",
      ],
    },
    {
      id: 3,
      name: "Trip to USA",
      date: "2025-03-10",
      places: ["New York", "Los Angeles", "San Francisco"],
      images: [
        "https://via.placeholder.com/300x200?text=New York",
        "https://via.placeholder.com/300x200?text=Los Angeles",
        "https://via.placeholder.com/300x200?text=San Francisco",
      ],
    },
  ];

  const handleViewRoute = (tripId) => {
    navigate(`/routeview/${tripId}`);
  };

  if(!trips){
    return (<h1>Loading data, please wait...</h1>);
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        My Vacation History
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onViewRoute={handleViewRoute} />
        ))}
      </div>
    </div>
  );
}

export default History;
