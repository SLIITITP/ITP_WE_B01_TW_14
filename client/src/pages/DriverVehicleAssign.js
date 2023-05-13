// import React, { useState, useEffect, useContext } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// //import Alert from 'react-bootstrap/Alert';
// import ToastContext from "../context/ToastContext";

// export const DriverVehicleAssign = () => {
//   const { toast } = useContext(ToastContext);

//   const [inpval, setINP] = useState({
//     registerNo: "",
//     driver: "",
//     driverMail: "",
//   });

//   //const [show, setShow] = useState(false);
//   const [getvehicledata, setVehicledata] = useState([]);

//   const setdata = (e) => {
//     console.log(e.target.value);
//     const { name, value } = e.target;
//     setINP((preval) => {
//       return {
//         ...preval,
//         [name]: value,
//       };
//     });
//   };

//   const addinpdata = async (e) => {
//     e.preventDefault();

//     const { registerNo, driver, driverMail } = inpval;

//     const res = await fetch("http://localhost:8000/api/assigndriver", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         //Newly added
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({
//         registerNo,
//         driver,
//         driverMail,
//       }),
//     });

//     const data = await res.json();
//     console.log(data);

//     if (res.status === 422 || !data) {
//       console.log("error ");
//       // alert("error");
//       toast.error("please enter all the required fields!");
//     } else {
//       //setShow(true);
//       //alert("data added");
//       toast.success(`Driver Assign Successfully & Send Email to ${driver}`);
//       console.log("data added");
//     }
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

//   useEffect(() => {
//     getdata();
//   }, []);

//   return (
//     <>
//       {/* {
//         show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
//             Your Email Send & Assign Succesfully
//         </Alert> : ""
//     } */}
//       <div className="container mt-2">
//         <div className="d-flex justify-content-center">
//           <h2>Driver-Vehicle Assignment</h2>
//         </div>
//         <div className="d-flex justify-content-center">
//           <Form className="mt-2 col-lg-6">
//             {/* <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Vehicle No</Form.Label>
//                             <Form.Control type="email" value={inpval.registerNo} onChange={setdata} name="registerNo" placeholder="Enter Vehicle No" />
//                         </Form.Group> */}
//             <Form.Group className="mb-3">
//               <Form.Label>Vehicle No</Form.Label>
//               <select
//                 value={inpval.registerNo}
//                 onChange={setdata}
//                 name="registerNo"
//                 className="form-select"
//               >
//                 <option>Select Vehicle No</option>
//                 {getvehicledata.map((opts, i) => {
//                   if (opts.vehicleStatus === "Active") {
//                     return <option>{opts.registerNo}</option>;
//                   }
//                 })}
//               </select>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Driver Name</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={inpval.driver}
//                 onChange={setdata}
//                 name="driver"
//                 placeholder="Enter driver name"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Driver Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={inpval.driverMail}
//                 onChange={setdata}
//                 name="driverMail"
//                 placeholder="Enter driver email"
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit" onClick={addinpdata}>
//               Assign
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// };


import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import Alert from 'react-bootstrap/Alert';
import ToastContext from "../context/ToastContext";
import Card from 'react-bootstrap/Card';

export const DriverVehicleAssign = () => {

    const { toast } = useContext(ToastContext);

    const [inpval, setINP] = useState({
        registerNo:"",
        driver:"",
        driverMail:""
    })

    //const [show, setShow] = useState(false);
    const [getvehicledata, setVehicledata] = useState([]);

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const addinpdata = async (e) => {
        e.preventDefault();

        const {registerNo,driver,driverMail } = inpval;

        const res = await fetch("/api/assigndriver", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                registerNo,driver,driverMail
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            // alert("error");
            toast.error("please enter all the required fields!")

        } else {
            //setShow(true);
            //alert("data added");
            toast.success(`Driver Assign Successfully & Send Email to ${driver}`)
            console.log("data added");
        }
    }

    const getdata = async (e) => {

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


    useEffect(() => {
        getdata();
      }, [])

  return (
    <>
    {/* {
        show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
            Your Email Send & Assign Succesfully
        </Alert> : ""
    } */}
    <div className="container mt-2">
                <div className='d-flex justify-content-center'>
                    <h2>Driver-Vehicle Assignment</h2>
                </div>
                <Card className='shadow card'>
                <div className="d-flex justify-content-center">
                    <Form className='mt-2 col-lg-6'>
                        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Vehicle No</Form.Label>
                            <Form.Control type="email" value={inpval.registerNo} onChange={setdata} name="registerNo" placeholder="Enter Vehicle No" />
                        </Form.Group> */}
                        <Form.Group className="mb-3">
                        <Form.Label>Vehicle No</Form.Label>
                            <select value={inpval.registerNo} onChange={setdata} name="registerNo" className="form-select">
                                <option>Select Vehicle No</option>
                                {
                                    getvehicledata.map((opts, i) => {
                                        if(opts.vehicleStatus === "Active"){
                                            return(
                                                <option>{opts.registerNo}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Driver Name</Form.Label>
                            <Form.Control type="email" value={inpval.driver} onChange={setdata} name="driver" placeholder="Enter driver name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Driver Email</Form.Label>
                            <Form.Control type="email" value={inpval.driverMail} onChange={setdata} name="driverMail" placeholder="Enter driver email" />
                        </Form.Group>
                        <Button variant="primary" className="btn-success" type="submit" onClick={addinpdata}>
                            Assign
                        </Button>
                    </Form>
                    
                </div>
                </Card>

            </div>
            </>
  )
}

