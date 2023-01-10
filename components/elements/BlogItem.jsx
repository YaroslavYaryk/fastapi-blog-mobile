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

const SCREEN_WIDTH = Dimensions.get("window").width;

const BlogItem = (props) => {
    const { item } = props;

    const getShortBody = () => {
        var shortedBody = "";
        if (item.body.length > 200) {
            shortedBody = `${item.body.slice(0, 201)}...`;
        } else {
            shortedBody = item.body;
        }
        return shortedBody;
    };

    const getShortTitle = () => {
        var shortedTitle = "";
        if (item.title.length > 30) {
            shortedTitle = `${item.title.slice(0, 31)}...`;
        } else {
            shortedTitle = item.title;
        }
        return shortedTitle;
    };

    return (
        <View style={styles.blogWrapper}>
            <View style={styles.blogInner}>
                <View style={styles.blogTittleBlockWrapper}>
                    <View style={styles.blogTittleBlock}>
                        <Text style={styles.blogTittleText}>
                            {getShortTitle()}
                        </Text>
                    </View>
                    <View style={styles.blogAuthorBlock}>
                        <Text style={styles.blogAuthorText}>
                            {item.authorName}
                        </Text>
                    </View>
                </View>

                <View style={styles.blogContentBlock}>
                    <Text style={styles.blogContentText}>{getShortBody()}</Text>
                </View>
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
});

export default BlogItem;
