import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";

export default function NoteBox({ notes }) {
  if (!notes || notes.length === 0) {
    return <Box>אין פתקים להצגה</Box>;
  }

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        backgroundColor: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3 className="text-lg font-bold mb-4">פתקים</h3>
      <List>
        {notes.map((note, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              marginBottom: "8px",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <ListItemText primary={note} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
