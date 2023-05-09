import { useEffect, useState } from 'react'
//import axios from "axios"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const ViewRunningRecords = () => {

    const [getrunningdata, setRunningdata] = useState([]);
    const [vehicleNo, setVehicleNo] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getdata = async (e) => {

        const res = await fetch(`/api/getrunningdata?vehicleNo=${vehicleNo}&startDate=${startDate}&endDate=${endDate}`, {
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

    const handlePrintAll = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Southern Agro Serve (Pvt) limited \nVehicle Running Records \n\n", marginLeft, 40);
        const headers = [["Vehicle No", "Driver Name", "Route Details", "No of Miles"]];

        const data = getrunningdata.map((ele) => [
            ele.registerNo,
            ele.driverName,
            ele.routeDetails,
            ele.noOfMiles
        ])
        let content = {
            startY: 70,
            head: headers,
            body: data
        };

        doc.autoTable(content)
        doc.save("all-runningrecord.pdf")
    }

    useEffect(() => {
        getdata();
    }, [vehicleNo, startDate, endDate]);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //       const response = await axios.get("/getvehiclerunningdata", {
    //         params: { vehicleNo, startDate, endDate, driverName },
    //       });

    //       setRunningdata(response.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    const totalMileage = getrunningdata.reduce((acc, curr) => acc + curr.noOfMiles, 0);

    return (
        <div>
            <h1>Vehicle Running Records</h1>
            {/* <button className="btn btn-warning mx-2" onClick={() => handlePrintAll()}>Generate Report</button> */}
            <form>
                <div className="row">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-6 mb-3">
                        <label>
                            <b>Vehicle No:</b>
                            <input
                                type="text"
                                value={vehicleNo}
                                onChange={(event) => setVehicleNo(event.target.value)}
                                class="form-control"
                            />
                        </label>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-6 mb-3">
                        <label>
                            <b>Start Date:</b>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                class="form-control"
                            />
                        </label>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-6 mb-3">
                        <label>
                            <b>End Date:</b>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                                class="form-control"
                            />
                        </label>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-6 mb-3">
                        <br></br>
                    <button className="btn btn-warning mx-2" onClick={() => handlePrintAll()}>Generate Report</button>
                    </div>
                </div>
            </form>

            <br />
            <br />

            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: -40, right: 0 }}>
                    <h2>Total Mileage: {totalMileage}</h2>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-g-12">
                        <TableContainer className="table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='tHead'>
                                    <TableRow>
                                        <TableCell className="tableCell">Vehicle No</TableCell>
                                        <TableCell className="tableCell">Driver Name</TableCell>
                                        <TableCell className="tableCell">Route Details</TableCell>
                                        <TableCell className="tableCell">No of Miles</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        getrunningdata.map((opts, i) => {
                                            return (
                                                <TableRow>
                                                    <TableCell className="tableCell">{opts.registerNo}</TableCell>
                                                    <TableCell className="tableCell">{opts.driverName}</TableCell>
                                                    <TableCell className="tableCell">{opts.routeDetails}</TableCell>
                                                    <TableCell className="tableCell">
                                                        {opts.noOfMiles}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }

                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
