import React from "react";

export default function Dashboard(){
    return(
        <section className="flex">
        <div className="col-xl-6 col-g-12">
          <div className="card mb-4 shadow-sm">
                <article className="card-body">
                <h5 className="card-title">Monthly Appointments</h5>
                <iframe 
                style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);" ,
                width:"100%", 
                height:"470px" }}
                src="https://charts.mongodb.com/charts-project-1-vyayb/embed/charts?id=645bc0b8-d3ec-42bf-834d-6b93ede9e788&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
                </article>
            </div>
        </div>
        </section>
        
        
    );
}