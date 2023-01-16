import React from "react";
import { useSelector } from "react-redux";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
// import ProductNavigator from "../navigation/ProductNavigator";
import { AuthNavigator, DrawerStack } from "./BlogNavigator";
import Colors from "../constants/Colors";

const BaseAuthNavigator = (props) => {
    console.log("here");
    const isAuth = useSelector((state) => !!state.auth.token);
    const theme = useSelector((state) => state.theme.themeColors);
    const MyTheme = {
        ...DefaultTheme,
        colors: theme,
    };
    return (
        <NavigationContainer theme={MyTheme}>
            {isAuth && <DrawerStack />}
            {!isAuth && <AuthNavigator />}
        </NavigationContainer>
    );
};

export default BaseAuthNavigator;
