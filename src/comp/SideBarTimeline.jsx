import React from "react";
import { Box, Stepper, Step, StepLabel, Tooltip, Typography } from "@mui/material";

export default function SideBarStepper({ stops, onSelectStop, selectedIndex }) {
  const maxNameLength = 15;

  const getShortName = (name) => {
    return name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Trip Timeline
      </Typography>
      <Stepper
        alternativeLabel
        activeStep={selectedIndex}
        sx={{
          width: "100%",
          padding: "0",
        }}
      >
        {stops.map((stop, index) => (
          <Step
            key={index}
            completed={false}
            onClick={() => onSelectStop(index)}
            sx={{
              cursor: "pointer",
              "& .MuiStepLabel-label": {
                fontWeight: index === selectedIndex ? "bold" : "normal",
                fontSize: index === selectedIndex ? "18px" : "14px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              },
            }}
          >
            <StepLabel
              StepIconProps={{
                sx: {
                  color: index === selectedIndex ? "primary.main" : "grey.500",
                },
              }}
            >
              <Tooltip title={stop} arrow>
                <span>{getShortName(stop)}</span>
              </Tooltip>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
