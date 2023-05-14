const router = require("express").Router();
const PDFDocument = require("pdfkit");
const { Employee } = require("../models/Employee");
const { Salary } = require("../models/Salary");
const { Attendance } = require("../models/Attendance");
const { Invoice } = require("../models/InvoiceE");

const fs = require("fs");
const path = require("path");

router.get("/report", async (req, res) => {
  try {
    const employees = await Employee.find();
    const salaries = await Salary.find();
    const attendances = await Attendance.find();
    const invoices = await Invoice.find();

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

    // Read the logo file

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
      .text("Southern Agro Serve (Pvt) Ltd", { align: "center" })
      .moveDown(2);

    // Add current date and time and HR manager's name
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const hrManagerName = "Yeran Kodithuwakku";
    doc
      .moveUp(1)
      .fontSize(16)
      .fillColor("#000000")
      .text(
        "This is a computer generated document. No signature is required.",
        { align: "left" }
      )
      .text(`Printed on: ${currentDate} ${currentTime}`, { align: "left" })
      // .text(`HR Manager: ${hrManagerName}`, { align: "left" })
      .moveDown(2);

    // Employee Details
    doc
      .fontSize(24)
      .fillColor("#2E7D32")
      .text("Employee Details", { underline: true })
      .moveDown(1);

    employees.forEach((employee) => {
      doc
        .fontSize(16)
        .fillColor("#000000")
        .text(`Employee ID: ${employee.empid}`, { bold: true })
        .list(
          [
            `Name of employee: ${employee.firstname} ${employee.lastname}`,
            `Email: ${employee.email}`,
            `Contact Number: ${employee.phone}`,
            `Date Joined: ${employee.datejoined}`,
            `Department: ${employee.department}`,
            `Designation: ${employee.designation}`,
          ],
          {
            bulletRadius: 2,
            bulletIndent: 10,
            textIndent: 20,
            lineGap: 5,
          }
        )
        .moveDown(1);
    });

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
        .text(`Employee ID: ${salary.empid}`)
        .list(
          [
            `Amount: LKR ${salary.salary}`,
            `Payment Date: (${salary.date})`,
            `Bonus: (${salary.bonus})`,
          ],
          {
            bulletRadius: 2,
            bulletIndent: 10,
            textIndent: 20,
            lineGap: 5,
          }
        )
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
        .list(
          [
            `Date: (${attendance.date})`,
            `Entry Time: (${attendance.entrytime})`,
            `Off Time: (${attendance.offtime})`,
          ],
          {
            bulletRadius: 2,
            bulletIndent: 10,
            textIndent: 20,
            lineGap: 5,
          }
        )
        .moveDown(2);
    });

    //invoices
    doc.fontSize(20).fillColor("black").text("Invoice Details:\n");
    invoices.forEach((invoice) => {
      doc.fontSize(18).text(
        `Invoice No : ${invoice.invoiceNo}\n
      Date of issued : ${invoice.issuedDate}\n
    Customer Name : ${invoice.cusName}\n
    Business Name : ${invoice.busiName}\n
    Address : ${invoice.address}\n
    Mobile Number : ${invoice.mobileNo}\n
    Payment method : ${invoice.payMethod}\n
    Bank Code : ${invoice.bankCode}\n
    Banking Date : ${invoice.bankDate}\n
    Cheque No : ${invoice.cheqNo}\n
    Paid Amount : ${invoice.paidAmount}\n\n\n`
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

//invoice entry system report generating daily, weekly, monthly
router.get("/report/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const invoices = await Invoice.find();
    const doc = new PDFDocument();
    let reportTitle = "Southern Agro Serve (Pvt) Ltd Report\n\n\n";
    let filteredInvoices = [];

    switch (type) {
      case "daily":
        const today = new Date();
        reportTitle += `Daily Report - ${today.toDateString()}\n\n\n`;
        filteredInvoices = invoices.filter(
          (invoice) =>
            new Date(invoice.issuedDate).toDateString() === today.toDateString()
        );
        break;
      case "weekly":
        const curr = new Date();
        const first = curr.getDate() - curr.getDay();
        const last = first + 6;
        const startDate = new Date(curr.setDate(first));
        const endDate = new Date(curr.setDate(last));
        reportTitle += `Weekly Report - ${startDate.toDateString()} to ${endDate.toDateString()}\n\n\n`;
        filteredInvoices = invoices.filter(
          (invoice) =>
            new Date(invoice.issuedDate) >= startDate &&
            new Date(invoice.issuedDate) <= endDate
        );
        break;
      case "monthly":
        const todayMonth = new Date().getMonth();
        reportTitle += `Monthly Report - ${new Date().toLocaleString(
          "default",
          {
            month: "long",
          }
        )}\n\n\n`;
        filteredInvoices = invoices.filter(
          (invoice) => new Date(invoice.issuedDate).getMonth() === todayMonth
        );
        break;
      default:
        return res.status(400).json({ error: "Invalid report type" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${type}_report.pdf`
    );

    doc.fontSize(40).fillColor("blue").text(reportTitle, { align: "center" });
    doc.fontSize(20).fillColor("black").text("Invoice Details:\n");

    filteredInvoices.forEach((invoice) => {
      doc.fontSize(18).text(
        `Invoice No : ${invoice.invoiceNo}\n
        Date of issued : ${invoice.issuedDate}\n
        Customer Name : ${invoice.cusName}\n
        Business Name : ${invoice.busiName}\n
        Address : ${invoice.address}\n
        Mobile Number : ${invoice.mobileNo}\n
        Payment method : ${invoice.payMethod}\n
        Bank Code : ${invoice.bankCode}\n
        Banking Date : ${invoice.bankDate}\n
        Cheque No : ${invoice.cheqNo}\n
        Paid Amount : ${invoice.paidAmount}\n\n\n`
      );
    });

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
