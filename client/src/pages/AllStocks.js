import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const AllStock = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({}); //by default it is an empty object
  const [stocks, setStocks] = useState([]);
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
        const res = await fetch(`http://localhost:8000/api/mystocks`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setStocks(result.stock);
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

  const deleteStock = async (id) => {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/deletestock/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setStocks(result.stocks);
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

    const newSearchUser = stocks.filter(
      (stock) =>
        stock.stockid.toLowerCase().includes(searchInput.toLowerCase()) ||
        stock.supplier.toLowerCase().includes(searchInput.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchInput.toLowerCase())
      // stock.image.toLowerCase().includes(searchInput.toLowerCase()) ||
    );
    console.log(newSearchUser);
    setStocks(newSearchUser);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setStocks([]);
    }
  };
  return (
    <>

    
      <Helmet>
        <title>Stocks</title>
      </Helmet>
      <div>
        <h1>Stocks</h1>
        <div className="d-flex justify-content-between">
          <a href="/mystocks" className="btn btn-danger my-2">
            Reload Stock List
          </a>
          <div>
            <Link
              className="btn btn-info mb-2"
              to={"/createstock"}
              role="button"
            >
              Add Stock
            </Link>
          </div>
        </div>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Stocks..." />
        ) : (
          <>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Search Stock"
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
            {stocks ? (
              stocks.length === 0 ? (
                <h3>No Stocks Found</h3>
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
                    Your Total Stocks: <strong>{stocks.length}</strong>{" "}
                  </p>
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
                          Name
                        </th>
                        <th
                          scope="col"
                          style={{ width: "15%", whiteSpace: "nowrap" }}
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          style={{
                            width: "20%",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Cost Price
                        </th>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Selling Price
                        </th>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Supplier
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {stocks.map((stock) => (
                        <tr
                          key={stock._id}
                          onClick={() => {
                            setModalData({}); //we need to clear the modal data before setting it again
                            setModalData(stock);
                            setShowModal(true);
                          }}
                        >
                          <th scope="row">{stock.stockid}</th>
                          <td>{stock.name}</td>
                          <td>{stock.category}</td>
                          <td>{stock.description}</td>
                          <td>LKR {stock.costprice}</td>
                          <td>LKR {stock.sellingprice}</td>
                          <td>{stock.quantity}</td>
                          <td>{stock.supplier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )
            ) : (
              <h3>No Stocks Found</h3>
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
          <h3>{modalData.stockid}</h3>
          <p>
            <strong> Name</strong>: {modalData.name}
          </p>
          <p>
            <strong>Category</strong>: {modalData.category}
          </p>
          <p>
            <strong>Description</strong>: {modalData.description}
          </p>
          <p>
            <strong>Cost Price</strong>: {modalData.costprice}
          </p>
          <p>
            <strong>Selling Price</strong>: {modalData.sellingprice}
          </p>
          <p>
            <strong>Quantity</strong>: {modalData.quantity}
          </p>
          <p>
            <strong>Supplier</strong>: {modalData.supplier}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editstock/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => modalData && deleteStock(modalData._id)}
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
export default AllStock;
