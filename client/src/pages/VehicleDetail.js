import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export const VehicleDetail = () => {
  const [getvehicledata, setVehicledata] = useState([]);
  console.log(getvehicledata);

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
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getvehicledata._id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button className="btn btn-danger">
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img
                src={`/vehicleuploads/${getvehicledata.vehicleImg}`}
                style={{ width: 50 }}
                alt="profile"
              />
              <h3 className="mt-3">
                Register No: <span>{getvehicledata.registerNo}</span>
              </h3>
              <h3 className="mt-3">
                Brand: <span>{getvehicledata.brand}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon />
                Model: <span>{getvehicledata.model}</span>
              </p>
              <p className="mt-3">
                <WorkIcon />
                Fuel Type: <span>{getvehicledata.fuelType}</span>
              </p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneAndroidIcon />
                Vehicle Class: <span>{getvehicledata.vehicleClass}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Chassis No: <span>{getvehicledata.chassisNo}</span>
              </p>
              <p className="mt-3">
                License Expired date:{" "}
                <span>{getvehicledata.LicenceExpiredDate}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
