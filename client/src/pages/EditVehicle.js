import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastContext from "../context/ToastContext";

export const EditVehicle = () => {
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
  //const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const history = useNavigate();

  // status optios
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
    console.log(e.value);
  };

  // const setProfile = (e) => {
  //     setImage(e.target.files[0])
  // }

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:8000/api/getVehicle/${id}`, {
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
      //toast.error(data.error)
      console.log("error ");
    } else {
      //toast.success(`${data.registerNo} is edited successfuly`)
      setINP(data);
      console.log("get data");
    }
  };

  const updatevehicle = async (e) => {
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
      toast.error("Please enter all required fields");
      setError(true);
      return false;
    }

    // const res2 = await fetch(`/updatevehicle/${id}`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         registerNo, brand, model, vehicleType,  vehicleColor, manufactureYear, fuelType,status,  chassisNo, LicenceExpiredDate, InsuranceExpiredDate
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
    //vehicledata.append("vehicleImg", image)

    //const data2 = await res2.json();
    // console.log(data2);

    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await axios.patch(
      `http://localhost:8000/api/updatevehicle/${id}`,
      vehicledata,
      config
    );

    if (res.status === 422) {
      toast.error(res.error);
    } else {
      toast.success(`${registerNo} is edited successfuly`);
      history("/allvehicle");
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {show ? (
        <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          Vehicle Details Edited Succesfully
        </Alert>
      ) : (
        ""
      )}
      <div className="container">
        <NavLink to="/">home</NavLink>
        <div className="d-flex">
          <h2>Update Vehicle Details</h2>
        </div>
        <Card className="shadow card">
          <form className="mt-4">
            <div className="row">
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputEmail1" class="form-label">
                  Register No
                </label>
                <input
                  type="text"
                  value={inpval.registerNo}
                  onChange={setdata}
                  name="registerNo"
                  class="form-control"
                />
                {error && !inpval.registerNo && (
                  <span className="invalid-input">
                    Register No can't be Empty
                  </span>
                )}
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputEmail1" class="form-label">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  value={inpval.vehicleType}
                  onChange={setdata}
                  name="vehicleType"
                  class="form-control"
                />
                {error && !inpval.vehicleType && (
                  <span className="invalid-input">
                    Vehicle Type can't be Empty
                  </span>
                )}
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Brand
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
                  Model
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
                  Fuel Type
                </label>
                <select
                  value={inpval.fuelType}
                  onChange={setdata}
                  name="fuelType"
                  className="form-select"
                >
                  <option>Select Vehicle No</option>
                  <option>Diesal</option>
                  <option>Petrol</option>
                </select>
                {error && !inpval.fuelType && (
                  <span className="invalid-input">
                    Fuel Type can't be Empty
                  </span>
                )}
              </div>
              {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                            <Form.Label>Select Your Profile</Form.Label>
                            <Form.Control type="file" name='vehicleImg' onChange={setProfile}  placeholder='Select Your Profile' />
                        </Form.Group> */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Status</Form.Label>
                <Select
                  options={options}
                  onChange={setStatusValue}
                  name="vehicleStatus"
                />
              </Form.Group>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Vehicle Color
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
                  Manufacture Year
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
                  Chassis No
                </label>
                <input
                  type="text"
                  value={inpval.chassisNo}
                  onChange={setdata}
                  name="chassisNo"
                  class="form-control"
                />
                {error && !inpval.chassisNo && (
                  <span className="invalid-input">
                    Chassis No can't be Empty
                  </span>
                )}
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Licence Expired Date
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
                  Insurance Expired Date
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

            <button type="submit" onClick={updatevehicle} class="btn-style">
              Update
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};
