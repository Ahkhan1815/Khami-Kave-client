import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

function Verification() {
    let { token } = useParams();

    useEffect(() => {
        axios.get(`https://khami-kave-server.onrender.com/auth/verification/${token}`).then((response) => {
            const token = localStorage.getItem("accessToken");
            if(token){
                localStorage.removeItem("accessToken");
            }
            console.log(response);
        });
    }); 

    return (
        <div>
            You are now registered, Please log in.
        </div>
    )
}

export default Verification