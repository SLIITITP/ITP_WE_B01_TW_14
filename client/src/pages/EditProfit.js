import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const EditProfit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const [profitDetails, setProfitDetails] = useState({
    stockid: "",
    costprice: "",
    sellingprice: "",
    quantitysold: "",
    timeperiod: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfitDetails({ ...profitDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/profit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...profitDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      toast.success(`Updated [${profitDetails.name}] Successfully`);

      setProfitDetails({
        name: "",
        //image: "",
        stockid: "",
        costprice: "",
        sellingprice: "",
        quantitysold: "",
        timeperiod: "",
      });
      navigate("/myprofits");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchProfit() {
      try {
        const res = await fetch(`http://localhost:8000/api/profit/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setProfitDetails({
            stockid: result.stockid,
            costprice: result.costprice,
            sellingprice: result.sellingprice,
            quantitysold: result.quantitysold,
            timeperiod: result.timeperiod,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch profit. Please try again later.");
        setLoading(false);
      }
    }
    fetchProfit();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Profit..." />
      ) : (
        <>
          <h2>Edit Profit</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="stockidInput" className="form-label mt-4">
                Enter Stock ID
              </label>
              <input
                type="text"
                className="form-control"
                id="stockidInput"
                name="stockid"
                value={profitDetails.stockid}
                onChange={handleInputChange}
                placeholder="SP001"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* SALARY */}
            <div className="form-group">
              <label htmlFor="costPriceInput" className="form-label mt-4">
                Cost Price
              </label>
              <input
                type="number"
                className="form-control"
                id="costPriceInput"
                name="costprice"
                value={profitDetails.costprice}
                onChange={handleInputChange}
                placeholder="1000"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* DATE */}
            <div className="form-group">
              <label htmlFor="sellingPriceInput" className="form-label mt-4">
                Selling Price
              </label>
              <input
                type="number"
                className="form-control"
                id="sellingPriceInput"
                name="sellingprice"
                value={profitDetails.sellingprice}
                onChange={handleInputChange}
                placeholder="2000"
                required
                fdprocessedid="8n2of"
              />
            </div>
            {/* Bonus */}
            <div className="form-group">
              <label htmlFor="quantitySoldInput" className="form-label mt-4">
                Quantity Sold
              </label>
              <input
                type="number"
                className="form-control"
                id="quantitySoldInput"
                name="quantitysold"
                value={profitDetails.quantitysold}
                onChange={handleInputChange}
                placeholder="10"
                required
                fdprocessedid="8n2of"
              />
            </div>
            <div className="form-group">
              <label htmlFor="timePeriodInput" className="form-label mt-4">
                Time Period
              </label>
              <input
                type="text"
                className="form-control"
                id="timePeriodInput"
                name="timeperiod"
                value={profitDetails.timeperiod}
                onChange={handleInputChange}
                placeholder="02/02/2023 - 12/02/2023"
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

export default EditProfit;
