import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useLocation } from 'react-router-dom';

const Invoice = () => {
  const location = useLocation();
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
            <div className="text-center" style={{ marginTop: "90px" }}>
              <a>
                <u className="text-info">View in browser</u>
              </a>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Invoice;
