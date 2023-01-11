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
import { Dialog } from "react-native-simple-dialogs";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import CommentItem from "../../components/elements/CommentItem";
import Colors from "../../constants/Colors";
import * as commentActions from "../../store/actions/commentActions";
import DialogModal from "../../components/UI/DialogModal";

const BlogComments = (props) => {
    const { blogId } = props.route.params;

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { userId } = useSelector((state) => state.auth);
    const comments = useSelector((state) => state.blogComments.comments);

    console.log(comments);

    const [showAlert, setShowAlert] = useState(false);

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

    useEffect(() => {
        if (error) {
            Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
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
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.headerBold} />
            </View>
        );
    }

    const onRefresh = () => {
        loadBlogComments();
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
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) => (
                    <View style={{}}>
                        <CommentItem item={itemData.item} />
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

            {/* <DialogModal
                image={require("../../assets/icons8-waste.gif")}
                message={"Blog successfully deleted!!!"}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            /> */}
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

export default BlogComments;
