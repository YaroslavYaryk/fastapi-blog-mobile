import { HOST, PORT } from "../../constants/server";
import CommentLike from "../../models/CommentLike";
export const READ_COMMENT_LIKES = "READ_COMMENT_LIKES";
export const READ_ONE_BLOG = "READ_ONE_BLOG";
export const ADD_COMMENT_LIKE = "ADD_COMMENT_LIKE";
export const DELETE_COMMENT_LIKE = "DELETE_COMMENT_LIKE";

export const fetchCommentLikes = (blogId) => {
    try {
        return async (dispatch, getState) => {
            var token = getState().auth.token;
            const response = await fetch(
                `${HOST}:${PORT}/blogs/${blogId}/comment-likes/`,
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

            const commentLikes = [];
            for (const key in resData) {
                commentLikes.push(
                    new CommentLike(
                        resData[key].id,
                        resData[key].comment_id,
                        resData[key].user_id
                    )
                );
            }
            dispatch({
                type: READ_COMMENT_LIKES,
                commentLikes: commentLikes,
            });
        };
    } catch (err) {
        throw err;
    }
};

export const likeUnlikeComment = (commentId) => {
    return async (dispatch, getState) => {
        var { token, userId } = getState().auth;
        const response = await fetch(
            `${HOST}:${PORT}/blogs/comment/${commentId}/like/`,
            {
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
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(errorResData.message);
            // work here
        }

        const resData = await response.json();
        if (resData.id) {
            // like created
            const commentLike = new CommentLike(
                resData.id,
                resData.comment_id,
                resData.user_id
            );
            dispatch({
                type: ADD_COMMENT_LIKE,
                commentLike: commentLike,
            });
        } else {
            // like deleted
            dispatch({
                type: DELETE_COMMENT_LIKE,
                commentId: commentId,
                userId: userId,
            });
        }
    };
};
