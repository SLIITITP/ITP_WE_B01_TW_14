import { useEffect, useState } from 'react'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const ViewFuelDetails = () => {

    const [getfueldata, setFueldata] = useState([]);
    const [vehicleNo, setVehicleNo] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getdata = async (e) => {

        const res = await fetch(`/api/getfueldata?vehicleNo=${vehicleNo}&startDate=${startDate}&endDate=${endDate}`, {
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
            setFueldata(data)
            console.log("get data");
        }
    }

    const totalFuel = getfueldata.reduce((acc, curr) => acc + curr.capacity, 0);
    const totalCost = getfueldata.reduce((acc, curr) => acc + curr.Amount, 0);

    const handlePrintAll = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Southern Agro Serve (Pvt) limited \nFuel Records \n\n", marginLeft, 40);
        const headers = [["Vehicle No", "Fuel Type", "Capacity", "Amount(Rs.)"]];

        const data = getfueldata.map((ele) => [
            ele.registerNo,
            ele.fuelType,
            ele.capacity,
            ele.Amount,
            new Date(ele.fueldate).toLocaleDateString()
        ])
        let content = {
            startY: 70,
            head: headers,
            body: data
        };

        doc.autoTable(content)
        doc.text(`\nTotal Fuel: ${totalFuel} liter`, marginLeft, doc.autoTable.previous.finalY + 10);
        doc.text(`\n\nTotal Cost for Fuel: Rs.${totalCost}`, marginLeft, doc.autoTable.previous.finalY + 10);
        doc.save("Fuel-Record.pdf")
    }

    useEffect(() => {
        getdata();
    }, [vehicleNo, startDate, endDate]);

    // const totalFuel = getfueldata.reduce((acc, curr) => acc + curr.capacity, 0);
    // const totalCost = getfueldata.reduce((acc, curr) => acc + curr.Amount, 0);

    return (

        <div>
            <h1>Fuel Records</h1>
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
            {/* bhanuka */}

            <br />
            <br />

            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: -40, right: 0 }}>
                    <h2>Total Cost: {totalCost}</h2>
                </div>
                <div style={{ position: 'absolute', top: -40, left: 0 }}>
                    <h2>Total Fuel: {totalFuel}</h2>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-g-12">
                        <TableContainer className="table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='tHead'>
                                    <TableRow>
                                        <TableCell className="tableCell">Vehicle No</TableCell>
                                        <TableCell className="tableCell">Fuel Type</TableCell>
                                        <TableCell className="tableCell">Capacity</TableCell>
                                        <TableCell className="tableCell">Amount</TableCell>
                                        <TableCell className="tableCell">Fuel Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        getfueldata.map((opts, i) => {
                                            return (
                                                <TableRow>
                                                    <TableCell className="tableCell">{opts.registerNo}</TableCell>
                                                    <TableCell className="tableCell">{opts.fuelType}</TableCell>
                                                    <TableCell className="tableCell">{opts.capacity}</TableCell>
                                                    <TableCell className="tableCell">Rs.{opts.Amount}</TableCell>
                                                    <TableCell className="tableCell">{new Date(opts.fueldate).toLocaleDateString()}</TableCell>
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
