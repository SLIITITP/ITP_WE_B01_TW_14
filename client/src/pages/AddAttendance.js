import React from "react";

import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateAttendance = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    eid: "",
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
      toast.success(`Attendace of [${userDetails.eid}] Recorded Successfully`);
      toast.success(`Entry Time [${userDetails.entrytime}]`);
      toast.success(`Off Time [${userDetails.offtime}]`);

      setUserDetails({
        eid: "",
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
      eid: "",
      date: "",
      entrytime: "",
      offtime: "",
    });
  };

  return (
    <>
      <h2>Attendance</h2>
      <form onSubmit={handleSubmit}>
        {/* EID */}
        <div className="form-group">
          <label htmlFor="eidInput" className="form-label mt-4">
            Enter Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="eidInput"
            name="eid"
            value={userDetails.eid}
            onChange={handleInputChange}
            placeholder="EM001"
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
        {/* ENTRY TIME */}
        <div className="form-group">
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
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* OFF TIME */}
        <div className="form-group">
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

export default CreateAttendance;
