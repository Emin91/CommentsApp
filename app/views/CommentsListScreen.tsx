import React, { Fragment, useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { CommentComponent } from "../components/CommentComponent";
import { IComment } from "./commentListData";
import { COLORS } from "../config";
import { AddCommentInput } from "../components/AddCommentInput";
import { useRealm } from "@realm/react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { TRootNavigator } from "../../App";
import { BSON } from "realm";
import { AuthSchema } from "../db/schemas/auth";

export const CommentListScreen = ({ }) => {
    const styles = useMemo(() => getStyle(), []);
    const realm = useRealm();
    const { params: { activeUserId } } = useRoute<RouteProp<TRootNavigator, "CommentsList">>();
    const [commentsList, setCommentsList] = useState<IComment[]>([]);
    const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
    const activeUser = realm.objectForPrimaryKey(AuthSchema, new BSON.ObjectId(activeUserId));

    const updateCommentReplies = (comment: IComment, selectedId: string, newReply: IComment): IComment => {
        if (comment.id === selectedId) {
            return {
                ...comment,
                replies: [...(comment.replies || []), newReply]
            };
        }

        if (comment.replies && comment.replies.length > 0) {
            return {
                ...comment,
                replies: comment.replies.map(reply => updateCommentReplies(reply, selectedId, newReply))
            };
        }

        return comment;
    };

    const onSendComment = (comment: string) => {
        const newComment: IComment = {
            id: Date.now().toString(),
            username: activeUser?.userName || "Anonymous",
            text: comment,
            replies: []
        };

        if (selectedComment) {
            const updatedCommentsList = commentsList.map(comment =>
                updateCommentReplies(comment, selectedComment?.id, newComment)
            );

            setCommentsList(updatedCommentsList);
            setSelectedComment(null);
        } else {
            setCommentsList([...commentsList, newComment]);
        }
    };

    const onCancelReply = () => {
        setSelectedComment(null);
    };

    const onPressReply = (selectedComment: IComment) => {
        setSelectedComment(selectedComment);
    };

    return (
        <Fragment>
            <View style={styles.container}>
                <FlatList
                    data={commentsList}
                    contentContainerStyle={styles.listStyle}
                    keyExtractor={(el) => el.id!}
                    renderItem={(({ item, index }) => (
                        <CommentComponent key={index} item={item} isShowReplies={!false} onPressReply={onPressReply} />
                    ))}
                />
            </View>
            <AddCommentInput onSendComment={onSendComment} selectedComment={selectedComment} {...{ onCancelReply }} />
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
            paddingBottom: 100
        }
    });
};