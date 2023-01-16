import { AUTHENTICATE, LOGOUT } from "../actions/authActions";

const initialState = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOjUsImVtYWlsIjoiZHVoYW5vdjIwMDNAZ21haWwuY29tIn0sImV4cGlyZXMiOjE2NzM5MDE4ODEuMDE4NTk3NH0.m15R1JehogHGZSCEU6qqpAngNigw-T6VdQaSXihh1CI",
    userId: "5",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
            };
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
