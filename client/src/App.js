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

const App = () => {
  return (
    <Router>
      <ToastContextProvider>
        <AuthContextProvider>
          <Layout>
            <Switch>
              <Route path="/" element={<Home />} />
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
            </Switch>
          </Layout>
        </AuthContextProvider>
      </ToastContextProvider>
    </Router>
  );
};

export default App;
