import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import ChatInterface from './components/ChatInterface';
import Profile from './components/Profile';
import Courses from './components/Courses';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  const [careerField, setCareerField] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  AI Career Mentor
                </Typography>
                <Button color="inherit" component={Link} to="/">
                  Chat
                </Button>
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
              </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Routes>
                <Route path="/" element={
                  <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                      <ChatInterface />
                    </Box>
                    <Box sx={{ width: '400px' }}>
                      <Courses careerField={careerField} />
                    </Box>
                  </Box>
                } />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
