// /* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import { useLocation } from "react-router-dom";

//this is the navbar component
const Navbar = ({ title = "Southern Agro" }) => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/">
          <a className="navbar-brand">{title}</a>
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {/* BHANUKA*************************************************** */}
                {/* <li className="nav-item">
                  <Link to="/allvehicle">
                    <a className="nav-link">Vehicle</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addRunningRecords">
                    <a className="nav-link">Running Records</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addrepair">
                    <a className="nav-link">Repair</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/registerGarage">
                    <a className="nav-link">garage</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/allDocument">
                    <a className="nav-link">Document Storage</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/drivervehicleAssign">
                    <a className="nav-link">Driver Assign</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/repairAssign">
                    <a className="nav-link">Repair Assign</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addFuel">
                    <a className="nav-link">Add Fuel</a>
                  </Link>
                </li> */}

                {/* BHANUKA*************************************************** */}

                {/* PASINDU******************************************** */}
                <li className="nav-item">
                  <Link to="/createsalesrep" role="button">
                    <a className="nav-link">Create sales rep</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/allsalesreps">
                    <a className="nav-link">Sales Representatives</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/myschedules">
                    <a className="nav-link">Delivery Schedules</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/createdeliveryreport">
                    <a className="nav-link">Report</a>
                  </Link>
                </li>
                {/* PASINDU******************************************** */}

                {/* YERAN************************************** */}
                {/* <li className="nav-item">
                  <Link to="/index" role="button">
                    <a className="nav-link">Dashboard</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addattendance">
                    <a className="nav-link">Attendace</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addsalary">
                    <a className="nav-link">Salary</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/createreport">
                    <a className="nav-link">Report</a>
                  </Link>
                </li> */}
                {/* YERAN************************************** */}

                <li
                  className="nav-item"
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    toast.success("Logout Successful!");
                    navigate("/login", { replace: true });
                  }}
                >
                  <button className="btn btn-danger">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <a className="nav-link">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">
                    <a className="nav-link"> Register</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// //NOTES:

// //Difference between Link and <a> tag in react-router-dom is that Link tag does not refresh the page, it just changes the url in the browser and <a> tag refreshes the page.
