import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function CustomCard({ image, title, subtitle, description, onDelete, isDeleteDisabled }) {
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
      </CardContent>
      <IconButton
        onClick={onDelete}
        disabled={isDeleteDisabled}
        sx={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
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
    </Card>
  );
}

CustomCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string, // New prop for subtitle
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  isDeleteDisabled: PropTypes.bool.isRequired,
};