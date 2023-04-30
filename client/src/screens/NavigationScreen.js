import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaStore, FaCreditCard } from 'react-icons/fa';

function NavigationScreen() {
  return (
    <div className="cus-nav-center">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <a className="cus-nav-a" href="/products">
        <FaStore className="cus-nav-icon" variant="success" />
        <div className="cus-nav-div">Online Store</div>
      </a>
      <a className="cus-nav-a" href="paymentgateway">
        <FaCreditCard className="cus-nav-icon" />
        <div className="cus-nav-div">Online Payment Gateway</div>
      </a>
    </div>
  );
}

export default NavigationScreen;
