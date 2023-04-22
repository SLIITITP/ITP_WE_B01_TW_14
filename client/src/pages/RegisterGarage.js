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

    const res = await fetch("/addGarage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      toast.success(`${garageName} added successfuly`);
      //setShow(true);
      console.log("data added");
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
        <NavLink to="/">home</NavLink>
        <div className="d-flex">
          <h2>Register Garage</h2>
        </div>
        <Card className="shadow card">
          <form className="mt-4">
            <div className="row">
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputEmail1" class="form-label">
                  Garage Name
                </label>
                <input
                  type="text"
                  value={inpval.garageName}
                  onChange={setdata}
                  name="garageName"
                  class="form-control"
                />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Garage Owner
                </label>
                <input
                  type="text"
                  value={inpval.garageOwner}
                  onChange={setdata}
                  name="garageOwner"
                  class="form-control"
                />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  value={inpval.Address}
                  onChange={setdata}
                  name="Address"
                  class="form-control"
                />
              </div>

              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Email
                </label>
                <input
                  type="text"
                  value={inpval.Email}
                  onChange={setdata}
                  name="Email"
                  class="form-control"
                />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Contact No
                </label>
                <input
                  type="text"
                  value={inpval.ContactNo}
                  onChange={setdata}
                  name="ContactNo"
                  class="form-control"
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
