import React from "react";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateSchedule = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    orderID: "",
    date: "",
    destination: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the default behaviour of the form; which is to refresh the page

    const res = await fetch(`http://localhost:8000/api/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Order [${userDetails.orderID}] scheduled Successfully`);

      setUserDetails({
        orderID: "",
        date: "",
        destination: "",
      });
      navigate("/myschedules");
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setUserDetails({
      orderID: "",
      date: "",
      destination: "",
    });
  };

  return (
    <>
      <h2>Add Schedule</h2>
      <form onSubmit={handleSubmit}>
        {/* Order ID */}
        <div className="form-group">
          <label htmlFor="orderIDInput" className="form-label mt-4">
            Order ID
          </label>
          <input
            type="text"
            className="form-control"
            id="orderIDInput"
            name="orderID"
            value={userDetails.orderID}
            onChange={handleInputChange}
            placeholder="O01"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* Date  */}
        <div className="form-group">
          <label htmlFor="dateInput" className="form-label mt-4">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="dateInput"
            name="date"
            value={userDetails.date}
            onChange={handleInputChange}
            placeholder="5/01/2022"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* DESTINATION */}
        <div className="form-group">
          <label htmlFor="destinationInput" className="form-label mt-4">
            Destination
          </label>
          <input
            type="text"
            className="form-control"
            id="destinationInput"
            name="destination"
            value={userDetails.destination}
            onChange={handleInputChange}
            placeholder="Galle"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <input
          type="submit"
          value="Add Delivery Schedule"
          className="btn btn-info my-2"
        />
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

export default CreateSchedule;
