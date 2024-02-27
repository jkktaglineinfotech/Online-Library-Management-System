import React, { useState } from 'react';
import BookIssueModal from './BookIssueModal'; 
const BookIssue = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleIssueBook = (dueDate) => {
    console.log('Issuing book with due date:', dueDate);
  };

  return (
    <div>
      <button onClick={handleOpenModal}> Issue a Book </button>

      <BookIssueModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onIssue={handleIssueBook}
      />
    </div>
  );
};

export default BookIssue;
