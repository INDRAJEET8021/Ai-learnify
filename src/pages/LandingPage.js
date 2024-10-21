import React from 'react';
import Navbar from '../components/Navbar'; // Import the Navbar component
import Footer from '../components/Footer'; // Import Footer component
import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material';
import ChatButton from '../components/ChatButton ';

export default function LandingPage() {
  return (
    <div>
       <Box 
      display="flex" 
      flexDirection="column" 
      minHeight="100vh"
    >

    
      <Navbar />
      <div className=''>
      <Box sx={{ bgcolor: 'primary.light', color: 'white', padding: 6, textAlign: 'center',  }}>
        <Typography variant="h2">Welcome to AI-Powered Learning</Typography>
        <Typography variant="h5" sx={{ margin: '20px 0' }}>
          Enhance your educational experience with personalized learning solutions
        </Typography>
      </Box>
      </div>
     

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Our Features</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', '&:hover': { boxShadow: 4 } }}>
              <Typography variant="h6" gutterBottom>Adaptive Learning</Typography>
              <Typography>
                Personalized learning paths based on your performance and preferences.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', '&:hover': { boxShadow: 4 } }}>
              <Typography variant="h6" gutterBottom>Interactive Quizzes</Typography>
              <Typography>
                Engaging quizzes that adapt to your skill level and knowledge.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', '&:hover': { boxShadow: 4 } }}>
              <Typography variant="h6" gutterBottom>AI Chatbot</Typography>
              <Typography>
                Instant answers to your questions with our friendly AI assistant.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <Typography variant="h5">Join our community and start learning today!</Typography>
          <Button variant="contained"  size="large" href="/auth" sx={{ marginTop: 2 ,backgroundColor: 'tomato',
            ':hover': { backgroundColor: 'darkorange' }}}>
            Sign Up Now
          </Button>
        </Box>
      <ChatButton/>
      </Container>

      <Footer />
      </Box>
    </div>
  );
}
