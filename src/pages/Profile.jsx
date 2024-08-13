import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Button, Divider, CircularProgress, TextField } from '@mui/material'; // Added TextField import
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContextManager';
import { getFirestore, doc, updateDoc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { auth } from "../configs/firebase";
import backgroundImg from '../assets/login_signup_background.png'; // Import the image

const ProfileContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '20px',
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const ProfileBox = styled(Paper)({
  width: '100%',
  maxWidth: '600px',
  padding: '40px 20px',
  background: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  textAlign: 'center',
  minHeight: '500px', // Increase the height of the profile card
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

const StatBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: '20px',
});

const StatItem = styled(Box)({
  textAlign: 'center',
  flex: 1,
  cursor: 'pointer',
});

const UploadButton = styled(Button)({
  marginTop: '20px',
});

const Profile = () => {
  const { authUser, logout } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(authUser?.first_name || '');
  const [lastName, setLastName] = useState(authUser?.last_name || '');
  const [profileImage, setProfileImage] = useState('');
  const [orderCount, setOrderCount] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const db = getFirestore();

        // Fetch profile data
        const profileRef = doc(db, 'users', authUser.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const data = profileSnap.data();
          setFirstName(data.first_name || '');
          setLastName(data.last_name || '');
          setProfileImage(data.profileImage || '');
        }

        // Fetch order count, looking for userId within userDetails
        const ordersRef = collection(db, 'orders');
        const ordersQuery = query(ordersRef, where("userDetails.userId", "==", authUser.uid));
        const orderSnapshot = await getDocs(ordersQuery);

        console.log("Order Documents:");
        orderSnapshot.docs.forEach((doc, index) => {
          console.log(`Order #${index + 1}:`, doc.data());
          console.log(`Order ID: ${doc.id}`);
          console.log(`Order userId: ${doc.data().userDetails.userId}`);
        });

        setOrderCount(orderSnapshot.size);

        // Fetch cart item count
        const cartRef = collection(db, 'cart', authUser.uid, 'items');
        const cartSnapshot = await getDocs(cartRef);
        setCartItemCount(cartSnapshot.size);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [authUser]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const db = getFirestore();
      const profileRef = doc(db, 'users', authUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        await updateDoc(profileRef, {
          first_name: firstName,
          last_name: lastName,
          profileImage: profileImage,
        });
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully.',
        });
      } else {
        await setDoc(profileRef, {
          first_name: firstName,
          last_name: lastName,
          profileImage: profileImage,
          uid: authUser.uid,
          account_type: 'customer',
        });
        Swal.fire({
          icon: 'success',
          title: 'Profile Created',
          text: 'Your profile has been created successfully.',
        });
      }

      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating your profile.',
      });
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
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

  const logOutButtonHandler = async () => {
    try {
      await signOut(auth);
      logout();
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        text: 'You have successfully logged out!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    } catch (error) {
      console.error("Error logging out", error);
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: error.message,
      });
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleOrdersClick = () => {
    navigate('/my-orders');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ProfileContainer>
      <Navbar />
      <ProfileBox elevation={3}>
        {editMode ? (
          <>
            <Box position="relative">
              <UserAvatar src={profileImage || ''} alt="Profile Image" />
              <UploadButton component="label" variant="contained" startIcon={<PhotoCamera />}>
                Upload
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
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px', borderRadius: '30px' }}
              onClick={handleSaveClick}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginTop: '10px', borderRadius: '30px' }}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <UserAvatar src={profileImage || ''} alt="Profile Image" />
            <Typography variant="h5" component="h1" gutterBottom>
              {`${firstName} ${lastName}`}
            </Typography>
            <StatBox>
              <StatItem onClick={handleCartClick}>
                <ShoppingCartIcon color="primary" fontSize="large" />
                <Typography variant="body1">Cart Items</Typography>
                <Typography variant="h6" component="p">{cartItemCount}</Typography>
              </StatItem>
              <StatItem onClick={handleOrdersClick}>
                <ReceiptIcon color="primary" fontSize="large" />
                <Typography variant="body1">Orders</Typography>
                <Typography variant="h6" component="p">{orderCount}</Typography>
              </StatItem>
            </StatBox>
            <Divider style={{ margin: '20px 0' }} />
            <InfoBox>
              <InfoItem>
                <Typography variant="body1"><strong>Email:</strong></Typography>
                <Typography variant="body1">{authUser?.email}</Typography>
              </InfoItem>
            </InfoBox>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              style={{ marginTop: '20px', borderRadius: '30px' }}
              onClick={handleEditClick}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={logOutButtonHandler}
              style={{ marginTop: '10px', borderRadius: '30px', backgroundColor: '#d32f2f' }}
              data-testid="logout-button"
            >
              Logout
            </Button>
          </>
        )}
      </ProfileBox>
    </ProfileContainer>
  );
};

export default Profile;
  