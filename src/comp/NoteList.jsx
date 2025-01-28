import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function NoteList({ notes, handleEdit, maxNotes }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', paddingBottom: 3 }}>
      {notes.map((note, index) => (
        <Box
          key={index}
          sx={{
            minWidth: 150,
            maxWidth: 200,
            minHeight: 150,
            padding: 2,
            backgroundColor: '#ffeb3b',
            borderRadius: '10px',
            boxShadow: 3,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '24px',
            }}
          >
            📌
          </span>
          <Typography
            sx={{
              width: '100%',
              textAlign: 'center',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {note}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
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
  );
}