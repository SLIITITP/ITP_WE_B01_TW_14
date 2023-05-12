import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function CustomerScreen() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div>
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
        {/* <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(contact);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{contact.name}</th>
                        <td>{contact.address}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody> */}
      </table>
    </div>
  );
}

export default CustomerScreen;
