import React from "react";
import TripCard from "../comp/TripCard";

function History() {
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

  const handleViewRoute = (tripName) => {
    alert(`Viewing route for ${tripName}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        My Vacation History
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fakeTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onViewRoute={handleViewRoute} />
        ))}
      </div>
    </div>
  );
}

export default History;
