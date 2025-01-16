import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from "@mui/lab";
import { Typography, Box } from "@mui/material";

export default function SideBarTimeline({ stops }) {
  if (!Array.isArray(stops) || stops.length === 0) {
    return <Typography variant="body1">No stops to display.</Typography>;
  }

  return (
    <Box className="flex flex-col items-center w-full">
      <Typography variant="h5" component="h2" gutterBottom>
        Trip Days
      </Typography>
      <Timeline position="alternate">
        {stops.map((stop, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index < stops.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span">
                {stop}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`Day ${index + 1}`}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}

