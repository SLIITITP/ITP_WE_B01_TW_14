const router = require('express').Router();
const PDFDocument = require('pdfkit');
const { Employee } = require('../models/Employee');
const { Salary } = require('../models/Salary');
const { Attendance } = require('../models/Attendance');
const { Invoice } = require('../models/InvoiceE');

const fs = require('fs');
const path = require('path');

router.get('/report', async (req, res) => {
  try {
    const employees = await Employee.find();
    const salaries = await Salary.find();
    const attendances = await Attendance.find();

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the filename of the PDF to be downloaded
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

    // Write data to the PDF

    // Define the gradient colors
    const gradient = doc.linearGradient(0, 0, doc.page.width, 100);
    gradient.stop(0, '#378b29');
    gradient.stop(0.74, '#74d680');

    // Read the logo file

    // Get the absolute path to the logo.png file
    const logoPath = path.join(__dirname, '..', 'images', 'logo.png');

    // Read the contents of the logo.png file
    const logo = fs.readFileSync(logoPath);

    doc
      .moveUp(4)
      .rect(0, 0, doc.page.width, 100)
      .fill('#009150')
      .fillColor('white')
      .image(logo, 10, 10, { width: 80, height: 80 })
      .fontSize(40)
      .text('Southern Agro Serve (Pvt) Ltd', { align: 'center' })
      .moveDown(2);

    // Add current date and time and HR manager's name
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const hrManagerName = 'Yeran Kodithuwakku';
    doc
      .moveUp(1)
      .fontSize(16)
      .fillColor('#000000')
      .text(
        'This is a computer generated document. No signature is required.',
        { align: 'left' }
      )
      .text(`Printed on: ${currentDate} ${currentTime}`, { align: 'left' })
      // .text(`HR Manager: ${hrManagerName}`, { align: "left" })
      .moveDown(2);

    // Employee Details
    doc
      .fontSize(24)
      .fillColor('#2E7D32')
      .text('Employee Details', { underline: true })
      .moveDown(1);

    employees.forEach((employee) => {
      doc
        .fontSize(16)
        .fillColor('#000000')
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
      .fillColor('#2E7D32')
      .text('Salary Payments', { underline: true })
      .moveDown(1);
    salaries.forEach((salary) => {
      doc
        .fontSize(16)
        .fillColor('#000000')
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
      .fillColor('#2E7D32')
      .text('Attendance', { underline: true })
      .moveDown(1);
    attendances.forEach((attendance) => {
      doc
        .fontSize(16)
        .fillColor('#000000')
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

    // Pipe the PDF to the response object
    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error generating report' });
  }
});

//Chamikara
router.get('/reportAll', async (req, res) => {
  try {
    const invoices = await Invoice.find();

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the filename of the PDF to be downloaded
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

    // Write data to the PDF

    // Define the gradient colors
    const gradient = doc.linearGradient(0, 0, doc.page.width, 100);
    gradient.stop(0, '#378b29');
    gradient.stop(0.74, '#74d680');

    // Read the logo file

    // Get the absolute path to the logo.png file
    const logoPath = path.join(__dirname, '..', 'images', 'logo.png');

    // Read the contents of the logo.png file
    const logo = fs.readFileSync(logoPath);

    doc
      .moveUp(4)
      .rect(0, 0, doc.page.width, 100)
      .fill('#009150')
      .fillColor('white')
      .image(logo, 10, 10, { width: 80, height: 80 })
      .fontSize(40)
      .text('Southern Agro Serve (Pvt) Ltd', { align: 'center' })
      .moveDown(2);

    //invoices
    doc
      .fontSize(24)
      .fillColor('#2E7D32')
      .text('Invoice Details', { underline: true })
      .moveDown(1);

    invoices.forEach((invoice) => {
      doc
        .fontSize(16)
        .fillColor('#000000')
        .text(`Invoice No: ${invoice.invoiceNo}`, { bold: true })
        .list(
          [
            `Date of issued : ${invoice.issuedDate}`,
            `Customer Name : ${invoice.cusName}`,
            `Business Name : ${invoice.busiName}`,
            `Address : ${invoice.address}`,
            `Mobile Number : ${invoice.mobileNo}`,
            `Payment method : ${invoice.payMethod}`,
            `Bank Code : ${invoice.bankCode}`,
            `Banking Date : ${invoice.bankDate}`,
            `Cheque No : ${invoice.cheqNo}`,
            `Paid Amount : ${invoice.paidAmount}`,
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

    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error generating report' });
  }
});

//invoice entry system report generating daily, weekly, monthly
router.get('/report/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const invoices = await Invoice.find();
    const doc = new PDFDocument();
    let reportTitle = 'Invoice Entry System';
    let filteredInvoices = [];

    // Set the filename of the PDF to be downloaded
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

    // Write data to the PDF

    // Define the gradient colors
    const gradient = doc.linearGradient(0, 0, doc.page.width, 100);
    gradient.stop(0, '#378b29');
    gradient.stop(0.74, '#74d680');

    // Read the logo file

    // Get the absolute path to the logo.png file
    const logoPath = path.join(__dirname, '..', 'images', 'logo.png');

    // Read the contents of the logo.png file
    const logo = fs.readFileSync(logoPath);

    doc
      .moveUp(4)
      .rect(0, 0, doc.page.width, 100)
      .fill('#009150')
      .fillColor('white')
      .image(logo, 10, 10, { width: 80, height: 80 })
      .fontSize(40)
      .text('Southern Agro Serve (Pvt) Ltd', { align: 'center' })
      .moveDown(2);

    switch (type) {
      case 'daily':
        const today = new Date();
        reportTitle += `\nDaily Report - ${today.toDateString()}\n\n`;
        filteredInvoices = invoices.filter(
          (invoice) =>
            new Date(invoice.issuedDate).toDateString() === today.toDateString()
        );
        break;
      case 'weekly':
        const today1 = new Date();
        const oneWeekAgo = new Date(today1.getTime() - 7 * 24 * 60 * 60 * 1000);
        const startDate = new Date(
          oneWeekAgo.getFullYear(),
          oneWeekAgo.getMonth(),
          oneWeekAgo.getDate(),
          0,
          0,
          0
        );
        const endDate = new Date(
          today1.getFullYear(),
          today1.getMonth(),
          today1.getDate(),
          23,
          59,
          59
        );
        reportTitle += `\nWeekly Report - ${startDate.toDateString()} to\n ${endDate.toDateString()}\n\n`;
        filteredInvoices = invoices.filter(
          (invoice) =>
            new Date(invoice.issuedDate) >= startDate &&
            new Date(invoice.issuedDate) <= endDate
        );
        break;
      case 'monthly':
        const todayMonth = new Date().getMonth();
        reportTitle += `\nMonthly Report - ${new Date().toLocaleString(
          'default',
          {
            month: 'long',
          }
        )}\n\n`;
        filteredInvoices = invoices.filter(
          (invoice) => new Date(invoice.issuedDate).getMonth() === todayMonth
        );
        break;
      default:
        return res.status(400).json({ error: 'Invalid report type' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${type}_report.pdf`
    );

    doc.fontSize(25).fillColor('black').text(reportTitle, { align: 'center' });
    doc
      .fontSize(24)
      .fillColor('#2E7D32')
      .text('Invoice Details', { underline: true })
      .moveDown(1);

    filteredInvoices.forEach((invoice) => {
      doc
        .fontSize(16)
        .fillColor('#000000')
        .text(`Invoice No: ${invoice.invoiceNo}`, { bold: true })
        .list(
          [
            `Date of issued : ${invoice.issuedDate}`,
            `Customer Name : ${invoice.cusName}`,
            `Business Name : ${invoice.busiName}`,
            `Address : ${invoice.address}`,
            `Mobile Number : ${invoice.mobileNo}`,
            `Payment method : ${invoice.payMethod}`,
            `Bank Code : ${invoice.bankCode}`,
            `Banking Date : ${invoice.bankDate}`,
            `Cheque No : ${invoice.cheqNo}`,
            `Paid Amount : ${invoice.paidAmount}`,
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

    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error generating report' });
  }
});

module.exports = router;

// //https://www.npmjs.com/package/pdfkit

// //https://pdfkit.org/docs/text.html

// // https://www.npmjs.com/package/pdfkit-table
