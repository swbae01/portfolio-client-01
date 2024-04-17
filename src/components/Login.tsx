import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link_mui from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
	const { auth, setAuth }:any = useAuth();
	const navigate = useNavigate();
	const userRef = useRef<HTMLInputElement>(null);
	const errRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (userRef.current !== null) {
      userRef.current.focus();
    }
	}, [])

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd])

	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;

      setAuth({ roles, user, accessToken }); 
      setPwd('');
			navigate('/', { replace: true });
		} catch (err) {
			console.log(err)
      if (errRef.current !== null) {
        errRef.current.focus();
      }
    }
	}

	function Copyright(props: any) {
		return (
			<Typography variant="body2" color="text.secondary" align="center" {...props}>
				{'Copyright © '}
				<Link_mui color="inherit" href="https://mui.com/">
					Your Website
				</Link_mui>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}

	// TODO remove, this demo shouldn't need to reset the theme.
	const defaultTheme = createTheme();

	return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
							fullWidth
							value={user}
							onChange={(e) => setUser(e.target.value)}
							label="ID"
							id="user"
              name="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
							fullWidth
							value={pwd}
							onChange={(e) => setPwd(e.target.value)}
              label="Password"
              type="password"
							id="password"
							name="password"
            />
            <Button
              type="submit"
							fullWidth
              variant="contained"
							sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login