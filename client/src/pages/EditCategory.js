import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    //image: "",
    quantityavailable: "",
    quantitysold: "",
    ordersinqueue: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryDetails({ ...categoryDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...categoryDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      toast.success(`Updated [${categoryDetails.name}] Successfully`);

      setCategoryDetails({
        name: "",
        //image: "",
        quantityavailable: "",
        quantitysold: "",
        ordersinqueue: "",
      });
      navigate("/mycategories");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchCategory() {
      try {
        const res = await fetch(`http://localhost:8000/api/category/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setCategoryDetails({
            name: result.name,
            quantityavailable: result.quantityavailable,
            quantitysold: result.quantitysold,
            costprice: result.costprice,
            ordersinqueue: result.ordersinqueue,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch category. Please try again later.");
        setLoading(false);
      }
    }
    fetchCategory();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Category..." />
      ) : (
        <>
          <h2 className="text-center bg-darkgreen text-white p-2">Edit Category</h2>
          <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={categoryDetails.name}
                onChange={handleInputChange}
                placeholder="Sprayers"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* LAST NAME */}
            {/* <div className="form-group">
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
        </div> */}
            {/* EMAIL */}
            <div className="form-group">
              <label
                htmlFor="quantityAvailableInput"
                className="form-label mt-4"
              >
                Quantity Available
              </label>
              <input
                type="number"
                className="form-control"
                id="quantityAvailableInput"
                name="quantityavailable"
                value={categoryDetails.quantityavailable}
                onChange={handleInputChange}
                placeholder="10"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="quantitySoldInput" className="form-label mt-4">
                Quantity Sold
              </label>
              <input
                type="number"
                className="form-control"
                id="quantitySoldInput"
                name="quantitysold"
                value={categoryDetails.quantitysold}
                onChange={handleInputChange}
                placeholder="10"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* Date Joined */}
            <div className="form-group">
              <label htmlFor="ordersInQueueInput" className="form-label mt-4">
                Orders In Queue
              </label>
              <input
                type="number"
                className="form-control"
                id="ordersInQueueInput"
                name="ordersinqueue"
                value={categoryDetails.ordersinqueue}
                onChange={handleInputChange}
                placeholder="1"
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
        </div>
      </div>
        </>
      )}
    </>
  );
};

export default EditCategory;
