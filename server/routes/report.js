const router = require("express").Router();
const PDFDocument = require("pdfkit");
const { Employee } = require("../models/Employee");
const { Salary } = require("../models/Salary");

router.get("/report", async (req, res) => {
  try {
    const employees = await Employee.find();
    const salaries = await Salary.find();

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the filename of the PDF to be downloaded
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    // Write data to the PDF
    doc
      .fontSize(40)
      .fillColor("blue")
      .text(
        "Southern Agro Serve (Pvt) Ltd\n\n\n",
        { align: "center" },
        100,
        100
      );
    //The 100,100 is the x and y coordinates
    //You can use the doc.x and doc.y to get the current x and y coordinates
    //If u align the text to the center, the x coordinate will be the center of the page
    //Since here the text is aligned to the center, we don't need to specify the x coordinate
    doc.fontSize(20).fillColor("black").text("Employee Details:\n");
    employees.forEach((employee) => {
      doc.fontSize(18).text(
        `- Name of employee : ${employee.firstname} ${employee.lastname}\n
      Email : ${employee.email}\n
      Contact Number : ${employee.phone}\n
      Date Joined : ${employee.datejoined}\n
      Department : ${employee.department}\n
      Designation : ${employee.designation}\n\n\n`
      );
    });
    doc.fontSize(20).text("\nSalary Payments:\n");
    salaries.forEach((salary) => {
      doc.fontSize(18).text(
        `Amount:LKR${salary.salary}\n
      Payment Date:(${salary.date})\n
      Bonus:(${salary.bonus})\n\n\n`
      );
    });

    // Pipe the PDF to the response object
    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error generating report" });
  }
});

module.exports = router;

//https://www.npmjs.com/package/pdfkit

//https://pdfkit.org/docs/text.html

// https://www.npmjs.com/package/pdfkit-table

//Tried getting the data into a tabular format.
//No progress yet.

//Codes below are commented out.

// const PDFDocument = require("pdfkit");
// const PDFTable = require("pdfkit-table");

// const doc = new PDFDocument();

// const router = require("express").Router();
// const { Employee } = require("../models/Employee");
// const { Salary } = require("../models/Salary");

// router.get("/report", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     const salaries = await Salary.find();

//     // Create a new PDF document
//     const doc = new PDFDocument();

//     // Set the filename of the PDF to be downloaded
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

//     //     doc.fontSize(20).fillColor("black").text("Employee Details:\n");

//     //     const tableEmployee = {
//     //       headers: [
//     //         "Name",
//     //         "Email",
//     //         "Contact Number",
//     //         "Date Joined",
//     //         "Department",
//     //         "Designation",
//     //       ],
//     //       rows: [],
//     //     };

//     //     employees.forEach((employee) => {
//     //       tableEmployee.rows.push([
//     //         `${employee.firstname} ${employee.lastname}`,
//     //         employee.email,
//     //         employee.phone,
//     //         employee.datejoined,
//     //         employee.department,
//     //         employee.designation,
//     //       ]);
//     //     });

//     //     doc.table(tableEmployee, {
//     //       prepareHeader: () => doc.fontSize(18).bold(),
//     //       prepareRow: (row, i) => doc.fontSize(18),
//     //     });

//     //     doc.fontSize(20).text("\nSalary Payments:\n");

//     //     const tableSalary = {
//     //       headers: ["Amount", "Payment Date", "Bonus"],
//     //       rows: [],
//     //     };

//     //     salaries.forEach((salary) => {
//     //       tableSalary.rows.push([`LKR${salary.salary}`, salary.date, salary.bonus]);
//     //     });

//     //     doc.table(tableSalary, {
//     //       prepareHeader: () => doc.fontSize(18).bold(),
//     //       prepareRow: (row, i) => doc.fontSize(18),
//     //     });

//     //     // doc.table(tableEmployee, {
//     //     //   prepareHeader: () => doc.fontSize(18).bold(),
//     //     //   prepareRow: (row, i) => doc.fontSize(18),
//     //     // });

//     //     // doc.fontSize(20).text("\nSalary Payments:\n");

//     //     // const tableSalary = {
//     //     //   headers: ["Amount", "Payment Date", "Bonus"],
//     //     //   rows: [],
//     //     // };

//     //     // salaries.forEach((salary) => {
//     //     //   tableSalary.rows.push([`LKR${salary.salary}`, salary.date, salary.bonus]);
//     //     // });

//     //     // doc.table(tableSalary, {
//     //     //   prepareHeader: () => doc.fontSize(18).bold(),
//     //     //   prepareRow: (row, i) => doc.fontSize(18),
//     //     // });

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

//     // const tableEmployee = {
//     //   headers: [
//     //     "Name",
//     //     "Email",
//     //     "Contact Number",
//     //     "Date Joined",
//     //     "Department",
//     //     "Designation",
//     //   ],
//     //   rows: [],
//     // };

//     doc.fontSize(20).fillColor("black").text("Employee Details:\n");
//     employees.forEach((employee) => {
//       doc.fontSize(18).text(
//         `- Name of employee : ${employee.firstname} ${employee.lastname}\n
//       Email : ${employee.email}\n
//       Contact Number : ${employee.phone}\n
//       Date Joined : ${employee.datejoined}\n
//       Department : ${employee.department}\n
//       Designation : ${employee.designation}\n\n\n`
//       );
//     });
//     doc.fontSize(20).text("\nSalary Payments:\n");
//     salaries.forEach((salary) => {
//       doc.fontSize(18).text(
//         `Amount:LKR${salary.salary}\n
//       Payment Date:(${salary.date})\n
//       Bonus:(${salary.bonus})\n\n\n`
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

// const PDFDocument = require("pdfkit");
// const PDFTable = require("pdfkit-table");

// const router = require("express").Router();
// const { Employee } = require("../models/Employee");
// const { Salary } = require("../models/Salary");

// router.get("/report", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     const salaries = await Salary.find();

//     // Create a new PDF document
//     const doc = new PDFDocument();

//     // Set the filename of the PDF to be downloaded
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

//     doc.fontSize(20).fillColor("black").text("Employee Details:\n");

//     const tableEmployee = {
//       headers: [
//         "Name",
//         "Email",
//         "Contact Number",
//         "Date Joined",
//         "Department",
//         "Designation",
//       ],
//       rows: [],
//     };

//     employees.forEach((employee) => {
//       tableEmployee.rows.push([
//         `${employee.firstname} ${employee.lastname}`,
//         employee.email,
//         employee.phone,
//         employee.datejoined,
//         employee.department,
//         employee.designation,
//       ]);
//     });

//     doc.table(tableEmployee, {
//       prepareHeader: () => doc.fontSize(18).bold(),
//       // Remove the following line
//       // prepareRow: (row, i) => doc.fontSize(18),
//     });

//     doc.fontSize(20).text("\nSalary Payments:\n");

//     const tableSalary = {
//       headers: ["Amount", "Payment Date", "Bonus"],
//       rows: [],
//     };

//     salaries.forEach((salary) => {
//       tableSalary.rows.push([`LKR${salary.salary}`, salary.date, salary.bonus]);
//     });

//     doc.table(tableSalary, {
//       prepareHeader: () => doc.fontSize(18).bold(),
//       // Remove the following line
//       // prepareRow: (row, i) => doc.fontSize(18),
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

// const PDFDocument = require("pdfkit");
// const PDFTable = require("pdfkit-table");

// const router = require("express").Router();
// const { Employee } = require("../models/Employee");
// const { Salary } = require("../models/Salary");

// router.get("/report", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     const salaries = await Salary.find();

//     // Create a new PDF document
//     const doc = new PDFDocument();

//     // Set the filename of the PDF to be downloaded
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

//     doc.fontSize(20).fillColor("black").text("Employee Details:\n");

//     const tableEmployee = new PDFTable(doc, {
//       bottomMargin: 30,
//       headers: [
//         "Name",
//         "Email",
//         "Contact Number",
//         "Date Joined",
//         "Department",
//         "Designation",
//       ],
//     });

//     employees.forEach((employee) => {
//       tableEmployee.addBodyRow([
//         `${employee.firstname} ${employee.lastname}`,
//         // employee.email,
//         // employee.phone,
//         // employee.datejoined,
//         // employee.department,
//         // employee.designation,
//       ]);
//     });

//     tableEmployee.draw();

//     doc.fontSize(20).text("\nSalary Payments:\n");

//     const tableSalary = new PDFTable(doc, {
//       bottomMargin: 30,
//       headers: ["Amount", "Payment Date", "Bonus"],
//     });

//     salaries.forEach((salary) => {
//       tableSalary.addBodyRow([
//         `LKR${salary.salary}`,
//         // salary.date,
//         // salary.bonus,
//       ]);
//     });

//     tableSalary.draw();

//     // Pipe the PDF to the response object
//     doc.pipe(res);
//     doc.end();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Error generating report" });
//   }
// });

// module.exports = router;
