// import {
//     AUTHENTICATE,
//     LOGOUT,
//     SET_DID_TRY_TO_LOGIN,
//  } from "../actions/authActions";

const initialState = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOjUsImVtYWlsIjoiZHVoYW5vdjIwMDNAZ21haWwuY29tIn0sImV4cGlyZXMiOjE2NzM1NDgyMzkuOTIxMjg0Mn0.a62kIIRopK3Q1QC_4jRLITMfVUS7CBacVLZC3n_ABpI",
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
