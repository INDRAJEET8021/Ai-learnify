import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  Card,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChatButton from "../components/ChatButton ";

const courses = [
  { id: "ai", name: "Introduction to AI" },
  { id: "web-development", name: "Web Development for Beginners" },
];

export default function AdaptiveQuizPage() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [topic, setTopic] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const totalQuestions = quizData.length;

  // Fetch quiz data from Flask API
  const fetchQuizData = async (course) => {
    try {
      if (!course) {
        throw new Error("Course is not selected or topic is not provided.");
      }

      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/quiz?topic=${encodeURIComponent(course)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch quiz data: ${response.statusText}`);
      }

      const data = await response.json();

      // Ensure quiz data is in the correct format
      if (!data || !Array.isArray(data[0]?.quiz)) {
        throw new Error("Invalid quiz data structure.");
      }

      // Access quiz data from the response
      const quizData = data[0].quiz;

      // Set quiz data and initialize question status
      setQuizData(quizData);
      setQuestionStatus(new Array(quizData.length).fill("unanswered"));
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      alert("Failed to load quiz data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Start Quiz logic
  const handleStartQuiz = async () => {
    if (selectedCourse || topic) {
      setQuizStarted(true);
      fetchQuizData(selectedCourse || topic);
    }
  };

  // Reset the quiz to go back to the quiz selection screen
  const handleBackToSelection = () => {
    setQuizStarted(false);
    setSelectedCourse("");
    setTopic("");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizData([]); // Reset quiz data
  };

  // Handle Question Answer
  const handleAnswer = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = option;
    setAnswers(updatedAnswers);

    const updatedStatus = [...questionStatus];
    updatedStatus[currentQuestionIndex] = "saved";
    setQuestionStatus(updatedStatus);
  };

  // Navigation logic
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    const updatedStatus = [...questionStatus];
    updatedStatus[currentQuestionIndex] = "skipped";
    setQuestionStatus(updatedStatus);
    handleNext();
  };

  const handleFinishQuiz = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === quizData[index].correct
    ).length;

    navigate("/quiz-report", {
      state: { score: correctAnswers, totalQuestions: quizData.length },
    });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ padding: "40px", maxWidth: "1200px", margin: "auto", position: "relative" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}
        >
          Test Yourself!
        </Typography>

        {!quizStarted ? (
          <Grid container spacing={3} sx={{ marginTop: "30px" }}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  borderRadius: "12px",
                  backgroundColor: "#e3f2fd",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  height: "300px",
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#1976d2" }}>
                  Course-Based Quiz
                </Typography>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Select a Course</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {courses.map((course) => (
                        <Grid item xs={12} key={course.id}>
                          <Button
                            variant={selectedCourse === course.id ? "contained" : "outlined"}
                            onClick={() => {
                              setSelectedCourse(course.id);
                              setTopic(""); // Reset topic if course is selected
                            }}
                            fullWidth
                            sx={{
                              padding: "15px",
                              fontWeight: "bold",
                              backgroundColor: selectedCourse === course.id ? "#1976d2" : "white",
                              color: selectedCourse === course.id ? "white" : "#1976d2",
                              border: "2px solid #1976d2",
                              "&:hover": {
                                backgroundColor: selectedCourse === course.id ? "#115293" : "#e0f2f1",
                              },
                            }}
                          >
                            {course.name}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  borderRadius: "12px",
                  backgroundColor: "#e3f2fd",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  height: "300px",
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#1976d2" }}>
                  Topic-Based Quiz
                </Typography>
                <TextField
                  label="Enter a Topic"
                  variant="outlined"
                  fullWidth
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setSelectedCourse(""); // Reset course if topic is selected
                  }}
                  sx={{ marginBottom: "20px" }}
                />
              </Paper>
            </Grid>
          </Grid>
        ) : loading ? (
          // Show loader while fetching quiz data
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress size={60} sx={{ color: "#1976d2" }} />
          </Box>
        ) : (
          <Box>
            {/* Back Button */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBackToSelection}
              sx={{ marginBottom: "20px", backgroundColor: "#1976d2" }}
            >
              <KeyboardBackspaceIcon />
              Back
            </Button>

            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Question {currentQuestionIndex + 1} / {totalQuestions}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={((currentQuestionIndex + 1) / totalQuestions) * 100}
              sx={{ marginY: "10px" }}
            />

            <Card
              sx={{
                marginY: "20px",
                padding: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#1976d2" }}>
                {quizData[currentQuestionIndex].question}
              </Typography>
              <Grid container spacing={2}>
                {quizData[currentQuestionIndex].options.map((option) => (
                  <Grid item xs={6} key={option}>
                    <Button
                      variant={answers[currentQuestionIndex] === option ? "contained" : "outlined"}
                      onClick={() => handleAnswer(option)}
                      fullWidth
                      sx={{
                        padding: "15px",
                        border: "2px solid #1976d2",
                        "&:hover": {
                          backgroundColor: "#e0f2f1",
                        },
                      }}
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Card>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                sx={{
                  padding: "10px",
                  borderColor: "#1976d2",
                  color: "#1976d2",
                }}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                onClick={handleSkip}
                sx={{
                  padding: "10px",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                Skip
              </Button>

              <Button
                variant="contained"
                onClick={handleNext}
                disabled={currentQuestionIndex === totalQuestions - 1}
                sx={{
                  padding: "10px",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                Next
              </Button>
            </Box>

            {currentQuestionIndex === totalQuestions - 1 && (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleFinishQuiz}
                sx={{ marginTop: "20px", padding: "12px", fontSize: "16px", backgroundColor: "#1976d2" }}
              >
                Finish Quiz
              </Button>
            )}
          </Box>
        )}

        {!quizStarted && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartQuiz}
            disabled={!selectedCourse && !topic}
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
              zIndex: 999,
            }}
          >
            Start Quiz
          </Button>
        )}

      </Box>

      <ChatButton />
    </div>
  );
}
