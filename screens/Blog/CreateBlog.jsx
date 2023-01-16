import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
    Text,
    View,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    Animated,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    RefreshControl,
    TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

import * as blogActions from "../../store/actions/blogActions";

const CreateBlog = (props) => {
    const { colors } = useTheme();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [disabledButton, setDisabledButton] = useState(true);
    const [changeValueIndicator, setChangeValueIndicator] = useState(true);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (title.trim().length > 0 && body.trim().length > 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [title, body]);

    const handleCreateBlog = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        console.log("here", title, body);
        try {
            await dispatch(blogActions.createBlog(title, body));
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        props.navigation.navigate("BlogList");
    }, [useDispatch, title, body]);

    useEffect(() => {
        if (error) {
            Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
        }
    }, [error]);

    if (isLoading) {
        return (
            <View
                style={[
                    styles.centered,
                    { backgroundColor: colors.backGround },
                ]}
            >
                <ActivityIndicator size="large" color={colors.headerBold} />
            </View>
        );
    }

    return (
        <View
            style={[styles.container, { backgroundColor: colors.backGround }]}
        >
            <View>
                <View style={styles.inputBlock}>
                    <TextInput
                        id="title"
                        keyboardType="default"
                        required
                        secureTextEntry={false}
                        autoCapitalize="none"
                        errorText="Please enter a valid title."
                        initialValue=""
                        initiallyValid={false}
                        placeholder="Title"
                        style={[
                            styles.input,
                            {
                                color: colors.inputTextColor,
                                borderColor: colors.inputPlaceholderColor,
                            },
                        ]}
                        value={title}
                        onChangeText={(value) => {
                            setTitle(value);
                        }}
                        placeholderTextColor={colors.inputPlaceholderColor}
                    />
                </View>
                <View style={styles.inputBlock}>
                    <TextInput
                        id="body"
                        keyboardType="default"
                        required
                        secureTextEntry={false}
                        autoCapitalize="none"
                        errorText="Please enter a valid body."
                        initialValue=""
                        placeholder="Body"
                        multiline
                        numberOfLines={4}
                        initiallyValid={false}
                        cursorColor={colors.primaryColor}
                        selectionColor={colors.primarySecondColor}
                        placeholderTextColor={colors.inputPlaceholderColor}
                        style={[
                            styles.input,
                            {
                                color: colors.inputTextColor,
                                borderColor: colors.inputPlaceholderColor,
                            },
                        ]}
                        value={body}
                        onChangeText={(value) => {
                            setBody(value);
                        }}
                    />
                </View>
                <View
                    style={[
                        styles.saveButtonBlock,
                        {
                            backgroundColor: disabledButton
                                ? colors.primarySecondColor
                                : colors.primaryColor,
                            borderColor: colors.blogItemBackground,
                        },
                    ]}
                >
                    <TouchableOpacity
                        disabled={disabledButton ? true : false}
                        onPress={handleCreateBlog}
                    >
                        <View style={styles.saveButtonBlockInnew}>
                            <Text
                                style={[
                                    styles.saveButtonText,
                                    { color: colors.blogItemBackground },
                                ]}
                            >
                                Save
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export const screenOptions = (navData) => {
    return {
        headerTitle: "Dojo Create Blog",
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        zIndex: 10,
        paddingTop: 20,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    inputBlock: {
        padding: 5,
        marginBottom: 20,
    },

    input: {
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        marginHorizontal: 14,
        marginVertical: -8,
        padding: 12,
        textAlignVertical: "top",
    },
    saveButtonBlock: {
        margin: 14,
        alignItems: "center",
        borderWidth: 1,

        borderRadius: 10,
    },
    saveButtonBlockInnew: {
        padding: 10,
    },
    saveButtonText: {
        fontSize: 20,
    },
});

export default CreateBlog;
