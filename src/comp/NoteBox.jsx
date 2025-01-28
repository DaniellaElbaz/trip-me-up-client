import React, { useState, useEffect } from "react";
import dummyData from "../dev/dummyRouteData.json";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Box,
  Slide,
  Typography,
} from "@mui/material";
import { Edit, Delete, AddCircleOutline } from "@mui/icons-material";

export default function NoteBox({ isNotesOpen, toggleNotes, currentLocation }) {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 50; // Maximum allowed words for a note
  const maxNotes = 7; // Maximum allowed notes

  useEffect(() => {
    const locationData = dummyData.find((place) => place.name === currentLocation);
    setNotes(locationData ? locationData.notes || [] : []);
  }, [currentLocation]);

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditingContent(note);
    setWordCount(note.split(" ").length);
  };

  const handleSaveEdit = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note === editingNote ? editingContent : note))
    );
    setEditingNote(null);
    setEditingContent("");
    setWordCount(0);
  };

  const handleAddNote = () => {
    setEditingNote("new");
    setEditingContent("");
    setWordCount(0);
  };

  const handleSaveNewNote = () => {
    setNotes((prevNotes) => [...prevNotes, editingContent]);
    setEditingNote(null);
    setEditingContent("");
    setWordCount(0);
  };

  const handleCloseEdit = () => {
    setEditingNote(null);
    setEditingContent("");
    setWordCount(0);
  };

  const handleContentChange = (e) => {
    const content = e.target.value;
    const words = content.trim().split(/\s+/);
    if (words.length <= maxWords) {
      setEditingContent(content);
      setWordCount(words.length);
    }
  };

  return (
    <Dialog open={isNotesOpen} onClose={toggleNotes} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        📌 Notes for {currentLocation}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center" }}>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}
        >
          {notes.length}/{maxNotes} Notes
        </Typography>
        {/* Add New Note Button */}
        <Box
          sx={{
            minWidth: 150,
            minHeight: 150,
            backgroundColor: "#ffeb3b",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: 3,
            cursor: "pointer",
            position: "relative",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
            pointerEvents: notes.length >= maxNotes ? "none" : "auto",
            opacity: notes.length >= maxNotes ? 0.5 : 1,
          }}
          onClick={handleAddNote}
        >
          <IconButton>
            <AddCircleOutline fontSize="large" />
          </IconButton>
          <span>Add New Note</span>
        </Box>

        {/* Existing Notes */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {notes.map((note, index) => (
            <Box
              key={index}
              sx={{
                minWidth: 150,
                maxWidth: 200,
                minHeight: 150,
                padding: 2,
                backgroundColor: "#ffeb3b",
                borderRadius: "10px",
                boxShadow: 3,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {/* Red Pin Icon */}
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "24px",
                }}
              >
                📌
              </span>

              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {note}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <IconButton onClick={() => handleEdit(note)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <Button
        onClick={toggleNotes}
        variant="contained"
        color="primary"
        sx={{
          margin: "16px auto",
          display: "block",
          "&:hover": {
            color: "black", // Text turns black on hover
          },
        }}
      >
        Close
      </Button>

      {/* Editing or Adding Note Dialog */}
      {editingNote && (
        <Dialog
          open={Boolean(editingNote)}
          onClose={handleCloseEdit}
          maxWidth="sm"
          fullWidth
          TransitionComponent={Slide}
          TransitionProps={{ direction: "up" }}
        >
          <DialogTitle>{editingNote === "new" ? "Add New Note" : "Edit Note"}</DialogTitle>
          <DialogContent>
            <TextField
              value={editingContent}
              onChange={handleContentChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <Typography
              variant="body2"
              color={wordCount > maxWords ? "error" : "textSecondary"}
              sx={{ textAlign: "right", marginTop: 1 }}
            >
              {wordCount}/{maxWords} words
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <Button
                onClick={editingNote === "new" ? handleSaveNewNote : handleSaveEdit}
                variant="contained"
                color="primary"
                disabled={wordCount > maxWords} // Disable if over max words
                sx={{
                  "&:hover": {
                    color: "black", // Text turns black on hover
                  },
                }}
              >
                Save
              </Button>
              <Button onClick={handleCloseEdit} variant="outlined" color="secondary">
                Cancel
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
