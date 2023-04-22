import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const EditDelivery = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [userDetails, setUserDetails] = useState({
    EmployeeID: "",
    Territory: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/delivery`, {
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
      toast.success(`Updated [${userDetails.EmployeeID}] Successfully`);

      setUserDetails({
        EmployeeID: "",
        Territory: "",
      });
      navigate("/allsalesreps");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchDelivery() {
      try {
        const res = await fetch(`http://localhost:8000/api/delivery/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setUserDetails({
            EmployeeID: result.EmployeeID,
            Territory: result.Territory,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(
          "Failed to fetch Sales Representative. Please try again later."
        );
        setLoading(false);
      }
    }
    fetchDelivery();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Sales Representative..." />
      ) : (
        <>
          <h2>Edit Sales Representative</h2>
          <form onSubmit={handleSubmit}>
            {/* FIRST NAME */}
            <div className="form-group">
              <label htmlFor="empIDInput" className="form-label mt-4">
                Employee ID
              </label>
              <input
                type="text"
                className="form-control"
                id="empIDInput"
                name="EmployeeID"
                value={userDetails.EmployeeID}
                onChange={handleInputChange}
                placeholder="E001"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* LAST NAME */}
            <div className="form-group">
              <label htmlFor="territoryInput" className="form-label mt-4">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="territoryInput"
                name="Territory"
                value={userDetails.Territory}
                onChange={handleInputChange}
                placeholder="Galle"
                required
                fdprocessedid="8n2of"
              />
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

export default EditDelivery;
