import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, Button, LinearProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function AdaptiveLearning() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from Flask backend on component mount
  useEffect(() => {
    fetch('/api/courses')  // Replace with the correct API URL if not running on the same domain
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data); // Set the course data to state
        setLoading(false); // Data loaded, set loading to false
      })
      .catch((err) => {
        setError(err.message); // Set error message in case of failure
        setLoading(false); // Stop loading
      });
  }, []);  // Empty dependency array to run once when the component mounts

  // Generate random progress between 0 and 100
  const getRandomProgress = () => Math.floor(Math.random() * 101);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6">Loading courses...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Navbar />
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
          {courses.map((course, index) => {
            // Generate random progress for each course
            const progress = getRandomProgress();
            return (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ marginBottom: '20px' }}>
                  <CardContent>
                    <Typography variant="h6">{course.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Progress: {progress}%
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} sx={{ marginTop: 1 }} />
                    <Link to={`/course-details/${course.title}`}>
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
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
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
