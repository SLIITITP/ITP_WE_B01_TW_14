import React,{useState, useEffect, useContext} from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ToastContext from "../context/ToastContext";

export default function Editsup() {

    const location = useLocation();
    const [id] = useState(location.state.uID);
    console.log(id);
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', address: '',mobile: '', email: '', company: ''});
    const { toast } = useContext(ToastContext);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/supplier/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchUser();
    }, [id]);
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.put(`http://localhost:8000/api/editSupplier/${id}`, user, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            toast.error("Enter a valid email address");
            return;
          }
          toast.success("User updated successfully!");
          navigate("/allsup"); // Navigate to the user list page on successful update
        } catch (error) {
          console.error(error);
          toast.error("User update failed!");
        }
      };
      

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
      };
    

    return(
        <div className="container mt-5">
            <form className="mx-auto w-50 shadow p-5" onSubmit={handleSubmit}>
                <Link className="btn btn-primary" to="/">Home</Link>
                <h3 className="mt-5" >Edit Supplier Details</h3>
                <div className="mb-3">
                    <label htmlFor="name">Supplier Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} value={user.name}  aria-describedby="nameHelp"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="address">Supplier Address</label>
                    <input type="text" className="form-control" id="address" name="address" onChange={handleInputChange} value={user.address} aria-describedby="addressHelp"/>
                </div>
        
                <div className="mb-3">
                    <label htmlFor="mobile">Supplier Mobile</label>
                    <input type="text" className="form-control" id="mobile" name="mobile" onChange={handleInputChange} value={user.mobile} aria-describedby="mobileHelp"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="mobile">Supplier Email</label>
                    <input type="text" className="form-control" id="mobile" name="email" onChange={handleInputChange} value={user.email} aria-describedby="mobileHelp"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="mobile">Supplier Company</label>
                    <input type="text" className="form-control" id="company" name="company" onChange={handleInputChange} value={user.company} aria-describedby="mobileHelp"/>
                </div>

                <button className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
