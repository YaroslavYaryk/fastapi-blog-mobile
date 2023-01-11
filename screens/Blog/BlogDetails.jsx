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
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import BlogItem from "../../components/elements/BlogItem";
import Colors from "../../constants/Colors";
import * as blogActions from "../../store/actions/blogActions";
import * as blogLikeActions from "../../store/actions/likeActions";

const BlogDetails = (props) => {
    const { id } = props.route.params;

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
            Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
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
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.headerBold} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
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
                <View style={styles.blogWrapper}>
                    <View style={styles.blogInner}>
                        <View style={styles.blogTittleBlockWrapper}>
                            <View style={styles.blogTittleBlock}>
                                <Text style={styles.blogTittleText}>
                                    {blogDetails.title}
                                </Text>
                            </View>
                            <View style={styles.blogAuthorBlock}>
                                <Text style={styles.blogAuthorText}>
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
                                            style={styles.commentBlogTextCount}
                                        >
                                            Comments
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
                                                color={Colors.primaryColor}
                                                onPress={handlePressUnpressLike}
                                            />
                                        ) : (
                                            <AntDesign
                                                name="hearto"
                                                size={24}
                                                color={Colors.primaryColor}
                                                onPress={handlePressUnpressLike}
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.likeBlogTextCount}>
                                        {blogLikes.length}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {blogDetails.authorId == userId && (
                    <View style={styles.deleteButtonBlock}>
                        <View style={styles.deleteButtonBlockInner}>
                            <TouchableOpacity onPress={handleDeleteBlog}>
                                <Text style={styles.DeleteButtonText}>
                                    Delete
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
        backgroundColor: Colors.backGround,
        zIndex: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.backGround,
    },
    buttonSwipe: {
        fontSize: 18,
        fontWeight: "500",
    },
    blogWrapper: {
        backgroundColor: Colors.blogItemBackground,
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
        color: Colors.primaryColor,
        fontWeight: "500",
        fontSize: 16,
    },
    blogAuthorText: {
        color: Colors.primarySecondColor,
        fontWeight: "500",
    },
    blogCommentLike: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    commentBlogTextCount: {
        color: Colors.backGroundDarker,
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
        color: Colors.primarySecondColor,
        fontWeight: "600",
    },
    deleteButtonBlock: {
        padding: 8,
    },
    deleteButtonBlockInner: {
        width: "100%",
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
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
