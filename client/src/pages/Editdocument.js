import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Editdocument = () => {
  const [inpval, setINP] = useState({
    registerNo: "",
    documentType: "",
  });

  const [image, setImage] = useState("");

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

  const history = useNavigate();

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/getdocVehicle/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("get data");
    }
  };

  const updatedocvehicle = async (e) => {
    e.preventDefault();

    const { registerNo, documentType } = inpval;

    if (!registerNo || !documentType) {
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
    vehicledata.append("documentType", documentType);
    vehicledata.append("photo", image);

    //const data2 = await res2.json();
    // console.log(data2);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.patch(
      `/updatedocvehicle/${id}`,
      vehicledata,
      config
    );

    if (res.status === 422) {
      alert("fill the data");
    } else {
      alert("success");
      history("/");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="container mt-3">
      <h3>Upload Vehicle Document Image Here</h3>

      <Form className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label className="label-size">Vehicle No</Form.Label>
          <Form.Control
            type="text"
            value={inpval.registerNo}
            onChange={setdata}
            name="registerNo"
            placeholder="Enter Vehicle No"
            readOnly
          />
        </Form.Group>
        {/* <Form.Group className="mb-3">
                <Form.Label className="label-size">Vehicle No</Form.Label>
                <select value={inpval.registerNo} onChange={setdata} name="registerNo" className="drop_down form">
                  <option>Select Vehicle No</option>
                  {
                    getvehicledata.map((opts, i) => <option>{opts.registerNo}</option>)
                  }
                </select>
              </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label className="label-size">Document Type</Form.Label>
          <Form.Control
            type="text"
            value={inpval.documentType}
            onChange={setdata}
            name="documentType"
            placeholder=""
            readOnly
          />
          {/* <select name="documentType" value={inpval.documentType} value={inpval.documentType} onChange={setdata} className="drop_down form">
                                <option>Select Fuel Type</option>
                                <option>Vehicle Registration Book</option>
                                <option>Vehicle Revenue License</option>
                            </select> */}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label-size">Select Vehicle Image</Form.Label>
          <Form.Control
            type="file"
            onChange={setProfile}
            name="imgpath"
            placeholder=""
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={updatedocvehicle}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
