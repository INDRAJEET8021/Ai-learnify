import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import QuizReport from './QuizReport'; // The component to show quiz report

const questionsByTopic = {
  'AI': [
    { id: 1, question: 'What is Artificial Intelligence?', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' },
    { id: 2, question: 'What is Machine Learning?', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B' },
  ],
  'React': [
    { id: 1, question: 'What is React?', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B' },
    { id: 2, question: 'What are React hooks?', options: ['A', 'B', 'C', 'D'], correctAnswer: 'C' },
  ],
  // Add more topics and questions here
};

export default function TopicBasedQuiz({ topic }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const questions = questionsByTopic[topic] || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option,
    });
  };

  const handleSkip = () => {
    setSkippedQuestions([...skippedQuestions, currentQuestion.id]);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleMarkForReview = () => {
    setMarkedForReview([...markedForReview, currentQuestion.id]);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleFinishQuiz = () => {
    // Show the report instead of generating an alert
    setShowReport(true);
  };

  if (questions.length === 0) {
    return <Typography variant="h6">No quiz available for the selected topic.</Typography>;
  }

  if (showReport) {
    return <QuizReport questions={questions} answers={answers} markedForReview={markedForReview} skippedQuestions={skippedQuestions} />;
  }

  return (
    <Box>
      {/* Tracing Bar */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {questions.map((question, index) => {
          let bgColor = '#e0e0e0'; // Default color
          if (answers[question.id]) bgColor = '#4caf50'; // Answered
          if (markedForReview.includes(question.id)) bgColor = '#ff9800'; // Marked for review
          if (skippedQuestions.includes(question.id)) bgColor = '#f44336'; // Skipped

          return (
            <Grid item key={index} xs={1}>
              <Box
                sx={{
                  backgroundColor: bgColor,
                  width: '100%',
                  height: '10px',
                  borderRadius: '5px',
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* Question Display */}
      <Paper sx={{ padding: '20px', marginBottom: '20px', borderRadius: '12px' }}>
        <Typography variant="h6" gutterBottom>
          {`Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`}
        </Typography>
        {currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            variant={answers[currentQuestion.id] === option ? 'contained' : 'outlined'}
            onClick={() => handleAnswer(option)}
            sx={{ display: 'block', margin: '10px 0' }}
          >
            {option}
          </Button>
        ))}
      </Paper>

      {/* Quiz Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button variant="outlined" color="primary" onClick={handleSkip}>
          Skip
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleMarkForReview}>
          Mark for Review
        </Button>
        {currentQuestionIndex === questions.length - 1 ? (
          <Button variant="contained" color="success" onClick={handleFinishQuiz}>
            Finish Quiz
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
            Next
          </Button>
        )}
      </Box>

      {/* Review Count */}
      <Typography variant="body2">
        {`Questions marked for review: ${markedForReview.length}`}
      </Typography>
    </Box>
  );
}
