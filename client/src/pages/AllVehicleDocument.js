import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
//import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import ToastContext from "../context/ToastContext";

export const AllVehicleDocument = () => {
  const { toast } = useContext(ToastContext);

  const [inpval, setINP] = useState({
    registerNo: "",
    documentType: "",
  });

  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  //const [show, setShow] = useState(false);
  //const [show1, setShow1] = useState(false);
  //const [getvehicledata, setVehicledata] = useState([]);

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

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  const addImage = async (e) => {
    e.preventDefault();

    const { registerNo, documentType } = inpval;

    if (!registerNo || !documentType) {
      toast.error("please enter all the required fields!");
      return false;
    }

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("registerNo", registerNo);
    formData.append("documentType", documentType);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await axios.post(
      "http://localhost:8000/api/registerImg",
      formData,
      config
    );

    if (res.data.status === 422) {
      console.log("errror");
    } else {
      toast.success(`${registerNo} vehicle ${documentType} is added`);
      //setShow(true);
    }
  };

  const getUserData = async () => {
    const res = await fetch("http://localhost:8000/api/getdocumentdata", {
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
      console.log("errror");
    } else {
      setData(data);
    }
  };

  // const getdata = async () => {

  //   const res = await fetch("/getdata", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });

  //   const data = await res.json();
  //   console.log(data);

  //   if (res.status === 422 || !data) {
  //     console.log("error ");

  //   } else {
  //     setVehicledata(data)
  //     console.log("get data");
  //   }
  // }

  const dltdoc = async (id) => {
    const res = await fetch(`http://localhost:8000/api/deletedoc/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //Newly added
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // const deletedata = await res.json();
    // console.log(deletedata);

    if (res.status === 422) {
      console.log("error");
    } else {
      toast.success(`Image is deleted`);
      console.log("user delete");
      //setShow1(true)
    }
  };

  // const searchHandle = async (e) => {
  //   let key = e.target.value;

  //   if (key) {
  //     let result = await fetch(`/searchdoc/${key}`);
  //     result = await result.json();
  //     if (result) {
  //       setData(result)
  //     }
  //   } else {
  //     getUserData()
  //   }
  // }

  useEffect(() => {
    getUserData();
    //getdata()
  }, [dltdoc]);

  return (
    <>
      {/* {
        show ? <Alert variant="success" onClose={() => setShow(false)} dismissible>
          Vehicle Document Added Succesfully
        </Alert> : ""
      }
      {
        show1 ? <Alert variant="danger" onClose={() => setShow1(false)} dismissible>
          Vehicle Document Deleted
        </Alert> : ""
      } */}
      {/* <div className='mt-5'>
        <div className="container">
          <div className='add_btn mt-2 mb-2'>
            <NavLink to="/vehicledocuploads" className='btn btn-primary'>Add document</NavLink>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          </div>

          <table class="table">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Doc Id</th>
                <th scope="col">Vehicle No</th>
                <th scope="col">Image</th>
                <th scope="col">Document Type</th>
                <th scope="col">Saved Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {
                data.length > 0 ? data.map((element, id) => {
                  return (
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.registerNo}</td>
                      <td><img src={`uploads/${element.imgpath}`} style={{ width: "100px", textAlign: "center", margin: "auto" }} /></td>
                      <td>{element.documentType}</td>
                      <td>{moment(element.date).calendar()}</td>
                      <td className='d-flex justify-content-between'>
                        <NavLink to=""><button className='btn btn-success'>read</button></NavLink>
                        <NavLink to=""><button className='btn btn-primary'>update</button></NavLink>
                        <button className='btn btn-danger' onClick={() => dltdoc(element._id)}>Delete</button>
                      </td>
                    </tr>

                  )
                }) : ""
              }

            </tbody>
          </table>
        </div>
      </div> */}

      <div className="grid-container">
        <div className="item">
          {/* <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 search-btn"
            aria-label="Search"
            onChange={searchHandle}
          /> */}
          {data.length > 0
            ? data.map((element, id) => {
                return (
                  <div className="card-container card">
                    <div>
                      <img
                        src={`vehicleuploads/${element.imgpath}`}
                        style={{
                          width: "100px",
                          textAlign: "center",
                          margin: "auto",
                        }}
                      />
                    </div>
                    <div>
                      <p>
                        <b>Vehicle No :</b> {element.registerNo}
                      </p>
                      <p>
                        <b>Document Type :</b> {element.documentType}
                      </p>
                      <p>
                        <b>Date Added :</b>{" "}
                        {moment(element.date).format("MMMM Do YYYY, h:mm:ss a")}
                      </p>
                    </div>
                    <div>
                      <NavLink to={`editdoc/${element._id}`}>
                        <button className="btn btn-primary">
                          <CreateIcon />
                        </button>
                      </NavLink>
                      <button
                        className="btn btn-danger"
                        onClick={() => dltdoc(element._id)}
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        <div className="item">
          <div className="container mt-3">
            <h3>Upload Vehicle Document Image Here</h3>

            <Form className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label className="label-size">Vehicle No</Form.Label>
                <Form.Control
                  type="text"
                  name="registerNo"
                  onChange={setdata}
                  placeholder="Enter Vehicle No"
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label className="label-size">Vehicle No</Form.Label>
                <select value={inpval.registerNo} onChange={setdata} name="registerNo" className="form-select">
                  <option>Select Vehicle No</option>
                  {
                    getvehicledata.map((opts, i) => <option>{opts.registerNo}</option>)
                  }
                </select>
              </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label className="label-size">Document Type</Form.Label>
                {/* <Form.Control type="text" name="documentType" onChange={setdata} placeholder="" /> */}
                <select
                  name="documentType"
                  onChange={setdata}
                  className="form-select"
                >
                  <option>Select Vehicle Document Type</option>
                  <option>Vehicle Registration Book</option>
                  <option>Vehicle Revenue License</option>
                </select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="label-size">
                  Select Vehicle Image
                </Form.Label>
                <Form.Control
                  type="file"
                  name="imgpath"
                  onChange={setimgfile}
                  placeholder=""
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={addImage}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
