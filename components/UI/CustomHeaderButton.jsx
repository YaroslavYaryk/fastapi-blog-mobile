import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={props.icon || Ionicons}
            iconSize={props.size ? props.size : 23}
            color={props.color}
        />
    );
};

export default CustomHeaderButton;
