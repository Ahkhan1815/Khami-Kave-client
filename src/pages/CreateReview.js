import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const { backendURL } = require('./componenets/constants');


function CreateReview() {
    let navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    let tokenUsername = "";

    if (token) {
        const decodeToken = jwtDecode(token);
        tokenUsername = decodeToken.username;
    }

    const initialValues = {
        title: "",
        postText: "",
    };

    const onSubmit = (data) => {
        axios.post(backendURL + "/gameposts", { title: data.title, postText: data.postText, username: tokenUsername, link: data.link},
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            navigate("/");
        });
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Media title is required"),
        postText: Yup.string().required("Review is required"),
        link: Yup.string().required("Link is required"),
    });

    return (
        <div>
            <div class="container d-flex justify-content-center">
                <div className="card col-12 col-md-8 col-lg-6">
                    <div className="card-header text-center fs-5">
                        Write a Review
                    </div>
                    <div className="card-body">
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            <Form className="form-container">
                                <label>Media Title: </label>
                                <ErrorMessage name="title" component="span" />
                                <Field id="post-field" name="title" placeholder="(Title...)" class="form-control border border-warning"/>
                                <ErrorMessage name="postText" component="span" />
                                <Field id="post-field" name="postText" placeholder="(Write Review...)"
                                    style={{ height: '30vw' }} as="textarea" class="post-input form-control border border-warning" />
                                <ErrorMessage name="link" component="span" />
                                <Field id="post-field" name="link" placeholder="(Link...)" class="form-control border border-warning"/>
                                <div className="button-container">
                                    <button class="btn btn-outline-warning" type="submit">Post!</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default CreateReview