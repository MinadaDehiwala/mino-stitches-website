import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../configs/firebase"
import { db } from '../configs/firebase';
import { getDocs, collection, addDoc, query, where } from 'firebase/firestore'; // gives all the documents in the collection in the DB

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
} from 'mdb-react-ui-kit';

function App() {

  const usersCollection = collection(db, "users")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    });
  };

  const signIn = async () => {
    try {
      let result = null
      result = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      if (result !== null) {

        // if user sign up successfully his data will be stored in the firestore
        try {
          await addDoc(usersCollection, {
            first_name: formData.firstName,
            last_name: formData.lastName,
            account_type: "customer",
            uid: auth.currentUser.uid
          })


        } catch (e) {
          console.error("can't store user data in the database")
        }
      }


    } catch (FirebaseError) {
      console.log(FirebaseError)
    }
  }

  const singInOnlclickHandler = () => {
    signIn()
  }



  return (
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>

          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

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

              <MDBBtn className='w-100 mb-4' size='md' onClick={singInOnlclickHandler}>Sign up</MDBBtn>

              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm" />
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default App;
