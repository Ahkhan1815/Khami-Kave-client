import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemsGrid from './ItemsGrid';

const { backendURL } = require('./components/constants');

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(backendURL+ "/gameposts").then((response) => {
            setListOfPosts(response.data);
        });
    }, []);



    return (
        <div>
            <h2 className="type-banner">Game Reviews</h2>
            <div className = "container px-5">
                <ItemsGrid items = {listOfPosts} />
            </div>
        </div>
    )
}

export default Home

