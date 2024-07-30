import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../configs/firebase";
import { collection, addDoc } from 'firebase/firestore'; 
import Swal from 'sweetalert2';

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

function Signup() {
  const usersCollection = collection(db, "users");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const signIn = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      if (result !== null) {
        await addDoc(usersCollection, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          account_type: "customer",
          uid: auth.currentUser.uid
        });
        Swal.fire({
          icon: 'success',
          title: 'Sign Up Successful',
          text: 'You have successfully signed up!',
        });
      }
    } catch (error) {
      console.error("Error signing up or storing user data", error);
      Swal.fire({
        icon: 'error',
        title: 'Sign Up Failed',
        text: error.message,
      });
    }
  };

  const signInOnClickHandler = () => {
    signIn();
  };

  return (
    <MDBContainer fluid className='p-4' style={{ 
      backgroundImage: 'url(/src/assets/login_signup_background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Custom Embroidery Services <br />
            <span className="text-primary">by Mino Stitches</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
            Personalized embroidery made easy. Custom designs and quick turnarounds to bring your visions to life.
          </p>
        </MDBCol>

        <MDBCol md='6' className='d-flex justify-content-center align-items-start' style={{ marginTop: '50px' }}>
          <MDBCard className='my-5' style={{ width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <MDBCardBody className='p-5'>
              <h2 className='text-center mb-4'>Sign Up</h2>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput
                    wrapperClass='mb-4'
                    onChange={onChangeHandler}
                    value={formData.firstName}
                    label='First name'
                    id='form1'
                    name='firstName'
                    type='text'
                  />
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput
                    wrapperClass='mb-4'
                    onChange={onChangeHandler}
                    value={formData.lastName}
                    label='Last name'
                    id='form1'
                    name='lastName'
                    type='text'
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass='mb-4'
                onChange={onChangeHandler}
                value={formData.email}
                label='Email'
                id='form1'
                name='email'
                type='email'
              />
              <MDBInput
                wrapperClass='mb-4'
                onChange={onChangeHandler}
                value={formData.password}
                label='Password'
                id='form1'
                name='password'
                type='password'
              />
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>
              <MDBBtn className='w-100 mb-4' size='md' onClick={signInOnClickHandler}>Sign up</MDBBtn>
              <div className="text-center">
                <p>Already a member? <a href="/login">Login</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
