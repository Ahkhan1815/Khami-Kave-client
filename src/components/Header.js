import React from 'react';
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();

    const navigateHome = () =>{
        navigate('/');
    };

    const logOut = () => {
        localStorage.removeItem("accessToken");
        navigate('/');
    }

    const logIn = () => {
        navigate('/login');
    }

    const Register = () => {
        navigate('/registration');
    }

    const postReview = () => {
        navigate('/createreview');
    }

    const token = localStorage.getItem("accessToken");
    let username = "";
    
    if (token){
        const decodeToken = jwtDecode(token);
        username = decodeToken.username;
    }

    return (
        <div class="header">
            <div class="left-header"
                onClick={navigateHome}
            >
                <h1 class="websiteTitle">Khami's Kave</h1>
            </div>
            <div class="right-header">
                {!token && (
                    <>
                        <button class = "btn btn-outline-warning" onClick = {logIn}>Login</button>
                        <button class = "btn btn-outline-warning" onClick = {Register}>Registration</button>
                    </>
                )}
                {token && (<>
                    <p class="returning-user" style={{color: "#0ea1db"}}>{username}</p>
                    <button class = "btn btn-outline-warning pl-2" onClick = {postReview}>Post A Review</button>
                    <button class = "btn btn-outline-warning" onClick = {logOut}> Log Out</button>
                </>)}

            </div>
        </div>
    );
};

export default Header;