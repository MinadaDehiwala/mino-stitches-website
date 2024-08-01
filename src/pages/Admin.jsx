import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';

const Admin = () => {
  const navigate = useNavigate();

  const navigateToManageUsers = () => navigate('/manage-users');
  const navigateToManageProducts = () => navigate('/manage-products');
  const navigateToManageOrders = () => navigate('/manage-orders'); // Future implementation

  return (
    <MDBContainer fluid className='p-4' style={{ minHeight: '100vh' }}>
      <MDBRow>
        <MDBCol className='text-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight">Admin Dashboard</h1>
          <MDBBtn className="mb-4" onClick={navigateToManageUsers}>Manage Users</MDBBtn>
          <MDBBtn className="mb-4" onClick={navigateToManageProducts}>Manage Products</MDBBtn>
          <MDBBtn className="mb-4" onClick={navigateToManageOrders}>Manage Orders</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Admin;
