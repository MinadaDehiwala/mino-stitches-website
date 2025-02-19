import React, { useEffect, useState, useContext } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Box, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContextManager';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system'; 

// Importing the payment method images
import ezCashLogo from '../assets/ezcash.png'; 
import mCashLogo from '../assets/mcash.png';
import paypalLogo from '../assets/paypal.png'; 

// Styled component for the black bar
const BlackBar = styled(Box)({
  backgroundColor: '#000', 
  height: '160px', 
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff', 
  fontSize: '24px', 
  fontWeight: 'bold',
  padding: '0 20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
  marginBottom: '20px', 
});

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!authUser) return;

      try {
        const db = getFirestore();
        const cartRef = collection(db, 'cart', authUser.uid, 'items');
        const cartSnapshot = await getDocs(cartRef);
        const cartList = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(cartList);
      } catch (error) {
        console.error('Error fetching cart items: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [authUser]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const db = getFirestore();
      const itemRef = doc(db, 'cart', authUser.uid, 'items', itemId);
      await updateDoc(itemRef, { quantity: newQuantity });

      setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
    } catch (error) {
      console.error('Error updating quantity: ', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const db = getFirestore();
      const itemRef = doc(db, 'cart', authUser.uid, 'items', itemId);
      await deleteDoc(itemRef);

      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item: ', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/order-summary', { state: { cartItems, totalPrice: getTotalPrice() } });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const getDeliveryDate = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 7);
    return deliveryDate.toLocaleDateString();
  };

  return (
    <>
      <Navbar />
      <BlackBar>
        <Box mt={10}>
          <MDBTypography tag="h4" className="text-white">
            Your Cart
          </MDBTypography>
        </Box>
      </BlackBar>
      <section className="h-90" style={{ backgroundColor: '#f9fafb', marginTop: '10px' }}> {/* Reduced margin-top */}
        <MDBContainer className="py-4 h-100">
          <MDBRow className="justify-content-center my-3">
            <MDBCol md="8">
              <MDBCard className="mb-3" style={{ fontSize: '0.85rem' }}>
                <MDBCardHeader className="py-2">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart - {cartItems.length} items
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  {cartItems.map((item) => (
                    <MDBRow key={item.id} className="mb-3">
                      <MDBCol lg="3" md="12" className="mb-3 mb-lg-0">
                        <MDBRipple rippleTag="div" rippleColor="light" className="bg-image rounded hover-zoom hover-overlay">
                          <img src={item.image} className="w-100" alt={item.name} style={{ objectFit: 'contain', height: '150px' }} />
                          <a href="#!">
                            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                          </a>
                        </MDBRipple>
                      </MDBCol>

                      <MDBCol lg="5" md="6" className="mb-3 mb-lg-0">
                        <p>
                          <strong>{item.name}</strong>
                        </p>
                        <p>{item.description}</p>

                        <MDBTooltip wrapperProps={{ size: 'sm' }} wrapperClass="me-1 mb-1" title="Remove item">
                          <MDBIcon fas icon="trash" onClick={() => removeItem(item.id)} />
                        </MDBTooltip>
                      </MDBCol>
                      <MDBCol lg="4" md="6" className="mb-3 mb-lg-0">
                        <div className="d-flex mb-3" style={{ maxWidth: '250px' }}>
                          <MDBBtn className="px-2 me-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>

                          <MDBInput value={item.quantity} min={0} type="number" label="Quantity" readOnly style={{ width: '50px' }} />

                          <MDBBtn className="px-2 ms-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </div>

                        <p className="text-start text-md-center">
                          <strong>LKR {item.price}</strong>
                        </p>
                      </MDBCol>
                    </MDBRow>
                  ))}
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-3">
                <MDBCardBody>
                  <p>
                    <strong>Expected shipping delivery</strong>
                  </p>
                  <p className="mb-0">{getDeliveryDate()}</p>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-3 mb-lg-0">
                <MDBCardBody>
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <MDBCardImage
                    className="me-2"
                    width="35px"
                    src={ezCashLogo} // Using the imported image
                    alt="eZ Cash"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="35px"
                    src={mCashLogo} // Using the imported image
                    alt="mCash"
                  />
                  <MDBCardImage
                    className="me-2"
                    width="35px"
                    src={paypalLogo} // Using the imported image for PayPal
                    alt="PayPal"
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="mb-3">
                <MDBCardHeader>
                  <MDBTypography tag="h5" className="mb-0">
                    Summary
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody style={{ fontSize: '0.85rem' }}>
                  <MDBListGroup flush>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>LKR {getTotalPrice().toFixed(2)}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>LKR 500.00</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-2">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>LKR {(getTotalPrice() + 500).toFixed(2)}</strong>
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>

                  <MDBBtn block size="lg" onClick={handleCheckout}>
                    Go to checkout
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
};

export default Cart;
