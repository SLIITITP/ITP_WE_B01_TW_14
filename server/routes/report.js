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
    doc.text("Employee Report\n\n");
    doc.text("Employees:\n");
    employees.forEach((employee) => {
      doc.text(`- ${employee.firstname} (${employee.lastname})`);
    });
    doc.text("\nSalaries:\n");
    salaries.forEach((salary) => {
      doc.text(`- ${salary.amount} (${salary.date})`);
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
