import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    datejoined: "",
    department: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/employee`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      toast.success(`Updated [${userDetails.firstname}] Successfully`);

      setUserDetails({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        datejoined: "",
        department: "",
        designation: "",
      });
      navigate("/myemployees");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchEmployee() {
      try {
        const res = await fetch(`http://localhost:8000/api/employee/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setUserDetails({
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            phone: result.phone,
            datejoined: result.datejoined,
            department: result.department,
            designation: result.designation,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch employee. Please try again later.");
        setLoading(false);
      }
    }
    fetchEmployee();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            {/* FIRST NAME */}
            <div className="form-group">
              <label htmlFor="fnameInput" className="form-label mt-4">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fnameInput"
                name="firstname"
                value={userDetails.firstname}
                onChange={handleInputChange}
                placeholder="Yeran"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* LAST NAME */}
            <div className="form-group">
              <label htmlFor="lnameInput" className="form-label mt-4">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lnameInput"
                name="lastname"
                value={userDetails.lastname}
                onChange={handleInputChange}
                placeholder="Kodithuwakku"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="emailInput" className="form-label mt-4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="ykods@gmail.com"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="phoneInput" className="form-label mt-4">
                Contact Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="+94 77 123 4567"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* Date Joined */}
            <div className="form-group">
              <label htmlFor="dateInput" className="form-label mt-4">
                Date Joined
              </label>
              <input
                type="date"
                className="form-control"
                id="dateInput"
                name="datejoined"
                value={userDetails.datejoined}
                onChange={handleInputChange}
                placeholder="5/01/2022"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* Department */}
            <div className="form-group">
              <label htmlFor="departmentInput" className="form-label mt-4">
                Department
              </label>
              <select
                className="form-control"
                id="departmentInput"
                name="department"
                value={userDetails.department}
                onChange={handleInputChange}
                required
                fdprocessedid="8n2of"
              >
                <option value="">Select Department</option>
                <option value="Farming Department">Farming Department</option>
                <option value="Livestock Department">
                  Livestock Department
                </option>
                <option value="Marketing Department">
                  Marketing Department
                </option>
                <option value="Sales Department">Sales Department</option>
                <option value="Finance Department">Finance Department</option>
                <option value="Human Resources Department">
                  Human Resources Department
                </option>
                <option value="Research and Development Department">
                  Research and Development Department
                </option>
              </select>
            </div>
            {/* Designation */}
            <div className="form-group">
              <label htmlFor="designationInput" className="form-label mt-4">
                Designation
              </label>
              <select
                className="form-control"
                id="designationInput"
                name="designation"
                value={userDetails.designation}
                onChange={handleInputChange}
                placeholder="Manager"
                required
                fdprocessedid="8n2of"
              >
                <option value="">Select Designation</option>
                <option value="Farm Manager">Farm Manager</option>
                <option value="Agronomist">Agronomist</option>
                <option value="Irrigation Specialist">
                  Irrigation Specialist
                </option>
                <option value="Crop Production Supervisor">
                  Crop Production Supervisor
                </option>
                <option value="Livestock Manager">Livestock Manager</option>
                <option value="Animal Nutritionist">Animal Nutritionist</option>
                <option value="Breeding Technician">Breeding Technician</option>
                <option value="Veterinarian">Veterinarian</option>
                <option value="Marketing Manager">Marketing Manager</option>
                <option value="Brand Manager">Brand Manager</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Account Manager">Account Manager</option>
                <option value="Customer Service Representative">
                  Customer Service Representative
                </option>
                <option value="Human Resources Manager">
                  Human Resources Manager
                </option>
                <option value="Training and Development Coordinator">
                  Training and Development Coordinator
                </option>
                <option value="Crop Breeder">Crop Breeder</option>
                <option value="Research Scientist">Research Scientist</option>
                <option value="Entomologist">Entomologist</option>
              </select>
            </div>
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info my-2"
            />
          </form>
        </>
      )}
    </>
  );
};

export default EditEmployee;
