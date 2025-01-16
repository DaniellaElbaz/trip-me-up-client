import { Timeline, TimelineItem, TimelineSeparator, TimelineDot } from "@mui/lab";
import { Box, Typography, Tooltip } from "@mui/material";

export default function SideBarTimeline({ stops }) {
  const maxNameLength = 15; // max length for the place name view

  const getShortName = (name) => {
    return name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name;
  };

  if (!Array.isArray(stops) || stops.length === 0) {
    return <Typography variant="body1">No stops to display.</Typography>;
  }

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        {stops.map((stop, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "150px", // max width for place places
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Day */}
            <Typography variant="body2" color="textSecondary">
              {`Day ${index + 1}`}
            </Typography>

            {/* Point */}
            <TimelineSeparator sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <TimelineDot color="primary" />
            </TimelineSeparator>

            {/* Horizontal line between points */}
            {index < stops.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translateY(-50%)",
                  width: "150px", // same as point spacing
                  height: "2px",
                  backgroundColor: "#1976d2",
                }}
              />
            )}

            {/* Place name */}
            <Tooltip title={stop} arrow>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {getShortName(stop)}
              </Typography>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

