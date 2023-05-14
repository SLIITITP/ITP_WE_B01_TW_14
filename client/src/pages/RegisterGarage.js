import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import ToastContext from "../context/ToastContext";

export const RegisterGarage = () => {
  const { toast } = useContext(ToastContext);

  const [inpval, setINP] = useState({
    garageName: "",
    garageOwner: "",
    Address: "",
    Email: "",
    ContactNo: "",
  });

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

    const { garageName, garageOwner, Address, Email, ContactNo } = inpval;

    const res = await fetch(`http://localhost:8000/api/addGarage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Newly added
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        garageName,
        garageOwner,
        Address,
        Email,
        ContactNo,
      }),
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      toast.success(`${garageName} added successfuly`);
      //setShow(true);
      // console.log("data added");
    }
  };

  return (
    <>
      {/* {
        show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
            Garage details Added Succesfully
        </Alert> : ""
    } */}
      <div className="container">
        <div className="d-flex">
          <h2>Register Garage</h2>
        </div>
        <Card className="shadow card">
          <form className="mt-4">
            <div className="row">
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputEmail1" class="form-label">
                  <b>Garage Name</b>
                </label>
                <input
                  type="text"
                  value={inpval.garageName}
                  onChange={setdata}
                  name="garageName"
                  class="form-control"
                  placeholder="Enter Garage Name"
                />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  <b>Garage Owner</b>
                </label>
                <input
                  type="text"
                  value={inpval.garageOwner}
                  onChange={setdata}
                  name="garageOwner"
                  class="form-control"
                  placeholder="Enter Garage Owner Name"
                />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  <b>Address</b>
                </label>
                <input
                  type="text"
                  value={inpval.Address}
                  onChange={setdata}
                  name="Address"
                  class="form-control"
                  placeholder="Enter Garage Address"
                />
              </div>

              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  <b>Email</b>
                </label>
                <input
                  type="text"
                  value={inpval.Email}
                  onChange={setdata}
                  name="Email"
                  class="form-control"
                  placeholder="Enter Garage Email Address"
                />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="text"
                  value={inpval.ContactNo}
                  onChange={setdata}
                  name="ContactNo"
                  class="form-control"
                  placeholder="Enter Garage Contact No"
                />
              </div>
            </div>

            <button type="submit" onClick={addinpdata} class="btn-style">
              Submit
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};
