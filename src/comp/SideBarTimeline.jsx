import React from "react";
import { Box, Stepper, Step, StepLabel, Tooltip, Typography, styled, StepConnector } from "@mui/material";

// Custom Connector without using StepConnector.classes
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  line: {
    minHeight: "10px", // Reduce the height of the connectors
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
}));

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
        connector={<CustomConnector />}
        sx={{
          width: "100%",
          padding: "0",
          gap: "0", // Removes additional spacing between steps
        }}
      >
        {/* "+" at the start */}
        <Step
          completed={false}
          onClick={() => console.log("Add clicked at the beginning")}
          sx={{
            cursor: "pointer",
            "& .MuiStepLabel-root": {
              margin: "0",
            },
          }}
        >
          <StepLabel
            StepIconProps={{
              sx: {
                color: "grey.400",
                fontSize: "14px",
              },
            }}
            icon={
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "grey.400",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "primary.main" },
                }}
              >
                +
              </Box>
            }
          />
        </Step>

        {/* Main Steps */}
        {stops.map((stop, index) => (
          <React.Fragment key={index}>
            <Step
              completed={false}
              onClick={() => onSelectStop(index)}
              sx={{
                cursor: "pointer",
                "& .MuiStepLabel-root": {
                  margin: "0",
                },
              }}
            >
              <StepLabel
                StepIconProps={{
                  sx: {
                    color: index === selectedIndex ? "primary.main" : "grey.500",
                  },
                }}
                icon={
                  <Box
                    sx={{
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: index === selectedIndex ? "primary.main" : "grey.500",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Box>
                }
              >
                <Tooltip title={stop} arrow>
                  <span
                    style={{
                      fontWeight: index === selectedIndex ? "bold" : "normal",
                      fontSize: index === selectedIndex ? "16px" : "14px",
                      color: index === selectedIndex ? "#3f51b5" : "inherit",
                    }}
                  >
                    {getShortName(stop)}
                  </span>
                </Tooltip>
              </StepLabel>
            </Step>

            {/* "+" after each step */}
            {index < stops.length - 1 && (
              <Step
                completed={false}
                onClick={() => console.log(`Add clicked after stop ${index + 1}`)}
                sx={{
                  cursor: "pointer",
                  "& .MuiStepLabel-root": {
                    margin: "0",
                  },
                }}
              >
                <StepLabel
                  StepIconProps={{
                    sx: {
                      color: "grey.400",
                      fontSize: "14px",
                    },
                  }}
                  icon={
                    <Box
                      sx={{
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: "grey.400",
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "primary.main" },
                      }}
                    >
                      +
                    </Box>
                  }
                />
              </Step>
            )}
          </React.Fragment>
        ))}

        {/* "+" at the end */}
        <Step
          completed={false}
          onClick={() => console.log("Add clicked at the end")}
          sx={{
            cursor: "pointer",
            "& .MuiStepLabel-root": {
              margin: "0",
            },
          }}
        >
          <StepLabel
            StepIconProps={{
              sx: {
                color: "grey.400",
                fontSize: "14px",
              },
            }}
            icon={
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "grey.400",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "primary.main" },
                }}
              >
                +
              </Box>
            }
          />
        </Step>
      </Stepper>
    </Box>
  );
}

