import React from "react";
import "../App.css";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">Welcome {user ? user.name : null}</h1>
        <hr className="my-4" />
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
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block button-link"
            >
              Delivery Management
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link"
            >
              Customer and Customer Order Management
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link"
            >
              User Management
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link"
            >
              Payment management system
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link"
            >
              Employee Management
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link"
            >
              Inventory control management
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link"
            >
              Supplier Management
            </Link>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <Link
              to={"/index"}
              className="btn btn-success btn-lg btn-block  button-link"
            >
              Vehicle Management
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
