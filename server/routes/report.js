// const router = require("express").Router();
// const PDFDocument = require("pdfkit");
// const { Employee } = require("../models/Employee");
// const { Salary } = require("../models/Salary");
// const { Attendance } = require("../models/Attendance");

// router.get("/report", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     const salaries = await Salary.find();
//     const attendances = await Attendance.find();

//     // Create a new PDF document
//     const doc = new PDFDocument();

//     // Set the filename of the PDF to be downloaded
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

//     // Write data to the PDF
//     doc
//       .fontSize(40)
//       .fillColor("blue")
//       .text(
//         "Southern Agro Serve (Pvt) Ltd\n\n\n",
//         { align: "center" },
//         100,
//         100
//       );
//     //The 100,100 is the x and y coordinates
//     //You can use the doc.x and doc.y to get the current x and y coordinates
//     //If u align the text to the center, the x coordinate will be the center of the page
//     //Since here the text is aligned to the center, we don't need to specify the x coordinate
//     doc.fontSize(20).fillColor("black").text("Employee Details:\n");
//     employees.forEach((employee) => {
//       doc.fontSize(18).text(
//         `Employee ID : ${employee.empid}\n
//     Name of employee : ${employee.firstname} ${employee.lastname}\n
//   Email : ${employee.email}\n
//   Contact Number : ${employee.phone}\n
//   Date Joined : ${employee.datejoined}\n
//   Department : ${employee.department}\n
//   Designation : ${employee.designation}\n\n\n`
//       );
//     });
//     doc.fontSize(20).text("\nSalary Payments\n");
//     salaries.forEach((salary) => {
//       doc.fontSize(18).text(
//         `Amount:LKR${salary.salary}\n
//   Payment Date:(${salary.date})\n
//   Bonus:(${salary.bonus})\n\n\n`
//       );
//     });
//     doc.fontSize(20).text("\nAttendance\n");
//     attendances.forEach((attendance) => {
//       doc.fontSize(18).text(
//         `Employee ID:LKR${attendance.empid}\n
//   Date:(${attendance.date})\n
//   Entry Time:(${attendance.entrytime})\n
//   Off Time:(${attendance.offtime})\n\n\n`
//       );
//     });

//     // Pipe the PDF to the response object
//     doc.pipe(res);
//     doc.end();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Error generating report" });
//   }
// });

// module.exports = router;

// //https://www.npmjs.com/package/pdfkit

// //https://pdfkit.org/docs/text.html

// // https://www.npmjs.com/package/pdfkit-table

//Currently this below code is not working

const router = require("express").Router();
const pdfmake = require("pdfmake");
const { Employee } = require("../models/Employee");
const { Salary } = require("../models/Salary");
const { Attendance } = require("../models/Attendance");

router.get("/report", async (req, res) => {
  try {
    const employees = await Employee.find();
    const salaries = await Salary.find();
    const attendances = await Attendance.find();

    // Create a new document definition
    const documentDefinition = {
      content: [
        {
          text: "Southern Agro Serve (Pvt) Ltd",
          style: "header",
          alignment: "center",
        },
        {
          text: "\nEmployee Details:\n",
          style: "subheader",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*"],
            body: [
              [
                { text: "ID", style: "tableHeader" },
                { text: "First Name", style: "tableHeader" },
                { text: "Last Name", style: "tableHeader" },
                { text: "Email", style: "tableHeader" },
                { text: "Phone", style: "tableHeader" },
                { text: "Department", style: "tableHeader" },
              ],
              ...employees.map((employee) => [
                employee.empid,
                employee.firstname,
                employee.lastname,
                employee.email,
                employee.phone,
                employee.department,
              ]),
            ],
          },
        },
        {
          text: "\nSalary Payments\n",
          style: "subheader",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [
                { text: "Amount", style: "tableHeader" },
                { text: "Payment Date", style: "tableHeader" },
                { text: "Bonus", style: "tableHeader" },
              ],
              ...salaries.map((salary) => [
                `LKR${salary.salary}`,
                salary.date,
                salary.bonus,
              ]),
            ],
          },
        },
        {
          text: "\nAttendance\n",
          style: "subheader",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [
              [
                { text: "Employee ID", style: "tableHeader" },
                { text: "Date", style: "tableHeader" },
                { text: "Entry Time", style: "tableHeader" },
                { text: "Off Time", style: "tableHeader" },
              ],
              ...attendances.map((attendance) => [
                attendance.empid,
                attendance.date,
                attendance.entrytime,
                attendance.offtime,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
        },
        subheader: {
          fontSize: 18,
          bold: true,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
    };

    // Create a new PDF document
    const printer = new pdfmake();
    const pdfDoc = printer.createPdfKitDocument(documentDefinition);

    // Set the filename of the PDF to be downloaded
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    // Send the PDF document to the client
    pdfDoc.pipe(res);
    pdfDoc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
