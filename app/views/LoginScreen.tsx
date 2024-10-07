import React, { useEffect, useState } from "react";
import { TextInput, ImageBackground, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { MainButton } from "../components/MainButton";
import { IMAGES } from "../config";
import Animated, { FadeIn, FadeOut, interpolate, LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = ({ }) => {
    const progress = useSharedValue(0);
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmUserPassword, setConfirmUserPassword] = useState("");
    const [isSignIn, setIsSignIn] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const rView = useAnimatedStyle(() => {
        const height = interpolate(progress.value, [0, 1], [2 * 60 + 50, 4 * 60 + 50]);
        return { height };
    });

    const onSignUp = () => {
        setIsSignIn(!isSignIn);
        progress.value = withTiming(!isSignIn ? 1 : 0, { duration: 300 });
    };

    const inputs = [
        { placeholder: !isSignIn ? "Email or user name" : "Email", value: userEmail, onChangeText: setUserEmail },
        isSignIn && { placeholder: "User name", value: userName, onChangeText: setUserName },
        { placeholder: "Password", secureTextEntry: true, value: userPassword, onChangeText: setUserPassword },
        isSignIn && { placeholder: "Confirm password", secureTextEntry: true, value: confirmUserPassword, onChangeText: setConfirmUserPassword }
    ];

    useEffect(() => {
        setIsReady(true);
    }, []);

    useEffect(() => {
        navigation.setOptions({ headerTitle: !isSignIn ? "Sign in" : "Sign up" });
    }, [isSignIn]);

    return (
        <ImageBackground style={{ flex: 1, paddingHorizontal: 20, paddingTop: top + 60 }} source={IMAGES.background}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1 }}>
                <Animated.View style={[{ paddingTop: 50, overflow: "hidden" }, rView]}>
                    {inputs?.filter(Boolean).map((item) => (
                        <Animated.View layout={LinearTransition.stiffness(400)} entering={FadeIn.delay(200)} exiting={FadeOut.delay(200)} key={item.placeholder}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType={!item.secureTextEntry ? "email-address" : "default"}
                                style={styles.input}
                                {...{ ...item }}
                            />
                        </Animated.View>
                    ))}
                </Animated.View>
                <MainButton buttonStyle={{ marginTop: 20 }} onPress={() => { }} title="Sign In" />
                <MainButton buttonStyle={{ marginTop: 10 }} onPress={onSignUp} variant="simple" title={!isSignIn ? "Create new account" : "Already have an account"} />
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#F1F4FF",
        width: "100%",
        borderWidth: 2,
        borderColor: "#1F41BB",
        marginBottom: 10,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 16
    }
});
