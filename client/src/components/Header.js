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
          <img
            // src={user.profilePicture}
            src={user.profilePicture}
            alt={user.name}
            className="rounded-circle mr-2"
            width="40"
            height="40"
          />
        </div>
      )}
    </header>
  );
};

export default Header;