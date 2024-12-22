import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();


    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3002/auth/login", data).then((response) => {
            if (response.data.error) alert(response.data.error);
            else {
                localStorage.setItem("accessToken", response.data);
                navigate("/");
            }
        })
    };
    return (

        <div class="container d-flex justify-content-center">
            <div className="card col-12 col-md-8 col-lg-6">
                <div className="card-header text-center fs-5">
                    Login
                </div>
                <div className="card-body">
                    <input type="text" placeholder='Username...'  className = "form-control mb-2 border-primary" onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    />
                    <input type="password" placeholder= "Password..." className = "form-control border-primary"  onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    />
                </div>
                <div className="card-footer text-center">
                    <button class = "btn btn-outline-warning" onClick={login}> Login </button>
                </div>
            </div>
        </div>

    )
}

export default Login