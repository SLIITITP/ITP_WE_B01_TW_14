import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllRecW = () => {
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [appointments, setAppointments] = useState([]);

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
    const headers = [["ID", "Name", "Address", "Mobile", "Email", "Company"]];
    const data = suppliers.map((supplier) => [
      supplier.supid,
      supplier.name,
      supplier.address,
      supplier.mobile,
      supplier.email,
      supplier.company,
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
  const handlePrintAll = () => {
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
  


  return (
    <>
      <h1>Reports</h1>
      <button className="btn btn-warning mx-2" onClick={() => handlePrintPur()}>
        Print Purchase Order Details
      </button>
      <button className="btn btn-warning mx-2" onClick={()=>handlePrintSup()}>
        Print Supplier Details
      </button>
      <button className="btn btn-warning mx-2" onClick={()=>handlePrintAll()}>
        Print Appointment Details
      </button>
    </>
  );
};

export default AllRecW;
