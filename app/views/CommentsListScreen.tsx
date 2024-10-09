import React, { Fragment, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { CommentComponent } from "../components/CommentComponent";
import { MOCK_COMMENTS } from "./commentListData";
import { COLORS } from "../config";
import { AddCommentInput } from "../components/AddCommentInput";

export const CommentListScreen = ({ }) => {
    const styles = useMemo(() => getStyle(), []);

    const onSendComment = (comment: string) => {
        console.log(comment);
    };

    return (
        <Fragment>
            <View style={styles.container}>
                <FlatList
                    data={MOCK_COMMENTS}
                    keyExtractor={(comment) => comment.id}
                    contentContainerStyle={styles.listStyle}
                    renderItem={(({ item, index }) => (
                        <CommentComponent key={index} {...{ item, arr: MOCK_COMMENTS }} isShowReplies={!false} />
                    ))}
                />
            </View>
            <AddCommentInput onSendComment={onSendComment} />
        </Fragment>
    );
};

export const getStyle = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 4,
            backgroundColor: COLORS.white
        },
        listStyle: {
            paddingTop: 12,
            paddingBottom: 60
        }
    });
};