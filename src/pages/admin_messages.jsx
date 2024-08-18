import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const db = getFirestore();
        const messagesCollection = collection(db, 'messages');
        const messageSnapshot = await getDocs(messagesCollection);
        const messageList = messageSnapshot.docs.map(doc => doc.data());
        setMessages(messageList);
      } catch (error) {
        console.error('Error fetching messages: ', error);
      }
    };

    fetchMessages();
  }, []);

  const handleBackToAdmin = () => {
    navigate('/admin');
  };

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol className="text-center">
          <h2>Manage Messages</h2>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        {messages.map((message, index) => (
          <MDBCol key={index} md="6" lg="4" className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{message.name}</MDBCardTitle>
                <MDBCardText>{message.message}</MDBCardText>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Number:</strong> {message.number}</p>
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

export default AdminMessages;
