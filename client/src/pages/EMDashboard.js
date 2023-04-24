const EMDashboard = () => {
  return (
    <div>
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Employee Salary</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-project-1-vyayb/embed/charts?id=6444ce6a-81d6-4f1d-8d25-427b685de649&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Employee Attendance</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-project-1-vyayb/embed/charts?id=6444cee2-b03e-4a37-8ef6-dd3f69ca75e9&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default EMDashboard;
