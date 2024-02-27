import React, { useState } from "react";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";
import { validateUserInfo } from "../../utils/helper";
import { createUser } from "../../apis/user";
import Swal from "sweetalert2";


const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Contact:", contact);
    const { ok, error } = validateUserInfo({
      name,
      userName: username,
      email,
      password,
      contact,
    });
    if (!ok) return alert(error);
    const intContact = parseInt(contact);
    const data = await createUser({
      name,
      userName: username,
      email,
      password,
      contact: intContact,
    });
    if (data) {
      Swal.fire({
        title: "Updated!",
        text: "User update successfully !",
        icon: "success",
        showConfirmButton: false,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "50px" }}>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Sign Up</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="contact"
            label="Contact"
            name="contact"
            autoComplete="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
