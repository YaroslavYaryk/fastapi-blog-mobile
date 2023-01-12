import { HOST, PORT } from "../../constants/server";
import Comment from "../../models/Comment";
import CommentLike from "../../models/CommentLike";
import CommentReply from "../../models/CommentReply";

export const READ_BLOG_COMMENTS = "READ_BLOG_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT_REPLY = "ADD_COMMENT_REPLY";
export const DELETE_REPLY = "DELETE_REPLY";

export const fetchBlogComments = (blogId) => {
    try {
        return async (dispatch, getState) => {
            var token = getState().auth.token;
            const response = await fetch(
                `${HOST}:${PORT}/blogs/${blogId}/comment/`,
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

            const blogComments = [];
            for (const key in resData) {
                blogComments.push(
                    new Comment(
                        resData[key].id,
                        resData[key].post_id,
                        resData[key].user_id,
                        resData[key].user_name,
                        resData[key].comment,
                        resData[key].replies.map(
                            (el) =>
                                new CommentReply(
                                    el.id,
                                    el.post_id,
                                    el.user_id,
                                    el.user_name,
                                    el.comment
                                )
                        ),
                        resData[key].likes,
                        resData[key].parent_id
                    )
                );
            }
            dispatch({
                type: READ_BLOG_COMMENTS,
                blogComments: blogComments,
            });
        };
    } catch (err) {
        throw err;
    }
};

export const createComment = (blogId, comment, parentId) => {
    return async (dispatch, getState) => {
        var token = getState().auth.token;
        const response = await fetch(
            `${HOST}:${PORT}/blogs/${blogId}/comment/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    comment: comment,
                    parent_id: parentId,
                }),
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(`${errorResData.detail} - ${response.status}`);
            // work here
        }

        const resData = await response.json();
        if (parentId) {
            const reply = new CommentReply(
                resData.id,
                resData.post_id,
                resData.user_id,
                resData.user_name,
                resData.comment
            );
            dispatch({
                type: ADD_COMMENT_REPLY,
                reply: reply,
                parentId: parentId,
            });
        } else {
            const comment = new Comment(
                resData.id,
                resData.post_id,
                resData.user_id,
                resData.user_name,
                resData.comment,
                [],
                0,
                resData.parent_id
            );

            dispatch({
                type: ADD_COMMENT,
                comment: comment,
            });
        }
    };
};

export const deleteComment = (commentId, parentId = null) => {
    return async (dispatch, getState) => {
        var token = getState().auth.token;
        const response = await fetch(
            `${HOST}:${PORT}/blogs/comment/${commentId}/`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            throw new Error(`${errorResData.detail} - ${response.status}`);

            // work here
        }

        const resData = await response.json();
        if (parentId) {
            // reply
            dispatch({
                type: DELETE_REPLY,
                commentId: commentId,
                parentId: parentId,
            });
        } else {
            // comment
            dispatch({
                type: DELETE_COMMENT,
                commentId: commentId,
            });
        }
    };
};
