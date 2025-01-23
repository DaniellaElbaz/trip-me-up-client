import React from "react";
import { Box, Stepper, Step, Typography, StepLabel } from "@mui/material";
import CustomConnector from "./CustomConnector";
import StepLabelWithTooltip from "./StepLabelWithTooltip";

export default function SideBarTimeline({ stops, onSelectStop, selectedIndex }) {
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
        connector={<CustomConnector />}
        sx={{
          width: "100%",
          padding: "0",
        }}
      >
        {/* "+" at the start */}
        <Step
          completed={false}
          onClick={() => console.log("Add clicked at the beginning")}
          sx={{ cursor: "pointer" }}
        >
          <StepLabelWithTooltip stop="+" index={-1} isSelected={false} isPlus />
        </Step>

        {/* Main Steps */}
        {stops.map((stop, index) => (
          <React.Fragment key={index}>
            <Step
              completed={false}
              onClick={() => onSelectStop(index)}
              sx={{ cursor: "pointer" }}
            >
              <StepLabel
                icon={
                  <Box
                    onClick={() => onSelectStop(index)}
                    sx={{
                      width: "2rem", // Larger circle
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: index === selectedIndex ? "blue" : "gray",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "white",
                    }}
                  >
                    {index + 1}
                  </Box>
                }
              >        <span
                  style={{
                    color: index === selectedIndex ? "blue" : "black",
                    fontWeight: index === selectedIndex ? "bold" : "normal",
                    fontSize: index === selectedIndex ? "1.2rem" : "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => onSelectStop(index)}
                >
                  {stop}
                </span>
              </StepLabel>
            </Step>

            {/* "+" after each step */}
            {index < stops.length - 1 && (
              <Step
                completed={false}
                onClick={() => console.log(`Add clicked after stop ${index + 1}`)}
                sx={{ cursor: "pointer" }}
              >
                <StepLabelWithTooltip stop="+" index={index + 1} isSelected={false} isPlus />
              </Step>
            )}
          </React.Fragment>
        ))}

        {/* "+" at the end */}
        <Step
          completed={false}
          onClick={() => console.log("Add clicked at the end")}
          sx={{ cursor: "pointer" }}
        >
          <StepLabelWithTooltip stop="+" index={stops.length} isSelected={false} isPlus />
        </Step>
      </Stepper>
    </Box>
  );
}
