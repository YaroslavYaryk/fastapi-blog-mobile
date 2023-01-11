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
    Image,
} from "react-native";
import Colors from "../../constants/Colors";
import { Dialog } from "react-native-simple-dialogs";

const SCREEN_WIDTH = Dimensions.get("window").width;

const DialogModal = (props) => {
    const { image, message, showAlert, setShowAlert } = props;
    return (
        <Dialog
            visible={showAlert}
            // title="Message"
            // titleStyle={{ fontSize: 15 }}
            onTouchOutside={() => setShowAlert(false)}
            animationType={"fade"}
            dialogStyle={{
                color: Colors.primaryColor,
                borderRadius: 10,
                // backgroundColor: Colors.primarySecondColor,
            }}
            contentStyle={{ borderRadius: 10 }}
        >
            <View style={{ alignItems: "center" }}>
                <View style={styles.modalContentIcon}>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={image}
                    />
                </View>
                <View style={styles.modalContentText}>
                    <Text style={{ fontSize: 18 }}>{message}</Text>
                </View>
            </View>
        </Dialog>
    );
};

const styles = StyleSheet.create({
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

export default DialogModal;
