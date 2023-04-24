import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const EditStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [stockDetails, setStockDetails] = useState({
    name:"",
    category: "",
    description: "",
    costprice: "",
    sellingprice: "",
    quantity: "",
    supplier: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStockDetails({ ...stockDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/stock`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...stockDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      toast.success(`Updated [${stockDetails.name}] Successfully`);

      setStockDetails({
        name:"",
    //image: "",
    category: "",
    description: "",
    costprice: "",
    sellingprice: "",
    quantity: "",
    supplier: "",
      });
      navigate("/mystocks");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchStock() {
      try {
        const res = await fetch(`http://localhost:8000/api/stock/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setStockDetails({
            name: result.name,
            category: result.category,
            description: result.description,
            costprice: result.costprice,
            sellingprice: result.sellingprice,
            quantity: result.quantity,
            supplier: result.supplier,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch stock. Please try again later.");
        setLoading(false);
      }
    }
    fetchStock();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Stock..." />
      ) : (
        <>
          <h2>Edit Stock</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Stock Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={stockDetails.name}
            onChange={handleInputChange}
            placeholder="Yeran"
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
          <label htmlFor="categoryInput" className="form-label mt-4">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryInput"
            name="category"
            value={stockDetails.category}
            onChange={handleInputChange}
            placeholder="vegetables"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* PHONE */}
        <div className="form-group">
          <label htmlFor="descriptionInput" className="form-label mt-4">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="descriptionInput"
            name="description"
            value={stockDetails.description}
            onChange={handleInputChange}
            placeholder="+94 77 123 4567"
            required
            fdprocessedid="8n2of"
          />
        </div>
        {/* Date Joined */}
        <div className="form-group">
          <label htmlFor="costPriceInput" className="form-label mt-4">
            Cost Price
          </label>
          <input
            type="number"
            className="form-control"
            id="costPriceInput"
            name="costprice"
            value={stockDetails.costprice}
            onChange={handleInputChange}
            placeholder="Rs 1000"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sellingPriceInput" className="form-label mt-4">
            Selling Price
          </label>
          <input
            type="number"
            className="form-control"
            id="sellingPriceInput"
            name="sellingprice"
            value={stockDetails.sellingprice}
            onChange={handleInputChange}
            placeholder="Rs 2000"
            required
            fdprocessedid="8n2of"
          />
          </div>

        <div className="form-group">
          <label htmlFor="quantityInput" className="form-label mt-4">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantityInput"
            name="quantity"
            value={stockDetails.quantity}
            onChange={handleInputChange}
            placeholder="10"
            required
            fdprocessedid="8n2of"
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplierInput" className="form-label mt-4">
            Supplier
          </label>
          <input
            type="text"
            className="form-control"
            id="supplierInput"
            name="supplier"
            value={stockDetails.supplier}
            onChange={handleInputChange}
            placeholder="Supplier Name"
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

export default EditStock;
