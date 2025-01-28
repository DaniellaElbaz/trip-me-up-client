import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  ListItemText,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete, AddCircleOutline } from "@mui/icons-material";

export default function NoteBox({ isNotesOpen, toggleNotes }) {
  const [notes, setNotes] = useState([
    "This is a sample note",
    "Another example note",
    "Testing a longer note to check spacing uygfvulyvfguogypuyfvputfytvlutf",
    "Testing a longer note to check spacing uygfvulyvfguogypuyfvputfytvlutf",
    "Testing a longer note to check spacing uygfvulyvfguogypuyfvputfytvlutf",
    "Testing a longer note to check spacing uygfvulyvfguogypuyfvputfytvlutf",
    "Testing a longer note to check spacing uygfvulyvfguogypuyfvputfytvlutf",
    "Testing a longer note to check spacing uygfvulyvfguogypuyfvputfytvytgfvygvtuyifutrdutrdutrdurdutrdrdiydydydydydytfytfytdydyddylutf",
  ]);

  return (
    <Dialog open={isNotesOpen} onClose={toggleNotes} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        📌 Your Notes
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" ,overflowY:"visible"}}>
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
          }}
        >
          <IconButton>
            <AddCircleOutline fontSize="large" />
          </IconButton>
          <span>Add New Note</span>
        </Box>

        {/* Existing Notes */}
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

            <ListItemText
              primary="Note Title"
              secondary={note}
              sx={{
                width: "100%",
                textAlign: "center",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <IconButton>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </DialogContent>
      <Button
        onClick={toggleNotes}
        variant="contained"
        color="primary"
        sx={{ margin: "16px auto", display: "block" }}
      >
        Close
      </Button>
    </Dialog>
  );
}
