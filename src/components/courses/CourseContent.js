import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CourseContent({ topic, content }) {
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        {topic}
      </Typography>
      <Typography variant="body1">
        {content}
      </Typography>
    </Box>
  );
}
