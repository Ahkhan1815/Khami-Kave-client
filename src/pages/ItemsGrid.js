import React from 'react'
import { useNavigate } from "react-router-dom";


const ItemsGrid = ({items}) => {
  let navigate = useNavigate();
  return (
    <div className = "row d-flex">
      {items.map((item, key) => (
        <div key = {item.id} className= "col-12 col-md-6 col-lg-4 mb-4">
          <div className = "card custom-card w-100" style= {{height: "250px"}} onClick={() => navigate(`/gameposts/${item.id}`)} >
            <div class= "card-header"> 
            {item.title} 
              </div>
            <div className = "card-body">
            <p className="card-text">{item.postText}</p>
            </div>
            <div class = "card-footer"> 
            {item.username}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemsGrid