import { useEffect, useState, useContext, useReducer } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";

const PaymentGatewayScreen = () => {
  const [amount, setAmount] = useState("0");
  const [currency, setCurrency] = useState("USD");
  const style = { layout: "vertical" };
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/mine", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOrders(data);
      } catch (error) {
        console.log("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, [userInfo]);

  const orderIds = orders.map((order) => order.orderId);

  const handleSelectOrder = (event) => {
    setSelectedOrder(event.target.value);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "amount") {
      setAmount(value);
    }
  };
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "FETCH_REQUEST":
  //       return { ...state, loading: true };
  //     case "FETCH_SUCCESS":
  //       return { ...state, orders: action.payload, loading: false };
  //     case "FETCH_FAIL":
  //       return { ...state, loading: false, error: action.payload };
  //     default:
  //       return state;
  //   }
  // };

  const ButtonWrapper = ({ showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    // const [{ loading, error, orders }, dispatch1] = useReducer(reducer, {
    //   loading: true,
    //   error: "",
    // });

    // useEffect(() => {
    //   const fetchData = async () => {
    //     dispatch1({ type: "FETCH_REQUEST" });
    //     try {
    //       const { data } = await axios.get(
    //         `/api/orders/mine`,

    //         { headers: { Authorization: `Bearer ${userInfo.token}` } }
    //       );
    //       dispatch1({ type: "FETCH_SUCCESS", payload: data });
    //     } catch (error) {
    //       dispatch1({
    //         type: "FETCH_FAIL",
    //         payload: getError(error),
    //       });
    //     }
    //   };
    //   fetchData();
    // }, [userInfo]);

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capture the order
            });
          }}
        />
      </>
    );
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        border: "3px solid green",
        padding: "10px",
        maxWidth: "750px",
        minHeight: "200px",
      }}
    >
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          components: "buttons",
          currency: "USD",
        }}
      >
        <div className='form-group'>
          {/* <label htmlFor='customerName' className='form-label mt-4'>
            Customer Name:
          </label>
          <input
            type='text'
            className='form-control'
            id='inputCusName'
            placeholder='I.M.M. Pasan Perera'
            name='cusName'
            fdprocessedid='8n20f'
          /> */}
          <div>
            <label className='form-label mt-4' htmlFor='order-dropdown'>
              Select an order:
            </label>
            <select
              id='order-dropdown'
              className='form-control'
              value={selectedOrder}
              onChange={handleSelectOrder}
            >
              <option value=''>Select an order</option>
              {orderIds.map((orderId) => (
                <option key={orderId} value={orderId}>
                  {orderId}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor='amount' className='form-label mt-4'>
            Amount:
          </label>
          <input
            type='text'
            className='form-control'
            id='inputAmount'
            placeholder='10.00'
            name='amount'
            value={amount}
            onChange={handleInputChange}
          />
          <button
            className='btn btn-info my-2'
            onClick={() => setCurrency("USD")}
          >
            USD
          </button>
          <button
            className='btn btn-info my-2'
            onClick={() => setCurrency("EUR")}
          >
            EUR
          </button>
        </div>
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentGatewayScreen;
