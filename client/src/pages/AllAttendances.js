import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const AllAttendance = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({}); //by default it is an empty object
  const [attendances, setAttendances] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = attendances.filter((attendance) =>
      attendance.empid.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setAttendances(newSearchUser);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setAttendances([]);
    }
  };
  return (
    <>
      <Helmet>
        <title>Report</title>
      </Helmet>
      <div>
        <h1>Attendance Records</h1>
        <div className="d-flex justify-content-between">
          <a href="/myattendances" className="btn btn-danger my-2">
            Reload Attendance List
          </a>
        </div>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Attendance Records..." />
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
                  handleInputChange(e);
                  setSearchInput(e.target.value);
                  handleSearchSubmit(e); // call the search function on each input change
                }}
                // onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="btn btn-info mx-2 my-2">
                Search
              </button>
              <a href="/another-page">
                <button type="button" className="btn btn-secondary mx-2 my-2">
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
                          style={{
                            width: "20%",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
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
      </div>
    </>
  );
};

export default AllAttendance;
