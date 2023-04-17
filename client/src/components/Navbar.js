/* eslint-disable jsx-a11y/anchor-is-valid */
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
                  <Link to="/myemployees">
                    <a className="nav-link">All Employees</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/createemp">
                    <a className="nav-link">Add Employee</a>
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

//NOTES:

//Difference between Link and <a> tag in react-router-dom is that Link tag does not refresh the page, it just changes the url in the browser and <a> tag refreshes the page.
