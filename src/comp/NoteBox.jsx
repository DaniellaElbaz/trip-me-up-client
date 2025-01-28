import React, { useState, useEffect } from 'react';
import dummyData from '../dev/dummyRouteData.json';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import AddNoteButton from './AddNoteButton';
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function NoteBox({ isNotesOpen, toggleNotes, currentLocation }) {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 50;
  const maxNotes = 30;

  useEffect(() => {
    const locationData = dummyData.find((place) => place.name === currentLocation);
    setNotes(locationData ? locationData.notes || [] : []);
  }, [currentLocation]);

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditingContent(note);
    setWordCount(note.split(' ').length);
  };

  const handleSaveEdit = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note === editingNote ? editingContent : note))
    );
    setEditingNote(null);
    setEditingContent('');
    setWordCount(0);
  };

  const handleAddNote = () => {
    setEditingNote('new');
    setEditingContent('');
    setWordCount(0);
  };

  const handleSaveNewNote = () => {
    setNotes((prevNotes) => [...prevNotes, editingContent]);
    setEditingNote(null);
    setEditingContent('');
    setWordCount(0);
  };

  const handleCloseEdit = () => {
    setEditingNote(null);
    setEditingContent('');
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
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        📌 Notes for {currentLocation}
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
      <NoteList notes={notes} handleEdit={handleEdit} />
      {editingNote && (
        <NoteEditor
          editingNote={editingNote}
          handleContentChange={handleContentChange}
          editingContent={editingContent}
          handleSave={editingNote === 'new' ? handleSaveNewNote : handleSaveEdit}
          handleClose={handleCloseEdit}
          wordCount={wordCount}
          maxWords={maxWords}
        />
      )}
    </Dialog>
  );
}