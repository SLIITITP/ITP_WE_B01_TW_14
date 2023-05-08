// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const handlePrintAll = () => {
//   const unit = "pt";
//   const size = "A4";
//   const orientation = "portrait";
//   const marginLeft = 40;
//   const doc = new jsPDF(orientation, unit, size);
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("All Purchases", marginLeft, 40);
//   const headers = [["Order ID", "Sup ID", "Date", "Req Date", "Days", "Items"]];
//   const data = purchases.map((purchase) => [
//     purchase.orderid,
//     purchase.supid && purchase.supid.supid
//       ? purchase.supid.supid.toString()
//       : "",
//     new Date(purchase.date).toLocaleDateString(),
//     new Date(purchase.reqdate).toLocaleDateString(),
//     purchase.remainingDays,
//     purchase.items && purchase.items.length > 0
//       ? purchase.items
//           .map((item) => `${item.itemName} - ${item.quantity}`)
//           .join(", ")
//       : "No items found",
//   ]);
//   let content = {
//     startY: 70,
//     head: headers,
//     body: data,
//   };
//   doc.autoTable(content);
//   doc.save("all-purchases.pdf");
// };
