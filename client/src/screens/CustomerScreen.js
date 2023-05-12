import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

function CustomerScreen() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/customers`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setCustomers(result);
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

  const deleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this Customer?')) {
      try {
        const res = await fetch(`http://localhost:8000/api/customers/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          toast.success('Customer Deleted Successfully');
          setShowModal(false);
          updateCustomerList();
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error('Failed to delete Customer. Please try again later.');
      }
    }
  };

  const updateCustomerList = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/customers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      setCustomers(result);
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch Customers. Please try again later.');
    }
  };

  return (
    <div>
      <div>
        <Helmet>
          <title>Customers</title>
        </Helmet>
        <h1>Customers</h1>
        <div className="d-flex justify-content-between">
          <a href="/customerinfo" className="btn btn-danger my-2">
            Reload Customer List
          </a>
          <div>
            <Link
              className="btn btn-info mb-2"
              to={'/createcustomer'}
              role="button"
            >
              Add New Customer
            </Link>
          </div>
        </div>
        <hr className="my-4" />

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Customer Id</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">NIC</th>
              <th scope="col">Credit Limit</th>
              <th scope="col">Credit Days</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer._id}
                onClick={() => {
                  setModalData({});
                  setModalData(customer);
                  setShowModal(true);
                }}
              >
                <th scope="row">{customer.customerId}</th>
                <td>{customer.cusName}</td>
                <td>{customer.companyName}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.contactNo}</td>
                <td>{customer.cusNIC}</td>
                <td>{customer.creditLimit}</td>
                <td>{customer.creditDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Southern Agro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.customerId}</h3>
          <p>
            <strong>Customer Name</strong>: {modalData.cusName}
          </p>
          <p>
            <strong>Company Name</strong>: {modalData.companyName}
          </p>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Contact No</strong>: {modalData.contactNo}
          </p>
          <p>
            <strong>Customer NIC</strong>: {modalData.cusNIC}
          </p>
          <p>
            <strong>Credit Limit</strong>: {modalData.creditLimit}
          </p>
          <p>
            <strong>Credit Days</strong>: {modalData.creditDays}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editcustomer/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => modalData && deleteCustomer(modalData._id)}
          >
            Delete
          </button>

          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomerScreen;
