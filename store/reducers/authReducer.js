// import {
//     AUTHENTICATE,
//     LOGOUT,
//     SET_DID_TRY_TO_LOGIN,
//  } from "../actions/authActions";

const initialState = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOjUsImVtYWlsIjoiZHVoYW5vdjIwMDNAZ21haWwuY29tIn0sImV4cGlyZXMiOjE2NzMzNzcxMjguMjg2OTg4N30.PAQKp1InD7CSHwVQI05miu6OIJs142aW7ktfhe6EfB8",
    userId: "5",
};

export default (state = initialState, action) => {
    switch (action.type) {
        //    case AUTHENTICATE:
        //       return {
        //          token: action.token,
        //          userId: action.userId,
        //       };
        //    case LOGOUT:
        //       return initialState;

        default:
            return state;
    }
};
