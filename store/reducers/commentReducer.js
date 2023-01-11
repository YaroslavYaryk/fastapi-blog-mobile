import { READ_BLOG_COMMENTS } from "../actions/commentActions";

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
        // case ADD_BLOG_LIKE:
        //     return {
        //         ...state,
        //         likes: state.likes.concat(action.blogLike),
        //     };
        // case DELETE_BLOG_LIKE:
        //     return {
        //         ...state,
        //         likes: state.likes.filter(
        //             (elem) =>
        //                 elem.postId != action.blogId &&
        //                 elem.userId != action.userId
        //         ),
        //     };
    }
    return state;
};

export default commentReducer;
