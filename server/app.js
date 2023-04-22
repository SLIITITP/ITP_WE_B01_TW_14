require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //pasindu

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

// app.use("/vehicleuploads", express.static("./vehicleuploads"));

//Bhanuka***************************************************************************

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

//server configurations.
const PORT = process.env.PORT || 8000; //3000 port we will use  for frontend
app.listen(PORT, async () => {
  //We dont want to start the server until we are connected to the database.
  //therefore we are going to use async await.
  //In the terminal we will see the message "server listening on port: 8000" only after we are connected to the database.
  try {
    await connectDB();
    console.log(`server listening on port: ${PORT}`);
  } catch (err) {
    console.log(err);
  }
  //we dont want the error to shut down the server, therefore we are going to use try catch.
  //we catch the error and log it to the console.
});
