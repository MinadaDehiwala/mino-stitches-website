import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import './Signup.css';
import aboutImage from '../assets/about-2.png';

function Signup() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${aboutImage})` }}>
      <div className="overlay"></div>
      <MDBContainer fluid className='d-flex justify-content-center align-items-center'>
        <MDBRow className='d-flex justify-content-center align-items-center'>
          <MDBCol md='' className='signup-form-col'>
            <MDBCard className='glass-card'>
              <MDBCardBody>
                <div className='d-flex flex-column text-center ms-5 me-5'>
                  <h2 className="mt-1 mb-5 pb-1">Create an account</h2>
                  
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='First Name' id='firstName' type='text' size='lg' required />
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='Last Name' id='lastName' type='text' size='lg' required />
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='Phone Number' id='phone' type='text' size='lg' required />
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='Address (Optional)' id='address' type='text' size='lg' />
                  
                  <div className="mb-4">
                    <label className="custom-file-upload">
                      <input type="file" onChange={handleFileChange} />
                      {fileName ? fileName : 'Choose Profile Picture'}
                    </label>
                  </div>

                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='Your Email' id='email' type='email' size='lg' required />
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='Password' id='password' type='password' size='lg' required />
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' inputClass='text-white placeholder-white' label='Repeat your password' id='confirmPassword' type='password' size='lg' required />

                  <div className='d-flex flex-row justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree to all statements in Terms of service' required />
                  </div>

                  <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
                  
                  <p className="text-white">Already have an account? <a href="#!" className="signup-link">Sign In</a></p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Signup;