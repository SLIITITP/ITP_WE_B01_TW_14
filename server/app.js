require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //pasindu
const axios = require("axios"); //wasana

//Initialize express app
const app = express();

const connectDB = require("./config/db");

const auth = require("./middlewares/auth");

//middleware
app.use(express.json()); //sending repsonses in json format, this middleware will parse the data and send it in json format.

app.use(morgan("tiny")); //Morgan logs useful information about HTTP requests and responses, such as the request method, the URL, the status code, and the length of the response body

app.use(require("cors")()); //used in Authorization

//routes
app.use("/api", require("./routes/auth"));
app.use("/api/", require("./routes/contact"));
app.use("/api/", require("./routes/employee"));
app.use("/api/", require("./routes/salary"));
app.use("/api/", require("./routes/attendance"));
app.use("/api/", require("./routes/report"));

//if our token was valid then we will have the user in the request object.
// app.get("/protected", auth, (req, res) => {s
//     return res.status(200).json({ ...req.user._doc });
// });

//Bhanuka***************************************************************************

app.use("/api/", require("./routes/vehicle"));
app.use("/api/", require("./routes/fuel"));
app.use("/api/", require("./routes/runningrecord"));
app.use("/api/", require("./routes/garage"));
app.use("/api/", require("./routes/vehicledocument"));
app.use("/api/", require("./routes/driver-vehicle-assign"));
app.use("/api/", require("./routes/repairassign"));
app.use("/api/", require("./routes/repair"));

app.use("/api/", require("./routes/vehicle"));
app.use("/api/", require("./routes/fuel"));
app.use("/api/", require("./routes/runningrecord"));
app.use("/api/", require("./routes/garage"));
app.use("/api/", require("./routes/vehicledocument"));
app.use("/api/", require("./routes/driver-vehicle-assign"));
app.use("/api/", require("./routes/repairassign"));
app.use("/api/", require("./routes/repair"));
app.use("/vehicleuploads", express.static("./vehicleuploads"));

// const vehiclerouter = require("./routes/vehicle");
// const fuelrouter = require("./routes/fuel");
// const runningrecordrouter = require("./routes/runningrecord");
// const garagerouter = require("./routes/garage");
// const documentrouter = require("./routes/vehicledocument");
// const assignrouter = require("./routes/driver-vehicle-assign");
// const repairassignrouter = require("./routes/repairassign");
// const repairrouter = require("./routes/repair");

// app.use(vehiclerouter);
// app.use(fuelrouter);
// app.use(runningrecordrouter);
// app.use(garagerouter);
// app.use(documentrouter);
// app.use(assignrouter);
// app.use(repairassignrouter);
// app.use(repairrouter);

//  app.use("/vehicleuploads", express.static("./vehicleuploads"));

//Bhanuka***************************************************************************

//Chamikara
app.use("/invoice", require("./routes/report"));
app.use("/invoice", require("./routes/invoices"));

//Chamikara

// Ashen***************
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);

// app.use("/api/", require("./routes/categoryRoutes"));
// app.use("/api/", require("./routes/productRoutes"));
// app.use("/api/", require("./routes/orderRoutes"));
//new
app.use("/api/", require("./routes/auth"));
app.get("/protected", auth, (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
// Ashen*************************************************

// Hasa*************************************************
// import helmet from "helmet";
const clientRoutes = require("./routes/client.js");
const generalRoutes = require("./routes/general.js");
const managementRoutes = require("./routes/management.js");
const salesRoutes = require("./routes/sales.js");
const authRoutes = require("./routes/authRoutes.js");
const helmet = require("helmet");
const { logger, logEvents } = require("./middlewares/logger.js");
const User = require("./models/Userdata");
const Product = require("./models/Product");
const ProductStat = require("./models/ProductStat.js");
const Transaction = require("./models/Transaction.js");
const OverallStat = require("./models/OverallStat.js");
const AffiliateStat = require("./models/AffiliateStat.js");

const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} = require("./data/index.js");

const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions.js");

app.use(helmet());

// app.use(logger);
// // app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/auth", authRoutes);
// Hasa*************************************************

//Pasindu***************************************************************************
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./routes/deliveries"));
app.use("/api", require("./routes/schedules"));
app.use("/api", require("./routes/deliveryreport"));

// const deliveryRouter = require("./routes/deliveries");
// //const deliveryRouter = require("./routes/deliveries.js");
// //app.use("/delivery",deliveryRouter); //front end eken backend eke data call karanna url eka

// const scheduleRouter = require("./routes/schedules");
// //const scheduleRouter = require("./routes/schedules.js");
// app.use("/schedule",scheduleRouter); //front end eken backend eke data call karanna url eka

//Pasindu***************************************************************************

//Wasana****************************************************************************
const cron = require("node-cron");
const nodemailer = require("nodemailer");

//routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/supRouter"));
app.use("/api", require("./routes/purchaseRouter"));
app.use("/api", require("./routes/appointmentRouter"));

//new
app.use("/api", require("./routes/expiredAppointmentRouter"));
//new

const PurchaseOrders = require("./models/purchaseSchema");
const Suppliers = require("./models/supSchema");

// Function to send reminder emails to suppliers
const sendReminderEmail = async (supplierEmail, orderItems) => {
  try {
    // Create nodemailer transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "fruwani5@gmail.com",
        pass: "fpaetacctrymcawy",
      },
    });

    // Define email message
    let message = {
      from: "fruwani5@gmail.com",
      to: supplierEmail,
      subject: "Purchase Order Reminder",
      text: `Dear supplier,\n\nThis is a reminder that the following items in your purchase order are still pending:\n\n${orderItems}\n\nPlease update us on the status of your order as soon as possible.\n\nBest regards,\nSouthern Agro Serve`,
    };

    // Send email
    let info = await transporter.sendMail(message);
    console.log(`Reminder email sent to ${supplierEmail}: ${info.messageId}`);
  } catch (error) {
    console.error(error);
  }
};

// Cron job to check purchase orders and send reminder emails
//cron.schedule('*/1 * * * *', async () => {
// cron.schedule('0 0 * * *', async () => {

cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();
    const fiveDaysAgo = new Date(
      currentDate.getTime() - 5 * 24 * 60 * 60 * 1000
    );

    const incompleteOrders = await PurchaseOrders.find({
      completed: false,
      reqdate: { $lte: fiveDaysAgo },
    }).populate("supid", "email name");

    incompleteOrders.forEach(async (order) => {
      const { supid, items } = order;
      const { email } = supid;
      const orderItems = items
        .map((item) => `- ${item.quantity} ${item.itemName}`)
        .join("\n");

      await sendReminderEmail(email, orderItems);

      console.log(
        `Reminder email sent to ${email} for purchase order ${order.orderid}`
      );
    });
  } catch (error) {
    console.error(error);
  }
});

const Appointment = require("./models/appointmentSchema");
const Expired = require("./models/expAppSchema");

// const deleteExpiredAppointments = async () => {
//   try {
//     const currentDate = new Date();
//     const expiredAppointments = await Appointment.find({
//       date: { $lte: currentDate },
//       end: { $lte: currentDate.toLocaleTimeString("en-US", { hour12: false }) },
//     });
//     if (expiredAppointments.length > 0) {
//       console.log("Deleting expired appointments...");
//       for (let appointment of expiredAppointments) {
//         try {
//           // Save expired appointment to expiredAppointments database
//           const newExpired = new Expired({ appid: appointment._id });
//           await newExpired.save();
//           console.log(
//             `Appointment ${appointment._id} saved to expiredAppointments`
//           );
//           // Delete expired appointment from appointments database
//           await Appointment.findByIdAndDelete(appointment._id);
//           console.log(`Appointment ${appointment._id} deleted successfully`);
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     } else {
//       console.log("No expired appointments found");
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

const deleteExpiredAppointments = async () => {
  try {
    const currentDate = new Date();
    const expiredAppointments = await Appointment.find({
      date: { $lte: currentDate },
      end: { $lte: currentDate.toLocaleTimeString("en-US", { hour12: false }) },
    });
    if (expiredAppointments.length > 0) {
      console.log("Deleting expired appointments...");
      for (let appointment of expiredAppointments) {
        try {
          // Save expired appointment to expiredAppointments database
          const newExpired = new Expired({
            appid: appointment._id,
            name: appointment.name,
            date: appointment.date,
            start: appointment.start,
            end: appointment.end,
            email: appointment.email,
            appointmentid: appointment.appid, // Add appointmentid as string
          });
          await newExpired.save();
          console.log(
            `Appointment ${appointment._id} ${appointment.appointmentid} (${appointment.name}, ${appointment.date}, ${appointment.start}-${appointment.end}, ${appointment.email}) saved to expiredAppointments`
          );
          // Delete expired appointment from appointments database
          await Appointment.findByIdAndDelete(appointment._id);
          console.log(`Appointment ${appointment._id} deleted successfully`);
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      console.log("No expired appointments found");
    }
  } catch (err) {
    console.error(err);
  }
};

// Schedule to run the task every minute
cron.schedule("* * * * *", () => {
  deleteExpiredAppointments();
});

//Wasana***************************************************************************

//Yasitha***************************************************************************

//Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/category"));
app.use("/api", require("./routes/stock"));
app.use("/api", require("./routes/profit"));
app.use("/api", require("./routes/stockreport"));

//Yasitha***************************************************************************

//server configurations.
const PORT = process.env.PORT || 8000; //3000 port we will use  for frontend
app.listen(PORT, async () => {
  //We dont want to start the server until we are connected to the database.
  //therefore we are going to use async await.
  //In the terminal we will see the message "server listening on port: 8000" only after we are connected to the database.
  try {
    await connectDB();
    console.log(`server listening on port: ${PORT}`);
    //  User.insertMany(dataUser);
    //  Product.insertMany(dataProduct);
  } catch (err) {
    console.log(err);
  }
  //we dont want the error to shut down the server, therefore we are going to use try catch.
  //we catch the error and log it to the console.
});
