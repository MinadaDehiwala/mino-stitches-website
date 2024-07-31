import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../configs/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar.jsx';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBSpinner
} from 'mdb-react-ui-kit';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      if (userData) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting...',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          localStorage.setItem('userType', userData.account_type);
          if (userData.account_type === 'admin') {
            navigate('/manage-users');
          } else {
            navigate('/');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid credentials'
        });
      }
    } catch (error) {
      console.error("Error logging in", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    } finally {
      setLoading(false);
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
      <Navbar />
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Welcome Back <br />
            <span className="text-primary">to Mino Stitches</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
            Log in to access your personalized embroidery services. We are excited to have you back!
          </p>
        </MDBCol>

        <MDBCol md='6' className='d-flex justify-content-center align-items-start' style={{ marginTop: '50px' }}>
          <MDBCard className='my-5' style={{ width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <MDBCardBody className='p-5'>
              <h2 className='text-center mb-4'>Login</h2>
              {loading ? (
                <div className="text-center">
                  <MDBSpinner grow color="primary">
                    <span className="visually-hidden">Logging you in...</span>
                  </MDBSpinner>
                  <p>Logging you in...</p>
                </div>
              ) : (
                <>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='form1' name='email' type='email' onChange={onChangeHandler} value={formData.email}/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form2' name='password' type='password' onChange={onChangeHandler} value={formData.password}/>

                  <div className="d-flex justify-content-between mx-3 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="#!">Forgot password?</a>
                  </div>

                  <MDBBtn className="mb-4 w-100" onClick={signInOnClickHandler}>Sign in</MDBBtn>

                  <div className="text-center">
                    <p>Not a member? <a href="/signup">Register</a></p>
                    <p>or sign in with:</p>

                    <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm"/>
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm"/>
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm"/>
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm"/>
                      </MDBBtn>

                    </div>
                  </div>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
