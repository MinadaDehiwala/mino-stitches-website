import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import background from '../assets/login_signup_background.png'; // Adjust the path as needed

const Admin = () => {
  const navigate = useNavigate();

  const navigateToManageUsers = () => navigate('/manage-users');
  const navigateToManageProducts = () => navigate('/manage-products');
  const navigateToManageOrders = () => navigate('/manage-orders'); // Updated path

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
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
      }}
    >
      <MDBRow>
        <MDBCol className="text-center">
          <h1 className="my-5 display-3 fw-bold ls-tight" style={{ color: 'black' }}>
            Admin Dashboard
          </h1>
          <MDBBtn
            className="mb-4"
            onClick={navigateToManageUsers}
            color="dark"
            style={{ margin: '0 10px', padding: '10px 20px' }}
          >
            Manage Users
          </MDBBtn>
          <MDBBtn
            className="mb-4"
            onClick={navigateToManageProducts}
            color="dark"
            style={{ margin: '0 10px', padding: '10px 20px' }}
          >
            Manage Products
          </MDBBtn>
          <MDBBtn
            className="mb-4"
            onClick={navigateToManageOrders}
            color="dark"
            style={{ margin: '0 10px', padding: '10px 20px' }}
          >
            Manage Orders
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Admin;
