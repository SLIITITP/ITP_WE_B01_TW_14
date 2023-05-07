const router = require("express").Router();
const PDFDocument = require("pdfkit");
const { Employee } = require("../models/Employee");
const { Salary } = require("../models/Salary");
const { Attendance } = require("../models/Attendance");
const PDFTable = require("pdfkit-table");

router.get("/report", async (req, res) => {
  try {
    const employees = await Employee.find();
    const salaries = await Salary.find();
    const attendances = await Attendance.find();

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the filename of the PDF to be downloaded
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    // Write data to the PDF

    // Define the gradient colors
    const gradient = doc.linearGradient(0, 0, doc.page.width, 100);
    gradient.stop(0, "#378b29");
    gradient.stop(0.74, "#74d680");

    //image
    const fs = require("fs");
    const path = require("path");

    // Register custom font
    const fontPath = path.join(__dirname, "..", "Fonts", "Roboto-Black.ttf");
    const fontBytes = fs.readFileSync(fontPath);
    const customFont = {
      regular: fontBytes,
    };
    PDFDocument.registerFont("MyFont", customFont);

    // Read the logo file
    // const logo = fs.readFileSync(path.join(__dirname, "logo.png"));

    // Get the absolute path to the logo.png file
    const logoPath = path.join(__dirname, "..", "images", "logo.png");

    // Read the contents of the logo.png file
    const logo = fs.readFileSync(logoPath);

    doc
      .moveUp(4)
      .rect(0, 0, doc.page.width, 100)
      .fill("#009150")
      .fillColor("white")
      .image(logo, 10, 10, { width: 80, height: 80 })
      .fontSize(40)
      .text("Southern Agro Serve (Pvt) Ltd\n", { align: "center" })
      .moveDown(2);

    // Employee Details
    // doc
    //   .fontSize(24)
    //   .fillColor("#2E7D32")
    //   .text("Employee Details", { underline: true })
    //   .moveDown(1);
    // employees.forEach((employee) => {
    //   doc
    //     .fontSize(16)
    //     .fillColor("#000000")
    //     .text(`Employee ID: ${employee.empid}`)
    //     .text(`Name of employee: ${employee.firstname} ${employee.lastname}`)
    //     .text(`Email: ${employee.email}`)
    //     .text(`Contact Number: ${employee.phone}`)
    //     .text(`Date Joined: ${employee.datejoined}`)
    //     .text(`Department: ${employee.department}`)
    //     .text(`Designation: ${employee.designation}`)
    //     .moveDown(2);
    // });
    // Employee Details
    doc
      .fontSize(24)
      .font("MyFont")
      .fillColor("#2E7D32")
      .text("Employee Details", { underline: true })
      .moveDown(1);

    // Define table columns
    const tableColumns = [
      "Employee ID",
      "Name",
      "Email",
      "Contact Number",
      "Date Joined",
      "Department",
      "Designation",
    ];

    // Define table rows
    const tableRows = employees.map((employee) => [
      employee.empid,
      `${employee.firstname} ${employee.lastname}`,
      employee.email,
      employee.phone,
      employee.datejoined,
      employee.department,
      employee.designation,
    ]);

    // Create table
    const table = new PDFTable(doc, {
      bottomMargin: 30,
    });
    table.addColumns(tableColumns);
    table.addBody(tableRows);

    // Draw table on document
    table.draw();

    // Salary Payments
    doc
      .fontSize(24)
      .fillColor("#2E7D32")
      .text("Salary Payments", { underline: true })
      .moveDown(1);
    salaries.forEach((salary) => {
      doc
        .fontSize(16)
        .fillColor("#000000")
        .text(`Amount: LKR ${salary.salary}`)
        .text(`Payment Date: (${salary.date})`)
        .text(`Bonus: (${salary.bonus})`)
        .moveDown(2);
    });

    // Attendance
    doc
      .fontSize(24)
      .fillColor("#2E7D32")
      .text("Attendance", { underline: true })
      .moveDown(1);
    attendances.forEach((attendance) => {
      doc
        .fontSize(16)
        .fillColor("#000000")
        .text(`Employee ID: ${attendance.empid}`)
        .text(`Date: (${attendance.date})`)
        .text(`Entry Time: (${attendance.entrytime})`)
        .text(`Off Time: (${attendance.offtime})`)
        .moveDown(2);
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

// //https://www.npmjs.com/package/pdfkit

// //https://pdfkit.org/docs/text.html

// // https://www.npmjs.com/package/pdfkit-table
