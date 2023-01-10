import { READ_BLOGS, ADD_BLOG } from "../actions/blogActions";
const initialState = {
    blogs: [],
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_BLOGS:
            return {
                ...state,
                blogs: action.blogs,
            };
        case ADD_BLOG:
            return {
                ...state,
                blogs: state.blogs.concat(action.blog),
            };
    }
    return state;
};

export default blogReducer;
