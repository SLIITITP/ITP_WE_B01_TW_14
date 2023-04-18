import React from "react";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateSalary = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    empid: "",
    salary: "",
    date: "",
    bonus: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the default behaviour of the form; which is to refresh the page

    const res = await fetch(`http://localhost:8000/api/salary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Salary [${userDetails.empid}] Transfer Complete`);

      setUserDetails({
        empid: "",
        salary: "",
        date: "",
        bonus: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setUserDetails({
      empid: "",
      salary: "",
      date: "",
      bonus: "",
    });
  };

  return (
    <>
      <h2>Employee Salary Details</h2>
      <form onSubmit={handleSubmit}>
        {/* empid */}
        <div className="form-group">
          <label htmlFor="empidInput" className="form-label mt-4">
            Enter Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empidInput"
            name="empid"
            value={userDetails.empid}
            onChange={handleInputChange}
            placeholder="EM001"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* SALARY */}
        <div className="form-group">
          <label htmlFor="salaryInput" className="form-label mt-4">
            Basic Salary
          </label>
          <input
            type="number"
            className="form-control"
            id="salaryInput"
            name="salary"
            value={userDetails.salary}
            onChange={handleInputChange}
            placeholder="LKR 100,000"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* DATE */}
        <div className="form-group">
          <label htmlFor="dateInput" className="form-label mt-4">
            Select Date
          </label>
          <input
            type="date"
            className="form-control"
            id="dateInput"
            name="date"
            value={userDetails.date}
            onChange={handleInputChange}
            placeholder="01-01-2021"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* Bonus */}
        <div className="form-group">
          <label htmlFor="bonusInput" className="form-label mt-4">
            Bonus
          </label>
          <input
            type="number"
            className="form-control"
            id="bonusInput"
            name="bonus"
            value={userDetails.bonus}
            onChange={handleInputChange}
            placeholder="LKR 100,000"
            required
            fdprocessedid="8n2of"
          />
        </div>
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

export default CreateSalary;
