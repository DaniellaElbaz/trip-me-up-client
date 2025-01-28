import React, { useState, useEffect } from "react";

const images = [
  "https://tse1.mm.bing.net/th?id=OIP.lZTrdupLPv_fqNFiUh1z5AHaE8&w=316&h=316&c=7",
  "https://tse4.mm.bing.net/th?id=OIP.fV3jLc5SnZi1m4dX8Pt6uQHaGP&w=399&h=399&c=7",
  "https://tse2.mm.bing.net/th?id=OIP.rSosj2saeeT7A4wM_jSWMAHaFj&w=355&h=355&c=7",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)",
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <h1>הטקסט שלי</h1>
        <p>תיאור קצר</p>
      </div>
    </div>
  );
};

export default Home;
