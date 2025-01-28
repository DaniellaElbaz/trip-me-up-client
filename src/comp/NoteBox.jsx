import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

export default function NoteBox({ isNotesOpen, toggleNotes }) {
  const notes = ["Note 1", "Note 2", "Note 3"];

  return (
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
        <Button
          onClick={toggleNotes}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

