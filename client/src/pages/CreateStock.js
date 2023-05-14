import React from "react";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateStock = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [stockDetails, setStockDetails] = useState({
    name: "",
    //image: "",
    category: "",
    description: "",
    costprice: "",
    sellingprice: "",
    quantity: "",
    supplier: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStockDetails({ ...stockDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the default behaviour of the form; which is to refresh the page

    const res = await fetch(`http://localhost:8000/api/stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(stockDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Stock [${stockDetails.name}] Added Successfully`);

      setStockDetails({
        name: "",
        //image: "",
        category: "",
        description: "",
        costprice: "",
        sellingprice: "",
        quantity: "",
        supplier: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setStockDetails({
      name: "",
      //image: "",
      category: "",
      description: "",
      costprice: "",
      sellingprice: "",
      quantity: "",
      supplier: "",
    });
  };

  return (
    <>
    
      <h2 className="text-center bg-darkgreen text-white p-2">Add Stock</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">


      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Stock Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={stockDetails.name}
            onChange={handleInputChange}
            placeholder="Knapsack Sprayer"
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
        {/* EMAIL */}
        <div className="form-group">
          <label htmlFor="categoryInput" className="form-label mt-4">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryInput"
            name="category"
            value={stockDetails.category}
            onChange={handleInputChange}
            placeholder="Sprayers"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* PHONE */}
        <div className="form-group">
          <label htmlFor="descriptionInput" className="form-label mt-4">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="descriptionInput"
            name="description"
            value={stockDetails.description}
            onChange={handleInputChange}
            placeholder="4L sprayer"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* Date Joined */}
        <div className="form-group">
          <label htmlFor="costPriceInput" className="form-label mt-4">
            Cost Price
          </label>
          <input
            type="number"
            className="form-control"
            id="costPriceInput"
            name="costprice"
            value={stockDetails.costprice}
            onChange={handleInputChange}
            placeholder="1000"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sellingPriceInput" className="form-label mt-4">
            Selling Price
          </label>
          <input
            type="number"
            className="form-control"
            id="sellingPriceInput"
            name="sellingprice"
            value={stockDetails.sellingprice}
            onChange={handleInputChange}
            placeholder=" 2000"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantityInput" className="form-label mt-4">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantityInput"
            name="quantity"
            value={stockDetails.quantity}
            onChange={handleInputChange}
            placeholder="10"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplierInput" className="form-label mt-4">
            Supplier
          </label>
          <input
            type="text"
            className="form-control"
            id="supplierInput"
            name="supplier"
            value={stockDetails.supplier}
            onChange={handleInputChange}
            placeholder="Supplier Name"
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

export default CreateStock;
