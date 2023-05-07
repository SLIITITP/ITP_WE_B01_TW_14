import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import ToastContext from "../context/ToastContext";

export const AddRepair = () => {
  const { toast } = useContext(ToastContext);

  const [inpval, setINP] = useState({
    registerNo: "",
    addedDriver: "",
    garage: "",
    Amount: "",
    comment: "",
  });

  const [image, setImage] = useState("");
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

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { registerNo, addedDriver, garage, Amount, comment } = inpval;

    if (!registerNo || !addedDriver || !garage || !Amount || !comment) {
      return false;
    }

    // const res = await fetch("/registerVehicle", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         registerNo,brand,model,vehicleType,engineCapacity, vehicleColor, manufactureYear, fuelType,vehicleClass,chassisNo,LicenceExpiredDate, InsuranceExpiredDate
    //     })
    // });

    const repairdata = new FormData();
    repairdata.append("registerNo", registerNo);
    repairdata.append("addedDriver", addedDriver);
    repairdata.append("garage", garage);
    repairdata.append("Amount", Amount);
    repairdata.append("comment", comment);
    repairdata.append("invoiceImg", image);

    //const data = await res.json();
    // console.log(data);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await axios.post(
      "http://localhost:8000/api/addrepair",
      repairdata,
      config
    );

    if (res.status === 422) {
      console.log("error ");
      alert("error");
    } else {
      toast.success(`${registerNo} vehicle reapir details added successfuly`);
      //setShow(true);
      console.log("data added");
    }
  };

  const getdata = async (e) => {
    const res = await fetch("/api/getvehidata", {
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
    const res = await fetch("/api/getgaragedata", {
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
                    Repair Details Added Succesfully
                </Alert> : ""
            } */}
      <div className="container mt-2">
        <div className="d-flex">
          <h2>Add Maintenance and Repair Details</h2>
        </div>
        <Card className="shadow card">
          <Form className="mt-4">
            <div className="row">
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Vehicle No</Form.Label>
                            <Form.Control type="email" value={inpval.registerNo} onChange={setdata} name="registerNo" placeholder="Enter Vehicle No" />
                        </Form.Group> */}
              <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
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
              <Form.Group
                className="mb-3 col-lg-6 col-md-6 col-12"
                controlId="formBasicEmail"
              >
                <Form.Label>Added Driver</Form.Label>
                <Form.Control
                  type="text"
                  value={inpval.addedDriver}
                  onChange={setdata}
                  name="addedDriver"
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Garage</Form.Label>
                            <Form.Control type="email" value={inpval.garage} onChange={setdata} name="garage" placeholder="Enter garage" />
                        </Form.Group> */}
              <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
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
              <Form.Group
                className="mb-3 col-lg-6 col-md-6 col-12"
                controlId="formBasicEmail"
              >
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  value={inpval.Amount}
                  onChange={setdata}
                  name="Amount"
                  placeholder="Enter Amount(Rs.)"
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-lg-6 col-md-6 col-12"
                controlId="formBasicPassword"
              >
                <Form.Label>Invoice</Form.Label>
                <Form.Control
                  type="file"
                  name="invoiceImg"
                  onChange={setProfile}
                  placeholder=""
                />
              </Form.Group>
              <Form.Group
                className="mb-3 col-lg-6 col-md-6 col-12"
                controlId="formBasicEmail"
              >
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={inpval.comment}
                  onChange={setdata}
                  name="comment"
                />
              </Form.Group>
            </div>
            {/* <Button variant="primary" type="submit" onClick={addinpdata} class="btn-style"> */}
            <button type="submit" onClick={addinpdata} class="btn-style">
              Add
            </button>
            {/* Add
                        </Button> */}
          </Form>
        </Card>
      </div>
    </>
  );
};
