import React from "react";
import Navbar from '../components/Navbar';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBRadio,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextManager';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
  const { authUser } = useContext(AuthContext);

  const handlePay = async () => {
    // Simulate a successful payment process here
    // Send order details to Firestore
    const db = getFirestore();
    const orderData = {
      userId: authUser.uid,
      items: cartItems,
      totalPrice: totalPrice + 500,
      date: new Date(),
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);
      // Navigate to the invoice page after payment
      navigate('/invoice', { state: { cartItems, totalPrice, userDetails: authUser } });
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <MDBContainer className="py-5 mt-5">
        <MDBRow>
          <MDBCol md="8" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <h5 className="mb-0">Billing details</h5>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput label="First name" id="form1" type="text" />
                  </MDBCol>

                  <MDBCol>
                    <MDBInput label="Last name" id="form2" type="text" />
                  </MDBCol>
                </MDBRow>

                <MDBInput wrapperClass="mb-4" label="Address" id="form3" type="text" />
                <MDBInput wrapperClass="mb-4" label="Email" id="form4" type="email" />
                <MDBInput wrapperClass="mb-4" label="Phone" id="form5" type="number" />

                <hr className="my-4" />

                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="checkoutForm1"
                  label="Shipping address is the same as my billing address"
                />
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="checkoutForm2"
                  label="Save this information for next time"
                  defaultChecked
                />

                <hr className="my-4" />

                <h5 className="mb-4">Payment</h5>

                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  label="Credit card"
                  defaultChecked
                />

                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  label="Debit card"
                />

                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  label="Paypal"
                  wrapperClass="mb-4"
                />

                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      label="Name on card"
                      id="form6"
                      type="text"
                      wrapperClass="mb-4"
                    />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      label="Card number"
                      id="form7"
                      type="text"
                      wrapperClass="mb-4"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="3">
                    <MDBInput
                      label="Expiration"
                      id="form8"
                      type="text"
                      wrapperClass="mb-4"
                    />
                  </MDBCol>
                  <MDBCol md="3">
                    <MDBInput
                      label="CVV"
                      id="form9"
                      type="text"
                      wrapperClass="mb-4"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBBtn size="lg" block onClick={handlePay}>
                  Pay
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="4" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <h5 className="mb-0">Summary</h5>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>LKR {totalPrice.toFixed(2)}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>LKR 500.00</span>
                  </MDBListGroupItem>
                  <hr className="my-2"></hr>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>LKR {(totalPrice + 500).toFixed(2)}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Checkout;
