import React from 'react';
import { Box, Typography, Paper, Avatar, Grid, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import profileImage from '../assets/profile_dummy.png'; // Update with the correct path to the profile image
import Navbar from '../components/Navbar';

const ProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'linear-gradient(135deg, #e3f2fd 30%, #90caf9 90%)',
  padding: '20px',
});

const ProfileBox = styled(Paper)({
  width: '100%',
  maxWidth: '600px',
  padding: '40px 20px',
  background: '#fff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  textAlign: 'center',
});

const UserAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  margin: '0 auto 20px',
  border: '5px solid #e3f2fd',
});

const InfoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '10px 20px',
});

const InfoItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '10px',
});

const Profile = () => {
  const dummyData = {
    name: 'Sriyan Anurudda',
    email: 'sriyan@gmail.com',
    phone: '+94 77 952 5841',
    address: '187 A, Piliyandala',
    bio: '', // Removed the lorem text
  };

  return (
    <ProfileContainer>
      <Navbar />
      <ProfileBox elevation={3}>
        <UserAvatar src={profileImage} />
        <Typography variant="h5" component="h1" gutterBottom>
          {dummyData.name}
        </Typography>
        {dummyData.bio && (
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {dummyData.bio}
          </Typography>
        )}
        <Divider style={{ margin: '20px 0' }} />
        <InfoBox>
          <InfoItem>
            <Typography variant="body1"><strong>Email:</strong></Typography>
            <Typography variant="body1">{dummyData.email}</Typography>
          </InfoItem>
          <InfoItem>
            <Typography variant="body1"><strong>Phone:</strong></Typography>
            <Typography variant="body1">{dummyData.phone}</Typography>
          </InfoItem>
          <InfoItem>
            <Typography variant="body1"><strong>Address:</strong></Typography>
            <Typography variant="body1">{dummyData.address}</Typography>
          </InfoItem>
        </InfoBox>
        <Button variant="contained" color="primary" startIcon={<EditIcon />} style={{ marginTop: '20px', borderRadius: '30px' }}>
          Edit Profile
        </Button>
      </ProfileBox>
    </ProfileContainer>
  );
};

export default Profile;
