import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar"; // Sidebar component
import CourseContent from "./CourseContent"; // Main content component
import ScrollProgress from "./ScrollProgress"; // Scroll Progress component
import MenuIcon from "@mui/icons-material/Menu"; // Icon for sidebar toggle
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function CourseDetails() {
  const { courseId } = useParams(); // Get courseId from URL
  const [selectedTopic, setSelectedTopic] = useState("Introduction"); // Default topic
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility toggle

  // Dummy data for course details
  const courseDetails = {
    "introduction-to-ai": {
      title: "Introduction to AI",
      topics: [
        "Introduction",
        "History of AI",
        "AI Applications",
        "Future of AI",
      ],
      content: {
        Introduction:
          "This is an introduction to AI..Artificial intelligence (AI) is the science of building machines that can learn, reason, and act like humans. AI systems are designed to perform tasks that would normally require human intelligence, such as: Recognizing speech, Making decisions, Identifying patterns, and Natural language processing (NLP). AI is a multidisciplinary field that uses a variety of techniques, algorithms, and methodologies. These include machine learning, deep learning, and neural networks. The term artificial intelligence  was coined and became popular in the 1950s. Alan Turing published Computer Machinery and Intelligence in 1950, which proposed a test of machine intelligence called The Imitation Game. Some say that the AI technologies currently in use are actually highly advanced machine learning, and that true artificial intelligence is still to come. Others say that AI is already having a significant impact on how people live, work, and entertain themselves. Some important considerations regarding AI include: EthicsThe possibility of creating thinking machines raises ethical questions about how to ensure they don't harm humans. TransparencyAI systems should be designed to be transparent so that users can understand how decisions are made. Programming languagesPython, Java, R, Prolog, Lisp, and Haskell are some of the preferred programming languages for AI projects.This is an introduction to AI..Artificial intelligence (AI) is the science of building machines that can learn, reason, and act like humans. AI systems are designed to perform tasks that would normally require human intelligence, such as: Recognizing speech, Making decisions, Identifying patterns, and Natural language processing (NLP). AI is a multidisciplinary field that uses a variety of techniques, algorithms, and methodologies. These include machine learning, deep learning, and neural networks. The term artificial intelligence  was coined and became popular in the 1950s. Alan Turing published Computer Machinery and Intelligence in 1950, which proposed a test of machine intelligence called The Imitation Game. Some say that the AI technologies currently in use are actually highly advanced machine learning, and that true artificial intelligence is still to come. Others say that AI is already having a significant impact on how people live, work, and entertain themselves. Some important considerations regarding AI include: EthicsThe possibility of creating thinking machines raises ethical questions about how to ensure they don't harm humans. TransparencyAI systems should be designed to be transparent so that users can understand how decisions are made. Programming languagesPython, Java, R, Prolog, Lisp, and Haskell are some of the preferred programming languages for AI projects.This is an introduction to AI..Artificial intelligence (AI) is the science of building machines that can learn, reason, and act like humans. AI systems are designed to perform tasks that would normally require human intelligence, such as: Recognizing speech, Making decisions, Identifying patterns, and Natural language processing (NLP). AI is a multidisciplinary field that uses a variety of techniques, algorithms, and methodologies. These include machine learning, deep learning, and neural networks. The term artificial intelligence  was coined and became popular in the 1950s. Alan Turing published Computer Machinery and Intelligence in 1950, which proposed a test of machine intelligence called The Imitation Game. Some say that the AI technologies currently in use are actually highly advanced machine learning, and that true artificial intelligence is still to come. Others say that AI is already having a significant impact on how people live, work, and entertain themselves. Some important considerations regarding AI include: EthicsThe possibility of creating thinking machines raises ethical questions about how to ensure they don't harm humans. TransparencyAI systems should be designed to be transparent so that users can understand how decisions are made. Programming languagesPython, Java, R, Prolog, Lisp, and Haskell are some of the preferred programming languages for AI projects ",
        "History of AI": "Artificial Intelligence (AI) has a rich history...",
        "AI Applications":
          "AI is used in various fields including healthcare, finance...",
        "Future of AI":
          "The future of AI is expected to have transformative impacts...",
      },
    },
    "web-development-for-beginners": {
      title: "Web Development for Beginners",
      topics: [
        "Introduction",
        "HTML Basics",
        "CSS Basics",
        "JavaScript Basics",
      ],
      content: {
        Introduction: "This is an introduction to Web Development...",
        "HTML Basics": "HTML is the standard markup language...",
        "CSS Basics": "CSS is used for styling HTML elements...",
        "JavaScript Basics":
          "JavaScript is a powerful programming language for the web...",
      },
    },
    // Add more courses here
  };

  const course = courseDetails[courseId];

  useEffect(() => {
    setSelectedTopic("Introduction"); // Set default topic when page loads
  }, [courseId]);

  return (
    <>
    <Navbar/>
  
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {course.title}
        </Typography>
        <Grid container spacing={2}>
          {/* Sidebar Toggle Icon */}
          <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
            <IconButton onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
              <MenuIcon />
            </IconButton>
          </Grid>

          {/* Sidebar */}
          {isSidebarVisible && (
            <Grid item xs={12} md={3}>
              <Sidebar
                topics={course.topics}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
              />
            </Grid>
          )}

          {/* Main Content Area */}
          <Grid item xs={12} md={isSidebarVisible ? 9 : 12}>
            <CourseContent
              topic={selectedTopic}
              content={course.content[selectedTopic]}
            />
          </Grid>
        <ScrollProgress />
        </Grid>

        {/* Scroll Progress Indicator */}
      </Box>
      <Footer />
    </>
  );
}
