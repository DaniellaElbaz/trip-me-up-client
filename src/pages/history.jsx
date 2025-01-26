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
        "https://via.placeholder.com/300x200?text=Italy",
        "https://via.placeholder.com/300x200?text=Rome",
        "https://via.placeholder.com/300x200?text=Venice",
        "https://via.placeholder.com/300x200?text=Florence",
      ],
    },
    {
      id: 2,
      name: "Trip to Japan",
      date: "2025-02-15",
      places: ["Tokyo", "Kyoto", "Osaka"],
      images: [
        "https://via.placeholder.com/300x200?text=Japan",
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
        "https://via.placeholder.com/300x200?text=USA",
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
