import React, { useEffect, useState } from "react";
import { TextInput, Text, ImageBackground, StyleSheet, TouchableOpacity, Keyboard, Alert } from "react-native";
import { MainButton } from "../components/MainButton";
import { COLORS, FONTS, IMAGES, REGEX } from "../config";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useRealm } from "@realm/react";
import { AuthSchema } from "../db/schemas/auth";
import { BSON } from "realm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TRootNavigator } from "../../App";

export const LoginScreen = ({ }) => {
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<TRootNavigator>>();
    const [userEmailOrUsername, setUserEmailOrUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmUserPassword, setConfirmUserPassword] = useState("");
    const [isSignIn, setIsSignIn] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [isEmailOrUsernameCorrect, setIsEmailOrUsernameCorrect] = useState(false);
    const [isEmailCorrect, setIsEmailCorrect] = useState(false);
    const [isUserNameCorrect, setIsUserNameCorrect] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [isPasswordConfirmCorrect, setIsPasswordConfirmCorrect] = useState(false);
    const authorizationList = useQuery(AuthSchema);
    const realm = useRealm();
    const styles = getStyle(top);

    const animationProps = {
        layout: LinearTransition.delay(200).stiffness(500),
        entering: FadeIn.delay(200),
        exiting: FadeOut.delay(200)
    };

    const onValidateString = (value: string, validateBy: "email" | "numAndWord"): boolean => {
        const filter = new RegExp(REGEX[validateBy]);
        return validateBy == "email" ? filter.test(value) : value.length >= 6 && filter.test(value);
    };

    const onChangeUserName = (username: string) => {
        setUserName(username);
        const result = onValidateString(username.trim(), "numAndWord");
        setIsUserNameCorrect(Boolean(username?.trim()?.length) && result);
    };

    const onChangeMailOrUsername = (value: string) => {
        setUserEmailOrUsername(value);
        const resultEmail = onValidateString(value.trim(), "email");
        const resultUsername = onValidateString(value.trim(), "numAndWord");
        setIsEmailOrUsernameCorrect(Boolean(value?.trim()?.length) && (resultEmail || resultUsername));
    };

    const onChangeMail = (email: string) => {
        setUserEmail(email);
        const resultEmail = onValidateString(email.trim(), "email");
        setIsEmailCorrect(Boolean(email?.trim()?.length) && resultEmail);
    };

    const onChangePassword = (pass: string): void => {
        setUserPassword(pass);
        const result = onValidateString(pass, "numAndWord");
        setIsPasswordCorrect(result);
    };

    const onChangeConfirmPassword = (pass: string): void => {
        setConfirmUserPassword(pass);
        const result = pass == userPassword;
        setIsPasswordConfirmCorrect(result);
    };

    const onCreateOrLogin = () => {
        setIsSignIn(!isSignIn);
    };

    const onSignIn = () => {
        const storedUser = authorizationList.find((el) => [el.userEmail, el.userName].includes(userEmailOrUsername));
        if (storedUser?.userPassword === userPassword) {
            Alert.alert("Success", "You have successfully logged in!");
            const activeUserId = realm.objectForPrimaryKey("AuthSchema", new BSON.ObjectId(storedUser?._id));
            navigation.navigate("CommentsList", { activeUserId: activeUserId?._id?.toHexString() });
            return;
        }
        Alert.alert("Sign in error", "The entered data is incorrect");
    };

    const onSignUp = () => {
        const storedUser = authorizationList.filtered(`userEmail == '${userEmail}' || userName == '${userName}'`);
        if (storedUser?.length) {
            Alert.alert("Sign up error", "You are already registered in the system. Use the data for authorization");
            return;
        }
        realm.write(() => {
            realm.create(AuthSchema, { userEmail, userName, userPassword });
        });
        //Alert.alert("Success", "You have registered successfully!");
        const activeUserId = realm.objectForPrimaryKey("AuthSchema", new BSON.ObjectId(storedUser?.[0]._id));
        navigation.navigate("CommentsList", { activeUserId: activeUserId?._id?.toHexString() });
    };

    const inputs = [
        {
            placeholder: isSignIn ? "Email or user name" : "Email",
            errorInfo: isSignIn ? "Must be email or user name" : "Requires: @ and should be mail",
            isCorrect: isSignIn ? isEmailOrUsernameCorrect : isEmailCorrect,
            value: isSignIn ? userEmailOrUsername : userEmail,
            onChangeText: isSignIn ? onChangeMailOrUsername : onChangeMail
        },
        !isSignIn && {
            placeholder: "User name",
            errorInfo: "Requires: numbers, letters of the Latin alphabet, more than 6 characters",
            isCorrect: isUserNameCorrect,
            value: userName,
            onChangeText: onChangeUserName
        },
        {
            placeholder: "Password",
            errorInfo: "Requires: numbers, letters of the Latin alphabet, more than 6 characters",
            isCorrect: isPasswordCorrect,
            value: userPassword,
            onChangeText: onChangePassword,
            secureTextEntry: false
        },
        !isSignIn && {
            placeholder: "Confirm password",
            errorInfo: "Requires: numbers, letters of the Latin alphabet, more than 6 characters and be equal to the main password",
            isCorrect: isPasswordConfirmCorrect,
            value: confirmUserPassword,
            onChangeText: onChangeConfirmPassword,
            secureTextEntry: false
        }
    ];

    useEffect(() => {
        setIsReady(isSignIn
            ? isEmailOrUsernameCorrect && isPasswordCorrect
            : isEmailCorrect && isUserNameCorrect && isPasswordCorrect && isPasswordConfirmCorrect);
    }, [isEmailCorrect, isUserNameCorrect, isPasswordCorrect, isPasswordConfirmCorrect, isSignIn, isEmailOrUsernameCorrect]);

    useEffect(() => {
        !isSignIn && onChangeConfirmPassword(confirmUserPassword);
    }, [isSignIn, userPassword, confirmUserPassword]);

    useEffect(() => {
        navigation.setOptions({ headerTitle: isSignIn ? "Sign in" : "Sign up" });
    }, [isSignIn]);

    useEffect(() => {
        if (!isSignIn && userEmailOrUsername) {
            onChangeMail(userEmailOrUsername);
        }
        if (isSignIn && userEmail) {
            onChangeMailOrUsername(userEmail);
        }
    }, [isSignIn, userEmail, userEmailOrUsername]);

    //console.log(authorizationList);

    return (
        <ImageBackground style={styles.container} source={IMAGES.background}>
            <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1 }}>
                <Animated.View {...{ ...animationProps }} style={styles.inputsWrapper}>
                    {inputs?.filter(Boolean).map((item: any) => (
                        <Animated.View {...{ ...animationProps }} key={item.placeholder}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType={!item.secureTextEntry ? "email-address" : "default"}
                                style={{ ...styles.input, borderColor: item.value ? item.isCorrect ? COLORS.blue : COLORS.red : COLORS.grey }}
                                {...{ ...item }}
                            />
                            {item?.value?.trim()?.length && !item.isCorrect
                                ? <Animated.View {...{ ...animationProps }} style={styles.errorWrapper}>
                                    <Text style={styles.errorLabel}>{item.errorInfo}</Text>
                                </Animated.View>
                                : null
                            }
                        </Animated.View>
                    ))}
                </Animated.View>
                <Animated.View {...{ ...animationProps }}>
                    <MainButton {...{ isReady }} buttonStyle={{ marginTop: 20 }} onPress={isSignIn ? onSignIn : onSignUp} title={isSignIn ? "Sign In" : "Sign Up"} />
                    <MainButton buttonStyle={{ marginTop: 10 }} onPress={onCreateOrLogin} variant="simple" title={isSignIn ? "Create new account" : "Already have an account"} />
                </Animated.View>
            </TouchableOpacity>
        </ImageBackground>
    );
};

export const getStyle = (top: number) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: top + 60
        },
        inputsWrapper: {
            paddingTop: 50,
            overflow: "hidden"
        },
        input: {
            backgroundColor: COLORS.lightGrey,
            width: "100%",
            borderWidth: 2,
            marginBottom: 10,
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 16
        },
        errorWrapper: {
            paddingBottom: 10,
            paddingHorizontal: 10
        },
        errorLabel: {
            fontSize: 12,
            fontFamily: FONTS.Poppins_Regular,
            color: COLORS.darkGrey
        }
    });
};
