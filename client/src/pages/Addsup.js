import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ToastContext from "../context/ToastContext";
import axios from 'axios';
import { Helmet } from "react-helmet-async";

const Addsup = () => {
  const navigate = useNavigate();
  // const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      toast.error("Mobile number should be 10 digits");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization failed!');
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get('http://localhost:8000/api/allSupplier', config);
      const existingMobile = data.find((supplier) => supplier.mobile === mobile);

      if (existingMobile) {
        toast.error("Mobile number already exists");
        return;
      }

      await axios.post('http://localhost:8000/api/addSupplier', { name, address, mobile, email, company }, config);
      toast.success("Supplier added successfully");
      navigate('/allsup');
    } catch (err) {
      toast.error(err.message)
    }
  };
  
  const handleClear = () => {
    setName("");
    setAddress("");
    setMobile("");
    setEmail("");
    setCompany("");
  };

  return (
    <>
    <Helmet>
        <title>Supplier</title>
      </Helmet>
      <div className="container d-flex justify-content-center align-items-center">
  <div className="col-lg-6 col-md-8 col-12">
    <h2 className="text-center bg-darkgreen text-white p-2">Create Supplier</h2>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="supCompanyInput" className="form-label mt-4">
          Enter Supplier Name
        </label>
        <input
          type="text"
          className="form-control"
          id="supCompanyInput"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Brian Perera"
          required
          maxLength="25"
          fdprocessedid="8n2of"
        />
      </div>

      <div className="form-group">
        <label htmlFor="supCompanyInput" className="form-label mt-4">
          Enter Supplier Address
        </label>
        <input
          type="text"
          className="form-control"
          id="supCompanyInput"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Negombo"
          required
          maxLength="50"
          fdprocessedid="8n2of"
        />
      </div>

      <div className="form-group">
        <label htmlFor="supCompanyInput" className="form-label mt-4">
          Enter Supplier Mobile
        </label>
        <input
          type="text"
          className="form-control"
          id="supCompanyInput"
          name="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="07xxxxxxxx"
          required
          maxLength="10"
          minLength="10"
          fdprocessedid="8n2of"
        />
      </div>

      <div className="form-group">
        <label htmlFor="supCompanyInput" className="form-label mt-4">
          Enter Supplier Email
        </label>
        <input
          type="text"
          className="form-control"
          id="supCompanyInput"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="someone@gmail.com"
          required
          fdprocessedid="8n2of"
        />
      </div>

      <div className="form-group">
        <label htmlFor="supCompanyInput" className="form-label mt-4">
          Enter Supplier Company
        </label>
        <input
          type="text"
          className="form-control"
          id="supCompanyInput"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="CIC"
          required
          fdprocessedid="8n2of"
        />
      </div>
        <input type="submit" value="Submit" className="btn btn-info my-4 mr-2" />

        <button
          type="button"
          onClick={handleClear}
          className="btn btn-danger my-2 ml-2"
        >
          Clear
        </button>
    </form>
  </div>
</div>

    </>
  );
};

export default Addsup;
