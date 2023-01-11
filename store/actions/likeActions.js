import { HOST, PORT } from "../../constants/server";
import BlogLike from "../../models/BlogLike";
export const READ_BLOG_LIKES = "READ_BLOG_LIKES";
export const READ_ONE_BLOG = "READ_ONE_BLOG";
export const ADD_BLOG_LIKE = "ADD_BLOG_LIKE";
export const DELETE_BLOG_LIKE = "DELETE_BLOG_LIKE";

export const fetchBlogLikes = (blogId) => {
    try {
        return async (dispatch, getState) => {
            var token = getState().auth.token;
            console.log(`${HOST}:${PORT}/blogs/`);
            const response = await fetch(
                `${HOST}:${PORT}/blogs/${blogId}/likes/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const resData = await response.json();

            const blogLikes = [];
            for (const key in resData) {
                blogLikes.push(
                    new BlogLike(
                        resData[key].id,
                        resData[key].post_id,
                        resData[key].user_id
                    )
                );
            }
            dispatch({
                type: READ_BLOG_LIKES,
                blogLikes: blogLikes,
            });
        };
    } catch (err) {
        throw err;
    }
};

export const likeUnlikeBlog = (blogId) => {
    return async (dispatch, getState) => {
        var { token, userId } = getState().auth;
        const response = await fetch(`${HOST}:${PORT}/blogs/${blogId}/like/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
            },
            // body: JSON.stringify({
            //     title: title,
            //     body: body,
            // }),
        });

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(errorResData.message);
            // work here
        }

        const resData = await response.json();
        if (resData.id) {
            // like created
            const blogLike = new BlogLike(
                resData.id,
                resData.post_id,
                resData.user_id
            );
            dispatch({
                type: ADD_BLOG_LIKE,
                blogLike: blogLike,
            });
        } else {
            // like deleted

            dispatch({
                type: DELETE_BLOG_LIKE,
                blogId: blogId,
                userId: userId,
            });
        }
    };
};
