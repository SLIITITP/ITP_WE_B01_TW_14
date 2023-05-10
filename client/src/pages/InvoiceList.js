import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const AllInvoice = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({}); //by default it is an empty object
  const [invoices, setInvoices] = useState([]);
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
        const res = await fetch(`http://localhost:8000/invoice/allInv`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setInvoices(result.invoice);
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

  const deleteInvoice = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const res = await fetch(
          `http://localhost:8000/invoice/deleteInv/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        if (!result.error) {
          setInvoices(result.invoices);
          toast.success("Deleted Successfully");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete invoice. Please try again later.");
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

    const newSearchUser = invoices.filter(
      (invoice) =>
        invoice.invoiceNo.toLowerCase().includes(searchInput.toLowerCase()) ||
        invoice.cusName.toLowerCase().includes(searchInput.toLowerCase()) ||
        invoice.busiName.toLowerCase().includes(searchInput.toLowerCase()) ||
        invoice.address.toLowerCase().includes(searchInput.toLowerCase()) ||
        invoice.issuedDate.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setInvoices(newSearchUser);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setInvoices([]);
    }
  };
  return (
    <>
      <div>
        <h1 className='hometitle'>Customer Invoices</h1>
        <div className='d-flex justify-content-between'>
          <a href='/allInv' className='btn btn-danger my-2'>
            Reload Invoice List
          </a>
          <div>
            <Link className='btn btn-info mb-2' to={"/addInv"} role='button'>
              Add Invoice
            </Link>
          </div>
        </div>
        <hr className='my-4' />
        {loading ? (
          <Spinner splash='Loading Invoices...' />
        ) : (
          <>
            <form className='d-flex' onSubmit={handleSearchSubmit}>
              <input
                type='text'
                name='searchInput'
                id='searchInput'
                className='form-control my-2'
                placeholder='Search Invoice...'
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
              <button type='submit' className='btn btn-info mx-2 my-2'>
                Search
              </button>
              {/* <a href='/another-page'>
                <button type='button' className='btn btn-secondary mx-2 my-2'>
                  Reset
                </button>
              </a> */}
            </form>

            {invoices ? (
              invoices.length === 0 ? (
                <h3>No Invoices Found</h3>
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
                    Your Total Invoices: <strong>{invoices.length}</strong>{" "}
                  </p>
                  <table className='table table-hover'>
                    <thead>
                      <tr>
                        {/* <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Invoice ID
                        </th> */}
                        <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Invoice No
                        </th>

                        <th
                          scope='col'
                          style={{ width: "15%", whiteSpace: "nowrap" }}
                        >
                          Date of Issued
                        </th>
                        <th
                          scope='col'
                          style={{ width: "15%", whiteSpace: "nowrap" }}
                        >
                          Customer Name
                        </th>
                        <th
                          scope='col'
                          style={{
                            width: "20%",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          Mobile Number
                        </th>
                        <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Business Name
                        </th>
                        <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Address
                        </th>
                        <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Payment method
                        </th>
                        {/* <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Bank code
                        </th>
                        <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Banking Date
                        </th>
                        <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Cheque Number
                        </th> */}
                        <th
                          scope='col'
                          style={{ width: "10%", whiteSpace: "nowrap" }}
                        >
                          Paid Amount
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoices.map((invoice) => (
                        <tr
                          key={invoice._id}
                          onClick={() => {
                            setModalData({}); //we need to clear the modal data before setting it again
                            setModalData(invoice);
                            setShowModal(true);
                          }}
                        >
                          <th scope='row'>{invoice.invoiceNo}</th>
                          {/* <td>{invoice.invoiceNo}</td> */}
                          <td>{invoice.issuedDate}</td>
                          <td>{invoice.cusName}</td>
                          <td>{invoice.mobileNo}</td>
                          <td>{invoice.busiName}</td>
                          <td>{invoice.address}</td>
                          <td>{invoice.payMethod}</td>
                          {/* <td>{invoice.bankCode}</td>
                          <td>{invoice.bankDate}</td>
                          <td>{invoice.cheqNo}</td> */}
                          <td>{`LKR.${invoice.paidAmount}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )
            ) : (
              <h3>No Invoices Found</h3>
            )}
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{modalData.firstname}</Modal.Title> */}
          <Modal.Title>Southern Agro Invoice</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.invoiceId}</h3>
          <p>
            <strong>Invoice No</strong>: {modalData.invoiceNo}
          </p>

          <p>
            <strong>Date of Issued</strong>: {modalData.issuedDate}
          </p>
          <p>
            <strong>Customer Name</strong>: {modalData.cusName}
          </p>
          <p>
            <strong>Mobile Number</strong>: {modalData.mobileNo}
          </p>
          <p>
            <strong>Business Name</strong>: {modalData.busiName}
          </p>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Payment method</strong>: {modalData.payMethod}
          </p>
          <p>
            <strong>Bank Code</strong>: {modalData.bankCode}
          </p>
          <p>
            <strong>Banking Date</strong>: {modalData.bankDate}
          </p>
          <p>
            <strong>Cheque Number</strong>: {modalData.cheqNo}
          </p>
          <p>
            <strong>Paid Amount</strong>: {`LKR.${modalData.paidAmount}`}
          </p>
        </Modal.Body>

        <Modal.Footer>
          {/* <Link className='btn btn-info' to={`/updateInv/${modalData._id}`}> */}
          <Link className='btn btn-info' to={`/editInv/${modalData._id}`}>
            Edit
          </Link>
          <button
            className='btn btn-danger'
            onClick={() => modalData && deleteInvoice(modalData._id)}
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
            className='btn btn-warning'
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// export default AllInvoices;
export default AllInvoice;
