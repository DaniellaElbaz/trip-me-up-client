import React, { useEffect } from "react";
import TripCard from "../comp/TripCard";
import CONFIG from "../config";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

function History() {
  let navigate = useNavigate();
  
  const [isDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    document.title = "Trip me up! - History";
  }, []);

  const { data, loading, error, refetch } = useFetch(`${CONFIG.SERVER_URL}/route/all`, {
    method: "GET",
    credentials: "include"
  });

  const handleRouteDelete = async (tripId) => {
    try {
      const response = await fetch(`${CONFIG.SERVER_URL}/route/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ route_id: tripId })
      });
      
      if (!response.ok) throw new Error(response.status);

      alert("Route deleted successfully.");
      refetch();
    } catch (error) {
      alert("An error occurred while trying to delete route.");
    }
  };

  const handleViewRoute = (tripId) => {
    navigate(`/routeview/${tripId}`);
  };

  const handleButtonClick = () => {
    navigate("/chat");
  };

  if (loading) {
    return (
      <div className={`flex flex-col justify-center items-center h-screen ${isDarkMode ? "bg-[#121212]" : "bg-white"}`}>
        <CircularProgress color="primary" size={60} />
        <p className={`mt-4 text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
        <div className={`text-center p-10 h-screen ${isDarkMode ? "bg-[#121212]" : "bg-white"}`}>
            <div className="text-red-500">Error loading trips. Please try again.</div>
        </div>
    );
  }

  const trips = data?.routes || [];

  return (
    <div className={`p-8 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#121212]" : "bg-white"}`}>
      
      {trips.length === 0 ? (
        <div className="pt-4 flex flex-col items-center justify-center text-center">
        <h1 className={`text-4xl mb-8 leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Looks like it's a bit empty here...   😢 <br />
          Your next adventure is just a step away! 🌟 <br />
          Let’s plan your dream vacation today! 🏝️✨
        </h1>
        <button
            onClick={handleButtonClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#1E90FF",
              color: "white",
              padding: "16px 32px",
              fontSize: "20px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
              transition: "all 0.4s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#007BFF";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#1E90FF";
              e.target.style.color = "white";
            }}
          >
            Trip Me Up Now
            <span
              style={{
                display: "inline-block",
                animation: "arrowBounce 1s infinite",
                transition: "transform 0.3s ease",
              }}
            >
              <ArrowForward />
            </span>
          </button>
        </div>
      ) : (
        <>
        <h1 className={`text-4xl font-extrabold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            My Vacation History
        </h1>
        <div className="grid grid-cols-1 gap-8 p-8">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onViewRoute={handleViewRoute} onDelete={handleRouteDelete} />
          ))}
        </div>
        </>
      )}

      <style>
        {`
          @keyframes arrowBounce {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(10px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default History;