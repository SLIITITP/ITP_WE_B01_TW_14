import React from "react";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateSalesRep = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    empid: "",
    Territory: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the default behaviour of the form; which is to refresh the page

    const res = await fetch(`http://localhost:8000/api/delivery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(
        `Employee [${userDetails.empid}] Added Successfully as a Sales Representative`
      );

      setUserDetails({
        empid: "",
        Territory: "",
      });
      navigate("/allsalesreps");
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setUserDetails({
      empid: "",
      Territory: "",
    });
  };

  return (
    <>
      <h2>Add Sales Representative</h2>
      <form onSubmit={handleSubmit}>
        {/* FIRST NAME */}
        <div className="form-group">
          <label htmlFor="empIDInput" className="form-label mt-4">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empIDInput"
            name="empid"
            value={userDetails.empid}
            onChange={handleInputChange}
            placeholder="E001"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* LAST NAME */}
        <div className="form-group">
          <label htmlFor="territoryInput" className="form-label mt-4">
            Territory
          </label>
          <input
            type="text"
            className="form-control"
            id="territoryInput"
            name="Territory"
            value={userDetails.Territory}
            onChange={handleInputChange}
            placeholder="Galle"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <input
          type="submit"
          value="Add Sales Representative"
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

export default CreateSalesRep;
