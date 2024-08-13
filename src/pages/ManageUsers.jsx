import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { auth } from '../configs/firebase';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [db]);

  const handleEditClick = (user) => {
    console.log("Edit button clicked for user:", user);
    navigate(`/edit-user/${user.id}`); // Navigate to the EditUser page with the user's ID
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      Swal.fire({
        icon: 'success',
        title: 'User Deleted',
        text: 'The user has been successfully deleted.'
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the user.'
      });
    }
  };

  const handlePasswordReset = async (email) => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No email address found for this user.'
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: 'success',
        title: 'Password Reset Email Sent',
        text: 'A password reset email has been sent to the user.'
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while sending the password reset email.'
      });
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol>
          <h2 className="text-center">Manage Users</h2>
          <MDBBtn color="secondary" onClick={() => navigate('/admin')} className="mb-4">
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
        <MDBRow>
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBTable responsive>
                  <MDBTableHead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Account Type</th>
                      <th>Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.account_type}</td>
                        <td>
                          <MDBBtn size="sm" color="info" onClick={() => handleEditClick(user)}>
                            <MDBIcon fas icon="edit" />
                          </MDBBtn>
                          {' '}
                          <MDBBtn size="sm" color="danger" onClick={() => handleDeleteClick(user.id)}>
                            <MDBIcon fas icon="trash" />
                          </MDBBtn>
                          {' '}
                          <MDBBtn size="sm" color="warning" onClick={() => handlePasswordReset(user.email)}>
                            <MDBIcon fas icon="key" />
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

export default ManageUsers;


