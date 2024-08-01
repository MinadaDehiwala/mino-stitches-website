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
        const cartList = cartSnapshot.docs.map(doc => ({
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

      setCartItems(cartItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
    } catch (error) {
      console.error('Error updating quantity: ', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const db = getFirestore();
      const itemRef = doc(db, 'cart', authUser.uid, 'items', itemId);
      await deleteDoc(itemRef);

      setCartItems(cartItems.filter(item => item.id !== itemId));
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
      <section className="h-100" style={{ backgroundColor: "#fff" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center my-4">
            <MDBCol md="8">
              <MDBCard className="mb-4" style={{ fontSize: '0.9rem' }}>
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    Cart - {cartItems.length} items
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  {cartItems.map((item) => (
                    <MDBRow key={item.id} className="mb-4">
                      <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                        <MDBRipple rippleTag="div" rippleColor="light" className="bg-image rounded hover-zoom hover-overlay">
                          <img src={item.image} className="w-100" alt={item.name} />
                          <a href="#!">
                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                          </a>
                        </MDBRipple>
                      </MDBCol>

                      <MDBCol lg="5" md="6" className="mb-4 mb-lg-0">
                        <p>
                          <strong>{item.name}</strong>
                        </p>
                        <p>{item.description}</p>

                        <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2" title="Remove item">
                          <MDBIcon fas icon="trash" onClick={() => removeItem(item.id)} />
                        </MDBTooltip>
                      </MDBCol>
                      <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                          <MDBBtn className="px-3 me-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>

                          <MDBInput value={item.quantity} min={0} type="number" label="Quantity" readOnly />

                          <MDBBtn className="px-3 ms-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
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

              <MDBCard className="mb-4">
                <MDBCardBody>
                  <p>
                    <strong>Expected shipping delivery</strong>
                  </p>
                  <p className="mb-0">{getDeliveryDate()}</p>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody>
                  <p>
                    <strong>We accept</strong>
                  </p>
                  <MDBCardImage className="me-2" width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa" />
                  <MDBCardImage className="me-2" width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express" />
                  <MDBCardImage className="me-2" width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard" />
                  <MDBCardImage className="me-2" width="45px"
                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                    alt="PayPal acceptance mark" />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4">
              <MDBCard className="mb-4">
                <MDBCardHeader>
                  <MDBTypography tag="h5" className="mb-0">
                    Summary
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBListGroup flush>
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>LKR {getTotalPrice().toFixed(2)}</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>LKR 500.00</span>
                    </MDBListGroupItem>
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
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
