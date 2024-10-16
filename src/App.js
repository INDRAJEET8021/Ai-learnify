// src/App.js
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
import CourseContentPage from "./pages/CourseContentPage";
import AdaptiveQuizPage from "./pages/AdaptiveQuizPage";
import Chatbot from "./pages/Chatbot";
import EducatorDashboard from "./pages/EducatorDashboard";
import AuthPage from "./pages/AuthPage";
import AdaptiveLearning from "./pages/AdaptiveLearning";
import CourseDetails from "./components/courses/CourseDetails";
import ScrollProgress from "./components/courses/ScrollProgress";

function App() {
  return (
    <Router> {/* Wrap Routes in Router */}
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/course" element={<CourseContentPage />} />
        <Route path="/quiz" element={<AdaptiveQuizPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/educator" element={<EducatorDashboard />} />
        <Route path="/progress" element={<AdaptiveLearning />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/course-details/:courseId" element={<CourseDetails />} />
         </Routes>
    </Router>
  );
}

export default App;
