import {
    READ_COMMENT_LIKES,
    ADD_COMMENT_LIKE,
    DELETE_COMMENT_LIKE,
} from "../actions/commentLikeActions";

const initialState = {
    likes: [],
};

const commentLikeReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_COMMENT_LIKES:
            return {
                ...state,
                likes: action.commentLikes,
            };
        case ADD_COMMENT_LIKE:
            return {
                ...state,
                likes: state.likes.concat(action.commentLike),
            };
        case DELETE_COMMENT_LIKE:
            const lideToDelete = state.likes.find(
                (elem) =>
                    elem.commentId == action.commentId &&
                    elem.userId == action.userId
            );
            return {
                ...state,
                likes: state.likes.filter((elem) => elem != lideToDelete),
            };
    }
    return state;
};

export default commentLikeReducer;
