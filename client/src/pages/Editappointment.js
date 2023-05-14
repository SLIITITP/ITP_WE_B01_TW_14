import React,{useState, useEffect, useContext} from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ToastContext from "../context/ToastContext";
import Card from "react-bootstrap/Card";
import { Toast } from "react-bootstrap";

const Editapp = () =>{

    const location = useLocation();
    const [id] = useState(location.state.uID);
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', date: '',start: '',end: '', email: ''});

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('Authorization failed!');
            }
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(`http://localhost:8000/api/appointment/${id}`, config);
            setUser(response.data);
          } catch (error) {
            console.error(error);
            // setErrorMessage(error.message);
          }
        };
    
        fetchUser();
      }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Authorization failed!');
          }
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          await axios.put(`http://localhost:8000/api/editAppointment/${id}`, user, config);
          Toast.sucess('Appointment updated successfully!')
          navigate('/allapp');
        } catch (error) {
          console.error(error);
          Toast.error('Appointment update failed!')
        }
      };

    return(
        <div className="container mt-5">
          <Card clasName="shadow card">
            <form className="mx-auto w-50 shadow p-5" onSubmit={handleSubmit}>
                <Link className="btn btn-primary" to="/">Home</Link>
                <h3 className="mt-5" >Edit Appointment Details</h3>
                <div className="mb-3">
                    <label htmlFor="name">Supplier Name</label>
                    <input type="text" className="form-control"id="name" name="name" onChange={handleInputChange} value={user.name}  aria-describedby="nameHelp"/>
                </div>

                <div className="mb-3">
                <label htmlFor="address">Date</label>
                    <input type="date" className="form-control" id="date" name="date" onChange={handleInputChange} value={new Date(user.date).toLocaleDateString()} aria-describedby="addressHelp"/>
                </div>
        
                <div className="mb-3">
                <label htmlFor="mobile">Start Time</label>
                    <input type="time" className="form-control" id="start" name="start" onChange={handleInputChange} value={user.start} aria-describedby="mobileHelp"/>
                </div>

                <div className="mb-3">
                <label htmlFor="mobile">End Time</label>
                    <input type="time" className="form-control" id="end" name="end" onChange={handleInputChange} value={user.end} aria-describedby="mobileHelp"/>
                </div>

                <div className="mb-3">
                <label htmlFor="mobile">Supplier Email</label>
                    <input type="text" className="form-control"id="email" name="email" onChange={handleInputChange} value={user.email} aria-describedby="mobileHelp"/>
                </div>

                <button className="btn btn-primary">Update</button>
            </form>
            </Card>
        </div>
    );
}

export default Editapp;