import React from "react";

import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import CurrencyInput from "react-currency-input-field";

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

    if (name === "salary" || name === "bonus") {
      // Replace any non-numeric characters with an empty string
      const formattedValue = value.replace(/[^0-9]/g, "");

      setUserDetails({ ...userDetails, [name]: formattedValue });
    } else {
      // For other fields, update the state directly
      setUserDetails({ ...userDetails, [name]: value });
    }
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   // Replace any non-numeric characters with an empty string
  //   const formattedValue = value.replace(/[^0-9]/g, "");

  //   setUserDetails({ ...userDetails, [name]: formattedValue });
  //   // setUserDetails({ ...userDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  // };

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
      <h2 className="text-center bg-darkgreen text-white p-3">
        Employee Salary
      </h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} className="form-style">
            {/* empid */}
            <div className="form-group">
              <label htmlFor="empidInput" className="form-label">
                Enter Employee ID
              </label>
              <input
                type="text"
                className="form-control rounded"
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
              <label htmlFor="salaryInput" className="form-label">
                Basic Salary
              </label>
              <input
                type="text"
                className="form-control rounded"
                id="salaryInput"
                name="salary"
                value={`LKR ${userDetails.salary.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}`}
                onChange={handleInputChange}
                placeholder="LKR 100,000"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* DATE */}
            <div className="form-group">
              <label htmlFor="dateInput" className="form-label">
                Select Date
              </label>
              <input
                type="date"
                className="form-control rounded"
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
              <label htmlFor="bonusInput" className="form-label">
                Bonus
              </label>
              <input
                type="text"
                className="form-control rounded"
                id="bonusInput"
                name="bonus"
                value={`LKR ${userDetails.bonus.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}`}
                onChange={handleInputChange}
                placeholder="LKR 100,000"
                required
                fdprocessedid="8n2of"
              />
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="Submit"
                className="btn btn-success my-2"
              />
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-danger my-2 ml-2"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateSalary;
