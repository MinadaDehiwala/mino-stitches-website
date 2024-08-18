import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminCustomOrders = () => {
  const [customOrders, setCustomOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomOrders = async () => {
      try {
        const db = getFirestore();
        const customOrdersCollection = collection(db, 'custom');
        const customOrdersSnapshot = await getDocs(customOrdersCollection);
        const customOrderList = customOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomOrders(customOrderList);
      } catch (error) {
        console.error('Error fetching custom orders: ', error);
      }
    };

    fetchCustomOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'custom', orderId));
      setCustomOrders(customOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order: ', error);
    }
  };

  const handleBackToAdmin = () => {
    navigate('/admin');
  };

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol className="text-center">
          <h2>Manage Custom Orders</h2>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        {customOrders.map((order, index) => (
          <MDBCol key={index} md="6" lg="4" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{order.name}</MDBCardTitle>
                <MDBCardText>{order.message}</MDBCardText>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Number:</strong> {order.number}</p>
                <p><strong>Max Budget:</strong> LKR {order.maxBudget}</p>
                <MDBBtn color="danger" onClick={() => handleDelete(order.id)}>Delete</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      <MDBBtn color="dark" onClick={handleBackToAdmin} style={{ marginTop: '20px' }}>
        Back to Admin
      </MDBBtn>
    </MDBContainer>
  );
};

export default AdminCustomOrders;
