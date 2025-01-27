import React, { useState } from "react";
import { Box, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";

export default function NoteBox() {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState(["Note 1", "Note 2", "Note 3"]);

  const toggleNotes = () => {
    setIsNotesOpen(!isNotesOpen);
  };

  return (
    <>
      {/* כפתור לפתיחת הלוח */}
      <IconButton
        onClick={toggleNotes}
        className="fixed bottom-4 right-4 bg-white shadow-lg p-2 rounded-full"
      >
        📝
      </IconButton>

      {/* לוח הפתקים */}
      {isNotesOpen && (
        <Box
          className="fixed bottom-0 right-0 w-80 h-1/3 bg-white shadow-lg p-4 rounded-t-lg"
        >
          <h3 className="text-lg font-bold mb-4">פתקים</h3>
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
            className="w-full mt-4 bg-blue-500 text-white"
          >
            סגור
          </Button>
        </Box>
      )}
    </>
  );
}
