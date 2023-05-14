import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMoneyBillAlt,
} from "@fortawesome/free-solid-svg-icons";

function Report() {
  const [loading, setLoading] = useState(false);

  const [showSalaryContent, setShowSalaryContent] = useState(false);
  const [showAttendanceContent, setShowAttendanceContent] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/report", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Southern Agro Serve (Pvt) Ltd.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  //salary and attendance data related code
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({}); //by default it is an empty object
  const [salaries, setSalaries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    setLoading(true);
    // inspect showed an error when async function was not wrapped in another function. That means when used like this: useEffect(async () => { ... }, []);
    //Therefore I wrapped it in another function and called it inside useEffect.
    //async/await syntax directly inside the useEffect callback function, which is not allowed. Instead, you can define an asynchronous function inside the useEffect and then call it.
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/mysalaries`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setSalaries(result.salary);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  //e is the event object, which is passed by default to the event handler function
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = salaries.filter((salary) =>
      salary.empid.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setSalaries(newSearchUser);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setSalaries([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    // inspect showed an error when async function was not wrapped in another function. That means when used like this: useEffect(async () => { ... }, []);
    //Therefore I wrapped it in another function and called it inside useEffect.
    //async/await syntax directly inside the useEffect callback function, which is not allowed. Instead, you can define an asynchronous function inside the useEffect and then call it.
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/myattendances`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setAttendances(result.attendance);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  //e is the event object, which is passed by default to the event handler function
  const handleSearchSubmitat = (event) => {
    event.preventDefault();

    const newSearchUser = attendances.filter((attendance) =>
      attendance.empid.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setAttendances(newSearchUser);
  };

  const handleInputChangeat = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setAttendances([]);
    }
  };

  // Define toggle functions
  const toggleSalaryContent = () => {
    setShowSalaryContent(!showSalaryContent);
  };

  const toggleAttendanceContent = () => {
    setShowAttendanceContent(!showAttendanceContent);
  };

  return (
    <div>
      <Helmet>
        <title>Report</title>
      </Helmet>
      <h1 className="text-center bg-darkgreen text-white p-2">
        Employee Detail Report
      </h1>
      <br />

      <div>
        <strong>
          <h4 onClick={toggleSalaryContent}>
            <FontAwesomeIcon
              icon={faMoneyBillAlt}
              style={{ marginRight: "10px", color: "black" }}
            />
            Salaries {showSalaryContent ? <FaAngleDown /> : <FaAngleRight />}
          </h4>
        </strong>
        {/* <hr className="my-4" /> */}
        {showSalaryContent && (
          <>
            {loading ? (
              <Spinner splash="Loading Salary Records..." />
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Salary Record"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                  />
                  <button type="submit" className="btn btn-info mx-2 my-2">
                    Search
                  </button>
                  <a href="/createreport">
                    <button type="button" className="btn btn-danger mx-2 my-2">
                      Reset
                    </button>
                  </a>
                </form>

                {salaries ? (
                  salaries.length === 0 ? (
                    <h3>No Salary Records Found</h3>
                  ) : (
                    <>
                      <p>
                        Your Total Salary Records:{" "}
                        <strong>{salaries.length}</strong>{" "}
                      </p>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{ width: "10%", whiteSpace: "nowrap" }}
                            >
                              Employee ID
                            </th>
                            <th
                              scope="col"
                              style={{ width: "15%", whiteSpace: "nowrap" }}
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              style={{ width: "15%", whiteSpace: "nowrap" }}
                            >
                              Salary
                            </th>
                            <th
                              scope="col"
                              style={{ width: "15%", whiteSpace: "nowrap" }}
                            >
                              Bonus
                            </th>
                            <th
                              scope="col"
                              style={{ width: "10%", whiteSpace: "nowrap" }}
                            >
                              Total Salary
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {salaries.map((salary) => (
                            <tr
                              key={salary._id}
                              onClick={() => {
                                setModalData({}); //we need to clear the modal data before setting it again
                                setModalData(salary);
                                setShowModal(true);
                              }}
                            >
                              <th scope="row">{salary.empid}</th>
                              <td>{salary.date}</td>
                              <td>{salary.salary}</td>
                              <td>{salary.bonus}</td>
                              <td>{salary.totalSalary}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )
                ) : (
                  <h3>No Salary Records Found</h3>
                )}
              </>
            )}
          </>
        )}
      </div>
      <br></br>
      <div>
        <strong>
          <h4 onClick={toggleAttendanceContent}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ marginRight: "10px", color: "black" }}
            />
            Attendance{" "}
            {showAttendanceContent ? <FaAngleDown /> : <FaAngleRight />}
          </h4>
        </strong>
        {/* <hr className="my-4" /> */}
        {showAttendanceContent && (
          <>
            {loading ? (
              <Spinner splash="Loading Attendance Records..." />
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmitat}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Attendance Record"
                    value={searchInput}
                    onChange={(e) => {
                      handleInputChangeat(e);
                      setSearchInput(e.target.value);
                      handleSearchSubmitat(e); // call the search function on each input change
                    }}
                    // onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2 my-2">
                    Search
                  </button>
                  <a href="/createreport">
                    <button type="button" className="btn btn-danger mx-2 my-2">
                      Reset
                    </button>
                  </a>
                </form>

                {attendances ? (
                  attendances.length === 0 ? (
                    <h3>No Attendance Records Found</h3>
                  ) : (
                    <>
                      <p>
                        Your Total Attendance Records:{" "}
                        <strong>{attendances.length}</strong>{" "}
                      </p>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{ width: "10%", whiteSpace: "nowrap" }}
                            >
                              Employee ID
                            </th>
                            <th
                              scope="col"
                              style={{ width: "15%", whiteSpace: "nowrap" }}
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              style={{ width: "15%", whiteSpace: "nowrap" }}
                            >
                              Entry-Time
                            </th>
                            <th
                              scope="col"
                              style={{ width: "15%", whiteSpace: "nowrap" }}
                            >
                              Off-Time
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {attendances.map((attendance) => (
                            <tr
                              key={attendance._id}
                              onClick={() => {
                                setModalData({}); //we need to clear the modal data before setting it again
                                setModalData(attendance);
                                setShowModal(true);
                              }}
                            >
                              <th scope="row">{attendance.empid}</th>
                              <td>{attendance.date}</td>
                              <td>{attendance.entrytime}</td>
                              <td>{attendance.offtime}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )
                ) : (
                  <h3>No Attendance Records Found</h3>
                )}
              </>
            )}
          </>
        )}
      </div>
      <br></br>
      <br></br>
      <br></br>

      <button
        className="btn btn-success"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? "Generating report..." : "Download Report"}
      </button>
      <br></br>
      <br></br>

      <div>
        <div className="card mb-4 shadow-sm">
          <article className="card-body">
            <h5 className="card-title">Employee Salary</h5>
            <iframe
              title="salary"
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                width: "100%",
                height: "350px",
              }}
              src="https://charts.mongodb.com/charts-project-1-vyayb/embed/charts?id=6444ce6a-81d6-4f1d-8d25-427b685de649&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </article>
        </div>
        <div className="card mb-4 shadow-sm">
          <article className="card-body">
            <h5 className="card-title">Employee Attendance</h5>
            <iframe
              title="attendance"
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                width: "100%",
                height: "350px",
              }}
              src="https://charts.mongodb.com/charts-project-1-vyayb/embed/charts?id=6444cee2-b03e-4a37-8ef6-dd3f69ca75e9&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Report;
