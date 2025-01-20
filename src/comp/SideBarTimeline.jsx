import React from "react";
import { Box, Stepper, Step, Typography } from "@mui/material";
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
              <StepLabelWithTooltip
                stop={stop}
                index={index}
                isSelected={index === selectedIndex}
                isPlus={false}
              />
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

