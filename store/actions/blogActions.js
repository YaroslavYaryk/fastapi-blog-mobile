import { HOST, PORT } from "../../constants/server";
import Blog from "../../models/Blog";
export const READ_BLOGS = "READ_BLOGS";
export const READ_ONE_BLOG = "READ_ONE_BLOG";
export const ADD_BLOG = "ADD_BLOG";
export const CHANGE_BLOG = "CHANGE_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";

export const fetchBlogs = () => {
    try {
        return async (dispatch, getState) => {
            var token = getState().auth.token;
            console.log(`${HOST}:${PORT}/blogs/`);
            const response = await fetch(`${HOST}:${PORT}/blogs/`, {
                method: "GET",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const resData = await response.json();

            const blogs = [];
            for (const key in resData) {
                blogs.push(
                    new Blog(
                        resData[key].id,
                        resData[key].title,
                        resData[key].body,
                        resData[key].author_id,
                        resData[key].author_name,
                        resData[key].likes,
                        resData[key].comments
                    )
                );
            }
            dispatch({
                type: READ_BLOGS,
                blogs: blogs,
            });
        };
    } catch (err) {
        throw err;
    }
};

export const fetchOneBlog = (id) => {
    try {
        return async (dispatch, getState) => {
            var token = getState().auth.token;
            console.log(`${HOST}:${PORT}/blogs/${id}/`);
            const response = await fetch(`${HOST}:${PORT}/blogs/${id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const resData = await response.json();

            const blog = new Blog(
                resData.id,
                resData.title,
                resData.body,
                resData.author_id,
                null,
                resData.likes,
                resData.comments
            );

            dispatch({
                type: READ_ONE_BLOG,
                blog: blog,
            });
        };
    } catch (err) {
        throw err;
    }
};

export const createBlog = (title, body) => {
    return async (dispatch, getState) => {
        var token = getState().auth.token;
        console.log(title, body);
        const response = await fetch(`${HOST}:${PORT}/blogs/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                body: body,
            }),
        });

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(`${errorResData.detail} - ${response.status}`);
            // work here
        }

        const resData = await response.json();
        const blog = new Blog(
            resData.id,
            title,
            body,
            resData.author_id,
            resData.author_name,
            0,
            0
        );

        dispatch({
            type: ADD_BLOG,
            blog: blog,
        });
    };
};

export const editBlog = (blogDeails, title, body) => {
    return async (dispatch, getState) => {
        var token = getState().auth.token;
        const response = await fetch(
            `${HOST}:${PORT}/blogs/${blogDeails.id}/`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                }),
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(`${errorResData.detail} - ${response.status}`);
            // work here
        }

        const resData = await response.json();
        const blog = new Blog(
            blogDeails.id,
            title,
            body,
            blogDeails.authorId,
            blogDeails.authorName,
            blogDeails.likes,
            blogDeails.comments
        );

        dispatch({
            type: READ_ONE_BLOG,
            blog: blog,
        });
    };
};

export const deleteBlog = (id) => {
    return async (dispatch, getState) => {
        var token = getState().auth.token;
        const response = await fetch(`${HOST}:${PORT}/blogs/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(`${errorResData.detail} - ${response.status}`);

            // work here
        }

        const resData = await response.json();
        dispatch({
            type: DELETE_BLOG,
            blogId: id,
        });
    };
};
