import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import background from '../assets/login_signup_background.png'; // Adjust the path as needed

const Admin = () => {
  const navigate = useNavigate();

  const navigateToManageUsers = () => navigate('/manage-users');
  const navigateToManageProducts = () => navigate('/manage-products');
  const navigateToManageOrders = () => navigate('/orders');
  const navigateToManageMessages = () => navigate('/admin-messages');
  const navigateToManageCustomOrders = () => navigate('/admin-custom-orders');
  const navigateToLogin = () => navigate('/login');

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
        flexDirection: 'column', // Arrange content in a column
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
          <MDBBtn
            className="mb-4"
            onClick={navigateToManageMessages}
            color="dark"
            style={{ margin: '0 10px', padding: '10px 20px' }}
          >
            Manage Messages
          </MDBBtn>
          <MDBBtn
            className="mb-4"
            onClick={navigateToManageCustomOrders}
            color="dark"
            style={{ margin: '0 10px', padding: '10px 20px' }}
          >
            Manage Custom Orders
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-auto" style={{ marginTop: 'auto', width: '100%' }}> {/* Row for the Back to Login button */}
        <MDBCol className="text-center">
          <MDBBtn
            className="mb-4"
            onClick={navigateToLogin}
            color="secondary"
            style={{ margin: '0 10px', padding: '10px 20px' }}
          >
            Back to Login
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Admin;
