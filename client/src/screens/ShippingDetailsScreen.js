import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function ShippingDetailsScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingDetails },
  } = state;

  const [companyName, setCompanyName] = useState(
    shippingDetails.companyName || ''
  );
  const [customerName, setCustomerName] = useState(
    shippingDetails.customerName || ''
  );
  const [shippingAddress, setShippingAddress] = useState(
    shippingDetails.shippingAddress || ''
  );
  const [city, setCity] = useState(shippingDetails.city || '');
  const [contactNo, setContactNo] = useState(shippingDetails.contactNo || '');
  const [creditDays, setCreditDays] = useState(
    shippingDetails.creditDays || ''
  );

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE_SHIPPING_DETAILS',
      payload: {
        companyName,
        customerName,
        shippingAddress,
        city,
        contactNo,
        creditDays,
      },
    });
    localStorage.setItem(
      'shippingDetails',
      JSON.stringify({
        companyName,
        customerName,
        shippingAddress,
        city,
        contactNo,
        creditDays,
      })
    );
    navigate('/placeorder');
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Details</title>
      </Helmet>
      <div className="container small-container">
        <h1 className="my-3">Shipping Details</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="customerName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="shippingAddress">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contactNo">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              maxLength={10}
              minLength={10}
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="creditDays">
            <Form.Label>Credit Days </Form.Label>
            <br />
            <select
              value={creditDays}
              onChange={(e) => setCreditDays(e.target.value)}
              required
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
              <option value="90">90</option>
            </select>
          </Form.Group>
          <div className="mb-3 text-center">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
