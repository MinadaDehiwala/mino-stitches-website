import React, { useState, useContext } from 'react';
import { Box, Container, Typography, Button, TextField, Card, CardContent, Grid } from '@mui/material';
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

const CategoryButton = styled(Button)({
  margin: '10px',
  backgroundColor: '#FF4081',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '20px',
  fontSize: '14px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#F50057',
  },
});

const CustomOrderForm = styled(Card)({
  maxWidth: '500px',
  margin: 'auto',
  padding: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
});

const Custom = () => {
  const { authUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
    budget: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore();
      await addDoc(collection(db, 'custom'), {
        ...formData,
        userId: authUser ? authUser.uid : null,
      });
      Swal.fire({
        icon: 'success',
        title: 'Request Submitted',
        text: 'Your custom order request has been submitted successfully!',
      });
      setFormData({
        name: '',
        email: '',
        number: '',
        message: '',
        budget: '',
      });
    } catch (error) {
      console.error('Error submitting custom order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'An error occurred while submitting your request. Please try again.',
      });
    }
  };

  return (
    <Box>
      <Navbar />
      <BlackBar>
        <Box mt={8}>
          <Typography variant="h4" component="div">
            Custom Order Request
          </Typography>
        </Box>
        <Box mt={2}>
          <CategoryButton>Hoop Stitches</CategoryButton>
          <CategoryButton>Key Chains</CategoryButton>
          <CategoryButton>Jewellery</CategoryButton>
          <CategoryButton>Customized</CategoryButton>
        </Box>
      </BlackBar>
      <Container>
        <CustomOrderForm>
          <Typography variant="h5" component="h2" gutterBottom>
            Custom Order Request
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
            />
            <TextField
              label="Your Max Budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: '20px' }}>
              Submit Request
            </Button>
          </form>
        </CustomOrderForm>
      </Container>
    </Box>
  );
};

export default Custom;
