import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import { HOST, PORT } from "../../constants/server";
LogBox.ignoreLogs(["Setting a timer"]);

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (token, userId, expiryTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, token: token, userId: userId });
    };
};

export const signUp = (email, username, password) => {
    return async (dispatch) => {
        console.log({
            email: email,
            username: username,
            password: password,
        });
        const response = await fetch(`${HOST}:${PORT}/users/auth/register/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });
        if (!response.ok) {
            var message = "";
            try {
                console.log(await response.json());
                const errorResData = await response.text();
                message = JSON.parse(errorResData).message;
            } catch (error) {
                message = "Something went wrong!";
            }
            console.log(message);
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch(authenticate(resData.access, resData.id, 1800 * 100000));
        const expirationDate = new Date(new Date().getTime() + 1800 * 100000);
        saveDataToStorage(resData.access, resData.id, expirationDate);
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(`${HOST}:${PORT}/users/auth/login/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if (!response.ok) {
            var message;
            try {
                const errorResData = await response.text();
                message = JSON.parse(errorResData).message;
            } catch (error) {
                message = "Something went wrong!";
            }
            throw new Error(message);
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.access, resData.id, 1800 * 100000));
        const expirationDate = new Date(new Date().getTime() + 1800 * 100000);
        saveDataToStorage(resData.access, resData.id, expirationDate);
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem("userData");
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = (expirationTime) => {
    return (dispatch) => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

const saveDataToStorage = (access, id, expirationDate) => {
    AsyncStorage.setItem(
        "userData",
        JSON.stringify({
            access: access,
            id: id,
            expiryDate: expirationDate.toISOString(),
        })
    );
};
