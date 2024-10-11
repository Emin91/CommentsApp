import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { COLORS, FONTS } from "../config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInLeft, FadeOutLeft, LinearTransition } from "react-native-reanimated";
import { IComment } from "../views/commentListData";

interface AddCommentInputProps {
    selectedComment: IComment | null
    onCancelReply: () => void
    onSendComment: (comment: string) => void
}

export type AddCommentInputRefProps = {
    onFocus: () => void
};

export const AddCommentInput = forwardRef<AddCommentInputRefProps, AddCommentInputProps>(({ selectedComment, onSendComment, onCancelReply }, ref) => {
    const [replyValue, setReplyValue] = useState("");
    const { bottom } = useSafeAreaInsets();
    const styles = getStyle(bottom, replyValue);
    const addCommentInputRef = useRef<TextInput>(null);

    const onFocus = () => {

    };

    const sendCommentHandler = () => {
        onSendComment(replyValue?.trim());
        setReplyValue("");
        addCommentInputRef?.current?.blur();
    };

    useImperativeHandle(ref, () => ({
        onFocus
    }), [onFocus]);

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={100}
            enabled={Platform.OS === "ios"}
            behavior={Platform.OS === "ios" ? "position" : "height"}>
            <View style={styles.inputWrapper}>
                <View style={{ flexDirection: "row" }}>
                    {selectedComment?.username
                        && <Animated.View layout={LinearTransition.springify(100)} entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(300)} style={{ height: 50, paddingVertical: 10 }}>
                            <TouchableOpacity onPress={onCancelReply} style={styles.cancelButton}>
                                <Text style={styles.cancelLabel}>X</Text>
                            </TouchableOpacity>
                        </Animated.View>}
                    <TextInput
                        ref={addCommentInputRef}
                        returnKeyType="done"
                        onSubmitEditing={() => { }}
                        style={styles.input}
                        placeholder={selectedComment?.username ? `Reply to: ${selectedComment?.username}` : "Add new comment..."}
                        value={replyValue}
                        onChangeText={setReplyValue}
                    />
                    <TouchableOpacity disabled={!replyValue?.trim()?.length} onPress={sendCommentHandler} style={styles.sendButton}>
                        <Text style={styles.sendLabel}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
});

export const getStyle = (bottom: number, replyValue: string) => {
    return StyleSheet.create({
        inputWrapper: {
            position: "absolute",
            bottom: 0,
            paddingBottom: bottom ? bottom + 40 : 40,
            width: "100%",
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.grey,
            borderTopWidth: 2,
            height: 50
        },
        cancelButton: {
            borderRadius: 4,
            justifyContent: "center",
            marginLeft: 10,
            alignItems: "center",
            backgroundColor: COLORS.blue,
            paddingHorizontal: 10, flex: 1
        },
        cancelLabel: {
            fontSize: 16,
            color: COLORS.white,
            fontFamily: FONTS.Poppins_SemiBold
        },
        replyToLabel: {
            fontSize: 12,
            color: COLORS.darkGrey,
            fontFamily: FONTS.Poppins_Medium
        },
        replyToWrapper: {
            position: "absolute",
            height: 40,
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: COLORS.lightBlue,
            borderTopWidth: 1,
            borderTopColor: COLORS.grey,
            bottom: bottom + 40
        },
        input: {
            flex: 1,
            height: 50,
            paddingLeft: 10,
            paddingHorizontal: 10,
            color: COLORS.black
        },
        sendButton: {
            height: 50,
            justifyContent: "center",
            paddingRight: 20,
            opacity: !replyValue?.trim()?.length ? 0.4 : 1,
            alignItems: "flex-end"
        },
        sendLabel: {
            fontSize: 16,
            color: COLORS.blue,
            fontFamily: FONTS.Poppins_SemiBold
        }
    });
};
