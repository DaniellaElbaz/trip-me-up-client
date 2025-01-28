import React, { useState, useEffect } from "react";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const images = [
  "https://tse1.mm.bing.net/th?id=OIP.lZTrdupLPv_fqNFiUh1z5AHaE8&w=316&h=316&c=7",
  "https://tse4.mm.bing.net/th?id=OIP.fV3jLc5SnZi1m4dX8Pt6uQHaGP&w=399&h=399&c=7",
  "https://tse2.mm.bing.net/th?id=OIP.rSosj2saeeT7A4wM_jSWMAHaFj&w=355&h=355&c=7",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    navigate("/chat");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(30%)",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          transition: "background-image 1s ease-in-out",
        }}
      ></div>
      <div
        style={{
          textAlign: "center",
          color: "white",
          padding: "20px",
          zIndex: 2,
        }}
      >
        <h1>Welcome to your personalized travel planning platform!</h1>
        <h2>Discover the future of personalized travel planning</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          paddingTop: "20px",
        }}
      >
        <button
          onClick={handleButtonClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#1E90FF",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "16px 32px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.4s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#007BFF")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1E90FF")}
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
};

export default Home;
