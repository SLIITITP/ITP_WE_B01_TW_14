import { useEffect, useContext } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const VMDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  return (
    <div className="grid grid--2-col">
      <div className="col-xl-6 col-g-12">
        <div className="card mb-4 shadow-sm">
          <article className="card-body">
            <h5 className="card-title">Fuel Usage Monthly</h5>
            <iframe
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                width: "100%",
                height: "350px",
              }}
              src="https://charts.mongodb.com/charts-southern-agro-serve-yxqwr/embed/charts?id=643a98d8-2b11-4568-87cc-f10d0f93a26e&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </article>
        </div>

        <div className="card mb-4 shadow-sm">
          <article className="card-body">
            <h5 className="card-title">Fuel Usage</h5>
            <iframe
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                width: "100%",
                height: "350px",
              }}
              src="https://charts.mongodb.com/charts-southern-agro-serve-yxqwr/embed/charts?id=644269dd-f57b-4888-8d30-a99cb4fe3c61&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </article>
        </div>
      </div>
    </div>
  );
};
