import React, { useState } from "react";

import { Box, IconButton, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, Button } from "@mui/material";

export default function NoteBox() {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState(["Note 1", "Note 2", "Note 3"]);

  const toggleNotes = () => {
    setIsNotesOpen(!isNotesOpen);
  };

  return (
    <>
      {/* Emoji Button for Notes */}
      <IconButton
        onClick={toggleNotes}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 3,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
        }}
      >
        📝
      </IconButton>

      {/* Notes Popup */}
      <Dialog open={isNotesOpen} onClose={toggleNotes}>
        <DialogTitle>Your Notes</DialogTitle>
        <DialogContent>
          <List>
            {notes.map((note, index) => (
              <ListItem key={index}>
                <ListItemText primary={note} />
              </ListItem>
            ))}
          </List>
          <Button onClick={toggleNotes} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
