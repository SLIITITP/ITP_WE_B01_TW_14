import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

const AllInvoice = () => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  // const [originalEmployees, setOriginalEmployees] = useState([]);
  // const [employees, setEmployees] = useState(initialEmployees);

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

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/invoice/report", {
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

  return (
    <>
      <div>
        <h1 className='hometitle'>Customer Invoices</h1>
        <div className='d-flex justify-content-between'>
          <a href='/report' className='btn btn-danger my-2'>
            Reload Invoice List
          </a>
          <div>
            <button
              className='btn btn-info mb-2'
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? "Generating report..." : "Download Report"}
            </button>
          </div>
        </div>
        <hr className='my-4' />
        {loading ? (
          <Spinner splash='Loading Invoices...' />
        ) : (
          <>
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
                        <tr>
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
    </>
  );
};

// export default AllInvoices;
export default AllInvoice;
