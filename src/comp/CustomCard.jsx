import React from "react";
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography, IconButton, Rating } from "@mui/material";
import { Delete, Close } from "@mui/icons-material";
import { Note } from "@mui/icons-material";

export default function CustomCard({ image, title, subtitle, description,rating, openNow,openingHours, onDelete, isDeleteDisabled, toggleNotes, isEditPermission }) {
  const isOpen24Hours = openingHours && openingHours.length === 7 &&
    openingHours.every(day => day.includes("Open 24 hours"));

   console.log("Opening Hours Data:", openingHours);
  return (
    <Card
      sx={{
        maxWidth: "100%",
        width: "60vh",
        margin: "1rem",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: "100%",
          height: "40vh", // Keeps the image fixed
          objectFit: "cover",
        }}
      />
      {isEditPermission &&
        <IconButton
        onClick={toggleNotes}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          transition: "color 0.3s ease, background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
          },
        }}
        >
          <Note/>
        </IconButton>
      }
      <CardContent
        sx={{
          width: "100%",
          flexGrow: 1,
        }}
        >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {subtitle && (
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.primary"
          sx={{ display: "flex", alignItems: "center", gap: "8px",marginTop:"4px" }}
        >
          Rating: {rating ? rating : "No rating available"}
          <Rating
            name="read-only-rating"
            value={rating || 0}
            precision={0.5}
            readOnly
            sx={{ fontSize: "1.5rem" }}
          />
        </Typography>
        
        <Typography variant="body2" color={openNow ? "green" : "red"}>
          {openNow ? "🟢 Open Now" : "🔴 Closed"}
        </Typography>
        <div style={{ textAlign: "left", marginTop: "8px" }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>Opening Hours:</Typography>
          {isOpen24Hours ? (
            <Typography variant="body2" color="text.secondary">Open 24/7</Typography>
          ) : (
            (openingHours && openingHours.length > 0) ? 
              openingHours.map((day, index) => (
                <Typography key={index} variant="body2" color="text.secondary">
                  {day}
                </Typography>
              )) 
              : <Typography variant="body2" color="text.secondary">Opening hours not available</Typography>
          )}
        </div>
      </CardContent>
      
      {isEditPermission &&
       <div className="flex justify-end w-full">
       <IconButton
         onClick={onDelete}
         disabled={isDeleteDisabled}
         sx={{
           margin: "10px",
           backgroundColor: "rgba(255, 255, 255, 0.8)",
           transition: "color 0.3s ease, background-color 0.3s ease",
           "&:hover": {
             backgroundColor: "rgba(255, 0, 0, 0.8)",
             color: "white",
           },
         }}
       >
         <Delete />
       </IconButton>
     </div>
      }
      
    </Card>
  );
}

CustomCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string, // New prop for subtitle
  description: PropTypes.string.isRequired,
  rating: PropTypes.number,
  openNow: PropTypes.bool,
  openingHours: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func,
  isDeleteDisabled: PropTypes.bool.isRequired,
};

