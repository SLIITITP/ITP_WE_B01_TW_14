const router = require("express").Router();
const PDFDocument = require("pdfkit");
const { Stock } = require("../models/Stock");
const { Profit } = require("../models/Profit");

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
    doc.fontSize(20).fillColor("black").text("Stock Details:\n");
    stocks.forEach((stock) => {
      doc.fontSize(18).text(
        `Stock ID : ${stock.stockid}\n
        Stock Name : ${stock.name} \n
      Category : ${stock.category}\n
      Stock Description : ${stock.description}\n
      Cost Price : ${stock.costprice}\n
      Selling Price : ${stock.sellingprice}\n
      Quantity : ${stock.quantity}\n
      Supplier : ${stock.supplier}\n\n\n`
      );
    });
    doc.fontSize(20).text("\nProfit Made:\n");
    profits.forEach((profit) => {
      doc.fontSize(18).text(
        `Stock ID: ${profit.stockid}\n
        Cost Price:(${profit.costprice})\n
        Selling Price:(${profit.sellingprice})\n
      Quantity Sold:(${profit.quantitysold})\n
      Time Period:(${profit.timeperiod})\n
      Gross Profit:(${profit.grossprofit})\n
      Total Revenue:(${profit.totalrevenue})\n
      Profit Margin:(${profit.profitmargin})\n\n\n`
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
