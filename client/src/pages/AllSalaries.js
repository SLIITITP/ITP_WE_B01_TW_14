import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const AllSalary = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({}); //by default it is an empty object
  const [salaries, setSalaries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
  return (
    <>
      <Helmet>
        <title>Report</title>
      </Helmet>
      <div>
        <h1>Salaries</h1>
        <div className="d-flex justify-content-between">
          <a href="/mysalaries" className="btn btn-danger my-2">
            Reload Salary List
          </a>
        </div>
        <hr className="my-4" />
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
              <a href="/another-page">
                <button type="button" className="btn btn-secondary mx-2 my-2">
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
                          style={{
                            width: "20%",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
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
      </div>
    </>
  );
};

// export default AllContacts;
export default AllSalary;
