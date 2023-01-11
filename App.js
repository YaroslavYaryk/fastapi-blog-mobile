import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ReduxThunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers, applyMiddleware } from "redux";
import { LogBox } from "react-native";

import { BlogNavigator } from "./navigation/BlogNavigator";
import blogReducer from "./store/reducers/blogReducer";
import authReducer from "./store/reducers/authReducer";
import blogLikeReducer from "./store/reducers/likeReducer";
import commentReducer from "./store/reducers/commentReducer";

const rootReducer = combineReducers({
    blogs: blogReducer,
    auth: authReducer,
    blogLikes: blogLikeReducer,
    blogComments: commentReducer,
});

const store = configureStore(
    {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }),
    },
    applyMiddleware(ReduxThunk)
);

export default function App() {
    LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications

    return (
        <NavigationContainer>
            <Provider store={store}>
                <BlogNavigator />
            </Provider>
        </NavigationContainer>
    );
}
