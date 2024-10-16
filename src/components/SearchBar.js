import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState(""); // Search query state
  const [searchResults, setSearchResults] = useState([]); // Results state
  const [noResults, setNoResults] = useState(false); // No results state

  // Dummy data for courses
  const allCourses = [
    {
      id: "introduction-to-ai",
      title: "Introduction to AI",
      description: "Learn the basics of artificial intelligence.",
    },
    {
      id: "web-development",
      title: "Web Development for Beginners",
      description: "Learn how to build websites from scratch.",
    },
    {
      id: "data-science-python",
      title: "Data Science with Python",
      description: "Explore data science techniques using Python.",
    },
    {
      id: "machine-learning",
      title: "Machine Learning Basics",
      description: "Understand the fundamentals of machine learning.",
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing 101",
      description: "An introduction to cloud computing.",
    },
  ];

  // Function to handle search
  const handleSearch = () => {
    if (!query) {
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    const results = allCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setNoResults(results.length === 0);
  };

  return (
    <Box sx={{ padding: "20px", marginTop: "20px" }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
      >
        <TextField
          variant="outlined"
          label="Search for courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: "60%", marginRight: "10px" }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </Box>

      {/* Display Search Results */}
      <Box>
        {searchResults.length > 0 && (
          <Grid container spacing={3}>
            {searchResults.map((course, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{course.title}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {course.description}
                    </Typography>
                    <Link to={`/course-details/${course.id}`}>
                      <Button
                        variant="contained"
                        sx={{
                          marginTop: 2,
                          backgroundColor: "#1976d2",
                          "&:hover": { backgroundColor: "#1565c0" },
                        }}
                      >
                        Start Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* No Results Found */}
        {noResults && (
          <Typography
            variant="body1"
            align="center"
            color="error"
            sx={{ marginTop: "20px" }}
          >
            No courses found matching your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
