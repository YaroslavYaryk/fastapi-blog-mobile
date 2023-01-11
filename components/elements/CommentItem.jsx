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
    const { item } = props;

    // const getShortBody = () => {
    //     var shortedBody = "";
    //     if (item.body.length > 200) {
    //         shortedBody = `${item.body.slice(0, 201)}...`;
    //     } else {
    //         shortedBody = item.body;
    //     }
    //     return shortedBody;
    // };

    // const getShortTitle = () => {
    //     var shortedTitle = "";
    //     if (item.title.length > 30) {
    //         shortedTitle = `${item.title.slice(0, 31)}...`;
    //     } else {
    //         shortedTitle = item.title;
    //     }
    //     return shortedTitle;
    // };

    return (
        <View style={styles.blogWrapper}>
            <View style={[styles.blogInner]}>
                <View style={styles.blogTittleBlockWrapper}>
                    <View style={styles.blogTittleBlock}>
                        <Text style={styles.blogTittleText}>
                            {item.userName}
                        </Text>
                    </View>
                    <View style={styles.blogAuthorBlock}>
                        <View style={styles.likesBlogIcon}>
                            {true ? (
                                <AntDesign
                                    name="heart"
                                    size={24}
                                    color={Colors.primaryColor}
                                />
                            ) : (
                                <AntDesign
                                    name="hearto"
                                    size={24}
                                    color={Colors.primaryColor}
                                />
                            )}
                        </View>
                        <Text style={styles.blogAuthorText}>1</Text>
                    </View>
                </View>

                <View style={styles.blogContentBlock}>
                    <Text style={styles.blogContentText}>{item.comment}</Text>
                </View>
                <View style={styles.replyBlock}>
                    <View style={styles.replyBlock}>
                        <Text style={styles.replyBlockText}>Reply</Text>
                    </View>
                </View>
            </View>
            <View>
                <FlatList
                    // onScroll={scrollHandler}
                    data={item.replies}
                    keyExtractor={(reply) => reply.id}
                    renderItem={(reply) => (
                        <View style={styles.replyListBlock}>
                            <View style={styles.blogInner}>
                                <View style={styles.blogTittleBlockWrapper}>
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
                                            {true ? (
                                                <AntDesign
                                                    name="heart"
                                                    size={18}
                                                    color={Colors.primaryColor}
                                                />
                                            ) : (
                                                <AntDesign
                                                    name="hearto"
                                                    size={18}
                                                    color={Colors.primaryColor}
                                                />
                                            )}
                                        </View>
                                        <Text style={styles.blogAuthorText}>
                                            1
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
                                        {item.comment}
                                    </Text>
                                </View>
                                <View style={styles.replyBlock}>
                                    <View style={styles.replyBlock}>
                                        <Text
                                            style={[
                                                styles.replyBlockText,
                                                { fontSize: 12 },
                                            ]}
                                        >
                                            Reply
                                        </Text>
                                    </View>
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
        marginLeft: 20,
        marginTop: 5,
    },
});

export default CommentItem;
