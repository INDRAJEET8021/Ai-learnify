import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Button, LinearProgress } from '@mui/material';
import Navbar from '../components/Navbar';

export default function AdaptiveLearning() {
  // Sample data for courses (no backend connection, mock data)
  const courses = [
    {
      title: 'Introduction to Machine Learning',
      progress: 60,
    },
    {
      title: 'Data Science Basics',
      progress: 80,
    },
    {
      title: 'Advanced AI Concepts',
      progress: 30,
    },
  ];

  return (
    <div>
      <Navbar/>
      <Box sx={{ padding: '20px' }}>
      {/* Introduction Section */}
      <Typography variant="h4" align="center" gutterBottom>
        Adaptive Learning
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" paragraph>
        Our adaptive learning system provides personalized learning experiences based on your progress and performance.
      </Typography>

      {/* Course Cards */}
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Progress: {course.progress}%
                </Typography>
                <LinearProgress variant="determinate" value={course.progress} sx={{ marginTop: 1 }} />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recommendations Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Personalized Recommendations
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Based on your learning progress, here are some recommended courses for you to explore next.
        </Typography>

        {/* Placeholder for recommendations */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Introduction to AI</Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Deep Learning Fundamentals</Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Quiz Section */}
      <Box mt={5} mb={5} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Test Your Knowledge
        </Typography>
        <Button href='/quiz' variant="outlined" size="large" sx={{ backgroundColor: '#1976d2', color: 'white' }}>
          Take a Quiz
        </Button>
      </Box>
    </Box>
    </div>
   
  );
}
