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
import { useTheme } from "@react-navigation/native";

const BlogItem = (props) => {
    const { colors } = useTheme();

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
                            {getShortTitle()}
                        </Text>
                    </View>
                    <View style={styles.blogAuthorBlock}>
                        <Text
                            style={[
                                styles.blogAuthorText,
                                { color: colors.primarySecondColor },
                            ]}
                        >
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
});

export default BlogItem;
