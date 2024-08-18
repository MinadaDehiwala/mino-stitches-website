import React, { useState, useContext } from 'react';
import { Box, Container, Typography, Button, TextField, Card, CardContent } from '@mui/material';
import Navbar from '../components/Navbar';
import { styled } from '@mui/system';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContextManager';
import Swal from 'sweetalert2';

// Styled components
const BlackBar = styled(Box)({
  backgroundColor: '#000', // Black color
  height: '240px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff', // White text color
  fontSize: '20px', // Adjust text size as needed
  padding: '0 20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const MessageForm = styled(Card)({
  maxWidth: '500px',
  margin: 'auto',
  padding: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
});

const Message = () => {
  const { authUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore();
      await addDoc(collection(db, 'messages'), {
        ...formData,
        userId: authUser ? authUser.uid : null,
      });
      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: 'Your message has been sent successfully!',
      });
      setFormData({
        name: '',
        email: '',
        number: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'An error occurred while sending your message. Please try again.',
      });
    }
  };

  return (
    <Box>
      <Navbar />
      <BlackBar>
        <Box mt={8}>
          <Typography variant="h4" component="div">
            Contact Us
          </Typography>
        </Box>
      </BlackBar>
      <Container>
        <MessageForm>
          <Typography variant="h5" component="h2" gutterBottom>
            Send Us a Message
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: '20px' }}>
              Send Message
            </Button>
          </form>
        </MessageForm>
      </Container>
    </Box>
  );
};

export default Message;
