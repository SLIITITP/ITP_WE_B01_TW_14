import React,{useState, useEffect, useContext} from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ToastContext from "../context/ToastContext";
import Card from "react-bootstrap/Card";
import { Toast } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const Editapp = () =>{

    const location = useLocation();
    const [id] = useState(location.state.uID);
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', date: '',start: '',end: '', email: ''});
    const { toast } = useContext(ToastContext);

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
      <>
      <Helmet>
        <title>Edit Appointment</title>
      </Helmet>
      <div className="container d-flex justify-content-center align-items-center">
  <div className="col-lg-6 col-md-8 col-12">
    <h2 className="text-center bg-darkgreen text-white p-2">Edit Appointment</h2>
         
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="name">Supplier Name</label>
                    {/* new */}
                    <input type="text" className="form-control"id="name" name="name" onChange={handleInputChange} value={user.name}  aria-describedby="nameHelp"/>
                </div>

                <div className="form-group">
                <label htmlFor="address">Date</label>
                    <input type="date" className="form-control" id="date" name="date" onChange={handleInputChange} value={new Date(user.date).toLocaleDateString()} min={new Date()} aria-describedby="addressHelp"/>
                </div>
        
                <div className="form-group">
                <label htmlFor="mobile">Start Time</label>
                    <input type="time" className="form-control" id="start" name="start" onChange={handleInputChange} value={user.start} aria-describedby="mobileHelp"/>
                </div>

                <div className="form-group">
                <label htmlFor="mobile">End Time</label>
                    <input type="time" className="form-control" id="end" name="end" onChange={handleInputChange} value={user.end} aria-describedby="mobileHelp"/>
                </div>

                <div className="form-group">
                <label htmlFor="mobile">Supplier Email</label>
                    <input type="text" className="form-control"id="email" name="email" onChange={handleInputChange} value={user.email} aria-describedby="mobileHelp"/>
                </div>

                <button className="btn btn-info my-3">Save changes</button>
            </form>
            </div>
        </div>
        </>
    );
}

export default Editapp;