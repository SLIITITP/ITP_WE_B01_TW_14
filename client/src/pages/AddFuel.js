import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
//import Alert from 'react-bootstrap/Alert';
import Card from "react-bootstrap/Card";
import ToastContext from "../context/ToastContext";

export const AddFuel = () => {
  const { toast } = useContext(ToastContext);

  const [inpval, setINP] = useState({
    registerNo: "",
    fuelType: "",
    capacity: "",
    Amount: "",
    fillingStation: "",
  });

  const [getvehicledata, setVehicledata] = useState([]);
  //const [show, setShow] = useState(false);

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { registerNo, fuelType, capacity, Amount, fillingStation } = inpval;

    const res = await fetch("http://localhost:8000/api/addFuel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Newly added
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        registerNo,
        fuelType,
        capacity,
        Amount,
        fillingStation,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      //console.log("error ");
      //alert("error");
      toast.error("please enter all the required fields!");
    } else {
      //setShow(true);
      //alert("data added");
      toast.success(`${registerNo} vehicle fuel details added Successfully`);
      console.log("data added");
    }
  };

  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Newly added
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setVehicledata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {/* {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Fuel Details Added Succesfully
                </Alert> : ""
            } */}
      <div className="container">
        <NavLink to="/">home</NavLink>
        <div className="container mt-2">
          <div className="d-flex">
            <h2>Fuel Usage</h2>
          </div>
          <Card className="shadow card">
            <Form className="mt-4">
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Register No</label>
                        <input type="text" value={inpval.registerNo} onChange={setdata} name="registerNo" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div> */}
              <div className="row">
                <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
                  <Form.Label>Vehicle No</Form.Label>
                  <select
                    value={inpval.registerNo}
                    onChange={setdata}
                    name="registerNo"
                    className="form-select"
                  >
                    <option>Select Vehicle No</option>
                    {getvehicledata.map((opts, i) => (
                      <option>{opts.registerNo}</option>
                    ))}
                  </select>
                </Form.Group>
                <div class="mb-3 col-lg-6 col-md-6 col-12">
                  <label class="form-label">Fuel Type</label>
                  <select
                    value={inpval.fuelType}
                    onChange={setdata}
                    name="fuelType"
                    className="form-select"
                  >
                    <option>Select Fuel Type</option>
                    <option>Diesal</option>
                    <option>Petrol</option>
                  </select>
                </div>
                {/* <Form.Group className="mb-3 col-lg-6 col-md-6 col-12" controlId="formBasicEmail">
                            <Form.Label>Fuel Type</Form.Label>
                            <Form.Control type="email" value={inpval.fuelType} onChange={setdata} name="fuelType" />
                        </Form.Group> */}
                {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Capacity(L)</label>
                        <input type="text" value={inpval.capacity} onChange={setdata} name="capacity" class="form-control" id="exampleInputPassword1" />
                    </div> */}
                <Form.Group
                  className="mb-3 col-lg-6 col-md-6 col-12"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Capacity (L)</Form.Label>
                  <Form.Control
                    type="text"
                    value={inpval.capacity}
                    onChange={setdata}
                    name="capacity"
                  />
                </Form.Group>

                {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Amount(Rs.)</label>
                        <input type="text" value={inpval.Amount} onChange={setdata} name="Amount" class="form-control" id="exampleInputPassword1" />
                    </div> */}
                <Form.Group
                  className="mb-3 col-lg-6 col-md-6 col-12"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Amount (Rs.)</Form.Label>
                  <Form.Control
                    type="text"
                    value={inpval.Amount}
                    onChange={setdata}
                    name="Amount"
                  />
                </Form.Group>
                {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Filling Station</label>
                        <input type="text" value={inpval.fillingStation} onChange={setdata} name="fillingStation" class="form-control" id="exampleInputPassword1" />
                    </div> */}
                <Form.Group
                  className="mb-3 col-lg-6 col-md-6 col-12"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Filling Station</Form.Label>
                  <Form.Control
                    type="text"
                    value={inpval.fillingStation}
                    onChange={setdata}
                    name="fillingStation"
                  />
                </Form.Group>
              </div>

              <button type="submit" onClick={addinpdata} class="btn-style">
                Add
              </button>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};
