import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import { getBooks } from "../../apis/book";
import { getToken } from "../../utils/helper";
import { useAuthToken } from "../../hooks";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const token = useAuthToken();

  useEffect(() => {
    if (token) {
      setUserLoggedIn(true);
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    const { data, message } = await getBooks(token);
    setBooks([...data]);
  };

  if (!userLoggedIn)
    return (
      <Typography variant="h4" align="center" gutterBottom>
        Please Login to View to Books
      </Typography>
    );

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Online Library Management System
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {book.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {book.author}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenModal(book)}
                >
                  View Details
                </Button>
                {book.currentAvailability && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenModal(book)}
                  >
                    Issue
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={Boolean(selectedBook)} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {selectedBook?.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Author: {selectedBook?.author}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Availability: {selectedBook?.availability}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default Home;
