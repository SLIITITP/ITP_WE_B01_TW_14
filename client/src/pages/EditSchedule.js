import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [userDetails, setUserDetails] = useState({
    orderID: "",
    date: "",
    destination: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/schedule`, {
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
      toast.success(`Updated [${userDetails.orderID}] Successfully`);

      setUserDetails({
        orderID: "",
        date: "",
        destination: "",
      });
      navigate("/myschedules");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchDelivery() {
      try {
        const res = await fetch(`http://localhost:8000/api/schedule/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setUserDetails({
            orderID: result.orderID,
            date: result.date,
            destination: result.destination,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(
          "Failed to fetch Delivery Schedule. Please try again later."
        );
        setLoading(false);
      }
    }
    fetchDelivery();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Schedule..." />
      ) : (
        <>
          <h2>Edit Schedule</h2>
          <form onSubmit={handleSubmit}>
            {/* Order ID */}
            <div className="form-group">
              <label htmlFor="orderIDInput" className="form-label mt-4">
                Order ID
              </label>
              <input
                type="text"
                className="form-control"
                id="orderIDInput"
                name="orderID"
                value={userDetails.orderID}
                onChange={handleInputChange}
                placeholder="O01"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* Date  */}
            <div className="form-group">
              <label htmlFor="dateInput" className="form-label mt-4">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="dateInput"
                name="date"
                value={userDetails.date}
                onChange={handleInputChange}
                placeholder="5/01/2022"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* DESTINATION */}
            <div className="form-group">
              <label htmlFor="destinationInput" className="form-label mt-4">
                Destination
              </label>
              <input
                type="text"
                className="form-control"
                id="destinationInput"
                name="destination"
                value={userDetails.destination}
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

export default EditSchedule;
