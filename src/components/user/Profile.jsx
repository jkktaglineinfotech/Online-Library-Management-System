import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Box,
} from '@mui/material';

const Profile = () => {
  const initialUser = {
    name: 'John Doe',
    username: 'john_doe',
    email: 'john@example.com',
    contact: '123-456-7890',
  };

  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleSaveChanges = () => {
    setEditMode(false);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              fullWidth
              value={user.name}
              disabled={!editMode}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Username"
              fullWidth
              value={user.username}
              disabled={!editMode}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              fullWidth
              value={user.email}
              disabled={!editMode}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Contact"
              fullWidth
              value={user.contact}
              disabled={!editMode}
              onChange={(e) => handleInputChange('contact', e.target.value)}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          {editMode ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditMode(false)}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="outlined" color="primary" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
