import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
//import Alert from 'react-bootstrap/Alert';
import Form from "react-bootstrap/Form";
import Select from "react-select";
//import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import ToastContext from "../context/ToastContext";

export const AddVehicle = () => {
  const { toast } = useContext(ToastContext);

  const [error, setError] = useState(false);

  const [inpval, setINP] = useState({
    registerNo: "",
    brand: "",
    model: "",
    vehicleType: "",
    vehicleColor: "",
    manufactureYear: "",
    fuelType: "",
    chassisNo: "",
    LicenceExpiredDate: "",
    InsuranceExpiredDate: "",
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  //const [show, setShow] = useState(false);
  const history = useNavigate();

  // status options
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

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

  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const {
      registerNo,
      brand,
      model,
      vehicleType,
      vehicleColor,
      manufactureYear,
      fuelType,
      chassisNo,
      LicenceExpiredDate,
      InsuranceExpiredDate,
    } = inpval;

    if (
      !registerNo ||
      !brand ||
      !model ||
      !vehicleType ||
      !vehicleColor ||
      !manufactureYear ||
      !fuelType ||
      !chassisNo ||
      !LicenceExpiredDate ||
      !InsuranceExpiredDate
    ) {
      setError(true);
      return false;
    }

    if (registerNo.length > 8) {
      toast.error("Inavlid Register No.....");
      return false;
    }

    if (manufactureYear.length !== 4) {
      toast.error("Invalid manufacturing year!..");
      return false;
    }

    if (chassisNo.length > 20) {
      toast.error("Invalid Chassis No.....");
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

    const vehicledata = new FormData();
    vehicledata.append("registerNo", registerNo);
    vehicledata.append("brand", brand);
    vehicledata.append("model", model);
    vehicledata.append("vehicleType", vehicleType);
    vehicledata.append("vehicleColor", vehicleColor);
    vehicledata.append("manufactureYear", manufactureYear);
    vehicledata.append("vehicleStatus", status);
    vehicledata.append("chassisNo", chassisNo);
    vehicledata.append("LicenceExpiredDate", LicenceExpiredDate);
    vehicledata.append("InsuranceExpiredDate", InsuranceExpiredDate);
    vehicledata.append("fuelType", fuelType);
    vehicledata.append("vehicleImg", image);

    //const data = await res.json();
    // console.log(data);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await axios.post(
      "http://localhost:8000/api/registerVehicle",
      vehicledata,
      config
    );

    if (res.status === 422) {
      console.log("error ");
      alert("error");
    } else {
      //setShow(true);
      toast.success(`${registerNo} vehicle details added successfuly`);
      history("/allvehicle");
      console.log("data added");
    }
  };

  return (
    <div className="container">
      <div className="d-flex">
        <h2 className="text-center bg-darkgreen text-white p-2">
          Register Vehicle
        </h2>
      </div>

      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              <b>Register No</b>
            </label>
            <input
              type="text"
              value={inpval.registerNo}
              onChange={setdata}
              name="registerNo"
              class="form-control"
            />
            {error && !inpval.registerNo && (
              <span className="invalid-input">Register No can't be Empty</span>
            )}
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              <b>Vehicle Type</b>
            </label>
            <input
              type="text"
              value={inpval.vehicleType}
              onChange={setdata}
              name="vehicleType"
              class="form-control"
            />
            {error && !inpval.vehicleType && (
              <span className="invalid-input">Vehicle Type can't be Empty</span>
            )}
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              <b>Brand</b>
            </label>
            <input
              type="email"
              value={inpval.brand}
              onChange={setdata}
              name="brand"
              class="form-control"
            />
            {error && !inpval.brand && (
              <span className="invalid-input">brand can't be Empty</span>
            )}
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              <b>Model</b>
            </label>
            <input
              type="text"
              value={inpval.model}
              onChange={setdata}
              name="model"
              class="form-control"
            />
            {error && !inpval.model && (
              <span className="invalid-input">Model can't be Empty</span>
            )}
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              <b>Fuel Type</b>
            </label>
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
            {error && !inpval.fuelType && (
              <span className="invalid-input">Fuel Type can't be Empty</span>
            )}
          </div>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>
              <b>Select Vehicle Image</b>
            </Form.Label>
            <Form.Control
              type="file"
              name="user_profile"
              onChange={setProfile}
              placeholder="Select Your Profile"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>
              <b>Select Vehicle Status</b>
            </Form.Label>
            <Select options={options} onChange={setStatusValue} />
          </Form.Group>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              <b>Vehicle Color</b>
            </label>
            <input
              type="text"
              value={inpval.vehicleColor}
              onChange={setdata}
              name="vehicleColor"
              class="form-control"
            />
            {error && !inpval.vehicleColor && (
              <span className="invalid-input">
                Vehicle Color can't be Empty
              </span>
            )}
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              <b>Manufacture Year</b>
            </label>
            <input
              type="text"
              value={inpval.manufactureYear}
              onChange={setdata}
              name="manufactureYear"
              class="form-control"
            />
            {error && !inpval.manufactureYear && (
              <span className="invalid-input">
                Manufacture Year can't be Empty
              </span>
            )}
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              <b>Chassis No</b>
            </label>
            <input
              type="text"
              value={inpval.chassisNo}
              onChange={setdata}
              name="chassisNo"
              class="form-control"
            />
            {error && !inpval.chassisNo && (
              <span className="invalid-input">Chassis No can't be Empty</span>
            )}
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              <b>Licence Expired Date</b>
            </label>
            <input
              type="date"
              name="LicenceExpiredDate"
              value={inpval.LicenceExpiredDate}
              onChange={setdata}
              className="form-control"
            />
            {error && !inpval.LicenceExpiredDate && (
              <span className="invalid-input">
                Licence Expired Date can't be Empty
              </span>
            )}
          </div>

          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              <b>Insurance Expired Date</b>
            </label>
            <input
              type="date"
              name="InsuranceExpiredDate"
              value={inpval.InsuranceExpiredDate}
              onChange={setdata}
              className="form-control"
            />
            {error && !inpval.InsuranceExpiredDate && (
              <span className="invalid-input">
                Insurance Expired Date can't be Empty
              </span>
            )}
          </div>
        </div>

        <button type="submit" onClick={addinpdata} class=" btn-style">
          Submit
        </button>
      </form>
    </div>
  );
};
