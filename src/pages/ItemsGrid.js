import React from 'react'
import { useNavigate } from "react-router-dom";


const ItemsGrid = ({items}) => {
  let navigate = useNavigate();
  return (
    <div className = "row d-flex">
      {items.map((item, key) => (
        <div key = {item.id} className= "col-12 col-md-6 col-lg-4 mb-4">
          <div className = "card custom-card w-100 border-0 " style= {{height: "250px", color: "#de6d47", backgroundColor: "#220830"}} onClick={() => navigate(`/gameposts/${item.id}`)} >
            <div class= "card-header home-card-header text-warning"style={{ backgroundColor: "#220830"}}> 
            {item.title} 
              </div>
            <div className = "card-body" style={{ backgroundColor: "#472a57"}}>
            <p className="card-text">{item.postText}</p>
            </div>
            <div class = "card-footer"style={{ backgroundColor: "#220830"}}> 
            {item.username}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemsGrid