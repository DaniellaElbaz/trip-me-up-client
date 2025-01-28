import React from 'react';
import { Box, IconButton } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

export default function AddNoteButton({ handleAddNote, notesLength, maxNotes }) {
  return (
    <Box
      sx={{
        minWidth: 150,
        minHeight: 150,
        backgroundColor: '#ffeb3b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        boxShadow: 3,
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out',
        margin: 3,
        '&:hover': {
          transform: 'scale(1.05)',
        },
        pointerEvents: notesLength >= maxNotes ? 'none' : 'auto',
        opacity: notesLength >= maxNotes ? 0.5 : 1,
      }}
      onClick={handleAddNote}
    >
      <IconButton>
        <AddCircleOutline fontSize="large" />
      </IconButton>
      <span>Add New Note</span>
    </Box>
  );
}