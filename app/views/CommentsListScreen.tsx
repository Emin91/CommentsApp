import React, { Fragment, useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { CommentComponent } from "../components/CommentComponent";
import { IComment } from "./commentListData";
import { COLORS } from "../config";
import { AddCommentInput } from "../components/AddCommentInput";
import { useQuery, useRealm } from "@realm/react";
import { CommentSchema } from "../db/schemas/commentsList";

export const CommentListScreen = ({ }) => {
    const styles = useMemo(() => getStyle(), []);
    const realm = useRealm();
    const comments = useQuery(CommentSchema);
    const [commentsList, setCommentsList] = useState(comments || []);

    const onSendComment = async (comment: string) => {
        const id = new Date().toISOString();
        const newComment: IComment = {
            id,
            username: "Emin",
            text: comment,
            replies: []
        };
        realm.write(() => {
            realm.create(CommentSchema.name, newComment);
        });
    };

    return (
        <Fragment>
            <View style={styles.container}>
                <FlatList
                    data={commentsList}
                    keyExtractor={(comment) => comment._id?.toString()}
                    contentContainerStyle={styles.listStyle}
                    renderItem={(({ item, index }) => (
                        <CommentComponent key={index} item={item} isShowReplies={!false} />
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