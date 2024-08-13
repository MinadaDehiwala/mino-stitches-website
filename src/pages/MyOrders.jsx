import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBadge
} from 'mdb-react-ui-kit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled component for the black bar
const BlackBar = styled(Box)({
  backgroundColor: '#000', // Black color
  height: '160px', // Adjusted height for consistency
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff', // White text color
  fontSize: '24px', // Adjust text size as needed
  fontWeight: 'bold',
  padding: '0 20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow for a subtle effect
  marginBottom: '20px', // Add some margin below the bar
});

const OrdersContainer = styled(Box)({
  paddingTop: '20px', // Reduced padding to bring orders closer to the black bar
  backgroundColor: '#f9fafb', // Optional background color
});

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const db = getFirestore();
        const ordersRef = collection(db, 'orders');
        const querySnapshot = await getDocs(ordersRef);
        const ordersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <BlackBar>
        <Box mt={10}>
          My Orders
        </Box>
      </BlackBar>
      <OrdersContainer>
        <MDBContainer className="py-4 h-100">
          {orders.length > 0 ? (
            orders.map((order) => (
              <MDBCard className="mb-4" key={order.id}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="6">
                      <p><strong>Order #{order.id}</strong></p>
                      <p className="text-muted">{new Date(order.date.seconds * 1000).toLocaleDateString()}</p>
                    </MDBCol>
                    <MDBCol md="6">
                      <p className="float-end fw-bold">
                        Total: LKR {order.totalPrice.toFixed(2)}
                      </p>
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
                  <hr />
                  <MDBRow>
                    <MDBCol md="12">
                      <strong>Status:</strong> 
                      {order.status && order.status.length > 0 ? (
                        order.status.map((status, index) => (
                          <MDBBadge key={index} color="info" className="me-2">
                            {status}
                          </MDBBadge>
                        ))
                      ) : (
                        <MDBBadge color="secondary">Pending</MDBBadge>
                      )}
                    </MDBCol>
                  </MDBRow>
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
