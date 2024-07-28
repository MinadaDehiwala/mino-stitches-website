import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress, Divider } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import userProfileImage from '../assets/profile_dummy.png'; // Update with the correct path to the user profile image
import botProfileImage from '../assets/bot_profile_dummy.png'; // Update with the correct path to the bot profile image

const backgroundAnimation = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(10px, 10px); }
  100% { transform: translate(0, 0); }
`;

const ChatContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Gradient background
  padding: '20px',
  position: 'relative',
  overflow: 'hidden',
});

const DecorativeElement = styled(Box)({
  position: 'absolute',
  width: '200px',
  height: '200px',
  backgroundColor: '#90caf9',
  borderRadius: '50%',
  top: '10%',
  left: '5%',
  opacity: '0.3',
  animation: `${backgroundAnimation} 10s infinite`,
});

const DecorativeElementTwo = styled(Box)({
  position: 'absolute',
  width: '300px',
  height: '300px',
  backgroundColor: '#e3f2fd',
  borderRadius: '50%',
  bottom: '10%',
  right: '5%',
  opacity: '0.5',
  animation: `${backgroundAnimation} 15s infinite`,
});

const ChatBox = styled(Paper)({
  width: '100%',
  maxWidth: '600px',
  height: '75vh', // Increase the height
  padding: '20px',
  background: '#fff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const ChatInput = styled(TextField)({
  marginTop: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
  },
});

const MessageList = styled(List)({
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
  marginBottom: '20px',
});

const UserMessage = styled(ListItem)({
  justifyContent: 'flex-end',
  '& .MuiListItemText-root': {
    background: '#e3f2fd',
    borderRadius: '20px',
    padding: '10px 15px',
    maxWidth: '75%',
    position: 'relative',
    animation: `${keyframes({
      from: { transform: 'translateX(100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 }
    })} 0.3s ease-out`,
  },
});

const BotMessage = styled(ListItem)({
  justifyContent: 'flex-start',
  '& .MuiListItemText-root': {
    background: '#90caf9',
    borderRadius: '20px',
    padding: '10px 15px',
    maxWidth: '75%',
    position: 'relative',
    animation: `${keyframes({
      from: { transform: 'translateX(-100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 }
    })} 0.3s ease-out`,
  },
});

const TypingIndicator = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  '& div': {
    width: '8px',
    height: '8px',
    backgroundColor: '#90caf9',
    borderRadius: '50%',
    margin: '0 2px',
    animation: `${keyframes({
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.5)' },
      '100%': { transform: 'scale(1)' },
    })} 0.6s infinite alternate`,
  },
  '& div:nth-of-type(2)': {
    animationDelay: '0.2s',
  },
  '& div:nth-of-type(3)': {
    animationDelay: '0.4s',
  },
});

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = 'sk-proj-jSzOBfaf9M5mGbeM1e4YT3BlbkFJJIbBT3KUFibRpwVephSD';

  useEffect(() => {
    const initiateChat = async () => {
      const initialMessage = { sender: 'bot', text: "Hello I'm Ann, How can I help you?" };
      setMessages([initialMessage]);
    };
    initiateChat();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);
    setTyping(true);

    try {
      const response = await axios.post(
        apiUrl,
        {
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are an assistant for an ecommerce website called Mino Stitches where they sell hand embroided Items. Do not break character and only reply in 1 sentence (like human)." },
            { role: "user", content: userMessage.text }
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

      setTimeout(() => {
        setTyping(false);
        const botMessage = { sender: 'bot', text: response.data.choices[0].message.content.trim() };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000); // Simulate typing delay
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      const errorMessage = { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setTyping(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer>
      <DecorativeElement />
      <DecorativeElementTwo />
      <ChatBox elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          ChatBot
        </Typography>
        <MessageList>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              {message.sender === 'user' ? (
                <UserMessage>
                  <ListItemAvatar>
                    <Avatar src={userProfileImage} />
                  </ListItemAvatar>
                  <ListItemText primary={message.text} />
                </UserMessage>
              ) : (
                <BotMessage>
                  <ListItemAvatar>
                    <Avatar src={botProfileImage} />
                  </ListItemAvatar>
                  <ListItemText primary={message.text} />
                </BotMessage>
              )}
              {index < messages.length - 1 && <Divider variant="inset" />}
            </React.Fragment>
          ))}
          {typing && (
            <ListItem>
              <ListItemText primary={
                <TypingIndicator>
                  <div></div>
                  <div></div>
                  <div></div>
                </TypingIndicator>
              } />
            </ListItem>
          )}
        </MessageList>
        {loading && <CircularProgress style={{ margin: '10px auto' }} />}
        <ChatInput
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          style={{ marginTop: '10px', borderRadius: '30px' }}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </ChatBox>
    </ChatContainer>
  );
};

export default ChatBot;
