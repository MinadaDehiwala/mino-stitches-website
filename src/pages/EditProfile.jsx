import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';

// Styled Components
const ProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'url(/assets/login_signup_background.png) center center/cover no-repeat',
});

const ProfileCard = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
});

const ProfileAvatar = styled(Avatar)({
  width: '100px',
  height: '100px',
  margin: 'auto',
  marginBottom: '20px',
});

const UploadButton = styled(IconButton)({
  position: 'absolute',
  right: '50%',
  transform: 'translateX(50%)',
  top: '80px',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

const EditProfile = ({ profile }) => {
  const [firstName, setFirstName] = useState(profile.firstName || '');
  const [lastName, setLastName] = useState(profile.lastName || '');
  const [profileImage, setProfileImage] = useState(profile.profileImage || '');
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    if (!firstName || !lastName) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'First name and last name cannot be empty.',
      });
      return;
    }

    try {
      const db = getFirestore();
      const profileRef = doc(db, 'users', profile.uid);
      await updateDoc(profileRef, {
        firstName,
        lastName,
        profileImage,
      });
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully.',
      });
      navigate('/profile'); // Redirect back to the profile page after saving
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating your profile.',
      });
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <Box position="relative">
          <ProfileAvatar src={profileImage || '/assets/default_avatar.png'} alt="Profile Image" />
          <UploadButton component="label">
            <PhotoCamera />
            <input type="file" hidden onChange={handleProfileImageChange} />
          </UploadButton>
        </Box>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleUpdateProfile}>
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => navigate('/profile')}
          sx={{ marginTop: '10px' }}
        >
          Cancel
        </Button>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default EditProfile;
