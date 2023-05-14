const router = require("express").Router();
const PDFDocument = require("pdfkit");
const { Delivery } = require("../models/delivery");
const { Schedule } = require("../models/schedule");
const PDFTable = require("pdfkit-table");

router.get("/deliveryreport", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    const schedules = await Schedule.find();
    //salary-schedule, employee- delivery

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

    // Read the logo file

    // Get the absolute path to the logo.png file
    const logoPath = path.join(__dirname, "..", "images", "logo.png");

    // Read the contents of the logo.png file
    const logo = fs.readFileSync(logoPath);

    // // Register custom font
    // const fontPath = path.join(__dirname, "..", "Fonts", "Roboto-Black.ttf");
    // const fontBytes = fs.readFileSync(fontPath);
    // const customFont = {
    //   regular: fontBytes,
    // };
    // PDFDocument.registerFont("MyFont", customFont);

    // Read the logo file
    // const logo = fs.readFileSync(path.join(__dirname, "logo.png"));

    // // Get the absolute path to the logo.png file
    // const logoPath = path.join(__dirname, "..", "images", "logo.png");

    // // Read the contents of the logo.png file
    // const logo = fs.readFileSync(logoPath);

    doc
      .moveUp(4)
      .rect(0, 0, doc.page.width, 100)
      .fill("#009150")
      .fillColor("white")
      .image(logo, 10, 10, { width: 80, height: 80 })
      .fontSize(40)
      .text("Southern Agro Serve (Pvt) Ltd", { align: "center" })
      .moveDown(2);

    // Add current date and time and Delivery manager's name
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const DManagerName = "Pasindu Jayasinghe";
    doc
      .moveUp(1)
      .fontSize(16)
      .fillColor("#000000")
      .text(
        "This is a computer generated document. No signature is required.",
        { align: "left" }
      )
      .text(`Printed on: ${currentDate} ${currentTime}`, { align: "left" })
      // .text(`Delivery Manager: ${DManagerName}`, { align: "left" })
      .moveDown(2);

    // doc
    //   .moveUp(4)
    //   .rect(0, 0, doc.page.width, 100)
    //   .fill("#009150")
    //   .fillColor("white")
    //   .image(logo, 10, 10, { width: 80, height: 80 })
    //   .fontSize(40)
    //   .text("Southern Agro Serve (Pvt) Ltd\n", { align: "center" })
    //   .moveDown(2);

    // doc
    //   .fontSize(40)
    //   .fillColor("blue")
    //   .text(
    //     "Southern Agro Serve (Pvt) Ltd\n\n\n",
    //     { align: "center" },
    //     100,
    //     100
    //   );
    //The 100,100 is the x and y coordinates
    //You can use the doc.x and doc.y to get the current x and y coordinates
    //If u align the text to the center, the x coordinate will be the center of the page
    //Since here the text is aligned to the center, we don't need to specify the x coordinate

    //Sales Rep Details
    doc
      .fontSize(24)
      .fillColor("#2E7D32")
      .text("Sales Representative Details", { underline: true })
      .moveDown(1);

    deliveries.forEach((delivery) => {
      doc
        .fontSize(16)
        .fillColor("#000000")
        .text(`Sales Representative ID: ${delivery.salesRepID}`, { bold: true })
        .list(
          [
            `Employee ID             : ${delivery.empid}`,
            `Territory               : ${delivery.Territory}`,
          ],
          {
            bulletRadius: 2,
            bulletIndent: 10,
            textIndent: 20,
            lineGap: 5,
          }
          //`Sales Representative ID : ${delivery.salesRepID}\n
        )
        .moveDown(1);
    });

    //Delivery Schedules
    doc
      .fontSize(24)
      .fillColor("#2E7D32")
      .text("Delivery Schedules", { underline: true })
      .moveDown(1);
    schedules.forEach((schedule) => {
      doc
        .fontSize(16)
        .fillColor("#000000")
        .text(`Delivery Schedule ID :  ${schedule.deliveryscheduleID}`)
        .list(
          [
            `Order ID : (${schedule.orderID})`,
            `Date : (${schedule.date})`,
            `Destination : (${schedule.destination})`,
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

    //   // Define table columns
    // const tableColumns = [
    //   "Sales Representative ID",
    //   "Employee ID ",
    //   "Territory",

    // ];

    // // Define table rows
    // const tableRows = employees.map((delivery) => [
    //   delivery.salesRepID,
    //   delivery.empid,
    //   delivery.Territory,

    //
    // doc.fontSize(20).fillColor("black").text("Sales Representative Details:\n");
    // deliveries.forEach((delivery) => {
    //   doc.fontSize(18).text(
    //     `Sales Representative ID : ${delivery.salesRepID}\n
    //      Employee ID             : ${delivery.empid} \n
    //      Territory               : ${delivery.Territory}\n\n\n`
    //   );
    // });

    //     // Create table
    //     const table = new PDFTable(doc, {
    //       bottomMargin: 30,
    //     });
    //     table.addColumns(tableColumns);
    //     table.addBody(tableRows);

    //     // Draw table on document
    //     table.draw();

    //      // Delivery Schedules
    //   doc
    //   .fontSize(24)
    //   .fillColor("#2E7D32")
    //   .text("Delivery Schedules", { underline: true })
    //   .moveDown(1);
    // salaries.forEach((schedule) => {
    //   doc
    //     .fontSize(16)
    //     .fillColor("#000000")
    //     .text(`Delivery Schedule ID :  ${schedule.deliveryscheduleID}`)
    //     .text(`Order ID : (${schedule.orderID})`)
    //     .text(`Date : (${schedule.date})`)
    //     .text(`Destination : (${schedule.destination})`)
    //     .moveDown(2);
    // });

    //
    // doc.fontSize(20).text("\nDelivery Schedules:\n");
    // schedules.forEach((schedule) => {
    //   doc.fontSize(18).text(
    //     `Delivery Schedule ID :${schedule.deliveryscheduleID}\n
    //      Order ID             :(${schedule.orderID})\n
    //      Date                 :(${schedule.date})\n
    //      Destination          :(${schedule.destination})\n\n\n`
    //   );
    // });

    // Pipe the PDF to the response object
    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error generating report" });
  }
});

module.exports = router;
