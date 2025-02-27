import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';

interface Course {
  name: string;
  description: string;
  photoUrl: string;
  partnerLogo: string;
}

const Courses = ({ careerField }: { careerField: string }) => {
  const { data: courses, isLoading, error } = useQuery<Course[]>(
    ['courses', careerField],
    async () => {
      const response = await axios.get(`http://localhost:8000/api/courses/${careerField}`);
      return response.data;
    },
    {
      enabled: !!careerField,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  );

  if (!careerField) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>
          Start chatting with the AI to get personalized course recommendations!
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Error loading courses. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recommended Courses for {careerField}
      </Typography>
      <Grid container spacing={3}>
        {courses?.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              {course.photoUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={course.photoUrl}
                  alt={course.name}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                {course.partnerLogo && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={course.partnerLogo}
                      alt="Partner logo"
                      style={{ height: 30 }}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;
