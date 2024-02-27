// BookIssueModal.js

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const BookIssueModal = ({ isOpen, onClose, onIssue }) => {
  const [dueDate, setDueDate] = useState('');

  const handleIssue = () => {
    // Validate due date and perform book issuing logic
    onIssue(dueDate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Issue Book</DialogTitle>
      <DialogContent>
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleIssue} variant="contained" color="primary">
          Issue Book
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookIssueModal;
