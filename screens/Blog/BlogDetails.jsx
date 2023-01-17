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
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import * as blogActions from "../../store/actions/blogActions";
import * as blogLikeActions from "../../store/actions/likeActions";

const BlogDetails = (props) => {
    const { t } = useTranslation();

    const { id } = props.route.params;
    const { colors } = useTheme();

    const { userId } = useSelector((state) => state.auth);

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const blogDetails = useSelector((state) => state.blogs.blogDetails);

    const blogLikes = useSelector((state) => state.blogLikes.likes);
    const loadBlogDetails = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            console.log("one more");
            await dispatch(blogActions.fetchOneBlog(id));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [setError, setIsLoading]);

    useEffect(() => {
        loadBlogDetails();
    }, [dispatch, loadBlogDetails]);

    const loadBlogLikes = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(blogLikeActions.fetchBlogLikes(id));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [setError, setIsLoading]);

    useEffect(() => {
        loadBlogLikes();
    }, [dispatch, loadBlogLikes]);

    useEffect(() => {
        if (error) {
            Alert.alert(t("An error occurred!"), error, [{ text: t("Okay") }]);
        }
    }, [error]);

    const onRefresh = () => {
        loadBlogDetails();
        loadBlogLikes();
    };

    const isLikedByUser = () => {
        return blogLikes.find((el) => el.userId == userId);
    };

    const visitComments = () => {
        props.navigation.navigate("BlogComments", { blogId: id });
    };

    const handlePressUnpressLike = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(blogLikeActions.likeUnlikeBlog(id));
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        // props.navigation.navigate("BlogList");
    });

    const handleDeleteBlog = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(blogActions.deleteBlog(id));
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        props.navigation.navigate("BlogList", { deleteBlog: true });
    }, [dispatch]);

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
            <ScrollView
                ItemSeparatorView={ItemSeparatorView}
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View
                    style={[
                        styles.blogWrapper,
                        { backgroundColor: colors.blogItemBackground },
                    ]}
                >
                    <View style={styles.blogInner}>
                        <View style={styles.blogTittleBlockWrapper}>
                            <View style={styles.blogTittleBlock}>
                                <Text
                                    style={[
                                        styles.blogTittleText,
                                        { color: colors.primaryColor },
                                    ]}
                                >
                                    {blogDetails.title}
                                </Text>
                            </View>
                            <View style={styles.blogAuthorBlock}>
                                <Text
                                    style={[
                                        styles.blogAuthorText,
                                        { color: colors.primarySecondColor },
                                    ]}
                                >
                                    {blogDetails.authorName}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.blogContentBlock}>
                            <Text style={styles.blogContentText}>
                                {blogDetails.body}
                            </Text>
                        </View>
                        <View style={styles.blogCommentLike}>
                            <View style={styles.commentBlog}>
                                <View style={styles.commentBlogInner}>
                                    <TouchableOpacity onPress={visitComments}>
                                        <Text
                                            style={[
                                                styles.commentBlogTextCount,
                                                {
                                                    color: colors.backGroundDarker,
                                                },
                                            ]}
                                        >
                                            {t("Comments")}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.likesBlog}>
                                <View style={styles.likesBlogInner}>
                                    <View style={styles.likesBlogIcon}>
                                        {isLikedByUser() ? (
                                            <AntDesign
                                                name="heart"
                                                size={24}
                                                color={colors.primaryColor}
                                                onPress={handlePressUnpressLike}
                                            />
                                        ) : (
                                            <AntDesign
                                                name="hearto"
                                                size={24}
                                                color={colors.primaryColor}
                                                onPress={handlePressUnpressLike}
                                            />
                                        )}
                                    </View>
                                    <Text
                                        style={[
                                            styles.likeBlogTextCount,
                                            {
                                                color: colors.primarySecondColor,
                                            },
                                        ]}
                                    >
                                        {blogLikes.length}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {blogDetails.authorId == userId && (
                    <View style={styles.deleteButtonBlock}>
                        <View
                            style={[
                                styles.deleteButtonBlockInner,
                                { backgroundColor: colors.primaryColor },
                            ]}
                        >
                            <TouchableOpacity onPress={handleDeleteBlog}>
                                <Text style={styles.DeleteButtonText}>
                                    {t("Delete")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export const screenOptions = (navData) => {
    const { id, userId, authorId } = navData.route.params;

    return {
        headerTitle: "Dojo Blog",
        headerRight: () =>
            userId == authorId && (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="edit"
                        color={"white"}
                        iconName="edit"
                        icon={MaterialIcons}
                        onPress={() => {
                            navData.navigation.navigate("EditBlog", {
                                blogId: id,
                            });
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
    blogWrapper: {
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    blogInner: {},
    blogTittleBlockWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    blogTittleBlock: {
        marginVertical: 5,
    },
    blogTittleText: {
        fontWeight: "500",
        fontSize: 16,
    },
    blogAuthorText: {
        fontWeight: "500",
    },
    blogCommentLike: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    commentBlogTextCount: {
        fontWeight: "600",
    },
    likesBlog: {
        marginTop: 5,
        // alignItems: "flex-end",
    },
    likesBlogInner: {
        flexDirection: "row",
        alignItems: "center",
    },
    likesBlogIcon: {
        marginRight: 5,
    },
    likeBlogTextCount: {
        fontSize: 15,

        fontWeight: "600",
    },
    deleteButtonBlock: {
        padding: 8,
    },
    deleteButtonBlockInner: {
        width: "100%",
        alignItems: "center",

        padding: 10,
        borderRadius: 10,
    },
    DeleteButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default BlogDetails;
