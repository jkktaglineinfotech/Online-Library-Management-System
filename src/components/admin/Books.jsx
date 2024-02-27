import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { createBook, deleteBook, getBooks, updateBook } from "../../apis/book";
import Swal from "sweetalert2";
import { useAdmin, useAuthToken } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const token = useAuthToken();
  const admin = useAdmin();

  const [books, setBooks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDialog = (book = null) => {
    setSelectedBook(book);
    setNewBook(book ? { ...book } : { name: "", author: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = async () => {
    const { data, message } = await updateBook(newBook, selectedBook?._id, token);
    console.log(data);
    if (message === "Book updated succesfully!") {
      Swal.fire({
        title: "Updated!",
        text: "Book updated successfully !",
        icon: "success",
        showConfirmButton: false,
      });
    }
    const updatedBooks = books.map((book) =>
      book._id === selectedBook?._id ? newBook : book
    );
    setBooks(updatedBooks);
    setOpenDialog(false);
  };

  const handleAddBook = async () => {
    const { data } = await createBook({ ...newBook }, token);
    setBooks([...books, newBook]);
    setOpenDialog(false);
  };

  const handleRemoveBook = async (id) => {
    const { data, message } = await deleteBook(id);
    console.log(message);
    if (message === "Book deleted succesfully!") {
      Swal.fire({
        title: "Deleted!",
        text: "Book deleted successfully !",
        icon: "success",
        showConfirmButton: false,
      });
    }
    const updatedBooks = books.filter((book) => book._id !== id);
    setBooks(updatedBooks);
  };

  const handleIssueBook = (bookId) => {
    const updatedBooks = books.map((book) =>
      book._id === bookId ? { ...book, availability: "Unavailable" } : book
    );
    setBooks(updatedBooks);
  };

  const handleReturnBook = (bookId) => {
    const updatedBooks = books.map((book) =>
      book._id === bookId ? { ...book, availability: "Available" } : book
    );
    setBooks(updatedBooks);
  };

  const fetchBooks = async () => {
    const { data, message } = await getBooks(token);
    setBooks([...data]);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if(!admin) navigate("/")
    fetchBooks();
  }, []);

  return (
    <Container>
      <AppBar position="static" style={{ overflow: "auto" }}>
        <Toolbar>
          <Typography variant="h6">Book Inventory</Typography>
          <Button
            color="inherit"
            style={{ marginLeft: "auto" }}
            onClick={() => handleOpenDialog()}
          >
            Add Book
          </Button>
        </Toolbar>
      </AppBar>
      {/* <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "16px" }}
      /> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={book._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.currentAvailability}</TableCell>
                <TableCell>
                  {/* <Button
                    variant="outlined"
                    onClick={() => handleIssueBook(book._id)}
                    disabled={book.availability === "Unavailable"}
                  >
                    Issue
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleReturnBook(book._id)}
                    disabled={book.availability === "Available"}
                  >
                    Return
                  </Button> */}
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenDialog(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveBook(book._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Book */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedBook?.id ? "Edit" : "Add"} Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newBook.name}
            onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
          />
          <TextField
            label="Author"
            fullWidth
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {selectedBook?._id ? (
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          ) : (
            <Button onClick={handleAddBook}>Add Book</Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Books;
