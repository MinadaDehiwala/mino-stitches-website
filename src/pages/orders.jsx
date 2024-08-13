import React, { useEffect, useState } from 'react';
import {
  MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBSpinner, MDBBadge
} from 'mdb-react-ui-kit';
import { getFirestore, collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import background from '../assets/login_signup_background.png'; // Adjust the path as needed

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const db = getFirestore();
        const ordersRef = collection(db, 'orders');
        const querySnapshot = await getDocs(ordersRef);
        const ordersList = querySnapshot.docs.map((doc) => {
          console.log(`Order Data:`, doc.data()); // Log the entire document data
          return { id: doc.id, ...doc.data() };
        });
        setOrders(ordersList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const db = getFirestore();
      const orderRef = doc(db, 'orders', orderId);

      const orderDoc = await getDoc(orderRef);
      if (orderDoc.exists()) {
        const currentStatuses = Array.isArray(orderDoc.data().status) ? orderDoc.data().status : [];

        const updatedStatuses = [...new Set([...currentStatuses, newStatus])];

        await updateDoc(orderRef, { status: updatedStatuses });
        setOrders(orders.map(order => order.id === orderId ? { ...order, status: updatedStatuses } : order));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Order status updated to ${newStatus}`,
          confirmButtonText: 'OK',
          timer: 2000
        });
      } else {
        throw new Error("Order does not exist.");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update order status',
        confirmButtonText: 'Try Again'
      });
      console.error('Error updating order status:', error);
    }
  };

  const confirmAction = (orderId, status, color, confirmText) => {
    Swal.fire({
      title: `Are you sure you want to ${status.toLowerCase()} this order?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: color,
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus(orderId, status);
      }
    });
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
            Manage Orders
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
        <MDBRow style={{ width: '100%', maxWidth: '1600px' }}>
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBTable responsive className="table-stretched">
                  <MDBTableHead>
                    <tr>
                      <th style={{ width: '15%' }}>Order ID</th>
                      <th style={{ width: '10%' }}>Date</th>
                      <th style={{ width: '10%' }}>Total (LKR)</th>
                      <th style={{ width: '25%' }}>Items</th>
                      <th style={{ width: '20%' }}>Status</th>
                      <th style={{ width: '20%' }}>Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {orders.map((order) => {
                      console.log(`Order ID: ${order.id}, Status:`, order.status); // Log the order status to the console

                      return (
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
                          <td>
                            {order.status && order.status.length > 0 ? (
                              order.status.map((status, index) => (
                                <MDBBadge key={index} color="info" className="me-1">
                                  {status}
                                </MDBBadge>
                              ))
                            ) : (
                              <MDBBadge color="secondary">Pending</MDBBadge>
                            )}
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              <MDBBtn
                                size="sm"
                                color="success"
                                onClick={() => confirmAction(order.id, 'Accepted', '#28a745', 'Yes, Accept')}
                              >
                                Accept
                              </MDBBtn>
                              <MDBBtn
                                size="sm"
                                color="danger"
                                onClick={() => confirmAction(order.id, 'Declined', '#dc3545', 'Yes, Decline')}
                              >
                                Decline
                              </MDBBtn>
                              <MDBBtn
                                size="sm"
                                color="primary"
                                onClick={() => confirmAction(order.id, 'Payment Received', '#007bff', 'Yes, Confirm')}
                              >
                                Payment Received
                              </MDBBtn>
                              <MDBBtn
                                size="sm"
                                color="warning"
                                onClick={() => confirmAction(order.id, 'Processing', '#ffc107', 'Yes, Process')}
                              >
                                Processing
                              </MDBBtn>
                              <MDBBtn
                                size="sm"
                                color="info"
                                onClick={() => confirmAction(order.id, 'Making', '#17a2b8', 'Yes, Start Making')}
                              >
                                Making
                              </MDBBtn>
                              <MDBBtn
                                size="sm"
                                color="dark"
                                onClick={() => confirmAction(order.id, 'Shipped', '#343a40', 'Yes, Ship')}
                              >
                                Shipped
                              </MDBBtn>
                              <MDBBtn
                                size="sm"
                                color="secondary"
                                onClick={() => confirmAction(order.id, 'Delivered', '#6c757d', 'Yes, Mark Delivered')}
                              >
                                Delivered
                              </MDBBtn>
                              <MDBBtn
                                size="sm"
                                color="success"
                                onClick={() => confirmAction(order.id, 'Completed', '#28a745', 'Yes, Complete')}
                              >
                                Completed
                              </MDBBtn>
                              <MDBBtn
                                size="sm"
                                color="danger"
                                onClick={() => confirmAction(order.id, 'Delayed', '#dc3545', 'Yes, Delay')}
                              >
                                Delayed
                              </MDBBtn>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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

export default Orders;
