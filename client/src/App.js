import { Routes as Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
// import { ToastContextProvider } from "./context/ToastContext";
import { AuthContextProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";
import EditContact from "./pages/EditContact";
import { ToastContextProvider } from "./context/ToastContext";
import CreateEmployee from "./pages/CreateEmployee";
import AllEmployee from "./pages/AllEmployees";
import EditEmployee from "./pages/EditEmployee";
import CreateSalary from "./pages/AddSalary";
import CreateAttendance from "./pages/AddAttendance";
import Report from "./pages/CreateReport";
import Index from "./pages";

// Bhanuka
import "./App.css";
//import {Navbar} from './components/Navbar';
import { AllVehicle } from "./pages/AllVehicle";
import { AddVehicle } from "./pages/AddVehicle";
import { EditVehicle } from "./pages/EditVehicle";
import { VehicleDetail } from "./pages/VehicleDetail";
import { DriverVehicleAssign } from "./pages/DriverVehicleAssign";
import { AddFuel } from "./pages/AddFuel";
import { RepairAssign } from "./pages/RepairAssign";
import { VMDashboard } from "./pages/VMDashboard";
import { AllVehicleDocument } from "./pages/AllVehicleDocument";
import { Editdocument } from "./pages/Editdocument";
import { AddRunnigRecords } from "./pages/AddRunnigRecords";
import { AddRepair } from "./pages/AddRepair";
import { RegisterGarage } from "./pages/RegisterGarage";
// Bhanuka

const App = () => {
  return (
    <Router>
      <ToastContextProvider>
        <AuthContextProvider>
          <Layout>
            <Switch>
              <Route path="/" element={<Home />} />
              <Route path="/index" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<CreateContact />} />
              <Route path="/mycontacts" element={<AllContact />} />
              <Route path="/edit/:id" element={<EditContact />} />
              <Route path="/createemp" element={<CreateEmployee />} />
              <Route path="/myemployees" element={<AllEmployee />} />
              <Route path="/editemp/:id" element={<EditEmployee />} />
              <Route path="/addsalary" element={<CreateSalary />} />
              <Route path="/addattendance" element={<CreateAttendance />} />
              <Route path="/createreport" element={<Report />} />

              {/* Bhanuka */}
              <Route path="/vmdashboard" exact element={<VMDashboard />} />
              <Route path="/allvehicle" exact element={<AllVehicle />} />
              <Route path="/registerVehicle" element={<AddVehicle />} />
              <Route
                path="/allvehicle/editVehicle/:id"
                element={<EditVehicle />}
              />
              <Route
                path="/allvehicle/viewVehicle/:id"
                element={<VehicleDetail />}
              />
              <Route
                path="/drivervehicleAssign"
                element={<DriverVehicleAssign />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addFuel" element={<AddFuel />} />
              <Route path="/repairAssign" element={<RepairAssign />} />
              <Route path="/allDocument" element={<AllVehicleDocument />} />
              <Route
                path="/allDocument/editdoc/:id"
                element={<Editdocument />}
              />
              <Route path="/addRunningRecords" element={<AddRunnigRecords />} />
              <Route path="/addrepair" element={<AddRepair />} />
              <Route path="/registerGarage" element={<RegisterGarage />} />

              {/* Bhanuka */}
            </Switch>
          </Layout>
        </AuthContextProvider>
      </ToastContextProvider>
    </Router>
  );
};

export default App;
