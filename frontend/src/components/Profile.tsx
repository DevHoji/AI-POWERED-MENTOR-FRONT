import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import axios from 'axios';

interface ProfileData {
  name: string;
  age: string;
  careerInterest: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    age: '',
    careerInterest: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/profile', profile);
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to update profile. Please try again.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Profile
        </Typography>

        {status && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Career Interest"
            name="careerInterest"
            value={profile.careerInterest}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Save Profile
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;
