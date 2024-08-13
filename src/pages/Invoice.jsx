import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBCardImage
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from 'react-router-dom';

// Importing the payment method images
import ezCashLogo from '../assets/ezcash.png';
import mCashLogo from '../assets/mcash.png';
import paypalLogo from '../assets/paypal.png';

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice, userDetails } = location.state || { cartItems: [], totalPrice: 0, userDetails: {} };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };

  return (
    <MDBContainer className="py-5">
      <MDBCard>
        <MDBCardBody className="mx-4">
          <MDBContainer>
            <p className="my-5 text-center" style={{ fontSize: "30px" }}>
              Thank you for your purchase
            </p>
            <MDBRow>
              <MDBTypography listUnStyled>
                <li className="text-black">{userDetails.firstName} {userDetails.lastName}</li>
                <li className="text-muted mt-1">
                  <span className="text-black">Invoice</span> #{Math.floor(Math.random() * 100000)}
                </li>
                <li className="text-black mt-1">{getCurrentDate()}</li>
              </MDBTypography>
              <hr />
              {cartItems.map((item, index) => (
                <MDBRow key={index}>
                  <MDBCol xl="10">
                    <p>{item.name}</p>
                  </MDBCol>
                  <MDBCol xl="2">
                    <p className="float-end">LKR {item.price.toFixed(2)}</p>
                  </MDBCol>
                  <hr />
                </MDBRow>
              ))}
              <hr style={{ border: "2px solid black" }} />
              <MDBRow className="text-black">
                <MDBCol xl="12">
                  <p className="float-end fw-bold">Total: LKR {(totalPrice + 500).toFixed(2)}</p>
                </MDBCol>
                <hr style={{ border: "2px solid black" }} />
              </MDBRow>
            </MDBRow>

            {/* Payment Methods */}
            <MDBRow className="text-center mt-4">
              <MDBCol xl="12">
                <h5>Payment Methods</h5>
              </MDBCol>
              <MDBCol>
                <MDBCardImage src={ezCashLogo} alt="eZ Cash" style={{ width: '50px' }} />
                <p className="mt-2">+94 772748309</p>
              </MDBCol>
              <MDBCol>
                <MDBCardImage src={mCashLogo} alt="mCash" style={{ width: '50px' }} />
                <p className="mt-2">+94 716518534</p>
              </MDBCol>
              <MDBCol>
                <MDBCardImage src={paypalLogo} alt="PayPal" style={{ width: '50px' }} />
                <p className="mt-2">minostitches@gmail.com</p>
              </MDBCol>
            </MDBRow>

            {/* Notice */}
            <div className="text-center" style={{ marginTop: "90px" }}>
              <p style={{ color: "red", fontSize: "24px" }}>Please wait till we review your order</p>
              <p style={{ color: "red", fontSize: "18px" }}>Do not pay until we accept your order</p>
            </div>

            {/* Back to Home Button */}
            <div className="text-center mt-4">
              <MDBBtn color="primary" onClick={() => navigate('/')}>
                Back to Home
              </MDBBtn>
            </div>

          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Invoice;
