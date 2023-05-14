import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Card from "react-bootstrap/Card";

const AllRecW = () => {
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [exp_appointments, set_exp_Appointments] = useState([]);

  //Fetch Purchase order details
  const fetchPurchases = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/allPurchase", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPurchases(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  //print function to print all purchase orders
  const handlePrintPur = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("All Purchases", marginLeft, 40);
    const headers = [
      ["Order ID", "Sup ID", "Date", "Req Date", "Items"],
    ];
    const data = purchases.map((purchase) => [
      purchase.orderid,
      purchase.supid && purchase.supid.supid ? purchase.supid.supid.toString() : "",
      new Date(purchase.date).toLocaleDateString(),
      new Date(purchase.reqdate).toLocaleDateString(),
      purchase.items && purchase.items.length > 0 ? purchase.items.map(item => `${item.itemName} - ${item.quantity}`).join(", ") : "No items found"
    ]);
    let content = {
      startY: 70,
      head: headers,
      body: data,
    };
    doc.autoTable(content);
    doc.save("all-purchases.pdf");
  };

  //Fetch Supplier details
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

  const handlePrintSup = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("All Suppliers", marginLeft, 40);
    const headers = [["ID", "Name", "Address", "Mobile", "Email", "Company", "rate"]];
    const data = suppliers.map((supplier) => [
      supplier.supid,
      supplier.name,
      supplier.address,
      supplier.mobile,
      supplier.email,
      supplier.company,
      supplier.rate,
    ]);
    let content = {
      startY: 70,
      head: headers,
      body: data,
    };
    doc.autoTable(content);
    doc.save("all-suppliers.pdf");
  };
  
//Fetch Apointment details
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


  //print function to print all Appointments
  const handlePrintApp = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("All Appointments", marginLeft, 40);
    const headers = [["ID", "Name", "Date", "Start Time", "End Time", "Email"]];
    const data = appointments.map((appointment) => [
      appointment.appid,
      appointment.name,
      new Date(appointment.date).toLocaleDateString(),
      appointment.start,
      appointment.end,
      appointment.email,
    ]);
    let content = {
      startY: 70,
      head: headers,
      body: data,
    };
    doc.autoTable(content);
    doc.save("all-appointments.pdf");
  };
  

  //fetch canceled appointments
  const fetchExpiredAppointments = async () => {
    try {
      const token = localStorage.getItem('token'); // get the access token from local storage
      const response = await axios.get('/allExp', { headers: { Authorization: `Bearer ${token}` } });
      set_exp_Appointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchExpiredAppointments();
  }, []);

  useEffect(() => {
    const fetchExpiredAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // get the access token from local storage
        const response = await axios.get('http://localhost:8000/api/allExp', { headers: { Authorization: `Bearer ${token}` } }); // include the authorization header
        set_exp_Appointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpiredAppointments();
  }, []);

  const handlePrintExp = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("All Appointments", marginLeft, 40);
    const headers = [["ID", "Name", "Date", "Start Time", "End Time", "Email"]];
    const data = exp_appointments.map((exp) => [
      exp.appointmentid,
      exp.name,
      new Date(exp.date).toLocaleDateString(),
      exp.start,
      exp.end,
      exp.email,
    ]);
    let content = {
      startY: 70,
      head: headers,
      body: data,
    };
    doc.autoTable(content);
    doc.save("all-expired-appointments.pdf");
  };

  return (
    <>
      <h1>Reports</h1>

        <div className="card">
          <div className="card-body">
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'Black' }}>Purchase Orders</p>
            <p style={{fontSize: '18px', color: 'black'}}>This report will generate a detailed summary of all purchase orders placed by the company, including information on the vendor, order date, items purchased, and cost. Use this report to keep track of all outstanding orders and ensure timely payment to suppliers.</p>
            <button className="btn btn-warning mx-2" onClick={() => handlePrintPur()} style={{color: 'black'}}>
              {<span style={{ textTransform: "capitalize" }}>Generate Report</span>}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'Black' }}>Suppliers</p>
            <p style={{fontSize: '18px', color: 'black'}}>This report displays detailed information about the suppliers, including their contact details, delivery terms. Use this report to get a comprehensive overview of the suppliers and their performance, and to make informed decisions about purchasing and negotiating contracts with them.</p>
            <button className="btn btn-warning mx-2" onClick={() => handlePrintSup()} style={{color: 'black'}}>
              {<span style={{ textTransform: "capitalize" }}>Generate Report</span>}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'Black' }}>Appointments</p>
            <p style={{fontSize: '18px', color: 'black'}}>View all your scheduled appointments with the detailed information you need. Print out a report that includes the date, time, and participants of each appointment. Stay organized and on top of your schedule with ease.</p>
            <button className="btn btn-warning mx-2" onClick={() => handlePrintApp()} style={{color: 'black'}}>
              {<span style={{ textTransform: "capitalize" }}>Generate Report</span>}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'Black' }}>Expired Appointments</p>
            <p style={{fontSize: '18px', color: 'black'}}>The expired appointments PDF card provides a list of all appointments that have expired and were deleted from the appointments database. The card includes information such as the appointment ID, name of the person who made the appointment, date, start and end time, and email of the person who made the appointment. The card serves as a record of all expired appointments and can be used for auditing purposes or to contact individuals whose appointments were cancelled due to expiration.</p>
            <button className="btn btn-warning mx-2" onClick={() => handlePrintExp()} style={{color: 'black'}}>
              {<span style={{ textTransform: "capitalize" }}>Generate Report</span>}
            </button>
          </div>
        </div>
    </>

  );
};

export default AllRecW;
