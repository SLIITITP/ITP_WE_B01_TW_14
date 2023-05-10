import React from "react";
import "../App.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : "Good evening";

  return (
    <>
      <Helmet>
        <title>Southern Agro</title>
      </Helmet>
      <div className='jumbotron'>
        <h1 className='display-4'>{greeting}!</h1>
        <h3>Welcome {user ? user.name : null}</h3>
        <hr className='my-4' />
        {/* <div>
          <Link className="btn btn-info mb-2" to={"/createemp"} role="button">
            Add Employee
          </Link>
        </div> */}
        {/* <div>
          <Link className="btn btn-primary" to={"/index"} role="button">
            Employee Management
          </Link>
        </div> */}
        <div className='row'>
          <div className='col-lg-4 col-md-6 mb-4'>
            <Link
              to={"/allsalesreps"}
              className='btn btn-success btn-lg btn-block button-link button-link1 '
            >
              <span>Delivery Management</span>
            </Link>
          </div>
          {/* <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link button-link9"
            >
              <span>Live Store</span>
            </Link>
          </div> */}
          {/* <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link button-link3"
            >
              <span>User Management</span>
            </Link>
          </div> */}
          <div className='col-lg-4 col-md-6 mb-4'>
            <Link
              to={"/allInv"}
              className='btn btn-success btn-lg btn-block  button-link button-link4'
            >
              <span>Invoice Entry system</span>
            </Link>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <Link
              to={"/index"}
              className='btn btn-success btn-lg btn-block  button-link button-link5'
            >
              <span>Employee Management</span>
            </Link>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <Link
              to={"/mystocks"}
              className='btn btn-success btn-lg btn-block  button-link button-link6'
            >
              <span>Inventory control management</span>
            </Link>
          </div>

          <div className='col-lg-4 col-md-6 mb-4'>
            <Link
              to={"/index"}
              className='btn btn-success btn-lg btn-block  button-link button-link7'
            >
              <span>Supplier Management</span>
            </Link>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <Link
              to={"/vmdashboard"}
              className='btn btn-success btn-lg btn-block  button-link button-link8'
            >
              <span>Vehicle Management</span>
            </Link>
          </div>
          <div className='col-lg-4 col-md-6 mb-4 mx-auto'>
            <Link
              to={"/cart"}
              className='btn btn-success btn-lg btn-block  button-link button-link2'
            >
              <span>Customer Order Management</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// className="col-lg-4 col-md-6 mb-4" is setting the class names for the div element. It is using Bootstrap's grid system classes to define the layout of the buttons.

// Here's what each class means:

// col-lg-4: This class sets the width of the column to 4 out of 12 columns for large screens (screens with a width greater than or equal to 992 pixels).
// col-md-6: This class sets the width of the column to 6 out of 12 columns for medium screens (screens with a width greater than or equal to 768 pixels and less than 992 pixels).
// mb-4: This class adds a margin bottom of 4 units to the div element.
