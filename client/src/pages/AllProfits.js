import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const AllProfit = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({}); //by default it is an empty object
  const [profits, setProfits] = useState([]);
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
        const res = await fetch(`http://localhost:8000/api/myprofits`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setProfits(result.profit);
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

  const deleteProfit = async (id) => {
    if (window.confirm("Are you sure you want to delete this profit?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/deleteprofit/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setProfits(result.profits);
          toast.success("Deleted Successfully");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete stock. Please try again later.");
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

    const newSearchUser = profits.filter(
      (profit) =>
        profit.stockid.toLowerCase().includes(searchInput.toLowerCase()) 

        
    );
    console.log(newSearchUser);
    setProfits(newSearchUser);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setProfits([]);
    }
  };
  return (
    <>
      <div>
        <h1>profits</h1>
        <div className="d-flex justify-content-between">
          <a href="/myprofits" className="btn btn-danger my-2">
            Reload Profit List
          </a>
          <div>
            <Link className="btn btn-info mb-2" to={"/addprofit"} role="button">
              Add Profit
            </Link>
          </div>
        </div>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Profits made..." />
        ) : (
          <>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Search Stock id"
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
            {profits ? (
              profits.length === 0 ? (
                <h3>No Stock id Found</h3>
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
                    Your Total Profits: <strong>{profits.length}</strong>{" "}
                  </p>
                  <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Stock ID
                        </th>
                        <th
                          scope="col"
                          style={{ width: "15%", whiteSpace: "nowrap" }}
                        >
                          Cost Price
                        </th>
                        <th
                          scope="col"
                          style={{ width: "15%", whiteSpace: "nowrap" }}
                        >
                          Selling Price
                        </th>
                        <th
                          scope="col"
                          style={{
                            width: "20%",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          Quantity Sold
                        </th>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          start Date 
                        </th>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          End Date
                        </th>
                        {/* <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Time Period
                        </th> */}
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Gross Profit
                        </th>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Total Revenue
                        </th>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Profit Margin
                        </th>
                        
                      </tr>
                    </thead>

                    <tbody>
                      {profits.map((profit) => (
                        <tr
                          key={profit._id}
                          onClick={() => {
                            setModalData({}); //we need to clear the modal data before setting it again
                            setModalData(profit);
                            setShowModal(true);
                          }}
                        >
                          <th scope="row">{profit.stockid}</th>
                          <td>LKR {profit.costprice}</td>
                          <td>LKR {profit.sellingprice}</td>
                          <td>{profit.quantitysold}</td>
                          <td>{profit.startdate}</td>
                          <td>{profit.enddate}</td>
                          {/* <td>{profit.timeperiod}</td>  */}
                          <td>LKR {profit.grossprofit}</td> 
                          <td>LKR {profit.totalrevenue}</td> 
                          <td>LKR {profit.profitmargin}</td> 
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </>
              )
            ) : (
              <h3>No Profits Found</h3>
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
          <h3>{modalData.catid}</h3>
          <p>
            <strong>Cost Price</strong>: {modalData.costprice}
          </p>
          <p>
            <strong>Selling Price</strong>: {modalData.sellingprice}
          </p>
          <p>
            <strong>Quantity Sold</strong>: {modalData.quantitysold}
          </p>
          <p>
            <strong>Start Date</strong>: {modalData.startdate}
          </p>
          <p>
            <strong>End Date</strong>: {modalData.enddate}
          </p>
          {/* <p>
            <strong>Time Period</strong>: {modalData.timeperiod}
          </p> */}
          <p>
            <strong>Gross Profit</strong>: {modalData.grossprofit}
          </p>
          <p>
            <strong>Total Revenue</strong>: {modalData.totalrevenue}
          </p>
          <p>
            <strong>Profit Margin</strong>: {modalData.profitmargin}
          </p>
      
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editprofit/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => modalData && deleteProfit(modalData._id)}
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
export default AllProfit;
