// import { useState, useEffect, useContext } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Badge from "react-bootstrap/Badge";
// import Card from "react-bootstrap/Card";
// import Modal from "react-bootstrap/Modal";
// import AuthContext from "../context/AuthContext";
// import ToastContext from "../context/ToastContext";

// export const AllVehicle = () => {
//   const { user } = useContext(AuthContext);
//   const { toast } = useContext(ToastContext);

//   const [getvehicledata, setVehicledata] = useState([]);
//   console.log(getvehicledata);

//   //const [show, setShow] = useState(false);
//   //const [showspin,setShowSpin] = useState(true);
//   const navigate = useNavigate();
//   //const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalData, setModalData] = useState({});



//   const adduser = () => {
//     navigate("/registerVehicle");
//   };

//   const getdata = async (e) => {
//     const res = await fetch("http://localhost:8000/api/getdata", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         //Newly added
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     const data = await res.json();
//     console.log(data);

//     if (res.status === 422 || !data) {
//       console.log("error ");
//     } else {
//       setVehicledata(data);
//       console.log("get data");
//     }
//   };

//   const deletevehicle = async (id) => {
//     if (window.confirm("Are you sure want to delete this vehicle details ? ")) {
//       const res2 = await fetch(`/deletevehicle/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           //Newly added
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const deletedata = await res2.json();
//       console.log(deletedata);

//       if (res2.status === 422 || !deletedata) {
//         toast.error(deletedata.error);
//         console.log("error");
//       } else {
//         toast.success(`${deletedata.registerNo} is deleted`);
//         //setShow(true);
//         console.log("user deleted");
//         getdata();
//       }
//     }
//   };

//   const searchHandle = async (e) => {
//     let key = e.target.value;

//     if (key) {
//       let result = await fetch(`http://localhost:8010/search/${key}`);
//       result = await result.json();
//       if (result) {
//         setVehicledata(result);
//       }
//     } else {
//       getdata();
//     }
//   };

//   useEffect(() => {
//     !user && navigate("/login", { replace: true });
//     getdata();
//   }, []);

//   return (
//     <>
//       {/* {
//         show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
//           Vehicle Details Deleted Succesfully
//         </Alert> : ""
//       } */}
//       <div className="mt-5">
//         <div className="container">
//           {/* <div className='add_btn mt-2 mb-2'>
//                 <NavLink to="/registerVehicle" className='btn btn-primary'>Add data</NavLink>
//                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchHandle}/>
//             </div> */}

//           <div className="search_add mt-4 mb-4 d-flex justify-content-between">
//             <div className="search col-lg-4">
//               <Form className="d-flex">
//                 <Form.Control
//                   type="search"
//                   placeholder="Search"
//                   className="me-2"
//                   aria-label="Search"
//                   onChange={searchHandle}
//                 />
//                 <Button variant="success" className="search_btn">
//                   Search
//                 </Button>
//               </Form>
//             </div>
//             <div className="add_btn">
//               <Button variant="primary" onClick={adduser}>
//                 {" "}
//                 <i class="fa-solid fa-plus"></i>&nbsp; Add Vehicle
//               </Button>
//             </div>
//           </div>

//           <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
//             <div className="filter_gender">
//               <div className="filter">
//                 <h3>Filter By Fuel Type</h3>
//                 <div className="gender d-flex justify-content-between">
//                   <Form.Check
//                     type={"radio"}
//                     label={`All`}
//                     name="All"
//                     value={"All"}
//                     defaultChecked
//                   />
//                   <Form.Check
//                     type={"radio"}
//                     label={`Diesal`}
//                     name="Diesal"
//                     value={"Diesal"}
//                   />
//                   <Form.Check
//                     type={"radio"}
//                     label={`Petrol`}
//                     name="Petrol"
//                     value={"Petrol"}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="filter_status">
//               <div className="status">
//                 <h3>Filter By Status</h3>
//                 <div className="status_radio d-flex justify-content-between flex-wrap">
//                   <Form.Check
//                     type={"radio"}
//                     label={`All`}
//                     name="status"
//                     value={"All"}
//                     defaultChecked
//                   />
//                   <Form.Check
//                     type={"radio"}
//                     label={`Active`}
//                     name="status"
//                     value={"Active"}
//                   />
//                   <Form.Check
//                     type={"radio"}
//                     label={`InActive`}
//                     name="status"
//                     value={"InActive"}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Card className="shadow">
//             <table class="table">
//               <thead>
//                 <tr className="table-dark">
//                   <th scope="col">Id</th>
//                   <th scope="col">Vehicle Register No</th>
//                   <th scope="col">Vehicle Image</th>
//                   <th scope="col">Vehicle Type</th>
//                   <th scope="col">Brand</th>
//                   <th scope="col">Model</th>
//                   <th scope="col">Fuel Type</th>
//                   <th scope="col">vehicle Color</th>
//                   <th scope="col">Vehicle Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {getvehicledata.map((element, id) => {
//                   return (
//                     <>
//                       <tr
//                         onClick={() => {
//                           setModalData({});
//                           setModalData(element);
//                           setShowModal(true);
//                         }}
//                       >
//                         <th scope="row">{id + 1}</th>
//                         <td>{element.registerNo}</td>
//                         <td>
//                           <img
//                             src={`vehicleuploads/${element.vehicleImg}`}
//                             className="image"
//                           />
//                         </td>
//                         <td>{element.vehicleType}</td>
//                         <td>{element.brand}</td>
//                         <td>{element.model}</td>
//                         <td>{element.fuelType}</td>
//                         <td>{element.vehicleColor}</td>
//                         <td>
//                           <Badge
//                             bg={
//                               element.vehicleStatus === "Active"
//                                 ? "success"
//                                 : "danger"
//                             }
//                           >
//                             {element.vehicleStatus}
//                           </Badge>
//                         </td>
//                         <td className="d-flex align-items-center">
//                           {/* <NavLink to={`viewVehicle/${element._id}`}><button className='btn btn-success gap'>read</button></NavLink>
//                             <NavLink to={`editVehicle/${element._id}`}><button className='btn btn-primary gap'>update</button></NavLink>
//                             <button className='btn btn-danger' onClick={() => deletevehicle(element._id)}>Delete</button> */}
//                         </td>
//                       </tr>
//                     </>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </Card>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{modalData.registerNo}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <center>
//             <img
//               src={`vehicleuploads/${modalData.vehicleImg}`}
//               className="image"
//             />
//           </center>
//           <h3>{modalData.registerNo}</h3>
//           <p>
//             <strong>Vehicle Type :</strong> {modalData.vehicleType}
//           </p>
//           <p>
//             <strong>Brand :</strong> {modalData.brand}
//           </p>
//           <p>
//             <strong>Model :</strong> {modalData.model}
//           </p>
//           <p>
//             <strong>Fuel Type :</strong> {modalData.fuelType}
//           </p>
//           <p>
//             <strong>Vehicle Color :</strong> {modalData.vehicleColor}
//           </p>
//           <p>
//             <strong>Insurance Expired Date :</strong>{" "}
//             {modalData.InsuranceExpiredDate}
//           </p>
//           <p>
//             <strong>Licence Expired Date :</strong>{" "}
//             {modalData.LicenceExpiredDate}
//           </p>
//           <p>
//             <strong>Vehicle Status :</strong>
//             {modalData.vehicleStatus}
//           </p>
//         </Modal.Body>

//         <Modal.Footer>
//           <NavLink
//             to={`editVehicle/${modalData._id}`}
//             className="btn btn-warning"
//           >
//             Update
//           </NavLink>
//           <button
//             className="btn btn-danger"
//             onClick={() => deletevehicle(modalData._id)}
//           >
//             Delete
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

import { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
//import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

export const AllVehicle = () => {

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [getvehicledata, setVehicledata] = useState([]);
  console.log(getvehicledata);

  //const [show, setShow] = useState(false);
  //const [showspin,setShowSpin] = useState(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal,setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [fuel, setFuel] = useState("All");
  const [status, setStatus] = useState("All");


  const adduser = () => {
    navigate("/registerVehicle")
  }

  const getdata = async (e) => {

    const res = await fetch(`/api/getdata?search=${search}&fuel=${fuel}&status=${status}`, {
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

  const deletevehicle = async (id) => {
    if(window.confirm("Are you sure want to delete this vehicle details ? ")){
    const res2 = await fetch(`/api/deletevehicle/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      toast.error(deletedata.error);
      console.log("error");
    } else {
      toast.success(`${deletedata.registerNo} is deleted`)
      //setShow(true);
      console.log("user deleted");
      getdata();
    }
    }
  }

  // const searchHandle = async (e) => {
  //   let key = e.target.value;

  //   if (key) {
  //     let result = await fetch(`http://localhost:8010/api/search/${key}`);
  //     result = await result.json();
  //     if (result) {
  //       setVehicledata(result)
  //     }
  //   } else {
  //     getdata()
  //   }
  // }

  useEffect(() => {
    !user && navigate("/login", { replace: true});
    getdata();
  }, [search,fuel,status])


  return (
    <>
      {/* {
        show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Vehicle Details Deleted Succesfully
        </Alert> : ""
      } */}
      <div className='mt-5'>
        <div className="container">
          {/* <div className='add_btn mt-2 mb-2'>
                <NavLink to="/registerVehicle" className='btn btn-primary'>Add data</NavLink>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchHandle}/>
            </div> */}

          <div className="search_add mt-4 mb-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  //onChange={searchHandle}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className='search_btn btn-info'>Search</Button>
              </Form>
            </div>
            <div className="add_btn ">
              <Button variant="primary" className="btn-info" onClick={adduser} >Add Vehicle</Button>
            </div>
          </div>

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Fuel Type</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="fuel"
                    value={"All"}
                    defaultChecked
                    onChange={(e) => setFuel(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Diesal`}
                    name="fuel"
                    value={"Diesal"}
                    onChange={(e) => setFuel(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Petrol`}
                    name="fuel"
                    value={"Petrol"}
                    onChange={(e) => setFuel(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="filter_status">
              <div className="status1">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    defaultChecked
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>



          </div>

          <Card className='shadow'>
            <table class="table">
              <thead>
                <tr className='tHead'>
                  <th scope="col"><b>Id</b></th>
                  <th scope="col"><b>Vehicle Register No</b></th>
                  <th scope="col"><b>Vehicle Image</b></th>
                  <th scope="col"><b>Vehicle Type</b></th>
                  <th scope="col"><b>Brand</b></th>
                  <th scope="col"><b>Model</b></th>
                  <th scope="col"><b>Fuel Type</b></th>
                  <th scope="col"><b>vehicle Color</b></th>
                  <th scope="col"><b>Vehicle Status</b></th>
                </tr>
              </thead>
              <tbody>

                {
                  getvehicledata.map((element, id) => {
                    return (
                      <>
                        <tr onClick={() => {
                        setModalData({});
                        setModalData(element)
                          setShowModal(true);
                          }}>
                          <th scope="row">{id + 1}</th>
                          <td>{element.registerNo}</td>
                          <td><img src={`vehicleuploads/${element.vehicleImg}`} className="image" /></td>
                          <td>{element.vehicleType}</td>
                          <td>{element.brand}</td>
                          <td>{element.model}</td>
                          <td>{element.fuelType}</td>
                          <td>{element.vehicleColor}</td>
                          <td>
                            <Badge bg={element.vehicleStatus === "Active" ? "success" : "danger"}>
                              {element.vehicleStatus} 
                            </Badge>
                          </td>
                          <td className='d-flex align-items-center'>
                            {/* <NavLink to={`viewVehicle/${element._id}`}><button className='btn btn-success gap'>read</button></NavLink>
                            <NavLink to={`editVehicle/${element._id}`}><button className='btn btn-primary gap'>update</button></NavLink>
                            <button className='btn btn-danger' onClick={() => deletevehicle(element._id)}>Delete</button> */}
                          </td>
                        </tr>
                      </>
                    )
                  })
                }

              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.registerNo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <center><img src={`vehicleuploads/${modalData.vehicleImg}`} className="image" /></center>
          <h3>{modalData.registerNo}</h3>
              <p><strong>Vehicle Type :</strong> {modalData.vehicleType}</p>
              <p><strong>Brand :</strong> {modalData.brand}</p>
              <p><strong>Model :</strong> {modalData.model}</p>
              <p><strong>Fuel Type :</strong> {modalData.fuelType}</p>
              <p><strong>Vehicle Color :</strong> {modalData.vehicleColor}</p>
              <p><strong>Insurance Expired Date :</strong> {modalData.InsuranceExpiredDate}</p>
              <p><strong>Licence Expired Date :</strong> {modalData.LicenceExpiredDate}</p>
              <p><strong>Vehicle Status :</strong>{modalData.vehicleStatus}</p>
        </Modal.Body>

        <Modal.Footer>
        <NavLink to={`editVehicle/${modalData._id}`} className="btn btn-warning">Update</NavLink>
        <button className="btn btn-danger" onClick={() => deletevehicle(modalData._id)}>Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

