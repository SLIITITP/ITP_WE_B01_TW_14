import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const Allapp = ()=>{

    const { toast } = useContext(ToastContext);
    const [appointments, setAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate()

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token'); // get the access token from local storage
      const response = await axios.get('/allAppointment', { headers: { Authorization: `Bearer ${token}` } });
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // get the access token from local storage
        const response = await axios.get('http://localhost:8000/api/allAppointment', { headers: { Authorization: `Bearer ${token}` } }); // include the authorization header
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  
  const deleteAppointment = (id) => {
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:8000/api/deleteAppointment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
        toast.success("Appointment deleted successfully!");
      })
      .catch((error) => console.error(error));
  };
  
  const handleEdit = (appointment) => {
    navigate('/editapp', {
      state: {
        uID: appointment._id,
        uName: appointment.name,
        uDate: appointment.date,
        uStart: appointment.start,
        uEnd: appointment.end,
        uemail: appointment.email
      }
    });
  }

  const filteredAppointments = appointments.filter(appointment => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(appointment.appid) || searchRegex.test(appointment.email);
  });

    return(
        <>
      <div>
        <h1>Your Appointments</h1>

        <div className="d-flex justify-content-between">
          <a href="/allsup" className="btn btn-danger my-2">
            Reload Appointment List
          </a>
          <div>
            <Link className="btn btn-info mb-2" to={"/addapp"} role="button">Add Appointment</Link>
            <Link className="btn btn-outline-danger mb-2 " to="/allexp">Expired Appointments</Link>
          </div>
        </div>
        <hr className="my-4" />

        <form className="d-flex" >
          <input type="text" name="searchInput" id="searchInput" className="form-control my-2" placeholder="Search Appointment" onChange={(e) => setSearchQuery(e.target.value)}/>
          <button type="submit" className="btn btn-info mx-2 my-2"> Search</button>
        </form>
        <p>
          Your Total Contacts: <strong>{appointments.length}</strong>{" "}
        </p>
        
        <hr className="my-4"/>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "10%", whiteSpace: "nowrap", textAlign: "center" }}>ID</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Name</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Date</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Start-time</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>End-time</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Email</th>
            </tr>
          </thead>
          <tbody>
           {filteredAppointments.map((appointment) => (
            <tr key={appointment._id}
            onClick={() => {
              setModalData({}); //we need to clear the modal data before setting it again
              setModalData(appointment);
              setShowModal(true);
            }}>
              <td>{appointment.appid}</td>
              <td>{appointment.name}</td>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{appointment.start}</td>
              <td>{appointment.end}</td>
              <td>{appointment.email}</td>
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
            {/* <h1>Hi</h1> */}
          <h3>{modalData.appid}</h3>
          <p><strong>Name</strong>: {modalData.name}</p>
          <p><strong>Date</strong>: {new Date(modalData.date).toLocaleDateString()}</p>
          <p><strong>Start-time</strong>: {modalData.start}</p>
          <p><strong>End-time</strong>: {modalData.end}</p>
          <p><strong>Email</strong>: {modalData.email}</p>
        </Modal.Body>

        <Modal.Footer>
         
          <button className="btn btn-info" onClick={() => handleEdit(modalData)}>Edit</button>
          <button className="btn btn-danger" onClick={() => modalData && deleteAppointment(modalData._id)}>Delete</button>
          <button className="btn btn-warning" onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>      
    </>
    );
}

export default Allapp;

//wasana