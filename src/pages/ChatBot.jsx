import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const ChatContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: '#f5f5f5',
  padding: '20px',
});

const ChatBox = styled(Paper)({
  width: '100%',
  maxWidth: '600px',
  padding: '20px',
  background: '#fff',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
});

const ChatInput = styled(TextField)({
  marginTop: '20px',
});

const MessageList = styled(List)({
  width: '100%',
  maxHeight: '400px',
  overflowY: 'auto',
});

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Define apiUrl and apiKey
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = 'sk-proj-jSzOBfaf9M5mGbeM1e4YT3BlbkFJJIbBT3KUFibRpwVephSD';

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        apiUrl,
        {
          model: "gpt-4o-mini",
          messages: [
            {role: "user", content: input}
          ],
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          }
        }
      );

      if (response.status === 200) {
        const botMessage = { sender: 'bot', text: response.data.choices[0].message.content.trim() };
        setMessages([...messages, userMessage, botMessage]);
      } else {
        // Handle error
        const errorMessage = { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' };
        setMessages([...messages, userMessage, errorMessage]);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      const errorMessage = { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' };
      setMessages([...messages, userMessage, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer>
      <ChatBox elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chat with Us
        </Typography>
        <MessageList>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={message.text}
                style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}
              />
            </ListItem>
          ))}
        </MessageList>
        {loading && <CircularProgress style={{ marginTop: '10px' }} />}
        <ChatInput
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: '10px' }}>
          Send
        </Button>
      </ChatBox>
    </ChatContainer>
  );
};

export default ChatBot;