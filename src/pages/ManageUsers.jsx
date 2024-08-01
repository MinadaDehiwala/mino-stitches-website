import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { auth } from '../configs/firebase'; // Ensure you import auth for resetting passwords

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [editData, setEditData] = useState({});
  const db = getFirestore();

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

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditData(user);
    toggleModal();
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const userRef = doc(db, 'users', currentUser.id);
      await updateDoc(userRef, editData);
      Swal.fire({
        icon: 'success',
        title: 'User Updated',
        text: 'User details have been successfully updated.'
      });
      setUsers(users.map(user => (user.id === currentUser.id ? { ...user, ...editData } : user)));
      toggleModal();
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating user details.'
      });
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol>
          <h2 className="text-center">Manage Users</h2>
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
      <MDBModal isOpen={modal} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Edit User</MDBModalHeader>
        <MDBModalBody>
          <MDBInput label="First Name" name="first_name" value={editData.first_name || ''} onChange={handleEditChange} className="mb-3" />
          <MDBInput label="Last Name" name="last_name" value={editData.last_name || ''} onChange={handleEditChange} className="mb-3" />
          <MDBInput label="Email" name="email" value={editData.email || ''} onChange={handleEditChange} className="mb-3" />
          <MDBInput label="Account Type" name="account_type" value={editData.account_type || ''} onChange={handleEditChange} className="mb-3" />
          <MDBBtn color="primary" onClick={handleEditSubmit}>Save Changes</MDBBtn>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default ManageUsers;
