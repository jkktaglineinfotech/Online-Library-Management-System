// Import necessary components and styles from Material-UI
import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { createUser } from '../../apis/user';
import { signIn } from '../../apis/auth';
import { isValidEmail } from '../../utils/helper';
import { setReduxUserState } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const validateUserInfo = ({ email, password }) => {
  if (!email) return { ok: false, error: "Email is missing !" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email !" };

  if (!password) return { ok: false, error: "Password is missing !" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long !" };

  return { ok: true };
};

const Login = () => {

const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('email:', email);
    console.log('Password:', password);
    const { ok, error } = validateUserInfo({email, password});
    if (!ok) return alert(error);
    const { data, message } = await signIn({email, password});
    if(message === "Login Successful."){
      dispatch(setReduxUserState(data))
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop : "50px"}}>
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
          {/* email Field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          {/* Password Field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Submit Button */}
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
