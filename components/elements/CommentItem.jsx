import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    LayoutAnimation,
    Animated,
} from "react-native";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CommentItem = (props) => {
    const {
        item,
        commentLikes,
        userId,
        handlePressUnpressLike,
        setItemSelected,
        itemSelected,
        setReplySelected,
        replySelected,
        setCommentReplyTo,
        setReplyToReplyObj,
    } = props;

    const getLikesForComment = (commentId) => {
        return commentLikes.filter((el) => el.commentId == commentId).length;
    };

    const isCommentLikedByUser = (commentId) => {
        return commentLikes.filter(
            (el) => el.commentId == commentId && el.userId == userId
        ).length;
    };

    return (
        <View
            style={[
                styles.blogWrapper,
                {
                    borderWidth: itemSelected == item ? 2 : 0,
                    borderColor:
                        itemSelected == item ? Colors.primaryColor : "",
                },
            ]}
        >
            <View style={[styles.blogInner]}>
                <TouchableOpacity
                    onLongPress={() => {
                        setItemSelected(item);
                    }}
                >
                    <View style={styles.blogTittleBlockWrapper}>
                        <View style={styles.blogTittleBlock}>
                            <Text style={styles.blogTittleText}>
                                {item.userName}
                            </Text>
                        </View>
                        <View style={styles.blogAuthorBlock}>
                            <View style={styles.likesBlogIcon}>
                                {isCommentLikedByUser(item.id) ? (
                                    <AntDesign
                                        name="heart"
                                        size={24}
                                        color={Colors.primaryColor}
                                        onPress={() => {
                                            handlePressUnpressLike(item.id);
                                        }}
                                    />
                                ) : (
                                    <AntDesign
                                        name="hearto"
                                        size={24}
                                        color={Colors.primaryColor}
                                        onPress={() => {
                                            handlePressUnpressLike(item.id);
                                        }}
                                    />
                                )}
                            </View>
                            <Text style={styles.blogAuthorText}>
                                {getLikesForComment(item.id)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.blogContentBlock}>
                        <Text style={styles.blogContentText}>
                            {item.comment}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.replyBlock}>
                    <TouchableOpacity
                        onPress={() => {
                            setCommentReplyTo(item.id);
                        }}
                    >
                        <View style={styles.replyBlock}>
                            <Text style={styles.replyBlockText}>Reply</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <FlatList
                    // onScroll={scrollHandler}
                    data={item.replies}
                    keyExtractor={(reply) => reply.id}
                    renderItem={(reply) => (
                        <View
                            style={[
                                styles.replyListBlock,
                                {
                                    borderWidth:
                                        replySelected.id == reply.item.id
                                            ? 0.5
                                            : 0,
                                    borderColor:
                                        replySelected.id == reply.item.id
                                            ? Colors.primaryColor
                                            : "",
                                },
                            ]}
                        >
                            <View style={styles.blogInner}>
                                <TouchableOpacity
                                    onLongPress={() => {
                                        setReplySelected({
                                            id: reply.item.id,
                                            parentId: item.id,
                                        });
                                    }}
                                >
                                    <View
                                        style={[styles.blogTittleBlockWrapper]}
                                    >
                                        <View style={styles.blogTittleBlock}>
                                            <Text
                                                style={[
                                                    styles.blogTittleText,
                                                    { fontSize: 13 },
                                                ]}
                                            >
                                                {reply.item.userName}
                                            </Text>
                                        </View>
                                        <View style={styles.blogAuthorBlock}>
                                            <View style={styles.likesBlogIcon}>
                                                {isCommentLikedByUser(
                                                    reply.item.id
                                                ) ? (
                                                    <AntDesign
                                                        name="heart"
                                                        size={18}
                                                        color={
                                                            Colors.primaryColor
                                                        }
                                                        onPress={() => {
                                                            handlePressUnpressLike(
                                                                reply.item.id
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    <AntDesign
                                                        name="hearto"
                                                        size={18}
                                                        color={
                                                            Colors.primaryColor
                                                        }
                                                        onPress={() => {
                                                            handlePressUnpressLike(
                                                                reply.item.id
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </View>
                                            <Text style={styles.blogAuthorText}>
                                                {getLikesForComment(
                                                    reply.item.id
                                                )}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.blogContentBlock}>
                                        <Text
                                            style={[
                                                styles.blogContentText,
                                                { fontSize: 13 },
                                            ]}
                                        >
                                            {reply.item.comment}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.replyBlock}>
                                    <TouchableOpacity
                                        style={styles.replyBlock}
                                        onPress={() => {
                                            setReplyToReplyObj({
                                                id: reply.item.id,
                                                parentId: item.id,
                                                userName: reply.item.userName,
                                            });
                                            setCommentReplyTo(item.id);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.replyBlockText,
                                                { fontSize: 12 },
                                            ]}
                                        >
                                            Reply
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    blogContentBlock: {
        width: "90%",
    },
    blogAuthorBlock: {
        alignItems: "center",
    },
    replyBlockText: {
        color: Colors.backGroundDarker,
        fontWeight: "600",
        fontSize: 13,
    },
    replyListBlock: {
        paddingLeft: 20,
        padding: 5,
    },
});

export default CommentItem;
