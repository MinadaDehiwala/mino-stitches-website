import React, { useEffect, useState } from 'react';
import {
  MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTypography, MDBSpinner
} from 'mdb-react-ui-kit';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import background from '../assets/login_signup_background.png'; // Adjust the path as needed

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const db = getFirestore();
        const ordersRef = collection(db, 'orders');
        const querySnapshot = await getDocs(ordersRef);
        const ordersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders: ', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const db = getFirestore();
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: 'Accepted' });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'Accepted' } : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeclineOrder = async (orderId) => {
    try {
      const db = getFirestore();
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: 'Declined' });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'Declined' } : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-4"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
      }}
    >
      <MDBRow className="mb-4">
        <MDBCol className="text-center">
          <h2 className="display-4 fw-bold ls-tight" style={{ color: 'black' }}>
            My Orders
          </h2>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-4">
        <MDBCol className="text-center">
          <MDBBtn color="dark" onClick={() => navigate('/admin')}>
            Back to Admin
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      {loading ? (
        <div className="text-center">
          <MDBSpinner grow>
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        <MDBRow style={{ width: '100%', maxWidth: '1200px' }}> {/* Adjusted max-width */}
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBTable responsive className="table-stretched"> {/* Added a class for custom styles */}
                  <MDBTableHead>
                    <tr>
                      <th style={{ width: '15%' }}>Order ID</th>
                      <th style={{ width: '15%' }}>Date</th>
                      <th style={{ width: '15%' }}>Total (LKR)</th>
                      <th style={{ width: '35%' }}>Items</th>
                      <th style={{ width: '10%' }}>Status</th>
                      <th style={{ width: '10%' }}>Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{new Date(order.date.seconds * 1000).toLocaleDateString()}</td>
                        <td>LKR {order.totalPrice.toFixed(2)}</td>
                        <td>
                          <ul style={{ paddingLeft: '20px', marginBottom: '0' }}>
                            {order.items.map((item, index) => (
                              <li key={index}>{item.name} - LKR {item.price.toFixed(2)}</li>
                            ))}
                          </ul>
                        </td>
                        <td>{order.status || 'Pending'}</td>
                        <td>
                          <MDBBtn
                            size="sm"
                            color="success"
                            onClick={() => handleAcceptOrder(order.id)}
                            disabled={order.status === 'Accepted' || order.status === 'Declined'}
                          >
                            Accept
                          </MDBBtn>
                          {' '}
                          <MDBBtn
                            size="sm"
                            color="danger"
                            onClick={() => handleDeclineOrder(order.id)}
                            disabled={order.status === 'Accepted' || order.status === 'Declined'}
                          >
                            Decline
                          </MDBBtn>
                        </td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default MyOrders;
