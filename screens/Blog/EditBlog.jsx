import React, {
    useState,
    useCallback,
    useEffect,
    useReducer,
    useRef,
} from "react";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { Dialog } from "react-native-simple-dialogs";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import DialogModal from "../../components/UI/DialogModal";
import Colors from "../../constants/Colors";
import * as blogActions from "../../store/actions/blogActions";

const EditBlog = (props) => {
    const { colors } = useTheme();

    const { blogId } = props.route.params;

    const blogDetails = useSelector((state) => state.blogs.blogDetails);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [disabledButton, setDisabledButton] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    const [title, setTitle] = useState(
        blogDetails.title ? blogDetails.title : ""
    );
    const [body, setBody] = useState(blogDetails.body ? blogDetails.body : "");
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (title.trim().length > 0 && body.trim().length > 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [title, body]);

    const handleEditBlog = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(blogActions.editBlog(blogDetails, title, body));
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 750);
    }, [useDispatch, title, body]);

    useEffect(() => {
        if (error) {
            Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
        }
    }, [error]);

    // useEffect(() => {
    //     if (showAlert) {
    //         Alert.alert("Message!", "Blog successfully edited!", [
    //             {
    //                 text: "Okay",
    //                 onPress: () => {
    //                     setShowAlert(false);
    //                 },
    //             },
    //         ]);
    //         setTimeout(() => {
    //             console.log(showAlert, 1);
    //             setShowAlert(false);
    //             console.log(showAlert, 2);
    //         }, 1000);
    //     }
    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // }, [showAlert]);

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
            <ScrollView>
                <View style={{}}>
                    <View style={styles.inputBlock}>
                        <TextInput
                            id="title"
                            keyboardType="default"
                            required
                            secureTextEntry={false}
                            autoCapitalize="none"
                            errorText="Please enter a valid title."
                            contextMenuHidden={false}
                            initiallyValid={false}
                            placeholder="Title"
                            cursorColor={colors.primarySecondColor}
                            selectionColor={colors.primarySecondColor}
                            selectTextOnFocus={true}
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
                            placeholder="Body"
                            multiline
                            numberOfLines={4}
                            initiallyValid={false}
                            cursorColor={colors.primaryColor}
                            selectionColor={colors.primarySecondColor}
                            placeholderTextColor={colors.inputPlaceholderColor}
                            selectTextOnFocus={true}
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
                            onPress={handleEditBlog}
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
            </ScrollView>
            <DialogModal
                image={require("../../assets/icons8-checkmark.gif")}
                message={"Blog successfully changed!!!"}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
        </View>
    );
};

export const screenOptions = (navData) => {
    return {
        headerTitle: "Dojo Edit Blog",
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
        marginTop: 3,
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
    modalContentIcon: {
        alignItems: "center",
        height: 100,
        width: 100,
    },
    modalContentText: {
        marginTop: 10,
        alignItems: "center",
    },
});

export default EditBlog;
