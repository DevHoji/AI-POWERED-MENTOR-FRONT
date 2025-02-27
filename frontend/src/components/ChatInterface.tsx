import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Send, Mic, MicOff } from '@mui/icons-material';
import axios from 'axios';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'ai'; message: string }>>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', message }]);

    try {
      const response = await axios.post('http://localhost:8000/api/chat', { message });
      setChatHistory(prev => [...prev, { type: 'ai', message: response.data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Handle recording logic here
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      // Stop recording logic here
      setIsRecording(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1, 
          mb: 2, 
          p: 2, 
          overflow: 'auto',
          maxHeight: 'calc(100vh - 200px)'
        }}
      >
        <List>
          {chatHistory.map((chat, index) => (
            <ListItem 
              key={index}
              sx={{
                justifyContent: chat.type === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: chat.type === 'user' ? 'primary.light' : 'background.paper',
                  color: chat.type === 'user' ? 'white' : 'text.primary',
                }}
              >
                <Typography>{chat.message}</Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton onClick={toggleRecording} color={isRecording ? 'error' : 'default'}>
          {isRecording ? <MicOff /> : <Mic />}
        </IconButton>
        <TextField
          fullWidth
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <IconButton onClick={handleSend} color="primary">
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInterface;
