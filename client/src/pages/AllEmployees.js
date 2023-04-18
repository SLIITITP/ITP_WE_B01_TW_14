import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const AllEmployee = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({}); //by default it is an empty object
  const [employees, setEmployees] = useState([]);
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
        const res = await fetch(`http://localhost:8000/api/myemployees`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setEmployees(result.employee);
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

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/deleteemp/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setEmployees(result.employees);
          toast.success("Deleted Successfully");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete employee. Please try again later.");
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

    const newSearchUser = employees.filter(
      (employee) =>
        employee.empid.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.designation
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setEmployees(newSearchUser);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setEmployees([]);
    }
  };
  return (
    <>
      <div>
        <h1>Employees</h1>
        <a href="/myemployees" className="btn btn-danger my-2">
          Reload Employee List
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Employees..." />
        ) : (
          <>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Search Employee"
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
            </form>
            {employees ? (
              employees.length === 0 ? (
                <h3>No Employees Found</h3>
              ) : (
                <>
                  {/* <form className="d-flex" onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      name="searchInput"
                      id="searchInput"
                      className="form-control my-2"
                      placeholder="Search Employee"
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
                    Your Total Contacts: <strong>{employees.length}</strong>{" "}
                  </p>
                  <table className="table table-hover">
                    <thead>
                      <tr className="table-dark">
                        <th scope="col">Employee ID </th>
                        <th scope="col"> First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Date Joined</th>
                        <th scope="col">Department</th>
                        <th scope="col">Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr
                          key={employee._id}
                          onClick={() => {
                            setModalData({}); //we need to clear the modal data before setting it again
                            setModalData(employee);
                            setShowModal(true);
                          }}
                        >
                          <th scope="row">{employee.empid}</th>
                          <td>{employee.firstname}</td>
                          <td>{employee.lastname}</td>
                          <td>{employee.email}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.datejoined}</td>
                          <td>{employee.department}</td>
                          <td>{employee.designation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )
            ) : (
              <h3>No Employees Found</h3>
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
          <h3>{modalData.empid}</h3>
          <p>
            <strong>First Name</strong>: {modalData.firstname}
          </p>
          <p>
            <strong>Last Name</strong>: {modalData.lastname}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Contact Number</strong>: {modalData.phone}
          </p>
          <p>
            <strong>Date Joined</strong>: {modalData.datejoined}
          </p>
          <p>
            <strong>Department</strong>: {modalData.department}
          </p>
          <p>
            <strong>Designation</strong>: {modalData.designation}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editemp/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => modalData && deleteEmployee(modalData._id)}
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
export default AllEmployee;
