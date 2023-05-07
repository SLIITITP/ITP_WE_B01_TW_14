import React from 'react'

export const VehicleMileage = () => {
  return (
    <div className="card mb-4 shadow-sm">
            <article className="card-body">
                <h5 className="card-title">Vehicle Mileage</h5>
                <iframe 
                style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);" ,
                width:"100%", 
                height:"350px" }}
                src="https://charts.mongodb.com/charts-southern-agro-serve-yxqwr/embed/charts?id=6443732b-4c3e-4703-809b-d0fea2405ae5&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            </article>
        </div>
  )
}