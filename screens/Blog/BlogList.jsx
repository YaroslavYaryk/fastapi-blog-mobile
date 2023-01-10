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

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import BlogItem from "../../components/elements/BlogItem";
import Colors from "../../constants/Colors";
import * as blogActions from "../../store/actions/blogActions";

const BlogList = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const blogs = useSelector((state) => state.blogs.blogs);

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
            Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
        }
    }, [error]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.headerBold} />
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
        <View style={styles.container}>
            <FlatList
                // onScroll={scrollHandler}
                // ref={blogs}
                ItemSeparatorComponent={ItemSeparatorView}
                enableEmptySections={true}
                data={blogs}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) => (
                    <View style={{}}>
                        <TouchableOpacity>
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
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="microblog"
                    color={"white"}
                    iconName="microblog"
                    icon={FontAwesome5}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="create-outline"
                    color={"white"}
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
});

export default BlogList;
