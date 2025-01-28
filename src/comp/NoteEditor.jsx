import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
  Slide,
} from '@mui/material';

export default function NoteEditor({
  editingNote,
  handleContentChange,
  editingContent,
  handleSave,
  handleClose,
  wordCount,
  maxWords,
}) {
  return (
    <Dialog
      open={Boolean(editingNote)}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
    >
      <DialogTitle>{editingNote === 'new' ? 'Add New Note' : 'Edit Note'}</DialogTitle>
      <DialogContent>
        <TextField
          value={editingContent}
          onChange={handleContentChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
        />
        <Typography
          variant="body2"
          color={wordCount > maxWords ? 'error' : 'textSecondary'}
          sx={{ textAlign: 'right', marginTop: 1 }}
        >
          {wordCount}/{maxWords} words
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={wordCount > maxWords}
            sx={{
              '&:hover': {
                color: 'black',
              },
            }}
          >
            Save
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}