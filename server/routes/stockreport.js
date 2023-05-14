const router = require("express").Router();
const PDFDocument = require("pdfkit");
const { Stock } = require("../models/Stock");
const { Profit } = require("../models/Profit");


const fs = require("fs");
const path = require("path");

router.get("/stockreport", async (req, res) => {
  try {
    const stocks = await Stock.find();
    const profits = await Profit.find();

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
      const hrManagerName = "Yasitha Dewmin";


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


    //The 100,100 is the x and y coordinates
    //You can use the doc.x and doc.y to get the current x and y coordinates
    //If u align the text to the center, the x coordinate will be the center of the page
    //Since here the text is aligned to the center, we don't need to specify the x coordinate
    doc
    .fontSize(24)
    .fillColor("#2E7D32")
    .text("Stock Details", { underline: true })
    .moveDown(1);


    stocks.forEach((stock) => {
      doc
        .fontSize(16)
        .fillColor("#000000")
        .text(
        `Stock ID : ${stock.stockid}`, { bold: true })
        .list(
          [
        `Stock Name : ${stock.name}`,
      `Category : ${stock.category}`,
      `Stock Description : ${stock.description}`,
      `Cost Price : ${stock.costprice}`,
      `Selling Price : ${stock.sellingprice}`,
      `Quantity : ${stock.quantity}`,
      `Supplier : ${stock.supplier}`,
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
    doc
      .fontSize(24)
      .fillColor("#2E7D32")
      .text("Profit Made", { underline: true })
      .moveDown(1);
    profits.forEach((profit) => {
      doc
      .fontSize(16)
      .fillColor("#000000")
      .text(
        `Stock ID: ${profit.stockid}`)
      .list(
        [
      `Cost Price:(${profit.costprice})`,
      `Selling Price:(${profit.sellingprice})`,
      `Quantity Sold:(${profit.quantitysold})`,
      `Start Date:(${profit.startdate})`,
      `End Date:(${profit.enddate})`,
      // `Time Period:(${profit.timeperiod})`,
      `Gross Profit:(${profit.grossprofit})`,
      `Total Revenue:(${profit.totalrevenue})`,
      `Profit Margin:(${profit.profitmargin})`,
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
    res.status(500).json({ error: "Error generating report" });
  }
});

module.exports = router;
