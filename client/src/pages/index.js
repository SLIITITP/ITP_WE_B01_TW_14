import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">Welcome {user ? user.name : null}</h1>
        <hr className="my-4" />
        <div>
          <Link className="btn btn-info mb-2" to={"/createemp"} role="button">
            Add Employee
          </Link>
        </div>
        <div>
          <Link className="btn btn-info" to={"/"} role="button">
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
