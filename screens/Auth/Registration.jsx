import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    Button,
    Image,
    Dimensions,
} from "react-native";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import SuccessPopup from "../../components/UI/SuccessPopup";
import { useTranslation } from "react-i18next";

import { useTheme } from "@react-navigation/native";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        };
    }
    return state;
};

const Registration = (props) => {
    const { t } = useTranslation();

    const { colors } = useTheme();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [diabledButton, setDisabledButton] = useState(true);
    const [dontMatchError, setDontMatchError] = useState(null);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert(t("An Error Occured"), error, [
                { text: t("Okay"), onPress: setError(null) },
            ]);
        }
    }, [error]);

    useEffect(() => {
        if (
            formState.formIsValid &&
            formState.inputValues.password ===
                formState.inputValues.confirmPassword
        ) {
            setDisabledButton(false);
            setDontMatchError(null);
        } else {
            setDisabledButton(true);
            setDontMatchError(t("passwords don't match."));
        }
    });

    const authHandler = async () => {
        setError(null);
        let action;

        action = authActions.signUp(
            formState.inputValues.email,
            formState.inputValues.username,
            formState.inputValues.password
        );
        setIsLoading(true);
        try {
            await dispatch(action);
            // props.navigation.navigate("Shop");
        } catch (err) {
            console.log(err, err.message);
            setError(err.message);
            setIsLoading(false);
        }
    };

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        inputValidities: {
            email: false,
            username: false,
            password: false,
            confirmPassword: false,
        },
        formIsValid: false,
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            });
        },
        [dispatchFormState]
    );

    if (isLoading) {
        return (
            <View
                style={[
                    styles.centered,
                    { backgroundColor: colors.backGround },
                ]}
            >
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View
            style={[styles.container, { backgroundColor: colors.backGround }]}
        >
            <ScrollView>
                <View style={styles.logoContainer}>
                    {/* <Image source={require("../../assets/logo.png")} /> */}
                </View>

                <Input
                    id="email"
                    keyboardType="default"
                    required
                    email
                    secureTextEntry={false}
                    autoCapitalize="none"
                    errorText={t("Please enter a valid email.")}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    login={true}
                    placeholder={t("Email")}
                    style={[
                        styles.input,
                        {
                            borderColor: colors.inputPlaceholderColor,
                            color: colors.inputPlaceholderColor,
                        },
                    ]}
                    placeholderTextColor={colors.inputPlaceholderColor}
                />
                <Input
                    id="username"
                    keyboardType="default"
                    required
                    secureTextEntry={false}
                    autoCapitalize="none"
                    errorText={t("Please enter a valid username.")}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    login={true}
                    placeholder={t("Username")}
                    style={[
                        styles.input,
                        {
                            borderColor: colors.inputPlaceholderColor,
                            color: colors.inputPlaceholderColor,
                        },
                    ]}
                    placeholderTextColor={colors.inputPlaceholderColor}
                />
                <Input
                    id="password"
                    keyboardType="default"
                    secureTextEntry={true}
                    required
                    password
                    minLength={8}
                    autoCapitalize="none"
                    errorText={t("Please enter a valid password.")}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    login={true}
                    color={colors.inputPlaceholderColor}
                    placeholder={t("Password")}
                    style={[
                        styles.input,
                        {
                            borderColor: colors.inputPlaceholderColor,
                            color: colors.inputPlaceholderColor,
                        },
                    ]}
                    placeholderTextColor={colors.inputPlaceholderColor}
                />
                <Input
                    id="confirmPassword"
                    keyboardType="default"
                    secureTextEntry={true}
                    required
                    password
                    minLength={8}
                    autoCapitalize="none"
                    errorText={t("Please enter a valid password.")}
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    login={true}
                    dontMatchError={dontMatchError}
                    placeholder={t("Confirm password")}
                    color={colors.inputPlaceholderColor}
                    style={[
                        styles.input,
                        {
                            marginBottom: 0,
                            borderColor: colors.inputPlaceholderColor,
                            color: colors.inputPlaceholderColor,
                        },
                    ]}
                    placeholderTextColor={colors.inputPlaceholderColor}
                />
            </ScrollView>
            <TouchableOpacity
                disabled={diabledButton}
                style={[
                    styles.login,
                    { backgroundColor: diabledButton ? "grey" : "#3B82F6" },
                ]}
                onPress={authHandler}
            >
                <Text style={styles.loginLabel}>{t("Register")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.register}
                onPress={() => {
                    props.navigation.navigate("Login");
                }}
            >
                <Text style={styles.registerLabel}>{t("Login")}</Text>
            </TouchableOpacity>
            <SuccessPopup
                visible={visible}
                setVisible={setVisible}
                message={message}
            />
        </View>
    );
};

export const screenOptions = (navData) => {
    const { colors } = useTheme();
    return {
        headerTitle: () => (
            <View>
                <Text
                    style={{
                        color: colors.blogItemBackground,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                >
                    Registration
                </Text>
            </View>
        ),
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        marginHorizontal: 24,
        marginVertical: -8,
        padding: 12,
    },
    login: {
        backgroundColor: "#3B82F6",
        borderRadius: 8,
        fontSize: 16,
        marginHorizontal: 24,
        marginVertical: 8,
        padding: 16,
    },
    loginLabel: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
    },
    register: {
        backgroundColor: "#fff",
        fontSize: 16,
        marginHorizontal: 24,
        marginVertical: 8,
        padding: 16,
        borderRadius: 8,
    },
    registerLabel: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
    },
    inputContainer: {
        marginHorizontal: 20,
    },
});

export default Registration;
