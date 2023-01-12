import {
    READ_BLOG_COMMENTS,
    DELETE_COMMENT,
    DELETE_REPLY,
    ADD_COMMENT,
    ADD_COMMENT_REPLY,
} from "../actions/commentActions";

const initialState = {
    comments: [],
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_BLOG_COMMENTS:
            return {
                ...state,
                comments: action.blogComments,
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.comment),
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(
                    (el) => el.id != action.commentId
                ),
            };

        case ADD_COMMENT_REPLY:
            var { reply, parentId } = action;
            var oldComments = [...state.comments];
            var commentIndex = oldComments.findIndex((el) => el.id == parentId);
            if (commentId != -1) {
                var oldComment = oldComments[commentIndex];
                oldComment.replies = oldComment.replies.concat(reply);
                oldComments[commentIndex] = oldComment;
            }
            return {
                ...state,
                comments: oldComments,
            };

        case DELETE_REPLY:
            var { commentId, parentId } = action;
            var oldComments = [...state.comments];
            var commentIndex = oldComments.findIndex((el) => el.id == parentId);
            console.log(commentIndex, "commentIndex");
            if (commentId != -1) {
                var oldComment = oldComments[commentIndex];
                oldComment.replies = oldComment.replies.filter(
                    (reply) => reply.id != commentId
                );
                oldComments[commentIndex] = oldComment;
            }
            return {
                ...state,
                comments: oldComments,
            };
    }
    return state;
};

export default commentReducer;
