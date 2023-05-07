import React from "react";

import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import { Helmet } from "react-helmet-async";

const CreateAttendance = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  //new
  const [selectedField, setSelectedField] = useState("entry");

  const [userDetails, setUserDetails] = useState({
    empid: "",
    date: "",
    entrytime: "",
    offtime: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value }); //spread the existing values and add the new value/overwrite the existing value
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the default behaviour of the form; which is to refresh the page

    const res = await fetch(`http://localhost:8000/api/attendance`, {
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
        `Attendace of [${userDetails.empid}] Recorded Successfully`
      );
      if (userDetails.entrytime) {
        toast.info(`Entry Time [${userDetails.entrytime}]`);
      }

      if (userDetails.offtime) {
        toast.info(`Off Time [${userDetails.offtime}]`);
      }
      // toast.success(`Entry Time [${userDetails.entrytime}]`);
      // toast.success(`Off Time [${userDetails.offtime}]`);

      setUserDetails({
        empid: "",
        date: "",
        entrytime: "",
        offtime: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setUserDetails({
      empid: "",
      date: "",
      entrytime: "",
      offtime: "",
    });
  };

  //new
  const handleRadioChange = (e) => {
    setSelectedField(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Attendance</title>
      </Helmet>
      <h2 className="text-center bg-darkgreen text-white p-2">Attendance</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit}>
            {/* empid */}
            <div className="form-group">
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12"> */}
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
                maxLength="5" // add maxLength attribute to limit input to 10 characters
                fdprocessedid="8n2of"
              />
              {/* </div> */}
            </div>
            {/* DATE */}
            <div className="form-group">
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12"> */}
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
              {/* </div> */}
            </div>

            {/* new code */}
            {/* Radio buttons */}
            <div className="form-group">
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12"> */}
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="entryRadio"
                  name="selectedField"
                  value="entry"
                  className="form-check-input"
                  checked={selectedField === "entry"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="entryRadio" className="form-check-label">
                  Entry Time
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  id="offRadio"
                  name="selectedField"
                  value="off"
                  className="form-check-input"
                  checked={selectedField === "off"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="offRadio" className="form-check-label">
                  Off Time
                </label>
              </div>
              {/* </div> */}
            </div>

            {/* Field inputs */}
            {selectedField === "entry" && (
              <div className="form-group">
                {/* <div class="mb-3 col-lg-6 col-md-6 col-12"> */}
                <label htmlFor="entryInput" className="form-label mt-4">
                  Entry Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="entryInput"
                  name="entrytime"
                  value={userDetails.entrytime}
                  onChange={handleInputChange}
                  required
                  fdprocessedid="8n2of"
                />
                {/* </div> */}
              </div>
            )}

            {selectedField === "off" && (
              <div className="form-group">
                {/* <div class="mb-3 col-lg-6 col-md-6 col-12"> */}
                <label htmlFor="offInput" className="form-label mt-4">
                  Off Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="offInput"
                  name="offtime"
                  value={userDetails.offtime}
                  onChange={handleInputChange}
                  required
                  fdprocessedid="8n2of"
                />
                {/* </div> */}
              </div>
            )}

            {/* ENTRY TIME */}
            {/* <div className="form-group">
          <label htmlFor="entryInput" className="form-label mt-4">
            Entry Time
          </label>
          <input
            type="time"
            className="form-control"
            id="entryInput"
            name="entrytime"
            value={userDetails.entrytime}
            onChange={handleInputChange}
            // placeholder="LKR 100,000"
            // required
            fdprocessedid="8n2of"
          />
        </div> */}
            {/* OFF TIME */}
            {/* <div className="form-group">
          <label htmlFor="offInput" className="form-label mt-4">
            Off Time
          </label>
          <input
            type="time"
            className="form-control"
            id="offInput"
            name="offtime"
            value={userDetails.offtime}
            onChange={handleInputChange}
            // placeholder="LKR 100,000"
            // required
            fdprocessedid="8n2of"
          />
        </div> */}
            <div className="text-center">
              <input
                type="submit"
                value="Submit"
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAttendance;
