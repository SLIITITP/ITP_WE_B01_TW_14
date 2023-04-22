import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import Alert from 'react-bootstrap/Alert';
import ToastContext from "../context/ToastContext";

export const RepairAssign = () => {
  const { toast } = useContext(ToastContext);

  const [inpval, setINP] = useState({
    registerNo: "",
    driver: "",
    driverMail: "",
    garage: "",
    vehicleIssue: "",
  });

  //const [show, setShow] = useState(false);
  const [getvehicledata, setVehicledata] = useState([]);
  const [getgaradata, setGaragedata] = useState([]);

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

    const { registerNo, driver, driverMail, garage, vehicleIssue } = inpval;

    const res = await fetch("http://localhost:8000/api/assigndrivertorepair", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Newly added
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        registerNo,
        driver,
        driverMail,
        garage,
        vehicleIssue,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      toast.error("please enter all the required fields!");
      console.log("error ");
      //alert("error");
    } else {
      //setShow(true);
      //alert("data added");
      toast.success(`Driver Assign Successfully & Send Email to ${driver}`);
      console.log("data added");
    }
  };

  const getdata = async (e) => {
    const res = await fetch("http://localhost:8000/api/getdata", {
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

  const getgaragedata = async (e) => {
    const res = await fetch("http://localhost:8000/api/getgaragedata", {
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
      setGaragedata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    getgaragedata();
  }, []);

  return (
    <>
      {/* {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Send & Repair Assign Succesfully
                </Alert> : ""
            } */}
      <div className="container mt-2">
        <div className="d-flex justify-content-center">
          <h2>Maintenance and Repair Assignment</h2>
        </div>
        <div className="d-flex justify-content-center">
          <Form className="mt-2 col-lg-6">
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Vehicle No</Form.Label>
                            <Form.Control type="email" value={inpval.registerNo} onChange={setdata} name="registerNo" placeholder="Enter Vehicle No" />
                        </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>Vehicle No</Form.Label>
              <select
                value={inpval.registerNo}
                onChange={setdata}
                name="registerNo"
                className="form-select"
              >
                <option>Select Vehicle No</option>
                {getvehicledata.map((opts, i) => {
                  if (opts.vehicleStatus === "InActive") {
                    return <option>{opts.registerNo}</option>;
                  } else {
                    return null;
                  }
                })}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Driver Name</Form.Label>
              <Form.Control
                type="email"
                value={inpval.driver}
                onChange={setdata}
                name="driver"
                placeholder="Enter driver name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Driver Email</Form.Label>
              <Form.Control
                type="email"
                value={inpval.driverMail}
                onChange={setdata}
                name="driverMail"
                placeholder="Enter driver email"
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Garage</Form.Label>
                            <Form.Control type="email" value={inpval.garage} onChange={setdata} name="garage" placeholder="Enter garage" />
                        </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>Garage</Form.Label>
              <select
                value={inpval.garage}
                onChange={setdata}
                name="garage"
                className="form-select"
              >
                <option>Select garage</option>
                {getgaradata.map((opts, i) => (
                  <option>{opts.garageName}</option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Vehicle Issue</Form.Label>
              <Form.Control
                type="email"
                value={inpval.vehicleIssue}
                onChange={setdata}
                name="vehicleIssue"
                placeholder="Enter vehicle issue"
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addinpdata}>
              Assign
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
