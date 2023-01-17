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
import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CommentItem = (props) => {
    const { t } = useTranslation();

    const { colors } = useTheme();

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
                        itemSelected == item ? colors.primaryColor : "",
                    backgroundColor: colors.blogItemBackground,
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
                            <Text
                                style={[
                                    styles.blogTittleText,
                                    { color: colors.primaryColor },
                                ]}
                            >
                                {item.userName}
                            </Text>
                        </View>
                        <View style={styles.blogAuthorBlock}>
                            <View style={styles.likesBlogIcon}>
                                {isCommentLikedByUser(item.id) ? (
                                    <AntDesign
                                        name="heart"
                                        size={24}
                                        color={colors.primaryColor}
                                        onPress={() => {
                                            handlePressUnpressLike(item.id);
                                        }}
                                    />
                                ) : (
                                    <AntDesign
                                        name="hearto"
                                        size={24}
                                        color={colors.primaryColor}
                                        onPress={() => {
                                            handlePressUnpressLike(item.id);
                                        }}
                                    />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.blogAuthorText,
                                    { color: colors.primarySecondColor },
                                ]}
                            >
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
                            <Text
                                style={[
                                    styles.replyBlockText,
                                    { color: colors.backGroundDarker },
                                ]}
                            >
                                {t("Reply")}
                            </Text>
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
                                            ? colors.primaryColor
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
                                                    {
                                                        fontSize: 13,
                                                        color: colors.primaryColor,
                                                    },
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
                                                            colors.primaryColor
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
                                                            colors.primaryColor
                                                        }
                                                        onPress={() => {
                                                            handlePressUnpressLike(
                                                                reply.item.id
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </View>
                                            <Text
                                                style={[
                                                    styles.blogAuthorText,
                                                    {
                                                        color: colors.primarySecondColor,
                                                    },
                                                ]}
                                            >
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
                                                {
                                                    fontSize: 12,
                                                    color: colors.backGroundDarker,
                                                },
                                            ]}
                                        >
                                            {t("Reply")}
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
    blogContentBlock: {
        width: "90%",
    },
    blogAuthorBlock: {
        alignItems: "center",
    },
    replyBlockText: {
        fontWeight: "600",
        fontSize: 13,
    },
    replyListBlock: {
        paddingLeft: 20,
        padding: 5,
    },
});

export default CommentItem;
