// import { useEffect, useContext } from "react";
// // import Table from "@mui/material/Table";
// // import TableBody from "@mui/material/TableBody";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

// export const VMDashboard = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     !user && navigate("/login", { replace: true });
//   }, []);

//   return (
//     <div className="grid grid--2-col">
//       <div className="col-xl-6 col-g-12">
//         <div className="card mb-4 shadow-sm">
//           <article className="card-body">
//             <h5 className="card-title">Fuel Usage Monthly</h5>
//             <iframe
//               style={{
//                 background: "#FFFFFF",
//                 border: "none",
//                 borderRadius: "2px",
//                 boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
//                 width: "100%",
//                 height: "350px",
//               }}
//               src="https://charts.mongodb.com/charts-southern-agro-serve-yxqwr/embed/charts?id=643a98d8-2b11-4568-87cc-f10d0f93a26e&maxDataAge=3600&theme=light&autoRefresh=true"
//             ></iframe>
//           </article>
//         </div>

//         <div className="card mb-4 shadow-sm">
//           <article className="card-body">
//             <h5 className="card-title">Fuel Usage</h5>
//             <iframe
//               style={{
//                 background: "#FFFFFF",
//                 border: "none",
//                 borderRadius: "2px",
//                 boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
//                 width: "100%",
//                 height: "350px",
//               }}
//               src="https://charts.mongodb.com/charts-southern-agro-serve-yxqwr/embed/charts?id=644269dd-f57b-4888-8d30-a99cb4fe3c61&maxDataAge=3600&theme=light&autoRefresh=true"
//             ></iframe>
//           </article>
//         </div>
//       </div>
//     </div>
//   );
// };


import { useEffect, useContext, useState } from 'react'
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FuelUsageMonthly } from '../components/FuelUsageMonthly';
import { FuelUsage } from '../components/FuelUsage';
import { VehicleMileage } from '../components/VehicleMileage';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faTools,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export const VMDashboard = () => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [getvehicledata, setVehicledata] = useState([]);
  const [getgaragedata, setGaragedata] = useState([]);
  const [getrunningdata, setRunningdata] = useState([]);
  const [getscheduledata, setscheduledata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const getdata = async (e) => {

    const res = await fetch("/api/getvehiclerunningdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setRunningdata(data)
      console.log("get data");
    }
  }

  const getschedulerdata = async (e) => {

    // const res = await fetch(`http://localhost:8000/api/myschedules`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // });

    // const data = await res.json();
    // console.log(data);

    // if (res.status === 422 || !data) {
    //   console.log("error ");

    // } else {
    //   setscheduledata(data.schedule)
    //   console.log("get data");
    // }

      const res = await fetch(`http://localhost:8000/api/myschedules`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      console.log(result)
      if (!result.error) {
        setscheduledata(result.schedule);
      } else {
        console.log(result);
      }

  }

  const getvehidata = async (e) => {

    const res = await fetch("/api/getvehidata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setVehicledata(data)
      console.log("get data");
    }
  }

  const getgaradata = async (e) => {

    const res = await fetch("/api/getgaragedata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setGaragedata(data)
      console.log("get data");
    }
  }

  useEffect(() => {
    !user && navigate("/login", { replace: true });
    getdata();
    getvehidata();
    getgaradata();
    getschedulerdata();
  }, []);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Vehicle Managment Dashboard</h2>
        </div>
        <div className="row">

          <div className="col-lg-6">
            <div className="card card-body mb-4 shadow-sm">
              <article className="icontext">
                <span className="icon icon-sm rounded-circle alert-primary">
                  <FontAwesomeIcon
                    icon={faTruck}
                    style={{ marginRight: "10px", color: "#03c988" }}
                  />
                </span>
                <div className="text">
                  <h6 className="mb-1">
                    Total Vehicle's
                  </h6>
                  <span><b>{getvehicledata.length}</b></span>
                </div>
              </article>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card card-body mb-4 shadow-sm">
              <article className="icontext">
                <span className="icon icon-sm rounded-circle alert-primary">
                  <FontAwesomeIcon
                    icon={faTools}
                    style={{ marginRight: "10px", color: "#03c988" }}
                  />
                </span>
                <div className="text">
                  <h6 className="mb-1">
                    Total Garage's
                  </h6>
                  <span><b>{getgaragedata.length}</b></span><br></br>
                  {/* <span><b>{getscheduledata.length}</b></span> */}
                </div>
              </article>
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-xl-6 col-g-12">
            <FuelUsageMonthly />
          </div>
          <div className="col-xl-6 col-g-12">
            <FuelUsage />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-g-12">
            <VehicleMileage />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-g-12">
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='tHead'>
                  <TableRow>
                    <TableCell className="tableCell">Vehicle No</TableCell>
                    <TableCell className="tableCell">Driver Name</TableCell>
                    <TableCell className="tableCell">Route Details</TableCell>
                    <TableCell className="tableCell">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    getrunningdata.map((opts, i) => {
                      if (opts.comment !== "none") {
                        return (
                          <TableRow onClick={() => {
                            setModalData({});
                            setModalData(opts)
                            setShowModal(true);
                          }}>
                            <TableCell className="tableCell">{opts.registerNo}</TableCell>
                            <TableCell className="tableCell">{opts.driverName}</TableCell>
                            <TableCell className="tableCell">{opts.routeDetails}</TableCell>
                            <TableCell className="tableCell" style={{ backgroundColor: 'red', color: 'white', width: '100px', height: '50px' }}>
                              <span className="status">Breakdown</span>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    }

                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.registerNo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.registerNo}</h3>
          <p><strong>Driver Name :</strong> {modalData.driverName}</p>
          <p><strong>Route Details :</strong> {modalData.routeDetails}</p>
          <p><strong>Comment :</strong> {modalData.comment}</p>
        </Modal.Body>

        <Modal.Footer>
          <Link to="/repairAssign" className="btn btn-warning">Assign driver for repair</Link>
        </Modal.Footer>
      </Modal>

    </>

  )
}
