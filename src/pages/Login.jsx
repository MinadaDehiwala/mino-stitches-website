import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import './Login.css'; // Make sure to import the CSS file for additional styling

function Login() {
  return (
    <MDBContainer className="my-5 gradient-form login-container">

      <MDBRow className="d-flex justify-content-center align-items-center">

        <MDBCol md='8' className="login-form-col">

          <div className="d-flex flex-column text-center ms-5 me-5">

            <h2 className="mt-1 mb-5 pb-1">Welcome Back</h2>

            <p className="lead">Please login to your account</p>

            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' size='xl'/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' size='xl'/>

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" size='xl'>Sign in</MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className='mx-2' color='danger' size='xl'>
                Sign Up
              </MDBBtn>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
