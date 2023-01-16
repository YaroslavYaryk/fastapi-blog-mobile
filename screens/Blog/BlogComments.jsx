import React, { useState, useCallback, useEffect, useRef } from "react";
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
import { Dialog } from "react-native-simple-dialogs";
import { AntDesign } from "@expo/vector-icons";
import InputBar from "@paraboly/react-native-input-bar";
import { TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import CommentItem from "../../components/elements/CommentItem";
import * as commentActions from "../../store/actions/commentActions";
import * as commentLikeActions from "../../store/actions/commentLikeActions";

const BlogComments = (props) => {
    const { colors } = useTheme();

    const { blogId } = props.route.params;

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [commentValue, setCommentValue] = useState(null);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { userId } = useSelector((state) => state.auth);
    const comments = useSelector((state) => state.blogComments.comments);
    const commentLikes = useSelector((state) => state.commentLikes.likes);

    const [showAlert, setShowAlert] = useState(false);
    const [itemSelected, setItemSelected] = useState({});
    const [replySelected, setReplySelected] = useState({});
    const [replyToId, setReplyToId] = useState(null);
    const [replyToReplyObj, setReplyToReplyObj] = useState({});

    let flatListRef;

    const loadBlogComments = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(commentActions.fetchBlogComments(blogId));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
        loadBlogComments();
    }, [dispatch, loadBlogComments, isFocused]);

    const loadCommentLikes = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(commentLikeActions.fetchCommentLikes(blogId));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
        loadCommentLikes();
    }, [dispatch, loadCommentLikes, isFocused]);

    useEffect(() => {
        if (error) {
            Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
        }
    }, [error]);

    const getCommentById = (id) => {
        return comments.find((el) => el.id == id);
    };

    const getReplyById = (id, parentId) => {
        var comment = comments.find((el) => el.id == parentId);
        return comment.replies.find((el) => el.id == id);
    };

    const getShortText = (text) => {
        var shortedText = "";
        if (text.length > 30) {
            shortedText = `${text.slice(0, 31)}...`;
        } else {
            shortedText = text;
        }
        return shortedText;
    };

    const handlePressUnpressLike = useCallback(async (commentId) => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(commentLikeActions.likeUnlikeComment(commentId));
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        // props.navigation.navigate("BlogList");
    });

    const handleDeleteComment = useCallback(
        async (commentId, parent = null) => {
            console.log(commentId, parent, "HERE");
            setError(null);
            setIsLoading(true);
            try {
                await dispatch(commentActions.deleteComment(commentId, parent));
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            setItemSelected({});
            setReplySelected({});
            // props.navigation.navigate("BlogList");
        }
    );

    const handleCreateComment = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            var newComment = commentValue;
            if (replyToReplyObj.id && newComment[0] != "@") {
                newComment = `@${replyToReplyObj.userName} ${newComment}`;
            }
            await dispatch(
                commentActions.createComment(blogId, newComment, replyToId)
            );
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        setReplyToId(null);
        setReplyToReplyObj({});
        setCommentValue(null);
        // props.navigation.navigate("BlogList");
    }, [commentValue]);

    if (isLoading) {
        return (
            <View
                style={[
                    styles.centered,
                    { backgroundColor: colors.primaryColorLight },
                ]}
            >
                <ActivityIndicator size="large" color={colors.headerBold} />
            </View>
        );
    }

    const onRefresh = () => {
        loadBlogComments();
        loadCommentLikes();
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
            style={[
                styles.container,
                { backgroundColor: colors.primaryColorLight },
            ]}
        >
            {(itemSelected.id || replySelected.id) && (
                <View
                    style={[
                        styles.topDeleteBlock,
                        {
                            borderColor: colors.primaryColor,
                            backgroundColor: colors.primaryColorLight,
                        },
                    ]}
                >
                    <View style={styles.topDeleteBlockInner}>
                        <View style={styles.topDeleteBlockLeftIconBlock}>
                            <AntDesign
                                name="close"
                                size={24}
                                color="black"
                                onPress={() => {
                                    setItemSelected({});
                                    setReplySelected({});
                                }}
                            />
                        </View>
                        <View style={styles.topDeleteBlockRightIconBlock}>
                            <AntDesign
                                name="delete"
                                size={24}
                                color="black"
                                onPress={() => {
                                    if (itemSelected.id) {
                                        // delete comment
                                        handleDeleteComment(itemSelected.id);
                                    } else {
                                        // delete reply
                                        handleDeleteComment(
                                            replySelected.id,
                                            replySelected.parentId
                                        );
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            )}
            <View style={{}}>
                <FlatList
                    style={{
                        height:
                            itemSelected.id || replySelected.id
                                ? "76.5%"
                                : "83%",
                    }}
                    // onScroll={scrollHandler}
                    ref={(ref) => (flatListRef = ref)}
                    ItemSeparatorComponent={ItemSeparatorView}
                    enableEmptySections={true}
                    data={comments}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => (
                        <View style={{}}>
                            <CommentItem
                                item={itemData.item}
                                commentLikes={commentLikes}
                                userId={userId}
                                handlePressUnpressLike={handlePressUnpressLike}
                                setItemSelected={setItemSelected}
                                itemSelected={itemSelected}
                                setReplySelected={setReplySelected}
                                replySelected={replySelected}
                                setCommentReplyTo={setReplyToId}
                                setReplyToReplyObj={setReplyToReplyObj}
                            />
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
            </View>

            <View
                style={[
                    styles.inputBlockWrapper,
                    {
                        height: replyToReplyObj.id ? "18%" : "17%",
                    },
                ]}
            >
                <View style={styles.inputBlock}>
                    <View>
                        {(replyToId || replyToReplyObj.id) && (
                            <View
                                style={[
                                    styles.addReplyBlock,
                                    {
                                        borderColor: colors.primaryColor,
                                        backgroundColor: colors.primaryColor,
                                    },
                                ]}
                            >
                                <View style={styles.addReplyBlockInner}>
                                    <View>
                                        <Entypo
                                            name="reply"
                                            size={24}
                                            color="black"
                                        />
                                    </View>
                                    <View style={{ marginLeft: 5 }}>
                                        {replyToReplyObj.id ? (
                                            <Text>
                                                {getShortText(
                                                    getReplyById(
                                                        replyToReplyObj.id,
                                                        replyToReplyObj.parentId
                                                    ).comment
                                                )}
                                            </Text>
                                        ) : (
                                            <Text>
                                                {getShortText(
                                                    getCommentById(replyToId)
                                                        .comment
                                                )}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <View>
                                    <AntDesign
                                        name="close"
                                        size={24}
                                        color="black"
                                        onPress={() => {
                                            setReplyToId(null);
                                            setReplyToReplyObj({});
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                    <View style={{ width: "100%" }}>
                        <TextInput
                            style={{ backgroundColor: "#F2F4F6" }}
                            // mode="outlined"
                            height={"auto"}
                            value={commentValue}
                            onChangeText={(el) => setCommentValue(el)}
                            // label={"Search"}
                            underlineColor="#F2F2F2"
                            activeOutlineColor="green"
                            color="red"
                            onFocus={() => {
                                flatListRef.scrollToEnd({ animated: true });
                            }}
                            activeUnderlineColor="#F3F5F6"
                            selectionColor="black"
                            right={
                                <TextInput.Icon
                                    icon={"send"}
                                    iconColor={colors.primaryColor}
                                    disabled={commentValue ? false : true}
                                    onPress={() => {
                                        handleCreateComment();
                                    }}
                                />
                            }
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export const screenOptions = (navData) => {
    return {
        //    // headerShown: false,
        //    headerTitleStyle: {
        //       fontFamily: "Roboto",
        //       fontWeight: "700",
        //       marginLeft: -20,
        //    },
        headerTitle: "Dojo Blog",
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
    topDeleteBlock: {
        padding: 10,
        borderWidth: 1,
    },
    topDeleteBlockInner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputBlockWrapper: {
        justifyContent: "flex-end",
        // borderWidth: 1,
        // marginTop: "10%",
        height: "17%",
        marginTop: 10,
    },
    inputBlock: {
        marginTop: 10,
        padding: 5,
        marginBottom: 20,
        justifyContent: "flex-end",
    },

    input: {
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        // marginR: 14,
        marginVertical: -8,
        padding: 12,
        justifyContent: "flex-end",
    },
    addReplyBlock: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        padding: 5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    addReplyBlockInner: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default BlogComments;
