import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { Store } from "../Store";
import { Badge } from "react-bootstrap";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{ background: "linear-gradient(to right, #214956 , #498459)" }}
    >
      {user && user.role === "Customer" ? (
        <Link
          to="/products"
          className="navbar-brand"
          style={{ textDecoration: "none" }}
        >
          <h1 className="m-2 text-white" style={{ paddingLeft: "25px" }}>
            Southern Agro
          </h1>
        </Link>
      ) : (
        <Link
          to="/"
          className="navbar-brand"
          style={{ textDecoration: "none" }}
        >
          <h1 className="m-2 text-white " style={{ paddingLeft: "25px" }}>
            Southern Agro
          </h1>
        </Link>
      )}
      {user &&
        (user.role === "Customer Manager" || user.role === "Customer") && (
          <SearchBox />
        )}
      {user &&
        (user.role === "Customer Manager" || user.role === "Customer") && (
          <Link
            to="/cart"
            className="nav-link"
            style={{ marginRight: "20px", color: "white" }}
          >
            Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
        )}
      {user && (
        <div className="d-flex align-items-center">
          <span className="text-white" style={{ paddingRight: "25px" }}>
            {user.name}
          </span>
          {user.role === "HR Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/D5603AQHP3Pcr3WftmA/profile-displayphoto-shrink_400_400/0/1687081611222?e=1693440000&v=beta&t=4KoE3y-HRW-J2PoP7T5R35dYeo1BMwoz4sLcBFyTVwM"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === "Delivery Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/C4D03AQFsJckPtRs40g/profile-displayphoto-shrink_400_400/0/1624634415418?e=1689811200&v=beta&t=hUYU6SlT-mkWV-Z-IQTMU0rmw2lMZ_Y5uW5_XOZ3VuA"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}

          {/* {user.role === 'Delivery Manager' && ( */}

          {user.role === "Administrator" && (
            <img
              src={
                "https://media.licdn.com/dms/image/D5603AQEOpuARV18dBQ/profile-displayphoto-shrink_400_400/0/1674372898612?e=1689206400&v=beta&t=S_AAStf8e8WRs3NuYrT8GFDZLS4bHmHJGV2Wl2VBkWM"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {/* {user.role === "Delivery Manager" && (
            <img
              src={
                ""
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )} */}

          {/* {(user.role === 'Customer Manager' || user.role === 'Customer') && ( */}

          {user.role === "Financial Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/C5603AQEcfhRNz3JrHw/profile-displayphoto-shrink_100_100/0/1627656583754?e=1689206400&v=beta&t=l1IJgRlj_w-ugh7Go98kPtG0Y3v6gfF6lzGvZ9xgwv8"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === "Customer Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/C4D03AQEuxwVRnHC7zw/profile-displayphoto-shrink_400_400/0/1656948625943?e=1689811200&v=beta&t=h-niYSxTZ5I4k3aE6rXYtHDKB6aoolIj4ObOXGRs2c4"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === "Supplier Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/D5603AQFRfwp34BSWaQ/profile-displayphoto-shrink_400_400/0/1684298473935?e=1689811200&v=beta&t=v-EMeI6tUvbYcHGobcUzkdGFqKWoITv26WNdjjkWx1c"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === "Inventory Control Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/C4E03AQFRJ6istEexFg/profile-displayphoto-shrink_100_100/0/1624459091173?e=1689206400&v=beta&t=qz1g4OvzvCo1fOTGZFzfWhh7q2fvfvRpyWzaRm6L4NU"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {user.role === "Vehicle Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/C4E03AQFhLqtVLVz__Q/profile-displayphoto-shrink_400_400/0/1624690151211?e=1689206400&v=beta&t=QOwKAUl9IOAMZByP_SdGnmiJDgUboPJjGo0kv8dXJMQ"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
