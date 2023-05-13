import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";

const Allexp = ()=>{
    const [expires, setExpires] = useState([]);

    const fetchExpires = async () => {
        try {
          const response = await axios.get("/allExp", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setExpires(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchExpires();
      }, []);
    
      useEffect(() => {
        fetch("http://localhost:8000/api/allExp", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => setExpires(data))
          .catch((error) => console.error(error));
      }, []);

    return(
        <>
      <div>
        <h1>Your Expired Appointments</h1>

        <hr className="my-4" />

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>App ID</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Supplier Name</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Date</th>
              <th scope="col" style={{ width: "15%", whiteSpace: "nowrap" }}>Start Time</th>
              <th scope="col" style={{ width: "20%", whiteSpace: "nowrap" }}>End Time</th>
              <th scope="col" style={{ width: "20%", whiteSpace: "nowrap" }}>Email</th>
            </tr>
          </thead>
          <tbody>
          {expires.map((expire) => (
              <tr key={expire._id}>
                <td>{expire.appointmentid}</td>
                <td>{expire.name}</td>
                <td>{expire.date}</td>
                <td>{expire.start}</td>
                <td>{expire.end}</td>
                <td>{expire.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </>
    );
}

export default Allexp;