import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const Allsup = ()=>{
  
  const { toast } = useContext(ToastContext);
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const navigate = useNavigate()

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/allSuppliers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchSuppliers();
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:8000/api/allSupplier", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }) 
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error(error));
  }, []);

  const deleteSupplier = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/deleteSupplier/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setSuppliers((prevSuppliers) =>
            prevSuppliers.filter((supplier) => supplier._id !== id)
          );
          toast.success("Supplier deleted successfully!");
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete supplier. Please try again later.");
      }
    }
  };

  
  const filteredSuppliers = suppliers.filter(supplier => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(supplier.name) || searchRegex.test(supplier.address) || searchRegex.test(supplier.supid) || searchRegex.test(supplier.email);
  });

  const handleEdit = (modalData) => {
    navigate('/editsup', {
      state: {
        uID: modalData._id,
        uSupID: modalData.supid,
        uName: modalData.name,
        uAddress: modalData.address,
        uobile: modalData.mobile,
        uemail: modalData.email,
        uCompany : modalData.company
      }
    });
    // console.log(modalData._id)
  }

  const handleSend = (modalData) => {
    navigate('/addpur', {
      state: {
        uID: modalData._id,
        uSupID: modalData.supid,
        uName: modalData.name,
        uemail: modalData.email
      }
    });
  }

  // console.log(modalData)
  return(
    <>
      <div>
        <h1>Your Suppliers</h1>

        <div className="d-flex justify-content-between">
          <a href="/allsup" className="btn btn-danger my-2">
            Reload Supplier List
          </a>
          <div>
            <Link className="btn btn-info mb-2" to={"/addsup"} role="button">
              Add Supplier
            </Link>
          </div>
        </div>
        <hr className="my-4" />

        <form className="d-flex" >
          <input type="text" name="searchInput" id="searchInput" className="form-control my-2" placeholder="Search Supplier" onChange={(e) => setSearchQuery(e.target.value)}/>
          <button type="submit" className="btn btn-info mx-2 my-2"> Search</button>
        </form>
        <p>
          Your Total Contacts: <strong>{suppliers.length}</strong>{" "}
        </p>
        <hr className="my-4"/>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "10%", whiteSpace: "nowrap", textAlign: "center" }}>ID</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Name</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Address</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Date joined</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Mobile</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Email</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>company</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Rate</th>
            </tr>
          </thead>
          <tbody>
           {filteredSuppliers.map((supplier) => (
            <tr key={supplier._id}
            onClick={() => {
              setModalData({}); //we need to clear the modal data before setting it again
              setModalData(supplier);
              setShowModal(true);
            }}>
              <td>{supplier.supid}</td>
              <td>{supplier.name}</td>
              <td>{supplier.address}</td>
              <td>{new Date(supplier.date).toLocaleDateString()}</td>
              <td>{supplier.mobile}</td>
              <td>{supplier.email}</td>
              <td>{supplier.company}</td>
              <td>{supplier.rate}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{modalData.firstname}</Modal.Title> */}
          <Modal.Title>Southern Agro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.supid}</h3>
          <p><strong>Name</strong>: {modalData.name}</p>
          <p><strong>Address</strong>: {modalData.address}</p>
          <p><strong>Date Joined</strong>: {modalData.datejoined}</p>
          <p><strong>Contact Number</strong>: {modalData.mobile}</p>
          <p><strong>Email</strong>: {modalData.email}</p>
          <p><strong>Contact Number</strong>: {modalData.phone}</p>          
          <p><strong>Company</strong>: {modalData.company}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-success" onClick={() => handleSend(modalData)}>Send</button>
          <button className="btn btn-info" onClick={() => handleEdit(modalData)}>Edit</button>
          <button className="btn btn-danger" onClick={() => modalData && deleteSupplier(modalData._id)}>Delete</button>
          <button className="btn btn-warning" onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>      
    </>
  )  
}

export default Allsup;