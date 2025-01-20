import { Timeline, TimelineItem, TimelineSeparator, TimelineDot } from "@mui/lab";
import { Box, Typography, Tooltip } from "@mui/material";

export default function SideBarTimeline({ stops, onSelectStop, selectedIndex }) {
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
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
              width: "150px",
              flexShrink: 0,
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => onSelectStop(index)}
          >
            <Typography variant="body2" color="textSecondary">
              {` ${index + 1}`}
            </Typography>
            <TimelineSeparator>
              <TimelineDot color="primary" />
            </TimelineSeparator>
            <Tooltip title={stop} arrow>
              <Typography
                variant="body2"
                sx={{
                  fontSize: index === selectedIndex ? "18px" : "14px",
                  fontWeight: index === selectedIndex ? "bold" : "normal",
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
