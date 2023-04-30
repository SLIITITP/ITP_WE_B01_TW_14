import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //spreading the previous state with the new state
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //prevents the page from reloading/refreshing

    // console.log(credentials);

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !credentials.role
    ) {
      toast.error("Please enter all the required fields!");
      return;
    }

    //check if the password and confirm password match
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("password do not match");
    }
    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };
  return (
    <>
      <h3 className="text-center">Create your account</h3>

      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={credentials.name}
                onChange={handleInputChange}
                placeholder="Yeran Kodithuwakku"
                required
                fdprocessedid="8n2of"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput" className="form-label mt-4">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="yerankodithuwakku@gmail.com"
                required
                fdprocessedid="8n2of"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput" className="form-label mt-4">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                name="password"
                value={credentials.password}
                placeholder="Enter Password"
                onChange={handleInputChange}
                required
                fdprocessedid="8n2of"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label mt-4">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleInputChange}
                required
                fdprocessedid="8n2of"
              />
            </div>
            <div className="form-group">
              <label htmlFor="roleInput" className="form-label mt-4">
                Role
              </label>
              <select
                className="form-control"
                id="roleInput"
                name="role"
                value={credentials.role}
                onChange={handleInputChange}
                placeholder="HR Manager"
                required
                fdprocessedid="8n2of"
              >
                <option value="">Select Role</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Delivery Manager">Delivery Manager</option>
                <option value="Vehicle Manager">Vehicle Manager</option>
              </select>
            </div>
            <input
              type="submit"
              value="Register"
              className="btn btn-primary my-3"
            ></input>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
