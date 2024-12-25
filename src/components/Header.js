import React from 'react';
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
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

    if (token) {
        const decodeToken = jwtDecode(token);
        username = decodeToken.username;
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#220830" }}>
                <h1 className="navbar-brand text-warning ms-2 fs-2 header" onClick={navigateHome}>Khami's Kave</h1>
                <button className="navbar-toggler bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {token && (<>
                            <li className="nav-item">
                                <button class="btn btn-outline-warning mb-2 me-2" onClick={postReview}>Post A Review</button>
                            </li>
                            <li className="nav-item">
                                <button class="btn btn-outline-warning me-2" onClick={logOut}> Log Out: {username}</button>
                            </li>
                        </>)}
                        {!token && (<>
                            <li className="nav-item">
                                <button class="btn btn-outline-warning mb-2 me-2" onClick={logIn}>Login</button>
                            </li>
                            <li className="nav-item">
                                <button class="btn btn-outline-warning" onClick={Register}>Registration</button>
                            </li>
                        </>)}
                    </ul>
                </div>
            </nav>
            <hr style={{ margin:'0px', border: '2px solid #de6d47' }}></hr>
        </div>
    );
};

export default Header;