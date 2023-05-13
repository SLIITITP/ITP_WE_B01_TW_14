import React from 'react'

export const FuelUsage = () => {
  return (
    <div className="card mb-4 shadow-sm">
            <article className="card-body">
                <h5 className="card-title">Fuel Usage</h5>
                <iframe 
                style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);" ,
                width:"100%", 
                height:"350px" }}
                src="https://charts.mongodb.com/charts-project-1-vyayb/embed/charts?id=645bdfb7-9cc7-41fd-823b-3ce8be9796f9&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            </article>
        </div>
  )
}
