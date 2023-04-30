import React, { useState } from "react";
import axios from "axios";

function StockReport() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/stockreport", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Southern Agro Serve (Pvt) Ltd.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        className="btn btn-success"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? "Generating report..." : "Download Report"}
      </button>

      <div>
        <div className="card mb-4 shadow-sm">
          <article className="card-body">
            <h5 className="card-title">Profits Made</h5>
            <iframe
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                width: "100%",
                height: "350px",
              }}
              src="https://charts.mongodb.com/charts-project-1-vyayb/embed/charts?id=6444cd74-74a9-44f3-89bf-e82bf46f72e5&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </article>
        </div>
        <div className="card mb-4 shadow-sm">
          <article className="card-body">
            <h5 className="card-title">Category Details</h5>
            <iframe
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
                width: "100%",
                height: "350px",
              }}
              src="https://charts.mongodb.com/charts-project-1-vyayb/embed/charts?id=6444cfc5-8298-47f9-8848-18adf933a768&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </article>
        </div>
      </div>
    </div>
  );
}

export default StockReport;
