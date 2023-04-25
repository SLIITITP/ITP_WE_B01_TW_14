// /* eslint-disable jsx-a11y/anchor-is-valid */
// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import ToastContext from "../context/ToastContext";
// import { useLocation } from "react-router-dom";
// import { FaBars } from "react-icons/fa";

// //this is the navbar component
// const Navbar = ({ title = "Southern Agro" }) => {
//   const [currentPage, setCurrentPage] = useState("");
//   const location = useLocation();
//   const [showSidebar, setShowSidebar] = useState(false);

//   useEffect(() => {
//     setCurrentPage(location.pathname);
//   }, [location.pathname]);

//   const navigate = useNavigate();
//   const { user, setUser } = useContext(AuthContext);
//   const { toast } = useContext(ToastContext);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <div className="container-fluid">
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarColor01"
//           aria-controls="navbarColor01"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <Link to="/" className="navbar-brand">
//           {title}
//         </Link>
//         <div className="collapse navbar-collapse" id="navbarColor02">
//           <ul className="navbar-nav ms-auto">
//             {user ? (
//               <>
//                 {/* BHANUKA*************************************************** */}
//                 {/* <li className="nav-item">
//                   <Link to="/allvehicle">
//                     <a className="nav-link">Vehicle</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/addRunningRecords">
//                     <a className="nav-link">Running Records</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/addrepair">
//                     <a className="nav-link">Repair</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/registerGarage">
//                     <a className="nav-link">garage</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/allDocument">
//                     <a className="nav-link">Document Storage</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/drivervehicleAssign">
//                     <a className="nav-link">Driver Assign</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/repairAssign">
//                     <a className="nav-link">Repair Assign</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/addFuel">
//                     <a className="nav-link">Add Fuel</a>
//                   </Link>
//                 </li> */}

//                 {/* BHANUKA*************************************************** */}

//                 {/* YASITHA*************************************************** */}
//                 {/* <li className="nav-item">
//                   <Link to="/stockreport">
//                     <a className="nav-link">Report</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/imdashboard">
//                     <a className="nav-link">Charts</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/myprofits">
//                     <a className="nav-link">Profit</a>
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link to="/mycategories">
//                     <a className="nav-link">Categories</a>
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link to="/mystocks">
//                     <a className="nav-link">Inventory</a>
//                   </Link>
//                 </li> */}

//                 {/* YASITHA*************************************************** */}

//                 {/* PASINDU******************************************** */}

//                 {/* <li className="nav-item">
//                   <Link to="/allsalesreps">
//                     <a className="nav-link">Sales Representatives</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/myschedules">
//                     <a className="nav-link">Delivery Schedules</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/createdeliveryreport">
//                     <a className="nav-link">Report</a>
//                   </Link>
//                 </li> */}
//                 {/* PASINDU******************************************** */}

//                 {/* YERAN************************************** */}
//                 <li className="nav-item">
//                   <Link to="/index" role="button" className="nav-link">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/emdashboard" role="button" className="nav-link">
//                     Charts
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/addattendance" role="button" className="nav-link">
//                     Attendace
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/addsalary" role="button" className="nav-link">
//                     Salary
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/createreport" role="button" className="nav-link">
//                     Report
//                   </Link>
//                 </li>
//                 {/* <li className="nav-item">
//                   <Link to="/index" role="button">
//                     <a className="nav-link">Dashboard</a>
//                   </Link>
//                 </li> */}
//                 {/* <li className="nav-item">
//                   <Link to="/" role="button">
//                     <a className="nav-link">Charts</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/addattendance">
//                     <a className="nav-link">Attendace</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/addsalary">
//                     <a className="nav-link">Salary</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/createreport">
//                     <a className="nav-link">Report</a>
//                   </Link>
//                 </li> */}
//                 {/* YERAN************************************** */}

//                 <li
//                   className="nav-item"
//                   onClick={() => {
//                     setUser(null);
//                     localStorage.clear();
//                     toast.success("Logout Successful!");
//                     navigate("/login", { replace: true });
//                   }}
//                 >
//                   <button className="btn btn-danger">Logout</button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link to="/login">
//                     <a className="nav-link">Login</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/register">
//                     <a className="nav-link"> Register</a>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// //NOTES:

// //Difference between Link and <a> tag in react-router-dom is that Link tag does not refresh the page, it just changes the url in the browser and <a> tag refreshes the page.

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import { useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ title = "Southern Agro" }) => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {showSidebar ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sidenav${showSidebar ? " open" : ""}`}>
        <Link to="/" className="navbar-brand">
          {title}
        </Link>
        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/index" role="button" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/emdashboard" role="button" className="nav-link">
                  Charts
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addattendance" role="button" className="nav-link">
                  Attendace
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addsalary" role="button" className="nav-link">
                  Salary
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/createreport" role="button" className="nav-link">
                  Report
                </Link>
              </li>
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
    </>
  );
};

export default Navbar;
