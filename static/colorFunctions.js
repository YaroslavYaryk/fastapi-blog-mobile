export const getHeaderColorParameter = (colors) => {
    return {
        headerStyle: {
            backgroundColor:
                Platform.OS === "android" ? colors.primaryColor : "",
        },
        headerTintColor: colors.blogItemBackground,
        headerTitleStyle: {
            fontFamily: "Roboto",
            fontWeight: "700",
        },
        headerBackTitleStyle: {
            fontFamily: "Roboto",
        },
    };
};
