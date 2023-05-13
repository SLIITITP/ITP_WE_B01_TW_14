// import { useState, useEffect, useContext } from "react";
// import { NavLink } from "react-router-dom";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import ToastContext from "../context/ToastContext";

// export const AddRunnigRecords = () => {
//   const { toast } = useContext(ToastContext);

//   const [inpval, setINP] = useState({
//     registerNo: "",
//     driverName: "",
//     noOfMiles: "",
//     routeDetails: "",
//     DeliverTime: "",
//     comment: "",
//   });

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

//     const {
//       registerNo,
//       driverName,
//       noOfMiles,
//       routeDetails,
//       DeliverTime,
//       comment,
//     } = inpval;

//     const res = await fetch("http://localhost:8000/api/addRecords", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         //Newly added
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({
//         registerNo,
//         driverName,
//         noOfMiles,
//         routeDetails,
//         DeliverTime,
//         comment,
//       }),
//     });

//     const data = await res.json();
//     console.log(data);

//     if (res.status === 422 || !data) {
//       toast.error(data.error);
//       console.log("error ");
//       //alert("error");
//     } else {
//       toast.success(`${registerNo} vehicle running records added successfully`);
//       //alert("data added");
//       console.log("data added");
//     }
//   };

//   const getdata = async (e) => {
//     const res = await fetch("/getdata", {
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
//     <div className="container">
//       <NavLink to="/">home</NavLink>
//       <div className="d-flex">
//         <h2>Vehicle Running Records</h2>
//       </div>
//       <Card className="shadow card">
//         <Form className="mt-4">
//           <div className="row">
//             <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
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
//                   } else {
//                     return null;
//                   }
//                 })}
//               </select>
//             </Form.Group>

//             <Form.Group
//               className="mb-3 col-lg-6 col-md-6 col-12"
//               controlId="formBasicEmail"
//             >
//               <Form.Label>Driver Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={inpval.driverName}
//                 onChange={setdata}
//                 name="driverName"
//               />
//             </Form.Group>

//             <Form.Group
//               className="mb-3 col-lg-6 col-md-6 col-12"
//               controlId="formBasicEmail"
//             >
//               <Form.Label>No Of Kilometers</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={inpval.noOfMiles}
//                 onChange={setdata}
//                 name="noOfMiles"
//               />
//             </Form.Group>

//             <Form.Group
//               className="mb-3 col-lg-6 col-md-6 col-12"
//               controlId="formBasicEmail"
//             >
//               <Form.Label>Route Details</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={inpval.routeDetails}
//                 onChange={setdata}
//                 name="routeDetails"
//               />
//             </Form.Group>

//             <Form.Group
//               className="mb-3 col-lg-6 col-md-6 col-12"
//               controlId="formBasicEmail"
//             >
//               <Form.Label>Deliver Time</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={inpval.DeliverTime}
//                 onChange={setdata}
//                 name="DeliverTime"
//               />
//             </Form.Group>

//             <Form.Group
//               className="mb-3 col-lg-6 col-md-6 col-12"
//               controlId="formBasicEmail"
//             >
//               <Form.Label>Accident/mechanical fault in the vehicle</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={inpval.comment}
//                 onChange={setdata}
//                 name="comment"
//               />
//             </Form.Group>
//           </div>

//           <button type="submit" onClick={addinpdata} class="btn-style">
//             Add
//           </button>
//         </Form>
//       </Card>
//     </div>
//   );
// };
import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import ToastContext from "../context/ToastContext";

export const AddRunnigRecords = () => {
    const { toast } = useContext(ToastContext);

    const [inpval, setINP] = useState({
        registerNo: "",
        driverName: "",
        noOfMiles: "",
        routeDetails: "",
        DeliverTime: "",
        comment: ""
    })

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

        const { registerNo, driverName, noOfMiles, routeDetails, DeliverTime, comment } = inpval;

        if(!registerNo || !driverName || !noOfMiles || !routeDetails || !DeliverTime || !comment){
            toast.error("Please enter all required fields")
            return false
        }

        if(routeDetails.length > 100){
            toast.error("Lenghty vehicle route...");
            return false
        }

        const res = await fetch("/api/addRecords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                registerNo, driverName, noOfMiles, routeDetails, DeliverTime, comment
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            toast.error(data.error);
            console.log("error ");
            //alert("error");

        } else {
            toast.success(`${registerNo} vehicle running records added successfully`)
            //alert("data added");
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
        <div className="container">
            <div className='d-flex'>
                <h2>Vehicle Running Records</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">
                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
                            <Form.Label>Vehicle No</Form.Label>
                            <select value={inpval.registerNo} onChange={setdata} name="registerNo" className="form-select">
                                <option>Select Vehicle No</option>
                                {
                                    getvehicledata.map((opts, i) => {
                                        if(opts.vehicleStatus === "Active"){
                                            return(
                                                <option>{opts.registerNo}</option>
                                            )
                                        }else{
                                            return null;
                                        }
                                    }
                                    
                                    )
                                }
                            </select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-12" controlId="formBasicEmail">
                            <Form.Label>Driver Name</Form.Label>
                            <Form.Control type="text" value={inpval.driverName} onChange={setdata} name="driverName" placeholder="ex-Kamal"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-12" controlId="formBasicEmail">
                            <Form.Label>No Of Kilometers</Form.Label>
                            <Form.Control type="text" value={inpval.noOfMiles} onChange={setdata} name="noOfMiles" placeholder="ex-123"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-12" controlId="formBasicEmail">
                            <Form.Label>Route Details</Form.Label>
                            <Form.Control type="text" value={inpval.routeDetails} onChange={setdata} name="routeDetails" placeholder="ex- X-Y-Z-K"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-12" controlId="formBasicEmail">
                            <Form.Label>Deliver Time</Form.Label>
                            <Form.Control type="text" value={inpval.DeliverTime} onChange={setdata} name="DeliverTime" placeholder="ex-10.20AM"/>
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-12" controlId="formBasicEmail">
                            <Form.Label>Accident/mechanical fault in the vehicle</Form.Label>
                            <Form.Control type="text" value={inpval.comment} onChange={setdata} name="comment" placeholder="ex- No accident(none)"/>
                        </Form.Group>
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn-style">Add</button>
                </Form>
            </Card>
        </div>
    )
}
