import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Stack,IconButton} from '@mui/material';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

const BackButton = () => {
  const navigate = useNavigate(); // Hook to get the navigation function

  const handleBackClick = () => {
    navigate(-1); // This will go back to the previous page in the history
  };

  return (
    <IconButton onClick={handleBackClick}>
      <KeyboardBackspaceOutlinedIcon />
    </IconButton>
  );
}

export default BackButton;