import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{ background: "linear-gradient(to right, #214956 , #498459)" }}
    >
      <Link to="/" className="navbar-brand" style={{ textDecoration: "none" }}>
        <h1 className="m-2 text-white " style={{ paddingLeft: "25px" }}>
          Southern Agro
        </h1>
      </Link>
      {user && (
        <div className="d-flex align-items-center">
          <span className="text-white" style={{ paddingRight: "25px" }}>
            {user.name}
          </span>
          {user.role === "HR Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/C5603AQE8grUhgHpt2g/profile-displayphoto-shrink_400_400/0/1659579550842?e=1689206400&v=beta&t=6h28vX-YyfU1OlNA0cZNyqd-Md1raXIomtDBM9ABHSM"
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
                "https://media.licdn.com/dms/image/C4D03AQFsJckPtRs40g/profile-displayphoto-shrink_400_400/0/1624634415418?e=1689206400&v=beta&t=PXiMGdHIKv-SVgBTipwPHXGBgBxLg7sssy08LSFsmB0"
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
                "https://media.licdn.com/dms/image/C4D03AQEuxwVRnHC7zw/profile-displayphoto-shrink_400_400/0/1656948625943?e=1689206400&v=beta&t=f_QDyeJNdJ3zleA23fnA7iioBboI-a2m525IXecfTEs"
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
                "https://media.licdn.com/dms/image/C4E03AQHB_MIwKJx34w/profile-displayphoto-shrink_100_100/0/1625974004067?e=1689206400&v=beta&t=S-zJ17gQe6GBTK-3w4jOwfyk4tf53wPyTioY-OenTss"
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
