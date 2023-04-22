import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const AllSchedules = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({}); //by default it is an empty object
  const [schedules, setSchedules] = useState([]);
  // const [originalEmployees, setOriginalEmployees] = useState([]);
  // const [employees, setEmployees] = useState(initialEmployees);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setLoading(true);
    // inspect showed an error when async function was not wrapped in another function. That means when used like this: useEffect(async () => { ... }, []);
    //Therefore I wrapped it in another function and called it inside useEffect.
    //async/await syntax directly inside the useEffect callback function, which is not allowed. Instead, you can define an asynchronous function inside the useEffect and then call it.
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/myschedules`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setSchedules(result.schedule);
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

  const deleteSchedule = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Delivery Schedule?")
    ) {
      try {
        const res = await fetch(
          `http://localhost:8000/api/deleteschedule/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        if (!result.error) {
          setSchedules(result.schedules);
          toast.success("Deleted Successfully");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error(
          "Failed to delete Delivery Schedule. Please try again later."
        );
      }
    }
  };

  // useEffect(() => {
  //   setEmployees([]);
  //   setOriginalEmployees([]);
  // }, []);

  //e is the event object, which is passed by default to the event handler function
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // if (!searchInput) {
    //   setEmployees(originalEmployees);
    //   return;
    // }

    const newSearchUser = schedules.filter(
      (schedule) =>
        schedule.deliveryscheduleID
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        schedule.orderID.toLowerCase().includes(searchInput.toLowerCase()) ||
        schedule.destination.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setSchedules(newSearchUser);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setSchedules([]);
    }
  };
  return (
    <>
      <div>
        <h1>Delivery Schedule</h1>
        <div className="d-flex justify-content-between">
          <a href="/myschedules" className="btn btn-danger my-2">
            Reload Delivery Schedule List
          </a>
          <div>
            <Link
              className="btn btn-info mb-2"
              to={"/createschedule"}
              role="button"
            >
              Add Delivery Schedule
            </Link>
          </div>
        </div>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Delivery Schedules..." />
        ) : (
          <>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Search Delivery Schedule"
                value={searchInput}
                // onChange={searchHandle}
                // onChange={handleInputChange}
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
              <a href="/myschedules">
                <button type="button" className="btn btn-secondary mx-2 my-2">
                  Reset
                </button>
              </a>
            </form>

            {schedules ? (
              schedules.length === 0 ? (
                <h3>No Sales Delivery Schedules Found</h3>
              ) : (
                <>
                  {/* <form className="d-flex" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      name="searchInput"
                      id="searchInput"
                      className="form-control my-2"
                      placeholder="Search Sales Representative"
                      value={searchInput}
                      onChange={handleInputChange}
                      // onChange={(e) => {
                      //   setSearchInput(e.target.value);
                      //   handleSearchSubmit(e); // call the search function on each input change
                      // }}
                      // onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-info mx-2 my-2">
                      Search
                    </button>
                  </form> */}
                  <p>
                    Your Total Delivery schedules:{" "}
                    <strong>{schedules.length}</strong>{" "}
                  </p>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Delivery Schedule ID
                        </th>
                        <th
                          scope="col"
                          style={{ width: "15%", whiteSpace: "nowrap" }}
                        >
                          Order ID
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
                          destination
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {schedules.map((schedule) => (
                        <tr
                          key={schedule._id}
                          onClick={() => {
                            setModalData({}); //we need to clear the modal data before setting it again
                            setModalData(schedule);
                            setShowModal(true);
                          }}
                        >
                          <th scope="row">{schedule.deliveryscheduleID}</th>
                          <td>{schedule.orderID}</td>
                          <td>{schedule.date}</td>
                          <td>{schedule.destination}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )
            ) : (
              <h3>No Delivery Schedules Found</h3>
            )}
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{modalData.firstname}</Modal.Title> */}
          <Modal.Title>Southern Agro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.salesRepID}</h3>
          <p>
            <strong>Delivery Schedule ID</strong>:{" "}
            {modalData.deliveryscheduleID}
          </p>

          <p>
            <strong>order ID</strong>: {modalData.orderID}
          </p>
          <p>
            <strong>Date</strong>: {modalData.date}
          </p>
          <p>
            <strong>Destination</strong>: {modalData.destination}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editschedule/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => modalData && deleteSchedule(modalData._id)}
          >
            Delete
          </button>

          {/* <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button> */}

          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// export default AllContacts;
export default AllSchedules;
