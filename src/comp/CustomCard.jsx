import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, Close } from "@mui/icons-material";
import { Note } from "@mui/icons-material";
export default function CustomCard({
  image,
  title,
  description,
  onDelete,
  toggleNotes ,
}) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        width: "60vh",
        height: "50vh",
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
          height: "40vh",
          objectFit: "cover",
        }}
      />
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
        <Note />
      </IconButton>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <IconButton
        onClick={onDelete}
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
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  toggleNotes: PropTypes.func.isRequired,
};
