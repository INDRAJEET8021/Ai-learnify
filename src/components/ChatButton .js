import React, { useState } from 'react';
import { Box, Fab, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled Box for the chatbot character
const ChatbotCharacter = styled(Box)({
  width: '60px', // Increased width
  height: '60px', // Increased height
  backgroundImage: 'url(https://cdn3d.iconscout.com/3d/premium/thumb/chatbot-3d-icon-download-in-png-blend-fbx-gltf-file-formats--robot-chat-talk-communication-robotic-automation-internet-marketing-pack-business-icons-6497271.png?f=webp)', // Custom chatbot image
  backgroundSize: 'cover',
  borderRadius: '50%',
  marginBottom: '8px',
});

const ChatButton = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  const handleClick = () => {
    // Navigate to the chat page (update with your chat route)
    navigate('/chatbot');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Tooltip title="Solve Doubts" arrow placement="left">
        <Fab
          onClick={handleClick}
          onMouseEnter={() => setShowText(true)}
          onMouseLeave={() => setShowText(false)}
          sx={{
            backgroundColor: '#f44336', // Button color
            color: 'white',
            '&:hover': {
              backgroundColor: '#d32f2f', // Darker red on hover
            },
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s',
            transform: 'scale(1)',
          }}
        >
          <ChatbotCharacter /> {/* Chatbot character icon */}
        </Fab>
      </Tooltip>
      {showText && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: '70px',
            right: '10px',
            backgroundColor: '#fff',
            padding: '5px 10px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            fontWeight: 'bold',
          }}
        >
          Problem?
        </Typography>
      )}
    </Box>
  );
};

export default ChatButton;
