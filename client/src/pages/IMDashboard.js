const IMDashboard = () => {
  return (
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
  );
};

export default IMDashboard;
