import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    account_type: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getFirestore();
        const userRef = doc(db, 'users', id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setEditData(userSnap.data());
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User not found.'
          });
          navigate('/manage-users');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching user data.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, navigate]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const db = getFirestore();
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, editData);
      Swal.fire({
        icon: 'success',
        title: 'User Updated',
        text: 'User details have been successfully updated.'
      });
      navigate('/manage-users');
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating user details.'
      });
    }
  };

  if (loading) {
    return (
      <MDBContainer className="text-center mt-5">
        <MDBSpinner grow>
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer>
      <MDBRow className="my-4">
        <MDBCol>
          <h2 className="text-center">Edit User</h2>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md="6" className="offset-md-3">
          <MDBCard>
            <MDBCardBody>
              <MDBInput
                label="First Name"
                name="first_name"
                value={editData.first_name || ''}
                onChange={handleEditChange}
                className="mb-3"
              />
              <MDBInput
                label="Last Name"
                name="last_name"
                value={editData.last_name || ''}
                onChange={handleEditChange}
                className="mb-3"
              />
              <MDBInput
                label="Email"
                name="email"
                value={editData.email || ''}
                onChange={handleEditChange}
                className="mb-3"
              />
              <MDBInput
                label="Account Type"
                name="account_type"
                value={editData.account_type || ''}
                onChange={handleEditChange}
                className="mb-3"
              />
              <MDBBtn color="primary" onClick={handleEditSubmit}>Save Changes</MDBBtn>
              <MDBBtn color="secondary" onClick={() => navigate('/manage-users')} className="ms-2">Cancel</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default EditUser;
