import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { Filter } from 'glin-profanity';

const { backendURL } = require('../components/constants');
const profanityCheck = new Filter();

function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    let navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    let tokenUsername = "";

    if (token) {
        const decodeToken = jwtDecode(token);
        tokenUsername = decodeToken.username;
    }

    const onSubmit = (data, { resetForm }) => {
        axios.post(
            backendURL + "/comments",
            { commentBody: data.commentBody, GamesPostId: id },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const commentToAdd = { commentBody: data.commentBody, username: response.data.username };
                    setComments([...comments, commentToAdd]);
                    resetForm();
                }
            });
    }

    const deletePost = (id) => {
        console.log(id);
        axios.delete(`https://khami-kave-server.onrender.com/gameposts/byId/${id}`).then((response) => {
            navigate("/");
        })
    }

    const deleteComment = (id) => {
        console.log(id);
        console.log("test");
        axios.delete(`https://khami-kave-server.onrender.com/comments/${id}`).then((response) => {
            navigate("/");
        })
    }
    const initialValues = {
        commentBody: ""
    };

    const validationSchema = Yup.object().shape({
        commentBody: Yup.string().max(1000, "Comment is too long").required("Comment cannot be empty").test("profanityCheck", "This title contains profanity", (value) => !profanityCheck.isProfane(value))
    });

    useEffect(() => {
        axios.get(`https://khami-kave-server.onrender.com/gameposts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`https://khami-kave-server.onrender.com/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [id]);

    if (!postObject) {
        return <div>Loading post...</div>;
    }

    return (
        <div className='container pt-4'>
            <div className='ReviewSection'>
                <h2>{postObject.title}</h2>
                <hr style={{ border: '1px solid #de6d47' }}></hr>
                <div className="ReviewInfo">
                    <h3 className='fs-5'>Review By: {postObject.username}</h3>
                    {(postObject.username == tokenUsername) && (<>
                        <h5 className="Author-Modifier">(Your Post)</h5>
                        <button className="DeletePost btn btn-outline-danger" onClick={() => deletePost(id)}>Delete Post</button>
                    </>
                    )}
                </div>
                <hr style={{ border: '1px solid #de6d47' }}></hr>
                <p>{postObject.postText}</p>
                {postObject.link ? (
                    <a
                        href={(postObject.link && (postObject.link.startsWith('http://') || postObject.link.startsWith('https://')))
                            ? postObject.link
                            : `http://${postObject.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {postObject.link}
                    </a>
                ) : (
                    <span>No link available</span>
                )}

            </div>
            <div className='CommentSection'>
                <div className="allComments">
                    <hr style={{ border: '1px solid #de6d47' }}></hr>
                    <h2>Comments</h2>
                    <hr style={{ border: '1px solid #de6d47' }}></hr>
                    <div className='addComments'>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            <Form>
                                <ErrorMessage name="commentBody" component="span" />
                                <Field
                                    name="commentBody"
                                    placeholder="(Add Comment...)"
                                    className="form-control mb-2" as="textarea"
                                    style={{
                                        resize: "none",
                                        overflow: "hidden",
                                        whiteSpace: "normal",
                                        overflowWrap: "break-word",
                                        wordBreak: "break-word",
                                        width: "100%",
                                    }}
                                    onInput={(e) => {
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}

                                />
                                <button class="btn btn-outline-warning mb-4" type="submit">Post Comment</button>
                            </Form>
                        </Formik>
                    </div>
                    {comments.map((comment, key) => {
                        return <div key={key} className="card comment-card mb-2" style={{ backgroundColor: "#472a57", color: "#de6d47" }}>
                            <div className='card-header' style={{ backgroundColor: "#472a57" }}>
                                {comment.username}
                                {(comment.username == tokenUsername) && (<>
                                    &nbsp;(your comment)
                            </>
                            )}
                            </div>
                            <div className="card-body" style={{ backgroundColor: "#7e5a91" }}>
                                <div className="card-text">
                                    {comment.commentBody}
                                </div>
                            </div>
                            {(comment.username == tokenUsername) && (<>
                                <div className='card-header' style={{ backgroundColor: "#472a57" }}>
                                <button className="btn btn-outline-danger" onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                                </div>
                            </>
                            )}

                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post
