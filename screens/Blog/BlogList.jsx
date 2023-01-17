import React, { useState, useCallback, useEffect } from "react";
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
    I18nManager,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { Dialog } from "react-native-simple-dialogs";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import BlogItem from "../../components/elements/BlogItem";
import Colors from "../../constants/Colors";
import * as blogActions from "../../store/actions/blogActions";
import DialogModal from "../../components/UI/DialogModal";

const BlogList = (props) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { deleteBlog } = props.route.params;
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const blogs = useSelector((state) => state.blogs.blogs);
    const { userId } = useSelector((state) => state.auth);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (deleteBlog) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1550);
        }
    }, [deleteBlog]);

    const loadBlogs = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(blogActions.fetchBlogs());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
        loadBlogs();
    }, [dispatch, loadBlogs, isFocused]);

    useEffect(() => {
        if (error) {
            Alert.alert(t("An error occurred!"), error, [{ text: t("Okay") }]);
        }
    }, [error]);

    const visitBlogDetails = (item) => {
        props.navigation.navigate("BlogDetails", {
            id: item.id,
            name: item.title,
            authorId: item.authorId,
            userId: userId,
        });
    };

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

    const onRefresh = () => {
        loadBlogs();
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator

            <View
                style={{
                    height: 0.5,

                    width: "100%",
                }}
            />
        );
    };

    return (
        <View
            style={[styles.container, { backgroundColor: colors.backGround }]}
        >
            <FlatList
                // onScroll={scrollHandler}
                // ref={blogs}
                ItemSeparatorComponent={ItemSeparatorView}
                enableEmptySections={true}
                data={blogs}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) => (
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                                visitBlogDetails(itemData.item);
                            }}
                        >
                            <BlogItem item={itemData.item}></BlogItem>
                        </TouchableOpacity>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                    />
                }
            />

            <DialogModal
                image={require("../../assets/icons8-waste.gif")}
                message={t("Blog successfully deleted!!!")}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
        </View>
    );
};

export const screenOptions = (navData) => {
    const { colors } = useTheme();

    return {
        //    // headerShown: false,
        //    headerTitleStyle: {
        //       fontFamily: "Roboto",
        //       fontWeight: "700",
        //       marginLeft: -20,
        //    },
        headerTitle: "Dojo Blog",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    style={{ marginTop: 5 }}
                    title="microblog"
                    color={colors.blogItemBackground}
                    iconName={"bars"}
                    icon={FontAwesome5}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="create-outline"
                    color={colors.blogItemBackground}
                    iconName="create"
                    icon={Ionicons}
                    onPress={() => {
                        navData.navigation.navigate("CreateBlog");
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        zIndex: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSwipe: {
        fontSize: 18,
        fontWeight: "500",
    },
    modalContentIcon: {
        alignItems: "center",
        height: 70,
        width: 70,
    },
    modalContentText: {
        marginTop: 10,
        alignItems: "center",
    },
});

export default BlogList;
