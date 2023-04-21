// /* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

//this is the navbar component
const Navbar = ({ title = "Southern Agro" }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/">
          <a className="navbar-brand">{title}</a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {/* <li className="nav-item">
                  <Link to="/mycontacts">
                    <a className="nav-link">All Contacts</a>
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link to="/create">
                    <a className="nav-link">Create Contact</a>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/" role="button">
                    <a className="nav-link">Dashboard</a>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/myemployees">
                    <a className="nav-link">All Employees</a>
                  </Link>
                </li> */}
                {/* <li className="nav-item">
                  <Link to="/createemp">
                    <a className="nav-link">Add Employee</a>
                  </Link>
                </li> */}
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
      </div>
    </nav>
  );
};

export default Navbar;

// //NOTES:

// //Difference between Link and <a> tag in react-router-dom is that Link tag does not refresh the page, it just changes the url in the browser and <a> tag refreshes the page.

// sidebar code
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import ToastContext from "../context/ToastContext";

// //this is the navbar component
// const Navbar = ({ title = "Southern Agro" }) => {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(AuthContext);
//   const { toast } = useContext(ToastContext);
//   return (
//     <div className="d-flex" id="wrapper">
//       <div className="bg-primary border-right" id="sidebar-wrapper">
//         <div className="sidebar-heading">{title}</div>
//         <div className="list-group list-group-flush">
//           {user ? (
//             <>
//               <Link
//                 to="/"
//                 className="list-group-item list-group-item-action bg-primary"
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 to="/addattendance"
//                 className="list-group-item list-group-item-action bg-primary"
//               >
//                 Attendance
//               </Link>
//               <Link
//                 to="/addsalary"
//                 className="list-group-item list-group-item-action bg-primary"
//               >
//                 Salary
//               </Link>
//               <Link
//                 to="/createreport"
//                 className="list-group-item list-group-item-action bg-primary"
//               >
//                 Report
//               </Link>
//               <button
//                 className="btn btn-danger mt-4 mx-4"
//                 onClick={() => {
//                   setUser(null);
//                   localStorage.clear();
//                   toast.success("Logout Successful!");
//                   navigate("/login", { replace: true });
//                 }}
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="list-group-item list-group-item-action bg-primary"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="list-group-item list-group-item-action bg-primary"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//       <div id="page-content-wrapper">
//         <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
//           <button className="btn btn-primary" id="menu-toggle">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
//               <li className="nav-item active">
//                 <Link to="/" className="nav-link">
//                   Home
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         <div className="container-fluid">
//           <h1 className="mt-4">{title}</h1>
//           <p>Welcome to the Southern Agro Dashboard</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
