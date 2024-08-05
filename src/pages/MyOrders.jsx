import React, { useEffect, useState, useContext } from 'react';
import { MDBCard, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBTypography } from 'mdb-react-ui-kit';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContextManager';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled component for the black bar
const BlackBar = styled(Box)({
  backgroundColor: '#000', // Black color
  height: '80px', // Adjusted height for consistency
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed', // Fixed position
  top: '64px', // Adjust based on your navbar height
  left: 0,
  zIndex: 1000, // Ensure it's above other elements
  color: '#fff', // White text color
  fontSize: '24px', // Adjust text size as needed
  fontWeight: 'bold',
  padding: '0 20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow for a subtle effect
});

const OrdersContainer = styled(Box)({
  paddingTop: '160px', // Adjust padding to account for fixed navbar and black bar
  backgroundColor: '#f9fafb', // Optional background color
});

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!authUser) return;

      try {
        const db = getFirestore();
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', authUser.uid));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, [authUser]);

  return (
    <>
      <Navbar />
      <BlackBar>
        <Box mt={2}>
          <MDBTypography tag="h4" className="text-white">
            My Orders
          </MDBTypography>
        </Box>
      </BlackBar>
      <OrdersContainer>
        <MDBContainer className="py-5">
          <MDBTypography tag="h2" className="mb-4 text-center">
            My Orders
          </MDBTypography>
          {orders.length > 0 ? (
            orders.map((order) => (
              <MDBCard className="mb-4" key={order.id}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBTypography tag="h5">Order #{order.id}</MDBTypography>
                      <MDBTypography className="text-muted">{new Date(order.date.seconds * 1000).toLocaleDateString()}</MDBTypography>
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBTypography className="float-end fw-bold">
                        Total: LKR {order.totalPrice.toFixed(2)}
                      </MDBTypography>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  {order.items.map((item, index) => (
                    <MDBRow key={index}>
                      <MDBCol md="8">
                        <p>{item.name}</p>
                      </MDBCol>
                      <MDBCol md="4">
                        <p className="float-end">LKR {item.price.toFixed(2)}</p>
                      </MDBCol>
                    </MDBRow>
                  ))}
                </MDBCardBody>
              </MDBCard>
            ))
          ) : (
            <p className="text-center">You have no orders.</p>
          )}
        </MDBContainer>
      </OrdersContainer>
    </>
  );
};

export default MyOrders;
