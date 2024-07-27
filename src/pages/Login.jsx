import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../assets/home-1.png';

function Login() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
      <MDBContainer className="d-flex justify-content-center align-items-center">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol md='8' className="login-form-col">
            <MDBCard className="glass-card">
              <MDBCardBody>
                <div className="d-flex flex-column text-center ms-5 me-5">
                  <h2 className="mt-1 mb-5 pb-1 text-white">Welcome Back</h2>
                  <p className="lead text-white">Please login to your account</p>
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='Email address' id='form1' type='email' size='lg' />
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='Password' id='form2' type='password' size='lg' />
                  <div className="text-center pt-1 mb-5 pb-1">
                    <MDBBtn className="mb-4 w-100 gradient-custom-2" size='lg'>Sign in</MDBBtn>
                    <a className="text-white" href="#!">Forgot password?</a>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                    <p className="mb-0 text-white">Don't have an account?</p>
                    <MDBBtn outline className='mx-2' color='danger' size='lg' onClick={handleSignUp}>
                      Sign Up
                    </MDBBtn>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
