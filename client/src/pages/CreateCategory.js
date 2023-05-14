import React from "react";
import { Helmet } from "react-helmet-async";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateCategory = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    //image: "",
    quantityavailable: "",
    quantitysold: "",
    ordersinqueue: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryDetails({ ...categoryDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the default behaviour of the form; which is to refresh the page

    const res = await fetch(`http://localhost:8000/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(categoryDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Stock [${categoryDetails.name}] Added Successfully`);

      setCategoryDetails({
        name: "",
        //image: "",
        quantityavailable: "",
        quantitysold: "",
        ordersinqueue: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setCategoryDetails({
      name: "",
      //image: "",
      quantityavailable: "",
      quantitysold: "",
      ordersinqueue: "",
    });
  };

  return (
    <>

      <Helmet>
        <title>Add Category</title>
      </Helmet>
      <h2 className="text-center bg-darkgreen text-white p-2">Add Category</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
      <form onSubmit={handleSubmit}>
        {/* FIRST NAME */}
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={categoryDetails.name}
            onChange={handleInputChange}
            placeholder="Sprayers"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* LAST NAME */}
        {/* <div className="form-group">
          <label htmlFor="lnameInput" className="form-label mt-4">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lnameInput"
            name="lastname"
            value={userDetails.lastname}
            onChange={handleInputChange}
            placeholder="Kodithuwakku"
            required
            fdprocessedid="8n2of"
          />
        </div> */}

        <div className="form-group">
          <label htmlFor="quantityAvailableInput" className="form-label mt-4">
            Quantity Available
          </label>
          <input
            type="number"
            className="form-control"
            id="quantityAvailableInput"
            name="quantityavailable"
            value={categoryDetails.quantityavailable}
            onChange={handleInputChange}
            placeholder="10"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* PHONE */}
        <div className="form-group">
          <label htmlFor="quantitySoldInput" className="form-label mt-4">
            Quantity Sold
          </label>
          <input
            type="number"
            className="form-control"
            id="quantitySoldInput"
            name="quantitysold"
            value={categoryDetails.quantitysold}
            onChange={handleInputChange}
            placeholder="10"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* Date Joined */}
        <div className="form-group">
          <label htmlFor="ordersInQueueInput" className="form-label mt-4">
            Orders In Queue
          </label>
          <input
            type="number"
            className="form-control"
            id="ordersInQueueInput"
            name="ordersinqueue"
            value={categoryDetails.ordersinqueue}
            onChange={handleInputChange}
            placeholder="1"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <input type="submit" value="Add Stock" className="btn btn-info my-2" />
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-danger my-2 ml-2"
          // The ml-2 class adds a left margin of 2 units, which creates a space between the two buttons.
        >
          Clear
        </button>
      </form>
      </div>
      </div>
    </>
  );
};

export default CreateCategory;
