import React, { useState, useEffect } from "react";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import { Platform, SafeAreaView, Button, View } from "react-native";

import Colors from "../constants/Colors";
import BlogList, {
    screenOptions as blogListScreenOptions,
} from "../screens/Blog/BlogList";
import CreateBlog, {
    screenOptions as createBlogScreenOptions,
} from "../screens/Blog/CreateBlog";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    },
    headerTitleStyle: {
        fontFamily: "Roboto",
        fontWeight: "700",
    },
    headerBackTitleStyle: {
        fontFamily: "Roboto",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const BlogStackNavigator = createStackNavigator();

export const BlogNavigator = (props) => {
    return (
        <BlogStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <BlogStackNavigator.Screen
                name="BlogList"
                component={BlogList}
                options={blogListScreenOptions}
                initialParams={{}}
            />
            <BlogStackNavigator.Screen
                name="CreateBlog"
                component={CreateBlog}
                options={createBlogScreenOptions}
                initialParams={{}}
            />
        </BlogStackNavigator.Navigator>
    );
};
