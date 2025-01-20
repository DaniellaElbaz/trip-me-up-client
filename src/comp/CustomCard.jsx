import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function CustomCard({ image, title, description }) {
  return (
    <Card sx={{ maxWidth: "100%",width:"60vh",height:"50vh", margin: "1rem", boxShadow: 3, display: "flex",
        flexDirection: "column",
        alignItems: "center", }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        sx={{
            width: "100%",
            height: "40vh",
            objectFit: "cover",
          }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

CustomCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
