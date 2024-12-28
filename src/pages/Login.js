import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { backendURL } = require('../components/constants');

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();


    const login = async () => {
        setLoading(true);
        try {
            const data = { username: username, password: password };
            const response = await axios.post(backendURL + "/auth/login", data);
            if (response.data.error) {
                alert(response.data.error);
            }
            else {
                localStorage.setItem("accessToken", response.data);
                navigate("/");
            }
        }
        catch (error) {
            console.log(error);
            alert("There was an error logging in, please try again.");
        }
        finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div class="container d-flex justify-content-center">
            <div className="card col-12 col-md-8 col-lg-6">
                <div className="card-header text-center fs-5">
                    Login
                </div>
                <div className="card-body">
                Logging in...Please Wait
                </div>
            </div>
        </div>
    }

    return (

        <div class="container d-flex justify-content-center">

            <div className="card col-12 col-md-8 col-lg-6">
                <div className="card-header text-center fs-5">
                    Login
                </div>
                <div className="card-body">
                    <input type="text" placeholder='Username...' className="form-control mb-2 border-primary" onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    />
                    <input type="password" placeholder="Password..." className="form-control border-primary" onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    />
                </div>
                <div className="card-footer text-center">
                    <button class="btn btn-outline-warning" onClick={login}> Login </button>
                </div>
            </div>
        </div>

    )
}

export default Login