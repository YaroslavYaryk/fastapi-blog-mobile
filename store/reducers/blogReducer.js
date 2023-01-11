import {
    READ_BLOGS,
    ADD_BLOG,
    READ_ONE_BLOG,
    CHANGE_BLOG,
    DELETE_BLOG,
} from "../actions/blogActions";
const initialState = {
    blogs: [],
    blogDetails: {},
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
        case READ_ONE_BLOG:
            // on change blog its the same, because action blog is the same
            // model as regular blog, with changed title and body
            return {
                ...state,
                blogDetails: action.blog,
            };
        case DELETE_BLOG:
            return {
                ...state,
                blogDetails: {},
                blogs: state.blogs.filter((el) => el.id != action.blogId),
            };
    }
    return state;
};

export default blogReducer;
