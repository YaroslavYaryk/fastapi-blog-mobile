import {
    READ_BLOG_LIKES,
    ADD_BLOG_LIKE,
    DELETE_BLOG_LIKE,
} from "../actions/likeActions";

const initialState = {
    likes: [],
};

const blogLikeReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_BLOG_LIKES:
            return {
                ...state,
                likes: action.blogLikes,
            };
        case ADD_BLOG_LIKE:
            return {
                ...state,
                likes: state.likes.concat(action.blogLike),
            };
        case DELETE_BLOG_LIKE:
            return {
                ...state,
                likes: state.likes.filter(
                    (elem) =>
                        elem.postId != action.blogId &&
                        elem.userId != action.userId
                ),
            };
    }
    return state;
};

export default blogLikeReducer;
