import React from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const { backendURL } = require('../components/constants');

function Registration() {
    const initialValues = {
        username: "",
        password: "",
        email: ""
    };

    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(4, "Username is too short, minimum length is 4 characters").max(15, "Username is too long, maximum length is 15 characters").required("Username is required").test('no-spaces', 'No spaces allowed', function (value) {
            return !/\s/.test(value);
          }),
        password: Yup.string().min(6, "Password is too short, minimum length is 6 characters").max(20, "Password is too long, maximum length is 20 characters").required("Password is required"),
        email: Yup.string().required("Email is required"),
    });

    const onSubmit = (data) => {
        axios.post(backendURL + "/auth", data).then((response)=> {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                console.log(data);
                navigate("/login");
            }
        })
    }

    return (
        <div class= "container d-flex justify-content-center">
            <div className = "card col-12 col-md-8 col-lg-6">
            <div className= "card-header text-center fs-5">
                Create an Account
            </div>
            <div className= "card-body">
            
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="form-container">

                    <Field class= "border border-primary mb-3" id="post-field" name="username" placeholder="(Username...)" />
                    <Field class= "border border-primary mb-3" id="post-field"  type= "password" name="password" placeholder="(Your Password...)" />
                    <Field class= "border border-primary mb-3" id="post-field" name="email" placeholder="(Email...)" />
                    <ErrorMessage name="username" component="span" />
                    <ErrorMessage name="password" component="span" />
                    <ErrorMessage name="email" component="span" />
                    <div className="button-container">
                        <button class = "btn btn-outline-warning" type="submit">Sign up!</button>
                    </div>
                </Form>
            </Formik>
            </div>
            <div className= "card-footer text-muted fs-6">
                Verify your account via email to post and comment. 
            </div>
            </div>
        </div>
    )
}

export default Registration