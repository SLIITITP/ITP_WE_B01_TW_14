import React from "react";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const AddProfit = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [profitDetails, setProfitDetails] = useState({
    stockid: "",
    costprice: "",
    sellingprice: "",
    quantitysold: "",
    // timeperiod: "",
    startdate:"",
    enddate:""
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfitDetails({ ...profitDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the default behaviour of the form; which is to refresh the page

    const res = await fetch(`http://localhost:8000/api/profit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(profitDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Profit [${profitDetails.stockid}] Transfer Complete`);

      setProfitDetails({
        stockid: "",
        costprice: "",
        sellingprice: "",
        quantitysold: "",
        // timeperiod: "",
        startdate:"",
        enddate:""
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setProfitDetails({
      stockid: "",
      costprice: "",
      sellingprice: "",
      quantitysold: "",
      // timeperiod: "",
      startdate:"",
        enddate:""
    });
  };

  return (
    <>
      <h2>Stock Profit Details</h2>
      <form onSubmit={handleSubmit}>
        {/* empid */}
        <div className="form-group">
          <label htmlFor="stockidInput" className="form-label mt-4">
            Enter Stock ID
          </label>
          <input
            type="text"
            className="form-control"
            id="stockidInput"
            name="stockid"
            value={profitDetails.stockid}
            onChange={handleInputChange}
            placeholder="SP001"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* SALARY */}
        <div className="form-group">
          <label htmlFor="costPriceInput" className="form-label mt-4">
            Cost Price
          </label>
          <input
            type="number"
            className="form-control"
            id="costPriceInput"
            name="costprice"
            value={profitDetails.costprice}
            onChange={handleInputChange}
            placeholder="1000"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* DATE */}
        <div className="form-group">
          <label htmlFor="sellingPriceInput" className="form-label mt-4">
            Selling Price
          </label>
          <input
            type="number"
            className="form-control"
            id="sellingPriceInput"
            name="sellingprice"
            value={profitDetails.sellingprice}
            onChange={handleInputChange}
            placeholder="2000"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* Bonus */}
        <div className="form-group">
          <label htmlFor="quantitySoldInput" className="form-label mt-4">
            Quantity Sold
          </label>
          <input
            type="number"
            className="form-control"
            id="quantitySoldInput"
            name="quantitysold"
            value={profitDetails.quantitysold}
            onChange={handleInputChange}
            placeholder="10"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDateInput" className="form-label mt-4">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDateInput"
            name="startdate"
            value={profitDetails.startdate}
            onChange={handleInputChange}
            placeholder="01/02/2023"
            max={new Date().toISOString().split("T")[0]}
            min={new Date().toISOString().split("T")[0]}
            required
            fdprocessedid="8n2of"
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDateInput" className="form-label mt-4">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDateInput"
            name="enddate"
            value={profitDetails.enddate}
            onChange={handleInputChange}
            placeholder="30/02/2023"
            max={new Date().toISOString().split("T")[0]}
            min={new Date().toISOString().split("T")[0]}
            required
            fdprocessedid="8n2of"
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="timePeriodInput" className="form-label mt-4">
            Time Period
          </label>
          <input
            type="text"
            className="form-control"
            id="timePeriodInput"
            name="timeperiod"
            value={profitDetails.timeperiod}
            onChange={handleInputChange}
            placeholder="02/02/2023 - 12/02/2023"
            required
            fdprocessedid="8n2of"
          />
        </div> */}
        <input type="submit" value="Submit" className="btn btn-info my-2" />
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-danger my-2 ml-2"
          // The ml-2 class adds a left margin of 2 units, which creates a space between the two buttons.
        >
          Clear
        </button>
      </form>
    </>
  );
};

export default AddProfit;
