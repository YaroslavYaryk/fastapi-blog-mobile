import { HOST, PORT } from "../../constants/server";
import Blog from "../../models/Blog";
export const READ_BLOGS = "READ_BLOGS";
export const ADD_BLOG = "ADD_BLOG";

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
            throw new Error(errorResData.message);
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
