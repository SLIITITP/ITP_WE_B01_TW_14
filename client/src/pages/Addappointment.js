import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ToastContext from "../context/ToastContext";
import axios from 'axios';

const Addapp = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization failed!');
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post('http://localhost:8000/api/addAppointment', { name, date, start, end, email }, config);
      alert("Appointment added successfully");
      navigate('/allapp');
    } catch (err) {
      alert(err.message);
      navigate('/addapp');
    }
  };

const handleClear = () => {
    setName("");
    setDate("");
    setStart("");
    setEnd("");
    setEmail("");
  };


  return (
    <>
      <h2>Create Appointment</h2>
      <Card clasName="shadow card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label mt-4">
              Enter Supplier Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Brian Perera"
              required
              maxLength="25" // add maxLength attribute to limit input to 10 characters
              fdprocessedid="8n2of"
            />
          </div>

          <div className="form-group">
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="date" className="form-label mt-4">
                Enter Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Negombo"
                required
                maxLength="50"
                fdprocessedid="8n2of"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="start" className="form-label mt-4">
              Enter Start-time
            </label>
            <input
              type="time"
              className="form-control"
              id="start"
              name="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              maxLength="10"
              minLength="10"
              fdprocessedid="8n2of"
            />
          </div>

          <div className="form-group">
            <label htmlFor="end" className="form-label mt-4">
              Enter End-time
            </label>
            <input
              type="time"
              className="form-control"
              id="end"
              name="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              fdprocessedid="8n2of"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">
              Enter Supplier Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              //   name="company"
              //   value={company}
              //   onChange={(e) => setCompany(e.target.value)}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="someone@gmail.com"
              required
              fdprocessedid="8n2of"
            />
          </div>

          <input type="submit" value="Submit" className="btn btn-info my-2" />

          <button
            type="button"
            onClick={handleClear}
            className="btn btn-danger my-2 ml-2"
          >
            Clear
          </button>
        </form>
      </Card>
    </>
  );
};

export default Addapp;
