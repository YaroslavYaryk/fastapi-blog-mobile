import React, {
    useEffect,
    useState,
    useCallback,
    useReducer,
    useRef,
} from "react";
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    Button,
    Dimensions,
    Image,
} from "react-native";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import AwesomeAlert from "react-native-awesome-alerts";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

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

const Login = (props) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [diabledButton, setDisabledButton] = useState(true);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.route.params) {
            setMessage(props.route.params.message);
            setVisible(true);
        }
    }, [props.route.params]);

    useEffect(() => {
        if (error) {
            // Alert.alert("An Error Occured", error, [
            //   { text: "Okay", onPress: setError(null) },
            // ]);
            setVisible(true);
        }
    }, [error]);

    useEffect(() => {
        if (formState.formIsValid) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    });

    const authHandler = async () => {
        setError(null);
        let action;

        action = authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
        );
        setIsLoading(true);
        try {
            await dispatch(action);
            // props.navigation.navigate("Shop");
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: "",
        },
        inputValidities: {
            email: false,
            password: false,
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
                <ActivityIndicator size="large" color={colors.headerBold} />
            </View>
        );
    }

    return (
        // <View>
        <View
            style={[styles.container, { backgroundColor: colors.backGround }]}
        >
            <View>
                <AwesomeAlert
                    show={visible}
                    showProgress={false}
                    title={t("Error")}
                    message={error}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="Okay"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        setVisible(false);
                    }}
                    onConfirmPressed={() => {
                        setVisible(false);
                    }}
                />
            </View>
            <View style={styles.logoContainer}></View>
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
                        color: colors.text,
                        borderColor: colors.inputPlaceholderColor,
                    },
                ]}
                placeholderTextColor={colors.inputPlaceholderColor}
                colors={colors}
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
                        marginBottom: 5,
                        color: colors.text,
                        borderColor: colors.inputPlaceholderColor,
                    },
                ]}
                placeholderTextColor={colors.inputPlaceholderColor}
                colors={colors}
            />
            <TouchableOpacity
                disabled={diabledButton}
                style={[
                    styles.login,
                    { backgroundColor: diabledButton ? "grey" : "#3B82F6" },
                ]}
                onPress={authHandler}
            >
                <Text style={styles.loginLabel}>{t("Login")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.register}
                onPress={() => {
                    props.navigation.navigate("Registration");
                }}
            >
                <Text style={styles.registerLabel}>{t("Register")}</Text>
            </TouchableOpacity>
        </View>
        // </View>
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
                    Login
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
    },
    input: {
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        marginHorizontal: 24,
        marginVertical: -8,
        padding: 12,
        placeholderTextColor: "white",
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

export default Login;
