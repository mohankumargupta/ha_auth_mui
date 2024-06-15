//import './App.css'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthData, getAuth, getAuthOptions } from 'home-assistant-js-websocket';
import { useSearchParams } from "react-router-dom";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ConnectToHomeAssistant() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("ip"));
    (async () => {

      const authOptions: getAuthOptions = {
        
        async loadTokens() {
          try {
            return JSON.parse(localStorage.hassTokens);
          } catch (err) {
            return undefined;
          }
        },
        saveTokens: (tokens:AuthData | null) => {
          localStorage.hassTokens = JSON.stringify(tokens);
        },
        
      };
      authOptions.hassUrl = data.get('ip')?.toString();
      const auth = await getAuth(authOptions);
      if (auth) {
        alert(auth.accessToken);
      }
    })();
    //getAuth();
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const state = searchParams.get("state");
  if (state) {
    
    //window.location.href = "http://localhost:5173";
  }
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
            Connect to Home Assistant
          </Typography>
          <Typography className="pt-4">
            For best experience, connect to local HA
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  placeholder="eg. http://192.168.1.10:8123"
                  fullWidth
                  id="ip"
                  label="IP Address"
                  name="ip"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Connect to Home Assistant
            </Button>
          </Box>
        </Box>
        <Typography>
          State: {state}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
