import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { COLORS, FONTS } from "../config";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AddCommentInputProps {
    onSendComment: (comment: string) => void;
}

export type AddCommentInputRefProps = {
    onFocus: () => void
};

export const AddCommentInput = forwardRef<AddCommentInputRefProps, AddCommentInputProps>(({ onSendComment }, ref) => {
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
                    <TextInput
                        ref={addCommentInputRef}
                        returnKeyType="done"
                        onSubmitEditing={() => { }}
                        style={styles.input}
                        placeholder="Add new comment..."
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
            opacity: !replyValue?.trim()?.length ? 0.4: 1,
            alignItems: "flex-end"
        },
        sendLabel: {
            fontSize: 16,
            color: COLORS.blue,
            fontFamily: FONTS.Poppins_SemiBold
        }
    });
};
