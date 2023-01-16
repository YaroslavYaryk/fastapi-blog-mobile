import React, { useState, useEffect } from "react";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { getHeaderColorParameter } from "../static/colorFunctions";
import BlogList, {
    screenOptions as blogListScreenOptions,
} from "../screens/Blog/BlogList";
import CreateBlog, {
    screenOptions as createBlogScreenOptions,
} from "../screens/Blog/CreateBlog";
import BlogDetails, {
    screenOptions as blogDetailsScreenOptions,
} from "../screens/Blog/BlogDetails";
import EditBlog, {
    screenOptions as editBlogScreenOptions,
} from "../screens/Blog/EditBlog";
import BlogComments, {
    screenOptions as blogCommentsScreenOptions,
} from "../screens/Blog/BlogComments";

import Login, {
    screenOptions as loginScreenOptions,
} from "../screens/Auth/Login";
import Registration, {
    screenOptions as registrationScreenOptions,
} from "../screens/Auth/Registration";
import CustomDrawer from "../components/UI/CustomDrawer";

const BlogStackNavigator = createStackNavigator();

export const BlogNavigator = (props) => {
    const { colors } = useTheme();
    return (
        <BlogStackNavigator.Navigator
            screenOptions={getHeaderColorParameter(colors)}
        >
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
            <BlogStackNavigator.Screen
                name="BlogDetails"
                component={BlogDetails}
                options={blogDetailsScreenOptions}
                initialParams={{}}
            />
            <BlogStackNavigator.Screen
                name="EditBlog"
                component={EditBlog}
                options={editBlogScreenOptions}
                initialParams={{}}
            />
            <BlogStackNavigator.Screen
                name="BlogComments"
                component={BlogComments}
                options={blogCommentsScreenOptions}
                initialParams={{}}
            />
        </BlogStackNavigator.Navigator>
    );
};

const AuthStackNavigator = createNativeStackNavigator();

export const AuthNavigator = () => {
    const { colors } = useTheme();
    return (
        <AuthStackNavigator.Navigator
            screenOptions={getHeaderColorParameter(colors)}
        >
            <AuthStackNavigator.Screen
                name="Login"
                component={Login}
                options={loginScreenOptions}
            />
            <AuthStackNavigator.Screen
                name="Registration"
                component={Registration}
                options={registrationScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
    const { colors } = useTheme();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.backGround,
                drawerInactiveTintColor: "grey",
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontSize: 15,
                },
            }}
        >
            <Drawer.Screen
                name="Home"
                label=""
                component={BlogNavigator}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                    title: "Blogs",
                }}
            />
            {/* <Drawer.Screen
        name="SettingsStackNavigator"
        label=""
        component={SettingsStackNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-settings-outline" size={22} color={color} />
          ),
          title: "Settings",
        }}
      /> */}
        </Drawer.Navigator>
    );
};
