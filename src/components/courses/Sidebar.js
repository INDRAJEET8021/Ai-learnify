import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function Sidebar({ topics, selectedTopic, setSelectedTopic }) {
  return (
    <List sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
      {topics.map((topic) => (
        <ListItem
          button
          key={topic}
          selected={topic === selectedTopic}
          onClick={() => setSelectedTopic(topic)}
          sx={{
            backgroundColor: topic === selectedTopic ? '#3f51b5' : 'transparent',
            color: topic === selectedTopic ? '#fff' : '#000',
            marginBottom: '5px',
            borderRadius: '4px',
          }}
        >
          <ListItemText primary={topic} />
        </ListItem>
      ))}
    </List>
  );
}
