import React, { useState, useEffect, useRef } from 'react';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import AddNoteButton from './AddNoteButton';
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function NoteBox({ isNotesOpen, toggleNotes, currentLocationName, currentLocationIndex, notesArray, setNotesArray }) {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 200;
  const maxNotes = 30;

  useEffect(() => {
    setNotes(notesArray[currentLocationIndex]);
  }, [currentLocationIndex]);

  useEffect(() => {  
    if (setNotesArray) {
      setNotesArray(notesArray.map((obj, i) =>
        i === currentLocationIndex ? notes : obj
      ));
    }
  }, [notes]);

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditingContent(note);
    setCharCount(note.length);
  };

  const handleDelete = (index) => {
    setEditingNote(null);
    setEditingContent('');
    setNotes(notes.filter((_, i) => i !== index))
  }

  const handleSaveEdit = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note === editingNote ? editingContent : note))
    );
    setEditingNote(null);
    setEditingContent('');
    setCharCount(0);
  };

  const handleAddNote = () => {
    setEditingNote('new');
    setEditingContent('');
    setCharCount(0);
  };

  const handleSaveNewNote = () => {
    setNotes((prevNotes) => [...prevNotes, editingContent]);
    setEditingNote(null);
    setEditingContent('');
    setCharCount(0);
  };

  const handleCloseEdit = () => {
    setEditingNote(null);
    setEditingContent('');
    setCharCount(0);
  };

  const handleContentChange = (e) => {
    const content = e.target.value;
    if (content.length <= maxChars) {
      setEditingContent(content);
      setCharCount(content.length);
    }
  };

  return (
    <Dialog open={isNotesOpen} onClose={toggleNotes} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        📌 Notes for {currentLocationName}
        <IconButton
          onClick={toggleNotes}
          sx={{
            color: 'inherit',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: 'red',
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Typography
        variant="body2"
        sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 2 }}
      >
        {notes.length}/{maxNotes} Notes
      </Typography>
      <AddNoteButton
        handleAddNote={handleAddNote}
        notesLength={notes.length}
        maxNotes={maxNotes}
      />
      <NoteList notes={notes} handleEdit={handleEdit} handleDelete={handleDelete} fixedHeight />
      {editingNote && (
        <NoteEditor
          editingNote={editingNote}
          handleContentChange={handleContentChange}
          editingContent={editingContent}
          handleSave={editingNote === 'new' ? handleSaveNewNote : handleSaveEdit}
          handleClose={handleCloseEdit}
          charCount={charCount}
          maxChars={maxChars}
        />
      )}
    </Dialog>
  );
}
